require('dotenv').config();
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');

// Initialize WhatsApp client
const client = new Client({
  authStrategy: new LocalAuth({
    clientId: process.env.WHATSAPP_SESSION_NAME || 'SIMON_TECH_SESSION'
  })
});

// Event: QR Code generation
client.on('qr', (qr) => {
  console.log('\n╔════════════════════╗');
  console.log('║   🤖 SIMON TECH    ║');
  console.log('╚════════════════════╝\n');
  console.log('📱 Scan this QR code with WhatsApp on your phone:\n');
  qrcode.generate(qr, { small: true });
  console.log('\n⏳ Waiting for authentication...\n');
});

// Event: Client ready
client.on('ready', () => {
  console.log('✅ SIMON TECH is online and ready!');
  console.log(`🤖 Bot Name: ${process.env.BOT_NAME || 'SIMON TECH'}`);
  console.log(`⚡ Port: ${process.env.PORT || 3000}\n`);
});

// Event: Incoming message
client.on('message', async (message) => {
  console.log(`📩 Message from ${message.from}: ${message.body}`);
  
  // Simple echo response for testing
  if (message.body === '/ping') {
    await message.reply('🏓 Pong! SIMON TECH is alive!');
  }
  
  if (message.body === '/help') {
    const helpText = `
╔════════════════════╗
║   🤖 SIMON TECH    ║
╚════════════════════╝

Available Commands:
/ping - Test bot connectivity
/help - Show this message
/status - Check bot status

📩 Send a command to get started.
    `;
    await message.reply(helpText);
  }
  
  if (message.body === '/status') {
    await message.reply(`✅ SIMON TECH is operational and ready to assist!`);
  }
});

// Event: Authenticated
client.on('authenticated', () => {
  console.log('🔐 WhatsApp session authenticated!\n');
});

// Event: Authentication failure
client.on('auth_failure', (msg) => {
  console.error('❌ Authentication failed:', msg);
});

// Event: Disconnected
client.on('disconnected', (reason) => {
  console.log('⚠️ Client disconnected:', reason);
});

// Initialize client
client.initialize();

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n👋 Shutting down SIMON TECH gracefully...');
  await client.destroy();
  process.exit(0);
});

console.log('🚀 SIMON TECH is starting up...');
console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}\n`);
