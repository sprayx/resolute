const Discord = require("discord.js")

module.exports = async (client, guild) => {
    const webhook = new Discord.WebhookClient(`871605693147410483`, "mXDLwI9O_0sgQT1lB3buWIC70Tyj0r2ymu2gauPdK3HrXg_SGQ5O-9xhvPwUS3gBNsiw")

    let embed = new Discord.MessageEmbed()
        .setTitle(`Novo servidor!`)
        .setDescription(`<:info:835206734225473546> | Servidor: ${guild.name}\n<:info:835206734225473546> | ID: ${guild.id}\n<:info:835206734225473546> | Membros: ${guild.memberCount} membros\n<:info:835206734225473546> | Dono: ${guild.owner.user.tag}/${guild.owner.id}`)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()
        .setColor('#00FF00')
    webhook.send({ embeds: [embed] })
}