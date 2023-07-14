const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Importa la biblioteca jsonwebtoken
const User = require('../mongoDB/userSchema');
const jwtSecret = process.env.JWT_SECRET;

// Middleware de autenticación
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado' });
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }

    req.user = user;
    next();
  });
};

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

// Ejemplo de ruta protegida
router.get('/protected', authenticateToken, (req, res) => {
  // El middleware authenticateToken verifica la autenticidad del token antes de llegar aquí
  res.json({ message: 'Esta es una ruta protegida', user: req.user });
});

module.exports = router;
