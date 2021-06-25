const Discord = require("discord.js")
const translate = require('@iamtraction/google-translate')
const db = require("quick.db")

module.exports = {
    name: "translate",
    aliases: ['t'],
    cooldown: 1000 * 2, 
    description: "Traduzir algo que deseja!",
    category: "outros",
    usage: "en/pt/fr/lt <texto>",

    async run (client, message, args) {
        
    let googlepng = 'https://i.imgur.com/oZA4FaQ.png'
    let language = args[0]
    let text = args.slice(1).join(" ")

    if (!language || language.length !== 2 || !text) {
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) { prefix = "s." }
    }

    let colors = ['RED', 'YELLOW', 'GREEN', 'BLUE']
    let result = colors[Math.floor(Math.random() * colors.length)]

    translate(args.slice(1).join(" "), { to: language }).then(res => {
        const translateEmbed = new Discord.MessageEmbed()
            .setColor(result)
            .setAuthor(`Google Tradutor`, googlepng)
            .setDescription("```css\n" + `${res.text}` + "\n```", false)
            .setColor("#6959CD")
        message.inlineReply(translateEmbed)
    }).catch(err => {
        message.inlineReply("<:1926blurplecross:856520144872407060> **|** Eu tive um problema com a tradução.\nTente novamente com outro idioma.")
    })
}}