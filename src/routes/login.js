const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../mongoDB/userSchema');
const jwtSecret = process.env.JWT_SECRET;

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }
    user.password = undefined;
    const token = jwt.sign({ user }, jwtSecret);
    res.json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;
