const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
  let embed = new Discord.RichEmbed()
    .setTitle("list of commands")
    .setColor("RANDOM")
  .setTimestamp()
  .setURL('https://discord.gg/DrpkVTS')
  .setAuthor(`${bot.user.tag}`, bot.user.displayAvatarURL)
  .setThumbnail(bot.user.displayAvatarURL)
    .addField("?song","?song [1-11] ``Ex``: ?song7")
  .addField("?fix","use only if the bot is not working (play music)")
  .setFooter("If you found a bug please report it using ?bugreport")
    message.channel.send(embed);
}
module.exports.help = {
    name: "?hd"
}