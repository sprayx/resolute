const Discord = require('discord.js');
const db = require("quick.db");

module.exports = {
	name: "kiss",
	aliases: ['beijar', 'beijo'],
	cooldown: 1000 * 2,
	description: "Beije alguém :flushed:",
	category: "gifs",
	usage: "@user",

	async run(client, message, args) {

		var list = [
			'https://imgur.com/qALwmUW.gif',
			'https://imgur.com/Su2mFPY.gif',
			'https://imgur.com/ZzF0olN.gif',
			'https://imgur.com/cuMVXHS.gif',
			'https://imgur.com/3i2RdCa.gif',
			'https://imgur.com/Yjk1OQF.gif',
			'https://imgur.com/x9ex9O3.gif',
			'https://imgur.com/Me1o6YB.gif'
		];

		var rand = list[Math.floor(Math.random() * list.length)];
		let user = message.mentions.users.first() || client.users.cache.get(args[0]);

		if (!user) {
			let prefix = db.get(`prefix_${message.guild.id}`)
			if (prefix === null) prefix = "s."

			const help = new Discord.MessageEmbed()
				.setTitle("Comando de kiss")
				.setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
				.setDescription("Beije alguém virtualmente 😳")
				.addField(`Forma de Utilização:`, ` \`${prefix}kiss @usuario\``)
				.setFooter(`Comando executado por: ${message.author.username}`, message.author.displayAvatarURL({
					dynamic: true
				}))
				.setImage(rand)
				.setTimestamp();
			return message.channel.send(help);
		}

		let avatar = message.author.displayAvatarURL({
			format: 'png'
		});
		const embed = new Discord.MessageEmbed()
			.setTitle('Kiss')
			.setColor('#000000')
			.setDescription(`${message.author} acaba de beijar o ${user}`)
			.setImage(rand)
			.setTimestamp()
			.setThumbnail(avatar)
			.setFooter('Resolute')
			.setAuthor(message.author.tag, avatar);
		await message.channel.send(embed);
	}
}