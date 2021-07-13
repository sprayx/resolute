const Discord = require("discord.js")

module.exports = {
    name: "mcplayer",
    description: "Pegar uma imagem de um player do minecraft.",
    aliases: ['player'],
    cooldown: 1000 * 2,
    category: "minecraft",
    usage: "<nickname>",
    example: "TheSpr4y",
    args: true,

    run: async (client, message, args) => {

        if (!args[0]) return;

        let embed = new Discord.MessageEmbed()
            .setTitle(`Skin de: ${args[0]}`)
            .setImage(`https://mc-heads.net/player/${args[0]}`)
            .setColor("RANDOM")
            .setTimestamp()

        await message.channel.send(embed)

    }
}