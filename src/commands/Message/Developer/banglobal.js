const Discord = require('discord.js')

module.exports = {
  name: 'banglobal',
  aliases: [],
  cooldown: 1000 * 2,
  description: '',
  category: 'dev',
  usage: '',
  example: '',
  permissoes: [],
  args: false,

  async run (client, message, args) {
    if (message.author.id !== '836345581424738354') return message.channel.send('Apenas desenvolvedores.')

    function sleep (s) {
      return new Promise(resolve => setTimeout(resolve, s * 1000))
    }
    const delay = 2 // segundos
    const list = [
      'ID_DO_SERVIDOR_1',
      'ID_DO_SERVIDOR_2'
    ]
    message.channel.send('Banindo os usuários.').then((a) => {
      client.guilds.cache.map(guild => {
        if (list.includes(guild.id)) {
          const users = [
            args[0]
          ]

          users.forEach((m, i) => {
            setTimeout(async function () {
              await guild.members.ban(m, { reason: 'Quebrou a violação.' })
              if (i == users.length - 1) {
                return a.edit(`${message.author}| Banimento terminado.`)
              }
            }, i * delay * 1000)
          })
        }
      })
    })
  }
}
