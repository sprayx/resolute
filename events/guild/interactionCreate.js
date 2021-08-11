module.exports = async (interaction, client) => {

    if(!interaction.isCommand()) return;

    await interaction.deferReply();

    if(!interaction.guildId || !interaction.channelID) return interaction.editReply(`Os comandos ainda não podem ser usados na minha DM.`);

    if(!interaction.client.guilds.cache.get(interaction.guildId)) return interaction.editReply(`Eu não fui adicionado corretamente ao servidor.`);
 
    const prefix = client.settings.get(message.guild.id, "prefix");

    if (prefix === null) prefix = config.prefix;

    interaction.author = interaction.user;

    interaction.content = `${prefix}${interaction.commandName} ${
        interaction.options._hoistedOptions.length > 0 
        ? interaction.options._hoistedOptions.map((x) => x.value)
        : ""
    }`;

    interaction.slash = true;

    let response = false;
    
}