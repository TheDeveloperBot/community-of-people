const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

let embed = new Discord.RichEmbed()
.setTitle("Developer")
.setAuthor(`${bot.user.tag}`, bot.user.displayAvatarURL)
    .setThumbnail(bot.user.displayAvatarURL)
.setDescription("This will only work for the developers")
.addField("`?eval`", "Execute a JavaScript string.")
.addField("`?restart`","Restart the bot")
.addField("`?reload`","Reload all commands.")
.addField("`?exec`", "Execute command prompt cmds on localhost.")
.setFooter("If you found a bug please report it using ?bugreport")
.setTimestamp()

message.channel.send(embed);
}

module.exports.help = {
  name: "?dev"
}