const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

let embed = new Discord.RichEmbed()
  .setTitle("Moderation")
  .setURL('https://discord.gg/DrpkVTS')
  .setAuthor(`${bot.user.tag}`, bot.user.displayAvatarURL)
.setThumbnail("https://cdn.glitch.com/f216f59c-fdda-43ec-8a7f-cede07534573%2Fdrib_blink_bot.gif?1530388736338")
  .addField("?ban","Ban a member.", false)
  .addField("?clear","Clear messages",false)
  .addField("?warn","Warn a member.",false)
  .addField("?mute","mute a member.",false)
.addField("?lockdown","This will lock a channel down for the set duration, be it in hours, minutes or seconds.")
  .addField("?kick","message.auth",false)
  .addField("?purge", "Clears a member's messages.",false)
  .addField("?unmute", "Unmute a member.",false)
.addField("?sayd","same as say and it will remove your message [administration needed]")
  .setFooter("Require mod-log channel.")
  message.author.send({embed});
  message.reply ("l just send you all the **__mod__** commands in your DMs 📥")
}

module.exports.help = {
  name: "?mod"
}