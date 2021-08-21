const { MessageEmbed } = require(`discord.js`);
const config = require(`../../config/config.json`);
const { KSoftClient } = require(`@ksoft/api`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);
const lyricsFinder = require(`lyrics-finder`);
const {
    format,
    delay,
    swap_pages
} = require(`../../handlers/functions`);

module.exports = {
    name: `lyrics`,
    category: `🎶 Music`,
    aliases: [`songlyrics`, `ly`, `tracklyrics`],
    description: `Mostrar a letra da música atual`,
    usage: `[Titulo da música]`,
    example: "",
    permissoes: [],
    cooldown: 8,
    args: false,
    parameters: {
        "type": "music",
        "activeplayer": true,
        "previoussong": false
    },

    run: async (client, message, args, cmduser, text, prefix, player) => {
        
        try {

            let title = player.queue.current.title;
            let author = player.queue.current.author;

            if (args[0]) {

                title = args.join(` `);
                message.channel.send(new MessageEmbed()
                    .setColor(ee.color)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`Procurando letra para: ${emoji.msg.search} \`${title}\``.substr(0, 256))
                )
            }

            let lyrics = null;

            if (config.lyricssettings.lyrics_finder) {

                if (config.lyricssettings.ksoft_api.use_this_instead) {

                    const ksoft = new KSoftClient(config.lyricssettings.ksoft_api.api_key);

                    await ksoft.lyrics.get(title).then(async (track) => {

                        if (!track.lyrics)
                            return message.channel.send(new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setFooter(ee.footertext, ee.footericon)
                                .setTitle(`${emoji.msg.ERROR} Erro | Não achei nenhuma letra para:`)
                            );
                        lyrics = track.lyrics;
                    });

                } else {
                    try {

                        lyrics = await lyricsFinder(title, author ? author : ``);

                        if (!lyrics)
                            return message.channel.send(new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setFooter(ee.footertext, ee.footericon)
                                .setTitle(`${emoji.msg.ERROR} Erro | Não achei nenhuma letra para:`)
                            );

                    } catch (e) {

                        console.log(String(e.stack).yellow);
                        return message.channel.send(new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setFooter(ee.footertext, ee.footericon)
                            .setTitle(`${emoji.msg.ERROR} Erro | Não achei nenhuma letra para:`)
                        );
                    }
                }
            }

            return swap_pages(client, message, lyrics, `Letra de: ${emoji.msg.lyrics} \`${title}\``.substr(0, 256))

        } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`${emoji.msg.ERROR} Erro | Ocorreu um erro!`)
                .setDescription(`\`\`\`Ocorreu um erro. Por favor tente novamente mais tarde\`\`\``)
            );
        }
    }
};