const Discord = require('discord.js');
const fs = require("fs");
const afk = JSON.parse(fs.readFileSync("./afk.json", "utf8"));

exports.run = function(client, message, args) {
	message.delete()
	message.member.setNickname("[AFK] " + message.member.displayName);
	
	const embed = new Discord.RichEmbed()
		.setColor(0x1FFF00)
		.setTimestamp();
		
	if (args.length === 0) {
		afk[message.author.id] = {"reason": true};
		embed.addField('AFK', "You are now AFK!")
		message.channel.send({embed}).then(x => DeleteQueue.add(x, 10000));
	} else {
		afk[message.author.id] = {"reason": args.join(" ")};
		embed.addField('AFK', "I set your AFK reason to: " + "**" + args.join(" ") + "**")
		message.channel.send({embed}).then(x => DeleteQueue.add(x, 10000));
	}
	
fs.writeFile("./afk.json", JSON.stringify(afk), (err) => {if (err) console.error(err);});
}
exports.help = {
name:"?afk"
}