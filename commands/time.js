const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
  let embed = new Discord.RichEmbed()
    .setTitle("list of commands")
    .setColor("RANDOM")
  .setTimestamp()
  .setURL('https://discord.gg/DrpkVTS')
  .setAuthor(`${bot.user.tag}`, bot.user.displayAvatarURL)
  .setThumbnail(bot.user.displayAvatarURL)
    .addField("?timer","Set a custome timer")
   .addField("?weather","Get custome weather stats. ``Ex:`` ?weather us")
.addField("?remind","Set custome reminder. ``Ex:`` ?remind 1m to to school")
  .setFooter("If you found a bug please report it using ?bugreport")
    message.channel.send(embed);
}
module.exports.help = {
    name: "?time"
}