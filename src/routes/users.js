const express = require('express');
const db = require('../models/db');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();
router.get('/', authMiddleware, (req, res) => {
  if (req.usuario.role !== 'admin') return res.status(403).json({ erro: 'Acesso negado' });
  res.json({ total: db.usuarios.length, usuarios: db.usuarios.map(({ senha, ...u }) => u) });
});
router.get('/perfil', authMiddleware, (req, res) => {
  const usuario = db.usuarios.find(u => u.id === req.usuario.id);
  if (!usuario) return res.status(404).json({ erro: 'Não encontrado' });
  const { senha, ...perfil } = usuario;
  res.json(perfil);
});
module.exports = router;
