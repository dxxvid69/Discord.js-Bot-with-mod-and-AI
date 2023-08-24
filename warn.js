const warnings = {};

client.on('message', async message => {
  if (message.author.bot) return;
  if (message.content.startsWith('!warn')) {
    if (!message.member.hasPermission('KICK_MEMBERS')) {
      message.reply('You dont have permission to use this command.');
      return;
    }
    
    const user = message.mentions.users.first();
    if (user) {
      if (!warnings[user.id]) {
        warnings[user.id] = 1;
      } else {
        warnings[user.id]++;
      }
      message.reply(`${user.tag} has been warned. Total warnings: ${warnings[user.id]}`);
    } else {
      message.reply("You didnt mention the user to warn");
    }
  }
});
