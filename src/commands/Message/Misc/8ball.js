const Respostas8Ball = require("./8ball.json")

module.exports = {
    name: "8ball",
    aliases: [],
    cooldown: 1000 * 2,
    description: "Faça um pergunta ao 8ball | Sabedoria infinita!!",
	category: "misc",
    usage: "<Pegunta>",
    example: "Irei ser rico?",
    permissoes: [],
    args: true,

    async run(client, message, args, cmduser, text, prefix, player) {

        let respostas = Respostas8Ball[Math.floor(Math.random() * Respostas8Ball.length)]
        let pergunta = args.join(" ")

        if (!pergunta) return;

        setTimeout(function () {
                message.reply(respostas)
            }, 2000)
            return message.reply('Procurando uma resposta...').then(msg => msg.delete({
                timeout: 1900
            }).catch(err => {
                console.log(err)
                return;
            }))

    }
}