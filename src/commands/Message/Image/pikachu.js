const {
  MessageAttachment
} = require('discord.js')
module.exports = {
  name: 'pikachu',
  aliases: [],
  cooldown: 1000 * 2,
  description: '',
  category: 'manipulacao',
  usage: '<texto>',
  example: 'pika pika',
  permissoes: {
    membro: [],
    bot: ['ATTACH_FILES', 'Anexar arquivos']
  },
  args: true,

  async run (client, message, args) {
    if (!message.guild.me.permissions.has(`${Discord.Permissions}.FLAGS.${module.exports.permissoes[0]}`)) return

    const text = args.join(' ')
    const image = `https://api.popcatdev.repl.co/pikachu?text=${encodeURIComponent(text)}`
    const imgae = new MessageAttachment(image, 'pika.png')
    message.reply({ files: [imgae] })
  }
}
