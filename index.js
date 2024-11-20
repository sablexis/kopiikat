// Require the necessary discord.js classes
const { Client, GatewayIntentBits, Events } = require('discord.js');
// require("dotenv").config;
const dotenv = require('dotenv');

dotenv.config();

// token
const discord_token = process.env.DISCORD_TOKEN;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

// Log in to Discord with your client's token
client.login(discord_token);
