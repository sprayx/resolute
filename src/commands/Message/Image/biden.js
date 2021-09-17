const Discord = require('discord.js')
module.exports = {
  name: 'biden',
  aliases: ['bidenmeme'],
  cooldown: 1000 * 2,
  description: 'biden',
  category: 'manipulacao',
  usage: '<texto>',
  example: 'ola amigos!',
  permissoes: {
    membro: [],
    bot: ['ATTACH_FILES', 'Anexar arquivos']
  },
  args: true,

  async run (client, message, args) {
    if (!message.guild.me.permissions.has(`${Discord.Permissions}.FLAGS.${module.exports.permissoes[0]}`)) return

    const sentence = args.join(' ')
    if (!sentence) return
    const embed = new Discord.MessageEmbed()
      .setImage(`https://api.popcatdev.repl.co/biden?text=${encodeURIComponent(sentence)}`)
      .setColor('ORANGE')
    message.reply({ embeds: [embed] })
  }
}
