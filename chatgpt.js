// chatgpt
const { Client } = require('discord.js');
const client = new Client();

client.on('message', async message => {
  if (message.author.bot) return;
  if (message.content.startsWith('!chatgpt')) {
    const content = message.content.replace('!chatgpt', '');
    // Use the 'content' to generate a response using GPT-3 or another AI model.
    // Send the response back to the channel.
    message.channel.send(response);
  }
});

client.login('YOUR_BOT_TOKEN');
