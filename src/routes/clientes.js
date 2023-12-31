const express = require('express');
const router = express.Router();
const Objeto = require('../mongoDB/clientSchema');
const { authenticateToken } = require('../middelwares');
// Ruta para crear un nuevo objeto
router.post('/',authenticateToken, async (req, res) => {
  try {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string' && req.body[key].trim() === '') {
        throw new Error(`El parámetro ${key} está vacío`);
      }
    }
    const nuevoObjeto = await Objeto.create(req.body);
    res.status(201).json(nuevoObjeto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener todos los objetos
router.get('/',authenticateToken, async (req, res) => {
  try {
    const objetos = await Objeto.find();
    res.json(objetos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los objetos' });
  }
});

// Ruta para obtener un objeto por su ID
router.get('/:id',authenticateToken, async (req, res) => {
  try {
    const objeto = await Objeto.findById(req.params.id);
    if (!objeto) {
      return res.status(404).json({ error: 'Objeto no encontrado' });
    }
    res.json(objeto);
  } catch (error) {
    res.status(500).json({ error:error});
  }
});

// Ruta para actualizar un objeto por su ID
router.put('/:id',authenticateToken, async (req, res) => {
  try {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string' && req.body[key].trim() === '') {
        throw new Error(`El parámetro ${key} está vacío`);
      }
    }
    const objetoActualizado = await Objeto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(objetoActualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para eliminar un objeto por su ID
router.delete('/:id',authenticateToken, async (req, res) => {
  try {
    const objetoEliminado = await Objeto.findByIdAndDelete(req.params.id);
    if (!objetoEliminado) {
      return res.status(404).json({ error: 'Objeto no encontrado' });
    }
    res.json({ message: 'Objeto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el objeto' });
  }
});

module.exports = router;
