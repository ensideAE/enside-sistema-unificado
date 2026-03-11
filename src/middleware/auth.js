const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'enside-secret-key-2024';
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ erro: 'Token não fornecido' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
};
module.exports = { authMiddleware, JWT_SECRET };
