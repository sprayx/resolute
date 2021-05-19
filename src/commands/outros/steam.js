const Discord = require('discord.js');
var steam = require('steam-provider') 
const db = require("quick.db");

var provider = new steam.SteamProvider();

exports.run = (bot, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."
 
let arg = args.join(' ') //Puxa os argumentos do  usuário
if(!arg) return message.channel.send(`<:y_pontinho:843648515695444019> ${message.author}, Você precisa colocar um jogo!`) //retorna quando o usuário não coloca um jogo
provider.search(arg).then(result => { //vai mostrar o resultado
    provider.detail(result[0].id, 1, "portuguese", "pt").then(results => { //tenta mostrar o resultado em Português (Brasil)
        let other = results.otherData //vai pegar os dados do jogo
        const embed = new Discord.MessageEmbed() //vai mostrar para o usuário todas as informações do jogo
                    .setTitle(results.name)
                    .setColor('RANDOM')
                    .setDescription(`\n\n<:pxdro:844591434191732798> Gênero: ${results.genres.join(', ')} \n<:pxdro:844591434191732798> Plataforma: ${other.platforms.join(', ')}\n<:pxdro:844591434191732798> Características: ${other.features.join(', ')}\n\n<:pxdro:844591434191732798> Desenvolvedor: ${other.developer.join(', ')}`)
                    .setThumbnail(other.imageUrl)
                    .setFooter(message.author.tag, message.author.displayAvatarURL(),message.author.displayAvatarURL)
        return message.channel.send(embed)
    })
})
}
