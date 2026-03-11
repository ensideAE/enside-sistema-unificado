const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
  res.send(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Enside API Docs</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui.min.css"></head>
  <body><div id="swagger-ui"></div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-bundle.min.js"></script>
  <script>SwaggerUIBundle({spec:{openapi:"3.0.0",info:{title:"Enside Sistema Unificado API",version:"1.0.0"},
  servers:[{url:"https://enside-sistema-unificado.vercel.app"}],
  components:{securitySchemes:{bearerAuth:{type:"http",scheme:"bearer",bearerFormat:"JWT"}}},
  paths:{"/api/health":{get:{tags:["Sistema"],summary:"Health check",responses:{"200":{description:"OK"}}}},
  "/api/auth/login":{post:{tags:["Auth"],summary:"Login",requestBody:{content:{"application/json":{schema:{type:"object",properties:{email:{type:"string",example:"admin@enside.com.br"},senha:{type:"string",example:"password"}}}}}},responses:{"200":{description:"Token JWT"}}}},
  "/api/auth/registro":{post:{tags:["Auth"],summary:"Registro",requestBody:{content:{"application/json":{schema:{type:"object",properties:{nome:{type:"string"},email:{type:"string"},senha:{type:"string"}}}}}},responses:{"201":{description:"Criado"}}}},
  "/api/users":{get:{tags:["Usuários"],summary:"Listar usuários (admin)",security:[{bearerAuth:[]}],responses:{"200":{description:"OK"}}}},
  "/api/users/perfil":{get:{tags:["Usuários"],summary:"Meu perfil",security:[{bearerAuth:[]}],responses:{"200":{description:"OK"}}},put:{tags:["Usuários"],summary:"Atualizar perfil",security:[{bearerAuth:[]}],requestBody:{content:{"application/json":{schema:{type:"object",properties:{nome:{type:"string"}}}}}},responses:{"200":{description:"OK"}}}},
  "/api/payments":{post:{tags:["Pagamentos"],summary:"Criar pagamento",security:[{bearerAuth:[]}],requestBody:{content:{"application/json":{schema:{type:"object",properties:{valor:{type:"number",example:99.90},descricao:{type:"string"},metodo:{type:"string",enum:["pix","cartao","boleto"]}}}}}},responses:{"201":{description:"Criado"}}},get:{tags:["Pagamentos"],summary:"Listar pagamentos",security:[{bearerAuth:[]}],responses:{"200":{description:"OK"}}}},
  "/api/dashboard":{get:{tags:["Dashboard"],summary:"Estatísticas",security:[{bearerAuth:[]}],responses:{"200":{description:"OK"}}}}}},
  dom_id:"#swagger-ui",deepLinking:true,presets:[SwaggerUIBundle.presets.apis]});</script></body></html>`);
});
module.exports = router;
