const express = require('express');
const db = require('../models/db');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

router.get('/', authMiddleware, (req, res) => {
  if (req.usuario.role !== 'admin') return res.status(403).json({ erro: 'Acesso negado' });
  res.json({ total: db.usuarios.length, usuarios: db.usuarios.map(({ senhaPlain, ...u }) => u) });
});

router.get('/perfil', authMiddleware, (req, res) => {
  const usuario = db.usuarios.find(u => u.id === req.usuario.id);
  if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
  const { senhaPlain, ...perfil } = usuario;
  res.json(perfil);
});

router.put('/perfil', authMiddleware, (req, res) => {
  const idx = db.usuarios.findIndex(u => u.id === req.usuario.id);
  if (idx === -1) return res.status(404).json({ erro: 'Usuário não encontrado' });
  const { nome } = req.body;
  if (nome) db.usuarios[idx].nome = nome.trim();
  const { senhaPlain, ...perfil } = db.usuarios[idx];
  res.json({ mensagem: 'Perfil atualizado', usuario: perfil });
});

module.exports = router;
