const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const senhaAdmin = bcrypt.hashSync('password', 10);
const db = {
  usuarios: [{
    id: uuidv4(),
    nome: 'Admin Enside',
    email: 'admin@enside.com.br',
    senha: senhaAdmin,
    role: 'admin',
    ativo: true,
    criadoEm: new Date().toISOString()
  }],
  pagamentos: [],
  transacoes: []
};
module.exports = db;
