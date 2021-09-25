const { MessageEmbed, Client, CommandInteraction } = require('discord.js')
const { readdirSync } = require('fs')

module.exports = {
  name: 'help',
  description: '[📝 INFO]  Veja os meus comandos!',
  type: 'CHAT_INPUT',
  options: [
    {
      name: 'comando',
      description: 'Caso queira informacoes mais complexas de um comando',
      type: 'STRING',
      required: false
    }
  ],
  /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
  run: async (client, interaction, args, prefix) => {
    if (!args[0]) {
      const categories = []

      readdirSync('./src/commands/').forEach((dir) => {
        const commands = readdirSync(`./src/commands/${dir}/`).filter((file) =>
          file.endsWith('.js')
        )
        const cmds = commands.map((command) => {
          const file = require(`../../../commands/${dir}/${command}`)

          if (!file.name) return 'Sem nome do comando.'

          const name = file.name.replace('.js', '')

          return `\`${name}\``
        })

        let data = new Object()

        data = {
          name: dir,
          value: cmds.length === 0 ? 'Em progresso.' : cmds.join(' ')
        }

        categories.push(data)
      })

      const misc = client.commands.filter((cmd) => cmd.category === 'misc')
      const economia = client.commands.filter((cmd) => cmd.category === 'economia')
      const brawl = client.commands.filter((cmd) => cmd.category === 'brawl')
      const manipulacao = client.commands.filter((cmd) => cmd.category === 'manipulacao')
      const mod = client.commands.filter((cmd) => cmd.category === 'mod')
      const music = client.commands.filter((cmd) => cmd.category === 'Music')
      const config = client.commands.filter((cmd) => cmd.category === 'config')
      const pescaria = client.commands.filter((cmd) => cmd.category === 'pescaria')

      const embed = new MessageEmbed()
      .addField(`🎵 ** | Música** [${music.size}]:`, `\`${music.map(cmd => cmd.name).join(' | ')}\``)
      .addField(`🔰 ** | Moderação** [${mod.size}]:`, `\`${mod.map(cmd => cmd.name).join(' | ')}\``)
      //.addField(`⚙️ ** | Configuráveis** [${config.size}]:`, `\`${config.map(cmd => cmd.name).join(' | ')}\``)
      //.addField(`🎣 ** | Pescaria** [${pescaria.size}]:`, `\`${pescaria.map(cmd => cmd.name).join(' | ')}\``)
      .addField(`⭐ ** | Brawlstars** [${brawl.size}]:`, `\`${brawl.map(cmd => cmd.name).join(' | ')}\``)
      .addField(`💵 ** | Economia e social** [${economia.size}]:`, `\`${economia.map(cmd => cmd.name).join(' | ')}\``)
      .addField(`🔍 ** | Outros comandos** [${misc.size}]:`, `\`${misc.map(cmd => cmd.name).join(' | ')}\``)
      .addField(`🖼️ ** | Manipulação de imagens** [${manipulacao.size}]:`, `\`${manipulacao.map(cmd => cmd.name).join(' | ')}\``)
    // .addFields(categories)
    // .setDescription(`Use \`${prefix}help\` seguido por um nome de comando para obter mais informações adicionais sobre um comando.\nPor exemplo: \`${prefix}help ban\`.\n**Prefixo atual: ${prefix}**\n**Meus Comandos[${client.commands.size}]:**`)
    // .setImage("https://cdn.discordapp.com/attachments/852652786139136060/853441413396168734/Sem_Titulo22-1.png")
      .setTimestamp()
      .setFooter(
        `Requisitado por: ${interaction.user.tag}`,
        interaction.user.displayAvatarURL({
          dynamic: true
        })
      )
      .setColor('#2F3136')
      interaction.followUp({ embeds: [embed] })
    } else {
      const command =
            client.commands.get(args[0].toLowerCase()) ||
            client.commands.find(
            	(c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
            )

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Comando inválido, use \`${prefix}help\` para todos os meus comandos.`)
          .setColor('RANDOM')
        return message.channel.send(embed)
      }

      const embed = new MessageEmbed()
        .setTitle(`<:1598blurplesupport:856520144599777291> | Detalhes do comando \`${command.name}\``)
        .addField('<:setaaa:860626769089265665> Prefixo:', `\`${prefix}\``)
        .addField(
          '<:setaaa:860626769089265665> Comando:',
          command.name ? `\`${command.name}\`` : 'Sem nome para esse comando.'
        )
        .addField(
          '<:setaaa:860626769089265665> Aliases/apelidos:',
          command.aliases
            ? `\`${command.aliases.join('` `')}\``
            : 'Sem aliases para esse comando.'
        )
        .addField(
          '<:setaaa:860626769089265665> Forma de uso:',
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          '<:setaaa:860626769089265665> Exemplo:',
          command.example
            ? `\`${prefix}${command.name} ${command.example}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          '<:setaaa:860626769089265665> Descrição:',
          command.description
            ? `\`${command.description}\``
            : 'Sem aliases para esse comando.'
        )
        .setTimestamp()
        .setColor('RANDOM')
      interaction.followUp({ embeds: [embed] })
    }
  }
}
