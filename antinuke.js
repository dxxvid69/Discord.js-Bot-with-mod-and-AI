const { Client } = require('discord.js');
const client = new Client();

// Configurations
const banThreshold = 10; // Number of banned users in a short time to trigger anti-nuke
const banTime = 7; // Ban time in days for anti-nuke
const cooldown = 300000; // Cooldown period in milliseconds (5 minutes)
const maxBanAttempts = 5; // Maximum ban attempts before triggering anti-nuke

const recentlyBanned = new Set();
const userBanAttempts = {};

client.on('guildBanAdd', (guild, user) => {
  if (recentlyBanned.has(user.id)) {
    // Detected anti-nuke, more than `banThreshold` bans in a short time
    // Take action against the user initiating the nuke (e.g., ban the nuker).
    // Clear the recentlyBanned set and reset the ban attempts.
    recentlyBanned.clear();
    userBanAttempts = {};
  } else {
    // Add the user to the recentlyBanned set
    recentlyBanned.add(user.id);

    // Clear the user from the set after a delay
    setTimeout(() => {
      recentlyBanned.delete(user.id);
    }, banTime * 24 * 60 * 60 * 1000); // Convert banTime to milliseconds

    // Increment the user's ban attempts
    if (!userBanAttempts[user.id]) {
      userBanAttempts[user.id] = 1;
    } else {
      userBanAttempts[user.id]++;
    }

    // Check if the user has exceeded the maxBanAttempts threshold
    if (userBanAttempts[user.id] >= maxBanAttempts) {
      // Trigger anti-nuke measures (e.g., mute, kick, etc.)
      // You can implement your own action here.
      // Reset the user's ban attempts.
      userBanAttempts[user.id] = 0;
    }

    // Reset the user's ban attempts after a cooldown period
    setTimeout(() => {
      userBanAttempts[user.id] = 0;
    }, cooldown);
  }
});

client.login('YOUR_BOT_TOKEN');
