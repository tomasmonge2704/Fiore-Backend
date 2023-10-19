const express = require("express");
const router = express.Router();
const Objeto = require("../mongoDB/operationSchema");
const operationObjet = require("../../operationObjet");
const { authenticateToken } = require("../middelwares");
function calcularDiasHastaFecha(fecha) {
  if(!fecha) return "No tiene fecha ETA";
  const fechaObjetivo = new Date(fecha);
  const fechaActual = new Date();
  const diferenciaEnMilisegundos = fechaObjetivo - fechaActual;
  const diasRestantes = Math.ceil(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));
  if(diasRestantes < 0) return "Ya arrivo"
  if (diasRestantes <= 30) {
    return `${diasRestantes} días`;
  } else {
    // Calcula los meses restantes (aproximadamente)
    const mesesRestantes = Math.floor(diasRestantes / 30);
    return `${mesesRestantes} meses`;
  }
}
function getListado(objetos) {
  return objetos.map((elemento) => ({
    status: elemento.status,
    refNumber: elemento.id,
    empleado: elemento.comercial.fields.empleadoBuyer,
    shipper: elemento.comercial.fields.seller.nombre,
    buyer: elemento.comercial.fields.buyer.nombre,
    empresa: elemento.comercial.fields.empresa.empresa,
    timeToArrival:calcularDiasHastaFecha(elemento.logistica.fields.eta)
  }));
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
    const objetos = await Objeto.find({});
    const listado = getListado(objetos).sort((a, b) => b.refNumber - a.refNumber);
    res.json(listado);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los objetos" });
  }
  
});
router.get("/orderBy/:param", authenticateToken, async (req, res) => {
  try {
    let objetos = await Objeto.find().sort({ timestamp: -1 });
    const listado = getListado(objetos);
    if (req.params.param === "refNumber") {
      objetos = listado.sort((a, b) => b.refNumber - a.refNumber);
    } else if (req.params.param === "shipper") {
      objetos = listado.sort((a, b) => a.shipper.localeCompare(b.shipper));
    } else if (req.params.param === "buyer") {
      objetos = listado.sort((a, b) => a.buyer.localeCompare(b.buyer));
    } else if (req.params.param === "status") {
      objetos = listado.sort((a, b) => a.status.localeCompare(b.status));
    } else if (req.params.param === "date") {
      objetos = listado.sort((a, b) => b.timestamp - a.timestamp);
    } else if (req.params.param === "timeToArrival") {
      objetos = listado.sort((a, b) => b.timestamp - a.timestamp);
    }
    res.json(objetos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los objetos" });
  }  
});

// Ruta para obtener los datos de la nueva operación
router.get("/new-operation", authenticateToken, async (req, res) => {
  try {
    let objetos = await Objeto.find({});
    const id = String(210500 + objetos.length + 1);
    operationObjet.id = id;
    operationObjet.comercial.fields.empresaRefNumber = id;
    await Objeto.create(operationObjet);
    res.status(200).json({ id: id });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
router.get("/duplicate/:refNumber", authenticateToken, async (req, res) => {
  try {
    let objetos = await Objeto.find({});
    const id = String(210500 + objetos.length + 1);
    const objetoExistente = await Objeto.findOne({ id: req.params.refNumber });
    if (!objetoExistente) {
      return res.status(404).json({ error: "Objeto no encontrado" });
    }
    const duplicatedObject = new Objeto(objetoExistente.toObject());
    duplicatedObject.id = id;
    duplicatedObject.comercial.fields.empresaRefNumber = id;
    duplicatedObject._id = undefined;
    duplicatedObject.comercial.fields._id = undefined;
    duplicatedObject.docs.fields._id = undefined;
    duplicatedObject.logistica.fields._id = undefined;
    duplicatedObject.contableFinanciera.fields._id = undefined;
    const response = await duplicatedObject.save();
    await duplicatedObject.save();
    res.status(200).json(getListado([response])[0]);
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
    res.json(objetoEliminado);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el objeto" });
  }
});
module.exports = router;
