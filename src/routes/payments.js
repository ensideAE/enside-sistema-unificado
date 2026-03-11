const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../models/db');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();
router.post('/', authMiddleware, (req, res) => {
  const { valor, descricao, metodo } = req.body;
  if (!valor || !descricao || !metodo) return res.status(400).json({ erro: 'Campos obrigatórios' });
  const pagamento = { id: uuidv4(), usuarioId: req.usuario.id, valor: parseFloat(valor), descricao, metodo, status: 'pendente', criadoEm: new Date().toISOString() };
  db.pagamentos.push(pagamento);
  res.status(201).json({ mensagem: 'Pagamento criado', pagamento });
});
router.get('/', authMiddleware, (req, res) => {
  const pagamentos = db.pagamentos.filter(p => p.usuarioId === req.usuario.id);
  res.json({ total: pagamentos.length, pagamentos });
});
module.exports = router;
