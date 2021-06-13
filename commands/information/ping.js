const Discord = require("discord.js")

module.exports = {
  name: "ping",
  aliases: ['pp', 'latencia'],
  cooldown: 1000 * 2, 
  description: "Pong! Minha latência!",
  category: "info",
  usage: "",

  async run (client, message, args) {
    
    var numWorkers = require('os').cpus().length;

    let svPing = Date.now() - message.createdTimestamp
    
    let shardPing = await client.shard.fetchClientValues('ws.ping', 0)
    
        message.inlineReply('Ping?').then(msg => {
        
        msg.edit(`🏓 **|** Pong!\n:satellite: **|** Shard: ${message.guild.shard.id}/${numWorkers}\n:stopwatch: **|** Latência da API: ${svPing}\n:zap: **|** Ping: ${client.ws.ping}\n🌏 **|** Ping da shard: ${shardPing}ms`) 
    });
  }
}