const { v4: uuidv4 } = require('uuid');
const db = {
  usuarios: [{
    id: uuidv4(),
    nome: 'Admin Enside',
    email: 'admin@enside.com.br',
    senha: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    role: 'admin',
    criadoEm: new Date().toISOString()
  }],
  pagamentos: []
};
module.exports = db;
