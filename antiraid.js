const { Client } = require('discord.js');
const client = new Client();

// Configurations
const raidThreshold = 5; // Number of messages in a short time to trigger anti-raid
const banThreshold = 10; // Number of banned users in a short time to trigger anti-nuke
const banTime = 7; // Ban time in days for anti-nuke
const cooldown = 5000; // Cooldown period in milliseconds

const recentlyBanned = new Set();
const messageCounts = {};

client.on('message', message => {
  if (message.author.bot) return;

  // Increment message count for the user
  if (!messageCounts[message.author.id]) {
    messageCounts[message.author.id] = 1;
  } else {
    messageCounts[message.author.id]++;
  }

  // Detect anti-raid
  if (messageCounts[message.author.id] >= raidThreshold) {
    // Take action against raiders (e.g., mute, kick, etc.)
    // You can implement your own action here.
    // Reset the message count after taking action.
    messageCounts[message.author.id] = 0;
  }

  // Remove the message count after a cooldown period
  setTimeout(() => {
    messageCounts[message.author.id] = Math.max(0, messageCounts[message.author.id] - 1);
  }, cooldown);
});

client.on('guildBanAdd', (guild, user) => {
  if (recentlyBanned.has(user.id)) {
    // Detected anti-nuke, more than `banThreshold` bans in a short time
    // Take action against the user initiating the nuke (e.g., ban the nuker).
    // Clear the recentlyBanned set.
    recentlyBanned.clear();
  } else {
    // Add the user to the recentlyBanned set
    recentlyBanned.add(user.id);

    // Clear the user from the set after a delay
    setTimeout(() => {
      recentlyBanned.delete(user.id);
    }, banTime * 24 * 60 * 60 * 1000); // Convert banTime to milliseconds
  }
});

client.login('YOUR_BOT_TOKEN');
