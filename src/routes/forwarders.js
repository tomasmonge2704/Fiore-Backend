const express = require('express');
const router = express.Router();
const Objeto = require('../mongoDB/forwardersSchema');
const { authenticateToken } = require('../middelwares');

// Ruta para crear un nuevo objeto
router.post('/',authenticateToken, async (req, res) => {
  try {
    const nuevoObjeto = await Objeto.create(req.body);
    res.status(201).json(nuevoObjeto);
  } catch (error) {
    res.status(500).json({ error: error });
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

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const objetoActualizado = await Objeto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    if (!objetoActualizado) {
      // If the object is not found, create a new one and send a response
      const nuevoObjeto = await Objeto.create(req.body);
      res.status(201).json(nuevoObjeto);
    } else {
      // If the object is found and updated, send a response
      res.json(objetoActualizado);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el objeto' });
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