const express = require("express");
const router = express.Router();
const Objeto = require("../mongoDB/operationSchema");
const ListOperations = require("../mongoDB/list-operationSchema");
const operationObjet = require("../../operationObjet");
const { authenticateToken } = require("../middelwares");
function calcularDiasHastaFecha(fecha) {
  const fechaObjetivo = new Date(fecha);
  const fechaActual = new Date();
  const diferenciaEnMilisegundos = fechaObjetivo - fechaActual;
  const diasRestantes = Math.ceil(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));
  if (diasRestantes <= 30) {
    return `${diasRestantes} días`;
  } else {
    // Calcula los meses restantes (aproximadamente)
    const mesesRestantes = Math.floor(diasRestantes / 30);
    
    return `${mesesRestantes} meses`;
  }
}

// Ruta para crear un nuevo objeto
router.post("/", authenticateToken, async (req, res) => {
  try {
    const nuevoObjeto = await Objeto.create(req.body);
    res.status(201).json(nuevoObjeto);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Ruta para obtener todos los objetos
router.get("/", authenticateToken, async (req, res) => {
  try {
    const objetos = await Objeto.find();
    res.json(objetos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los objetos" });
  }
});
// Ruta para obtener todos los objetos
router.get("/listado", authenticateToken, async (req, res) => {
  try {
    const objetos = await ListOperations.find().sort({ timestamp: -1 });
    res.json(objetos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los objetos" });
  }
});
router.get("/orderBy/:param", authenticateToken, async (req, res) => {
  try {
    let objetos;

    if (req.params.param === "refNumber") {
      objetos = await ListOperations.find().sort({ refNumber: -1 }).exec();
    } else if (req.params.param === "shipper") {
      objetos = await ListOperations.find().sort({ shipper: 1 }).exec();
    } else if (req.params.param === "buyer") {
      objetos = await ListOperations.find().sort({ buyer: 1 }).exec();
    } else if (req.params.param === "state") {
      objetos = await ListOperations.find().sort({ state: 1 }).exec();
    }else if (req.params.param === "date") {
      objetos = await ListOperations.find().sort({ timestamp: -1 });
    }else if (req.params.param === "timeToArrival") {
      objetos = await ListOperations.find().sort({ timestamp: -1 });
    }
    res.json(objetos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los objetos" });
  }
});

// Ruta para obtener los datos de la nueva operación
router.get("/new-operation", authenticateToken, async (req, res) => {
  try {
    const id = String(210500 + (await ListOperations.find()).length + 1);
    operationObjet.id = id;
    operationObjet.comercial.fields.empresaRefNumber = id;
    await ListOperations.create({
      state: "New",
      refNumber: id,
    });
    await Objeto.create(operationObjet);
    res.status(200).json({ id: id });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
router.get("/duplicate/:refNumber", authenticateToken, async (req, res) => {
  try {
    const id = String(210500 + (await ListOperations.find()).length + 1);
    const objetoExistente = await Objeto.findOne({ id: req.params.refNumber });
    if (!objetoExistente) {
      return res.status(404).json({ error: "Objeto no encontrado" });
    }
    const nuevoObjeto = new Objeto(objetoExistente.toObject());
    nuevoObjeto.id = id;
    nuevoObjeto.comercial.fields.empresaRefNumber = id;
    await nuevoObjeto.save();
    const response = await ListOperations.create({
      state: nuevoObjeto.status,
      refNumber: id,
      empleado: nuevoObjeto.comercial.fields.empleadoBuyer,
      shipper:nuevoObjeto.comercial.fields.seller.nombre,
      buyer: nuevoObjeto.comercial.fields.buyer.nombre,
      empresa:nuevoObjeto.comercial.fields.empresa.empresa,
      timeToArrival:calcularDiasHastaFecha(nuevoObjeto.logistica.fields.eta)
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error });
  }
});
// Ruta para obtener un objeto por su refNumber
router.get("/by-ref/:refNumber", authenticateToken, async (req, res) => {
  try {
    const objeto = await Objeto.findOne({ id: req.params.refNumber });
    if (!objeto) {
      return res.status(404).json({ error: "Objeto no encontrado" });
    }
    res.json(objeto);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
// Ruta para actualizar un objeto por su refNumber
router.put("/by-ref/:refNumber", authenticateToken, async (req, res) => {
  try {
    const objetoActualizado = await Objeto.findOneAndUpdate(
      { id: req.params.refNumber }, // El campo para buscar el documento
      req.body, // Los datos con los que actualizar el documento
      { new: true } // Opciones para devolver el documento actualizado
    );
    await ListOperations.findOneAndUpdate(
      { refNumber: req.params.refNumber },
      {
        empleado: req.body.docs.fields.responsable,
        shipper: req.body.comercial.fields.seller.nombre,
        buyer: req.body.comercial.fields.buyer.nombre,
        empresa: req.body.comercial.fields.empresa.empresa,
        state: req.body.status,
        timeToArrival:calcularDiasHastaFecha(req.body.logistica.fields.eta)
      },
      { new: true }
    );
    res.json(objetoActualizado);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
// Ruta para actualizar un objeto por su refNumber
router.put("/by-ref/:refNumber/status", authenticateToken, async (req, res) => {
  try {
    const objetoActualizado = await Objeto.findOneAndUpdate(
      { id: req.params.refNumber }, // El campo para buscar el documento
      {status:req.body.status}, // Los datos con los que actualizar el documento
      { new: true } // Opciones para devolver el documento actualizado
    );
    await ListOperations.findOneAndUpdate(
      { refNumber: req.params.refNumber },
      {
        state:req.body.status
      },
      { new: true }
    );
    res.json(objetoActualizado.status);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
// Ruta para eliminar un objeto por su ID
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const objetoEliminado = await Objeto.findByIdAndDelete(req.params.id);
    if (!objetoEliminado) {
      return res.status(404).json({ error: "Objeto no encontrado" });
    }
    res.json({ message: "Objeto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el objeto" });
  }
});
router.delete("/by-ref/:refNumber", authenticateToken, async (req, res) => {
  try {
    const objetoEliminado = await Objeto.findOneAndDelete({
      id: req.params.refNumber,
    });
    const listadoEliminado = await ListOperations.findOneAndDelete({
      refNumber: req.params.refNumber,
    });

    const response = {};

    if (objetoEliminado) {
      response.message1 = "Objeto eliminado correctamente";
    } else {
      response.message1 = "Objeto no encontrado";
    }

    if (listadoEliminado) {
      response.message2 = "Eliminado del listado correctamente";
    } else {
      response.message2 = "No encontrado en el listado no encontrado";
    }

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el objeto" });
  }
});
module.exports = router;
