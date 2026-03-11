const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Enside Admin</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:'Segoe UI',sans-serif;background:#0f172a;color:#e2e8f0;min-height:100vh}
    .sidebar{width:240px;background:#1e293b;border-right:1px solid #334155;position:fixed;height:100vh;display:flex;flex-direction:column}
    .sidebar-logo{padding:24px 20px;border-bottom:1px solid #334155}
    .sidebar-logo h1{font-size:1.1rem;color:#38bdf8;font-weight:700}
    .sidebar-logo span{font-size:0.75rem;color:#64748b}
    .sidebar-nav{padding:16px 0;flex:1}
    .nav-item{display:flex;align-items:center;gap:12px;padding:12px 20px;cursor:pointer;color:#94a3b8;transition:all .2s;font-size:0.9rem;border-left:3px solid transparent}
    .nav-item:hover,.nav-item.active{background:#0f172a;color:#38bdf8;border-left-color:#38bdf8}
    .sidebar-footer{padding:16px 20px;border-top:1px solid #334155}
    .avatar{width:36px;height:36px;background:#38bdf8;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;color:#0f172a}
    .user-info{display:flex;align-items:center;gap:10px}
    .user-name{font-size:0.85rem;color:#cbd5e1}
    .user-role{font-size:0.75rem;color:#64748b}
    .main{margin-left:240px;display:flex;flex-direction:column;min-height:100vh}
    .topbar{background:#1e293b;padding:16px 32px;border-bottom:1px solid #334155;display:flex;align-items:center;justify-content:space-between}
    .topbar h2{font-size:1.1rem;color:#f1f5f9}
    .status-badge{display:flex;align-items:center;gap:6px;background:#064e3b;color:#6ee7b7;padding:6px 14px;border-radius:20px;font-size:0.8rem}
    .dot{width:8px;height:8px;border-radius:50%;background:#6ee7b7;animation:pulse 2s infinite}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
    .content{padding:32px;flex:1}
    .page{display:none}.page.active{display:block}
    .cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;margin-bottom:32px}
    .card{background:#1e293b;border-radius:12px;padding:24px;border:1px solid #334155}
    .card-label{font-size:0.8rem;color:#64748b;text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px}
    .card-value{font-size:2rem;font-weight:700;color:#38bdf8}
    .card-sub{font-size:0.75rem;color:#475569;margin-top:4px}
    .table-wrap{background:#1e293b;border-radius:12px;border:1px solid #334155;overflow:hidden;margin-bottom:24px}
    .table-header{padding:16px 24px;border-bottom:1px solid #334155;display:flex;align-items:center;justify-content:space-between}
    .table-header h3{font-size:0.95rem;color:#cbd5e1}
    table{width:100%;border-collapse:collapse}
    th{padding:12px 24px;text-align:left;font-size:0.75rem;color:#64748b;text-transform:uppercase;border-bottom:1px solid #334155}
    td{padding:14px 24px;font-size:0.85rem;color:#cbd5e1;border-bottom:1px solid #1e293b}
    tr:last-child td{border-bottom:none}
    tr:hover td{background:#0f172a}
    .badge{padding:3px 10px;border-radius:20px;font-size:0.75rem;font-weight:600}
    .badge-admin{background:#1e3a5f;color:#93c5fd}
    .badge-usuario{background:#1e293b;color:#94a3b8;border:1px solid #334155}
    .badge-aprovado{background:#064e3b;color:#6ee7b7}
    .badge-pendente{background:#451a03;color:#fcd34d}
    .badge-recusado,.badge-cancelado{background:#4c0519;color:#fca5a5}
    .badge-ativo{background:#064e3b;color:#6ee7b7}
    .badge-inativo{background:#4c0519;color:#fca5a5}
    .badge-GET{background:#065f46;color:#6ee7b7}
    .badge-POST{background:#1e3a5f;color:#93c5fd}
    .badge-PUT{background:#4c1d95;color:#c4b5fd}
    .login-wrap{display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0f172a}
    .login-box{background:#1e293b;border-radius:16px;padding:40px;width:100%;max-width:400px;border:1px solid #334155}
    .login-box h2{font-size:1.5rem;color:#38bdf8;margin-bottom:8px}
    .login-box p{color:#64748b;font-size:0.9rem;margin-bottom:32px}
    .form-group{margin-bottom:20px}
    .form-group label{display:block;font-size:0.85rem;color:#94a3b8;margin-bottom:8px}
    .form-group input{width:100%;background:#0f172a;border:1px solid #334155;border-radius:8px;padding:12px 16px;color:#e2e8f0;font-size:0.9rem;outline:none;transition:border .2s}
    .form-group input:focus{border-color:#38bdf8}
    .btn{width:100%;background:#38bdf8;color:#0f172a;border:none;border-radius:8px;padding:12px;font-weight:700;font-size:0.95rem;cursor:pointer}
    .btn:hover{background:#7dd3fc}
    .btn-sm{padding:6px 14px;font-size:0.8rem;border-radius:6px;border:none;cursor:pointer;font-weight:600;background:#064e3b;color:#6ee7b7}
    .btn-logout{background:#4c0519;color:#fca5a5;border:none;padding:8px 16px;border-radius:8px;cursor:pointer;font-size:0.8rem;font-weight:600;width:100%;margin-top:12px}
    .error-msg{color:#fca5a5;font-size:0.85rem;margin-top:8px}
    .empty{text-align:center;padding:48px;color:#475569}
    .empty span{font-size:2.5rem;display:block;margin-bottom:12px}
  </style>
</head>
<body>
<div id="loginPage">
  <div class="login-wrap">
    <div class="login-box">
      <h2>⚡ Enside Admin</h2>
      <p>Faça login para acessar o painel</p>
      <div class="form-group"><label>Email</label><input type="email" id="loginEmail" value="admin@enside.com.br"></div>
      <div class="form-group"><label>Senha</label><input type="password" id="loginSenha" value="password"></div>
      <div class="error-msg" id="loginError" style="display:none"></div>
      <button class="btn" onclick="fazerLogin()">Entrar</button>
    </div>
  </div>
</div>
<div id="painelPage" style="display:none">
  <div class="sidebar">
    <div class="sidebar-logo"><h1>⚡ Enside</h1><span>Sistema Unificado</span></div>
    <nav class="sidebar-nav">
      <div class="nav-item active" onclick="irPara('dashboard',this)">📊 Dashboard</div>
      <div class="nav-item" onclick="irPara('usuarios',this)">👥 Usuários</div>
      <div class="nav-item" onclick="irPara('pagamentos',this)">💳 Pagamentos</div>
      <div class="nav-item" onclick="window.open('/api/docs','_blank')">📄 API Docs</div>
    </nav>
    <div class="sidebar-footer">
      <div class="user-info">
        <div class="avatar" id="avatarInitial">A</div>
        <div><div class="user-name" id="sidebarNome">Admin</div><div class="user-role">Administrador</div></div>
      </div>
      <button class="btn-logout" onclick="logout()">Sair</button>
    </div>
  </div>
  <div class="main">
    <div class="topbar"><h2 id="topbarTitle">Dashboard</h2><div class="status-badge"><div class="dot"></div> Online</div></div>
    <div class="content">
      <div class="page active" id="page-dashboard">
        <div class="cards">
          <div class="card"><div class="card-label">Usuários</div><div class="card-value" id="statUsuarios">--</div><div class="card-sub">cadastrados</div></div>
          <div class="card"><div class="card-label">Pagamentos</div><div class="card-value" id="statPagamentos">--</div><div class="card-sub">total</div></div>
          <div class="card"><div class="card-label">Aprovados</div><div class="card-value" id="statAprovados">--</div><div class="card-sub">pagamentos</div></div>
          <div class="card"><div class="card-label">Receita</div><div class="card-value" id="statReceita">--</div><div class="card-sub">aprovada</div></div>
        </div>
        <div class="table-wrap">
          <div class="table-header"><h3>🔗 Endpoints da API</h3></div>
          <table><thead><tr><th>Método</th><th>Rota</th><th>Descrição</th><th>Auth</th></tr></thead>
          <tbody>
            <tr><td><span class="badge badge-GET">GET</span></td><td>/api/health</td><td>Status do sistema</td><td>—</td></tr>
            <tr><td><span class="badge badge-POST">POST</span></td><td>/api/auth/login</td><td>Login / Token JWT</td><td>—</td></tr>
            <tr><td><span class="badge badge-POST">POST</span></td><td>/api/auth/registro</td><td>Registrar usuário</td><td>—</td></tr>
            <tr><td><span class="badge badge-GET">GET</span></td><td>/api/users</td><td>Listar usuários</td><td>🔒 Admin</td></tr>
            <tr><td><span class="badge badge-GET">GET</span></td><td>/api/users/perfil</td><td>Meu perfil</td><td>🔒</td></tr>
            <tr><td><span class="badge badge-PUT">PUT</span></td><td>/api/users/perfil</td><td>Atualizar perfil</td><td>🔒</td></tr>
            <tr><td><span class="badge badge-POST">POST</span></td><td>/api/payments</td><td>Criar pagamento</td><td>🔒</td></tr>
            <tr><td><span class="badge badge-GET">GET</span></td><td>/api/payments</td><td>Listar pagamentos</td><td>🔒</td></tr>
            <tr><td><span class="badge badge-GET">GET</span></td><td>/api/dashboard</td><td>Estatísticas</td><td>🔒</td></tr>
          </tbody></table>
        </div>
      </div>
      <div class="page" id="page-usuarios">
        <div class="table-wrap">
          <div class="table-header"><h3>👥 Usuários</h3><button class="btn-sm" onclick="carregarUsuarios()">↻ Atualizar</button></div>
          <table><thead><tr><th>Nome</th><th>Email</th><th>Role</th><th>Status</th><th>Criado em</th></tr></thead>
          <tbody id="tabelaUsuarios"><tr><td colspan="5"><div class="empty"><span>⏳</span>Carregando...</div></td></tr></tbody></table>
        </div>
      </div>
      <div class="page" id="page-pagamentos">
        <div class="table-wrap">
          <div class="table-header"><h3>💳 Pagamentos</h3><button class="btn-sm" onclick="carregarPagamentos()">↻ Atualizar</button></div>
          <table><thead><tr><th>ID</th><th>Valor</th><th>Descrição</th><th>Método</th><th>Status</th><th>Data</th></tr></thead>
          <tbody id="tabelaPagamentos"><tr><td colspan="6"><div class="empty"><span>💳</span>Nenhum pagamento</div></td></tr></tbody></table>
        </div>
      </div>
    </div>
  </div>
</div>
<script>
const API='';let TOKEN=localStorage.getItem('enside_token')||'';let USUARIO=JSON.parse(localStorage.getItem('enside_user')||'{}');
window.onload=()=>{if(TOKEN)mostrarPainel()};
async function fazerLogin(){
  const email=document.getElementById('loginEmail').value,senha=document.getElementById('loginSenha').value;
  document.getElementById('loginError').style.display='none';
  try{
    const res=await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,senha})});
    const data=await res.json();
    if(!res.ok)throw new Error(data.erro||'Erro ao fazer login');
    TOKEN=data.token;USUARIO=data.usuario;
    localStorage.setItem('enside_token',TOKEN);localStorage.setItem('enside_user',JSON.stringify(USUARIO));
    mostrarPainel();
  }catch(e){const el=document.getElementById('loginError');el.textContent=e.message;el.style.display='block';}
}
function mostrarPainel(){
  document.getElementById('loginPage').style.display='none';
  document.getElementById('painelPage').style.display='flex';
  document.getElementById('sidebarNome').textContent=USUARIO.nome||'Admin';
  document.getElementById('avatarInitial').textContent=(USUARIO.nome||'A')[0].toUpperCase();
  carregarDashboard();
}
function logout(){localStorage.clear();TOKEN='';document.getElementById('painelPage').style.display='none';document.getElementById('loginPage').style.display='block';}
function irPara(p,el){
  document.querySelectorAll('.nav-item').forEach(i=>i.classList.remove('active'));
  document.querySelectorAll('.page').forEach(pg=>pg.classList.remove('active'));
  el.classList.add('active');document.getElementById('page-'+p).classList.add('active');
  document.getElementById('topbarTitle').textContent=el.textContent.trim();
  if(p==='dashboard')carregarDashboard();if(p==='usuarios')carregarUsuarios();if(p==='pagamentos')carregarPagamentos();
}
async function apiFetch(path){const res=await fetch(path,{headers:{'Authorization':'Bearer '+TOKEN}});return res.json();}
async function carregarDashboard(){
  try{const d=await apiFetch('/api/dashboard');
    document.getElementById('statUsuarios').textContent=d.totalUsuarios??'--';
    document.getElementById('statPagamentos').textContent=d.totalPagamentos??'--';
    document.getElementById('statAprovados').textContent=d.pagamentosAprovados??'--';
    document.getElementById('statReceita').textContent=d.totalReceita?'R\$ '+parseFloat(d.totalReceita).toFixed(2):'R\$ 0,00';
  }catch(e){console.error(e);}
}
async function carregarUsuarios(){
  const tb=document.getElementById('tabelaUsuarios');
  try{const d=await apiFetch('/api/users');
    if(!d.usuarios?.length){tb.innerHTML='<tr><td colspan="5"><div class="empty"><span>👥</span>Nenhum usuário</div></td></tr>';return;}
    tb.innerHTML=d.usuarios.map(u=>\`<tr><td>\${u.nome}</td><td>\${u.email}</td><td><span class="badge badge-\${u.role}">\${u.role}</span></td><td><span class="badge badge-\${u.ativo?'ativo':'inativo'}">\${u.ativo?'Ativo':'Inativo'}</span></td><td>\${new Date(u.criadoEm).toLocaleDateString('pt-BR')}</td></tr>\`).join('');
  }catch(e){tb.innerHTML='<tr><td colspan="5"><div class="empty"><span>❌</span>Erro</div></td></tr>';}
}
async function carregarPagamentos(){
  const tb=document.getElementById('tabelaPagamentos');
  try{const d=await apiFetch('/api/payments');
    if(!d.pagamentos?.length){tb.innerHTML='<tr><td colspan="6"><div class="empty"><span>💳</span>Nenhum pagamento</div></td></tr>';return;}
    tb.innerHTML=d.pagamentos.map(p=>\`<tr><td style="font-family:monospace;font-size:0.75rem">\${p.id.substring(0,8)}...</td><td>R\$ \${parseFloat(p.valor).toFixed(2)}</td><td>\${p.descricao}</td><td>\${p.metodo}</td><td><span class="badge badge-\${p.status}">\${p.status}</span></td><td>\${new Date(p.criadoEm).toLocaleDateString('pt-BR')}</td></tr>\`).join('');
  }catch(e){tb.innerHTML='<tr><td colspan="6"><div class="empty"><span>❌</span>Erro</div></td></tr>';}
}
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&document.getElementById('loginPage').style.display!=='none')fazerLogin();});
</script>
</body>
</html>`);
});
module.exports = router;
