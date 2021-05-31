const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error");
const db = require("quick.db")

module.exports = {
  name: "despausar",
  aliases: ['resume'],
  cooldown: 1000 * 2, 
  description: "despausar",
  category: "musica",

  async run (client, message, args) {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."

    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let xd = new MessageEmbed()
      .setDescription("<:music:843602147051700284> Musica despausada.")
      .setColor("YELLOW")
      return message.channel.send(xd);
    }
    return sendError("> Não esta tocando nesse servidor", message.channel);
  },
};