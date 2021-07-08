const blacklist = require('../.././database/mongoDB/blacklist')
const { Message } = require('discord.js')

module.exports = {
    name: "blacklist-remove",
    aliases: [],
    category: "dev",
    description: "",

    async run (client, message, args) {

        if(message.author.id !== '836345581424738354') return message.channel.send('não.')
        const User = message.guild.members.cache.get(args[0])
        if(!User) return message.channel.send('O ID do usuário está inválido.')

        blacklist.findOne({ id : User.user.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
               await blacklist.findOneAndDelete({ id : User.user.id })
                .catch(err => console.log(err))
                message.channel.send(`**${User.displayName}** Foi removido da blacklist!`)
            } else {
               message.channel.send(`**${User.displayName}** não está na blacklist.`)
            }
           
        })
    }
}