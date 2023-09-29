const express = require("express");
const router = express.Router();
const Objeto = require("../mongoDB/operationSchema");
const ListOperations = require("../mongoDB/list-operationSchema");
const operationObjet = require("../../operationObjet");
const { authenticateToken } = require("../middelwares");

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
    const objetos = await ListOperations.find();
    res.json(objetos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los objetos" });
  }
});
// Ruta para obtener los datos de la nueva operación
router.get("/new-operation", authenticateToken, async (req, res) => {
  try {
    // Obtener la cantidad de operaciones en la colección ListadoOperaciones
    const min = 10000; // El número mínimo de 4 dígitos
    const max = 99999; // El número máximo de 4 dígitos
    const id = String(Math.floor(Math.random() * (max - min + 1)) + min);
    console.log(id)
    await ListOperations.create({
      state: "new",
      refNumber:id,
    });
    operationObjet.comercial.fields.empresaRefNumber = id;
    operationObjet.id = id;
    res.status(200).json(operationObjet);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Ruta para obtener un objeto por su ID
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const objeto = await Objeto.findById(req.params.id);
    if (!objeto) {
      return res.status(404).json({ error: "Objeto no encontrado" });
    }
    res.json(objeto);
  } catch (error) {
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
// Ruta para actualizar un objeto por su ID
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    req.body.status = "Editado"; 
    const objetoActualizado = await Objeto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!objetoActualizado) {
      const nuevoObjeto = await Objeto.create(req.body);
      res.status(201).json(nuevoObjeto);
    }
    res.json(objetoActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el objeto" });
  }
});
// Ruta para actualizar un objeto por su refNumber
router.put("/by-ref/:refNumber", authenticateToken, async (req, res) => {
  try {
    req.body.status = "Editado"; 
    const objetoActualizado = await Objeto.findOneAndUpdate(
      { id: req.params.refNumber }, // El campo para buscar el documento
      req.body, // Los datos con los que actualizar el documento
      { new: true } // Opciones para devolver el documento actualizado
    );
    if (!objetoActualizado) {
      const nuevoObjeto = await Objeto.create(req.body);
      res.status(201).json(nuevoObjeto);
    }
    res.json(objetoActualizado);
  } catch (error) {
    res.status(500).json({ error:error});
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
    const objetoEliminado = await Objeto.findOneAndDelete({ id: req.params.refNumber });
const listadoEliminado = await ListOperations.findOneAndDelete({ refNumber: req.params.refNumber });

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
