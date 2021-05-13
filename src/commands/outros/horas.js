const Discord = require('discord.js')
const moment = require('moment'); 

exports.run = (client, message) => { 

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."
    
    moment.locale('pt-br'); 
   let hora = moment().format('h:mm:ss a'); 
   let data = moment().format('dddd'); // essa let falara a data (Obs: Ele vai puxar a data da sua hospedagem)
    const embed = new Discord.MessageEmbed() 
    .setTitle("Hora")
    .addField("<:info:835206734225473546> » Hoje é ", `${data}`)
    .addField("<:info:835206734225473546> » As horas são", `${hora}`)

    message.channel.send(embed) 

}

