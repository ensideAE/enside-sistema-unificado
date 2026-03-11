const axios = require('axios');

const SHEETS_WEBHOOK = process.env.SHEETS_WEBHOOK_URL || null;
const EVOLUTION_URL  = process.env.EVOLUTION_API_URL  || null;
const EVOLUTION_KEY  = process.env.EVOLUTION_API_KEY  || null;
const EVOLUTION_INST = process.env.EVOLUTION_INSTANCE || 'default';

async function appendToSheets(dados) {
  if (!SHEETS_WEBHOOK) { console.log('[Sheets] não configurada'); return { ok: false }; }
  try {
    await axios.post(SHEETS_WEBHOOK, dados, { timeout: 5000 });
    return { ok: true };
  } catch (err) { console.error('[Sheets]', err.message); return { ok: false, motivo: err.message }; }
}

async function enviarWhatsApp(numero, mensagem) {
  if (!EVOLUTION_URL || !EVOLUTION_KEY) { console.log('[Evolution] não configurada'); return { ok: false }; }
  try {
    const res = await axios.post(
      `${EVOLUTION_URL}/message/sendText/${EVOLUTION_INST}`,
      { number: numero, textMessage: { text: mensagem } },
      { headers: { apikey: EVOLUTION_KEY }, timeout: 8000 }
    );
    return { ok: true, data: res.data };
  } catch (err) { console.error('[Evolution]', err.message); return { ok: false, motivo: err.message }; }
}

async function onNovoPagamento(pagamento, usuario) {
  await appendToSheets({ evento: 'novo_pagamento', ...pagamento, nomeUsuario: usuario.nome, emailUsuario: usuario.email });
  if (usuario.telefone) await enviarWhatsApp(usuario.telefone, `✅ *Enside* — Pagamento recebido!\nValor: R$ ${pagamento.valor.toFixed(2)}\nMétodo: ${pagamento.metodo}`);
}

async function onNovoUsuario(usuario) {
  await appendToSheets({ evento: 'novo_usuario', id: usuario.id, nome: usuario.nome, email: usuario.email, criadoEm: usuario.criadoEm });
}

async function onStatusPagamento(pagamento, usuario) {
  await appendToSheets({ evento: 'status_pagamento', id: pagamento.id, novoStatus: pagamento.status });
  if (usuario && usuario.telefone) {
    const emoji = pagamento.status === 'aprovado' ? '✅' : '❌';
    await enviarWhatsApp(usuario.telefone, `${emoji} *Enside* — Pagamento ${pagamento.status}!\nValor: R$ ${pagamento.valor.toFixed(2)}`);
  }
}

module.exports = { appendToSheets, enviarWhatsApp, onNovoPagamento, onNovoUsuario, onStatusPagamento };
