const { v4: uuidv4 } = require('uuid');

const db = {
  usuarios: [
    {
      id: '1',
      nome: 'Admin Enside',
      email: 'admin@enside.com.br',
      senha: '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
      role: 'admin',
      ativo: true,
      criadoEm: new Date().toISOString()
    }
  ],
  pagamentos: [],
  transacoes: []
};

module.exports = db;
