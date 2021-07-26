const db = require('quick.db');
const Discord = require("discord.js");

module.exports = {
    name: "criarembed",
    aliases: [],
    cooldown: 1000 * 2,
    description: "Criar uma embed com suas configurações!",
    category: "config",
    usage: "<@cargo>",
    example: "",
    permissoes: ["ADMINISTRATOR", "Administrador"],
    args: false,

    async run(client, message, args) {
    
	if (!message.member.hasPermission(module.exports.permissoes[0])) return;
	if (!message.guild.me.hasPermission(module.exports.permissoes[0])) return;

    let canalsetado = db.get(`setlogadm_${message.guild.id}`);
    message.channel.send(`[Texto] -> Qual o título que deseja colocar na embed?`).then(m2 => {
        let cp = message.channel.createMessageCollector(x => x.author.id === message.author.id, {
                max: 1
            })
            .on('collect', c => {
                titulo = c.content

                message.channel.send(`[Texto] -> Qual a descrição que deseja colocar na embed?`).then(m3 => {
                    let cd = message.channel.createMessageCollector(x => x.author.id === message.author.id, {
                            max: 1
                        })
                        .on('collect', c => {
                            descrição = c.content

                            message.channel.send(`[Imagem] -> Qual a thumbnail que deseja colocar na embed? \n `).then(m3 => {
                                let vr = message.channel.createMessageCollector(x => x.author.id === message.author.id, {
                                        max: 1
                                    })
                                    .on('collect', c => {
                                        thumb = c.content

                                        message.channel.send(`[Imagem] -> Qual a imagem que deseja colocar na embed?`).then(m3 => {
                                            let vr = message.channel.createMessageCollector(x => x.author.id === message.author.id, {
                                                    max: 1
                                                })
                                                .on('collect', c => {
                                                    imagem = c.content

                                                    message.channel.send(`[Texto] -> Qual o footer que deseja colocar na embed?`).then(m3 => {
                                                        let dc = message.channel.createMessageCollector(x => x.author.id === message.author.id, {
                                                                max: 1
                                                            })
                                                            .on('collect', c => {
                                                                footer = c.content

                                                                message.channel.send(`Qual a cor que deseja colocar na embed?\n 1- Vermelho \n 2- Verde \n 3- Preto \n 4- Aleatório`).then(m3 => {
                                                                    let kv = message.channel.createMessageCollector(x => x.author.id === message.author.id, {
                                                                            max: 1
                                                                        })
                                                                        .on('collect', c => {
                                                                            result = c.content

                                                                            if (result === '1') {
                                                                                let embedir = new Discord.MessageEmbed()
                                                                                    .setTitle(`${titulo}`)
                                                                                    .setDescription(`${descrição}`)
                                                                                    .setFooter(`${footer}`)
                                                                                    .setThumbnail(`${thumb}`)
                                                                                    .setImage(`${imagem}`)
                                                                                    .setColor(`#eb0c0c`)
                                                                                    .setTimestamp()
                                                                                message.channel.send(embedir)
                                                                                client.channels.cache.get(canalsetado).send(`O seguinte embed foi criada!`, embedir)

                                                                            }

                                                                            if (result === '2') {
                                                                                let embedig = new Discord.MessageEmbed()
                                                                                    .setTitle(`${titulo}`)
                                                                                    .setDescription(`${descrição}`)
                                                                                    .setFooter(`${footer}`)
                                                                                    .setThumbnail(`${thumb}`)
                                                                                    .setImage(`${imagem}`)
                                                                                    .setColor(`GREEN`)
                                                                                    .setTimestamp()
                                                                                message.channel.send(embedig)
                                                                                client.channels.cache.get(canalsetado).send(`O seguinte embed foi criada!`, embedig)

                                                                            }

                                                                            if (result === '3') {
                                                                                let embedidig = new Discord.MessageEmbed()
                                                                                    .setTitle(`${titulo}`)
                                                                                    .setDescription(`${descrição}`)
                                                                                    .setFooter(`${footer}`)
                                                                                    .setThumbnail(`${thumb}`)
                                                                                    .setImage(`${imagem}`)
                                                                                    .setColor(`GREEN`)
                                                                                    .setTimestamp()
                                                                                message.channel.send(embedidig)
                                                                                client.channels.cache.get(canalsetado).send(`O seguinte embed foi criada!`, embedidig)

                                                                            }

                                                                            if (result === '4') {
                                                                                let embediran = new Discord.MessageEmbed()
                                                                                    .setTitle(`${titulo}`)
                                                                                    .setDescription(`${descrição}`)
                                                                                    .setFooter(`${footer}`)
                                                                                    .setThumbnail(`${thumb}`)
                                                                                    .setImage(`${imagem}`)
                                                                                    .setColor(`RANDOM`)
                                                                                    .setTimestamp()
                                                                                message.channel.send(embediran)
                                                                                client.channels.cache.get(canalsetado).send(`A embed foi criada!`, embediran)
                                                                            }
                                                                            if (!result) return message.reply(`Você não digitou um número válido :v\nInicie o processo de criarembed novamente!`)
                                                                    })
                                                                })
                                                            })
                                                    })
                                                })
                                        })
                                    })
                            })
                        })
                })
            })
    })
}}