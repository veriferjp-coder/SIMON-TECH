╔════════════════════╗
║   🤖 SIMON TECH    ║
╚════════════════════╝

> Your intelligent WhatsApp assistant powered by Node.js ⚡

## 📋 About

**SIMON TECH** is a powerful WhatsApp bot assistant built with Node.js that helps automate messages, handle commands, and provide intelligent responses on WhatsApp.

## 🚀 Features

- ✅ WhatsApp message automation
- ✅ Command-based system
- ✅ Real-time message handling
- ✅ Extensible architecture with handlers and utilities
- ✅ Environment-based configuration
- ✅ Easy to customize and deploy

## 📦 Prerequisites

- **Node.js** v16 or higher
- **npm** or **yarn**
- Active WhatsApp account

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/veriferjp-coder/SIMON-TECH.git
cd SIMON-TECH
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
```bash
cp .env.example .env
```

Edit `.env` and update the configuration:
```env
BOT_NAME=SIMON TECH
PORT=3000
NODE_ENV=development
```

### 4. Start the bot
```bash
npm start
```

**For development with auto-reload:**
```bash
npm run dev
```

## 📁 Project Structure

```
SIMON-TECH/
├── src/
│   ├── index.js           # Main entry point
│   ├── commands/          # Bot commands
│   ├── handlers/          # Message handlers
│   └── utils/             # Utility functions
├── .env.example           # Environment template
├── .gitignore             # Git ignore rules
├── package.json           # Project dependencies
└── README.md              # This file
```

## 💻 Usage

### Starting the Bot

1. Run the bot:
```bash
npm start
```

2. Scan the QR code with WhatsApp on your phone
3. Once authenticated, the bot will be online!

### Available Commands

Send commands to the bot via WhatsApp:
- `/help` - Show available commands
- `/status` - Check bot status
- `/ping` - Test bot connectivity

## ���� Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

| Variable | Description | Default |
|----------|-------------|---------|
| `BOT_NAME` | Name of your bot | SIMON TECH |
| `PORT` | Server port | 3000 |
| `NODE_ENV` | Environment (development/production) | development |
| `WHATSAPP_SESSION_NAME` | WhatsApp session identifier | SIMON_TECH_SESSION |

## 📚 API Reference

### Command Handler
```javascript
// src/commands/example.js
module.exports = {
  name: 'example',
  description: 'Example command',
  execute: async (message, args) => {
    await message.reply('Hello from SIMON TECH!');
  }
};
```

### Message Handler
```javascript
// src/handlers/example.js
module.exports = async (client, message) => {
  console.log('New message:', message.body);
};
```

## 🚀 Deployment

### Deploy to Heroku
```bash
heroku login
heroku create your-app-name
git push heroku main
```

### Deploy to Railway
```bash
railway link
railway up
```

## 📝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Support

For issues, questions, or suggestions, please open an [Issue](https://github.com/veriferjp-coder/SIMON-TECH/issues).

## ⚡ Powered by SIMON TECH

---

**Made with ❤️ by veriferjp-coder**
