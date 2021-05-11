const db = require("quick.db");
const Discord = require("discord.js"); 
const client = new Discord.Client();

client.on("guildMemberRemove", (member) => {
	db.delete(`money_${member.guild.id}_${member.id}`); 
	db.delete(`bank_${member.guild.id}_${member.id}`); 
	db.delete(`work_${member.guild.id}_${member.id}`); 
	db.delete(`daily_${member.guild.id}_${member.id}`); 
	db.delete(`rob_${member.guild.id}_${member.id}`); 
	console.log(`[ECONOMIA] O ${member.tag} saiu do servidor ${member.guild.name}, e teve todos os status de economia removidos!`);
})