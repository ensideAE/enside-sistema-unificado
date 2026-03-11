const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const db = require('../models/db');
const { JWT_SECRET } = require('../middleware/auth');
const router = express.Router();
router.post('/registro', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) return res.status(400).json({ erro: 'Campos obrigatórios' });
    if (db.usuarios.find(u => u.email === email)) return res.status(400).json({ erro: 'Email já cadastrado' });
    const senhaCriptografada = await bcrypt.hash(senha, 10);
    const novoUsuario = { id: uuidv4(), nome, email, senha: senhaCriptografada, role: 'usuario', criadoEm: new Date().toISOString() };
    db.usuarios.push(novoUsuario);
    const token = jwt.sign({ id: novoUsuario.id, email, role: novoUsuario.role }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ mensagem: 'Usuário criado', token, usuario: { id: novoUsuario.id, nome, email } });
  } catch (err) { res.status(500).json({ erro: 'Erro interno' }); }
});
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = db.usuarios.find(u => u.email === email);
    if (!usuario) return res.status(401).json({ erro: 'Credenciais inválidas' });
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ erro: 'Credenciais inválidas' });
    const token = jwt.sign({ id: usuario.id, email, role: usuario.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ mensagem: 'Login realizado', token, usuario: { id: usuario.id, nome: usuario.nome, email } });
  } catch (err) { res.status(500).json({ erro: 'Erro interno' }); }
});
module.exports = router;
