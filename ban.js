client.on('message', async message => {
  if (message.author.bot) return;
  if (message.content.startsWith('!ban')) {
    if (!message.member.hasPermission('BAN_MEMBERS')) {
      message.reply('You dont have permission to use this command.');
      return;
    }
    
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member.ban({ reason: 'Optional reason for ban' }).then(() => {
          message.reply(`Successfully banned ${user.tag}`);
        }).catch(err => {
          message.reply('Unable to ban the member');
        });
      } else {
        message.reply("That user isnt in this guild");
      }
    } else {
      message.reply("You didnt mention the user to ban");
    }
  }
});
