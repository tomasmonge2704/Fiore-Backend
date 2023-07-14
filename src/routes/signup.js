const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../mongoDB/userSchema');

router.post('/', async (req, res) => {
  const { username, password, mail } = req.body;

  try {
    // Verificar si ya existe un usuario con el mismo username o correo electrónico
    const existingUser = await User.findOne({ $or: [{ username }, { mail }] });
    if (existingUser) {
      return res.status(409).json({ error: 'El nombre de usuario o el correo electrónico ya están en uso' });
    }

    // Crear una instancia del nuevo usuario utilizando el esquema de usuario
    const newUser = new User({
      username,
      password,
      mail
    });

    // Cifrar la contraseña antes de guardarla en la base de datos
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newUser.password, salt);
    newUser.password = hashedPassword;

    // Guardar el nuevo usuario en la base de datos
    await newUser.save();

    res.status(201).json({ message: 'Registro exitoso' });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;
