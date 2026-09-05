require("dotenv").config();

const { REST, Routes } = require("discord.js");
const { setupCommand } = require("./setupCommand.js");

const rest = new REST({ version: "10" })
    .setToken(process.env.DISCORD_TOKEN);

const clientId = process.env.DISCORD_CLIENT_ID;

const guilds = [
    {
        name: "TEST",
        id: process.env.DISCORD_TEST_GUILD_ID
    },
    {
        name: "PRODUCTION",
        id: process.env.DISCORD_PROD_GUILD_ID
    }
];

// deploy setup lellbot command
async function deploy() {
    for (const guild of guilds) {
        try {
            console.log(`Registering commands in ${guild.name}...`);

            await rest.put(
                Routes.applicationGuildCommands(
                    clientId,
                    guild.id
                ),
                {
                    body: [
                        setupCommand.toJSON()
                    ]
                }
            );

            console.log(`✅ ${guild.name} commands registered!`);
        } catch (error) {
            console.error(`❌ Failed to register ${guild.name}:`);
            console.error(error);
        }
    }
}

deploy();