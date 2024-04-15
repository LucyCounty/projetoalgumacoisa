import {config} from "dotenv";
import TelegramBot = require('node-telegram-bot-api')

const bot = new TelegramBot(process.env.TOKEN, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;

  if(match) {
    const resp = match[1];
    bot.sendMessage(chatId, resp);
  }
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});