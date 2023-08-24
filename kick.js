client.on('message', async message => {
  if (message.author.bot) return;
  if (message.content.startsWith('!kick')) {
    if (!message.member.hasPermission('KICK_MEMBERS')) {
      message.reply('You dont have permission to use this command.');
      return;
    }
    
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member.kick('Optional reason for kick').then(() => {
          message.reply(`Successfully kicked ${user.tag}`);
        }).catch(err => {
          message.reply('Unable to kick the member');
        });
      } else {
        message.reply("That user isnt in this guild");
      }
    } else {
      message.reply("You didnt mention the user to kick");
    }
  }
});
