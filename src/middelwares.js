const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (!token) {
      return res.status(401).json({ error: 'Acceso no autorizado' });
    }
    jwt.verify(token.replace("Bearer ", ""), jwtSecret, (err) => {
      if (err) {
        return res.status(403).json({ error: 'Token inválido' });
      }
      next();
    });
  };

module.exports = {authenticateToken}