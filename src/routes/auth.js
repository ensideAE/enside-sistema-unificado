const express = require('express');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const db = require('../models/db');
const { JWT_SECRET } = require('../middleware/auth');
const router = express.Router();
const validarEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).json({ erro: 'Email e senha obrigatórios' });
    const usuario = db.usuarios.find(u => u.email === email.toLowerCase().trim());
    if (!usuario || !usuario.ativo) return res.status(401).json({ erro: 'Credenciais inválidas' });
    if (usuario.senhaPlain !== senha) return res.status(401).json({ erro: 'Credenciais inválidas' });
    const token = jwt.sign({ id: usuario.id, email: usuario.email, role: usuario.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ mensagem: 'Login realizado', token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, role: usuario.role } });
  } catch (err) { console.error(err); res.status(500).json({ erro: 'Erro interno', msg: err.message }); }
});
router.post('/registro', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) return res.status(400).json({ erro: 'Campos obrigatórios' });
    if (!validarEmail(email)) return res.status(400).json({ erro: 'Email inválido' });
    if (senha.length < 6) return res.status(400).json({ erro: 'Senha mínimo 6 caracteres' });
    if (db.usuarios.find(u => u.email === email.toLowerCase())) return res.status(400).json({ erro: 'Email já cadastrado' });
    const novoUsuario = { id: uuidv4(), nome: nome.trim(), email: email.toLowerCase().trim(), senhaPlain: senha, role: 'usuario', ativo: true, criadoEm: new Date().toISOString() };
    db.usuarios.push(novoUsuario);
    const token = jwt.sign({ id: novoUsuario.id, email: novoUsuario.email, role: novoUsuario.role }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ mensagem: 'Usuário criado', token, usuario: { id: novoUsuario.id, nome: novoUsuario.nome, email: novoUsuario.email } });
  } catch (err) { res.status(500).json({ erro: 'Erro interno' }); }
});
module.exports = router;
