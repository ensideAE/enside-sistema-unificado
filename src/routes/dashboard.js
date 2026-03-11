const express = require('express');
const db = require('../models/db');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();
router.get('/', authMiddleware, (req, res) => {
  const aprovados = db.pagamentos.filter(p => p.status === 'aprovado');
  res.json({
    totalUsuarios: db.usuarios.length,
    totalPagamentos: db.pagamentos.length,
    pagamentosAprovados: aprovados.length,
    totalReceita: aprovados.reduce((acc, p) => acc + p.valor, 0).toFixed(2)
  });
});
module.exports = router;
