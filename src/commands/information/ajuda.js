const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const db = require("quick.db")

module.exports = {
  name: "help",
  aliases: ['h', 'ajuda', 'comandos', 'commands'],
  description: "Mostrar os comandos disponiveis.",
  category: "info",
  cooldown: 1000 * 2,
  usage: "",
  example: "",
  permissoes: [],
  args: false,

  async run(client, message, args) {

    var prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) {
      prefix = "s."
    }

    const roleColor =
      message.guild.me.displayHexColor === "#000000" ?
      "#ffffff" :
      message.guild.me.displayHexColor;

    if (!args[0]) {
      let categories = [];

      readdirSync("./src/commands/").forEach((dir) => {
        const commands = readdirSync(`./src/commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );
        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "Sem nome do comando.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir,
          value: cmds.length === 0 ? "Em progresso." : cmds.join(" "),
        };

        categories.push(data);
      });
      
      const embed = new MessageEmbed()
        .addFields(categories)
        .setDescription(`Use \`${prefix}help\` seguido por um nome de comando para obter mais informações adicionais sobre um comando.`, `Por exemplo: \`${prefix}help ban\`.`)
        .setFooter(
          `Requisitado por ${message.author.tag}`,
          message.author.displayAvatarURL({
            dynamic: true
          })
        )
        //.setImage("https://cdn.discordapp.com/attachments/852652786139136060/853441413396168734/Sem_Titulo22-1.png")
        .setTimestamp()
        .setColor("RANDOM");
      return message.channel.send(embed);
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Comando inválido, use \`${prefix}help\` para todos os meus comandos.`)
          .setColor("RANDOM");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("Detalhes do comando:")
        .addField("Prefixo:", `\`${prefix}\``)
        .addField(
          "Comando:",
          command.name ? `\`${command.name}\`` : "Sem nome para esse comando."
        )
        .addField(
          "Aliases/apelidos:",
          command.aliases ?
          `\`${command.aliases.join("` `")}\`` :
          "Sem aliases para esse comando."
        )
        .addField(
          "Forma de uso:",
          command.usage ?
          `\`${prefix}${command.name} ${command.usage}\`` :
          `\`${prefix}${command.name}\``
        )
        .addField(
          "Descrição:",
          command.description ?
          `\`${command.description}\`` :
          "Sem aliases para esse comando."
        )
        .setFooter(
          `Requerido por: ${message.author.tag}`,
          message.author.displayAvatarURL({
            dynamic: true
          })
        )
        .setTimestamp()
        .setColor("RANDOM");
      return message.channel.send(embed);
    }
  },
};