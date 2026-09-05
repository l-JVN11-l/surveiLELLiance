const { SlashCommandBuilder } = require("discord.js");
const { startAnnouncementChecker } = require("./canvas");

// discord slash command
const setupCommand = new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Set up Canvas announcements")
    .addChannelOption(option =>
        option
            .setName("channel")
            .setDescription("Channel where Canvas announcements should be sent")
            .setRequired(true)
    );

async function executeSetup(interaction) {
    const channel = interaction.options.getChannel("channel", true);

    if (!channel.isTextBased()) {
        await interaction.reply({
            content: "❌ Please select a text-based channel.",
            ephemeral: true
        });
        return;
    }

    // start checking announcements
    startAnnouncementChecker(channel);

    const environment =
        interaction.guildId === process.env.DISCORD_TEST_GUILD_ID
            ? "TEST"
            : interaction.guildId === process.env.DISCORD_PROD_GUILD_ID
                ? "PRODUCTION"
                : "UNKNOWN";

    await interaction.reply({
        content: `✅ Canvas announcements will be sent to <#${channel.id}>.\nEnvironment: **${environment}**`,
        ephemeral: true
    });
}

module.exports = {
    setupCommand,
    executeSetup
};