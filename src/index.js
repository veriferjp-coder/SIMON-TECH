require('dotenv').config();
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const fs = require('fs');
const path = require('path');

// Initialize Express server for hosting platforms
const app = express();
const PORT = process.env.PORT || 3000;

// Serve basic health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    status: '✅ SIMON TECH BOT is running!',
    uptime: process.uptime(),
    timestamp: new Date()
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', bot: 'SIMON TECH' });
});

// Start Express server
app.listen(PORT, () => {
  console.log(`🌐 HTTP Server running on port ${PORT}`);
});

// Initialize WhatsApp client
const client = new Client({
  authStrategy: new LocalAuth({
    clientId: process.env.WHATSAPP_SESSION_NAME || 'SIMON_TECH_SESSION'
  })
});

// Store for command handlers
const commands = {};

// Load all command files
const loadCommands = () => {
  const commandsPath = path.join(__dirname, 'commands');
  if (!fs.existsSync(commandsPath)) {
    console.log('⚠️ Commands directory not found');
    return;
  }

  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  
  for (const file of commandFiles) {
    try {
      const command = require(path.join(commandsPath, file));
      if (command.name) {
        commands[command.name] = command;
        console.log(`✅ Loaded command: ${command.name}`);
      }
    } catch (error) {
      console.error(`❌ Error loading command ${file}:`, error.message);
    }
  }
};

// Load commands on startup
loadCommands();

// Event: QR Code generation
client.on('qr', (qr) => {
  console.log('\n╔════════════════════╗');
  console.log('║   ☠️ SIMON TECH ☠️  ║');
  console.log('╚════════════════════╝\n');
  console.log('📱 Scan this QR code with WhatsApp on your phone:\n');
  qrcode.generate(qr, { small: true });
  console.log('\n⏳ Waiting for authentication...\n');
});

// Event: Client ready
client.on('ready', () => {
  console.log('\n✅ SIMON TECH BOT is online and ready!');
  console.log(`🤖 Bot Name: ${process.env.BOT_NAME || 'SIMON TECH'}`);
  console.log(`👑 Owner: SIMON TECH | +2349166265317`);
  console.log(`⚡ Loaded Commands: ${Object.keys(commands).length}`);
  console.log(`🌐 HTTP Server: http://localhost:${PORT}\n`);
});

// Event: Incoming message
client.on('message', async (message) => {
  try {
    const prefix = '.';
    const content = message.body;

    // Log incoming messages
    console.log(`📩 [${new Date().toLocaleTimeString()}] ${message.from}: ${content}`);

    // Check if message starts with prefix
    if (!content.startsWith(prefix)) return;

    // Extract command and arguments
    const args = content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Check if command exists
    if (!commands[commandName]) {
      // If command not found, send help
      if (commands['help']) {
        await commands['help'].execute(client, message, args);
      }
      return;
    }

    // Execute command
    try {
      await commands[commandName].execute(client, message, args);
      console.log(`✅ Executed command: ${commandName}`);
    } catch (error) {
      console.error(`❌ Error executing command ${commandName}:`, error);
      await message.reply(`❌ Error executing command: ${error.message}`);
    }
  } catch (error) {
    console.error('❌ Error processing message:', error);
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
  try {
    await client.destroy();
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
});

console.log('🚀 SIMON TECH BOT is starting up...');
console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`☠️ Powered By SIMON TECH\n`);
