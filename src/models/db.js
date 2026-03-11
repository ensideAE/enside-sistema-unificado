const { v4: uuidv4 } = require('uuid');

const db = {
  usuarios: [
    {
      id: '1',
      nome: 'Admin Enside',
      email: 'admin@enside.com.br',
      senhaPlain: 'password',
      role: 'admin',
      ativo: true,
      criadoEm: new Date().toISOString()
    }
  ],
  pagamentos: [],
  transacoes: []
};

module.exports = db;
