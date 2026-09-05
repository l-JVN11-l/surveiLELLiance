// lell secrets
require("dotenv").config();

// packages
const { Client, GatewayIntentBits, Events } = require("discord.js");
const { executeSetup } = require("./setupCommand")

// lellbot token
const BOT_TOKEN = process.env.DISCORD_TOKEN;

// actual lell discord bot
const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages ] });

client.once(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user?.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "setup") {
        await executeSetup(interaction);
    }
});

// login as fake mr. lell
client.login(BOT_TOKEN);

