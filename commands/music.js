const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

let embed = new Discord.RichEmbed()
    .setTitle("list of command")

.setColor("RANDOM")
.setAuthor(`${bot.user.tag}`, bot.user.displayAvatarURL)
    .setThumbnail("https://cdn.glitch.com/f216f59c-fdda-43ec-8a7f-cede07534573%2Fgiphy.gif?1530387335563")
.setDescription("There are currently 8 commands in this category.")
    .addField("?play", "Play url or search a video on youtube.")
    .addField("?np", "Shows what is playing right now.")
    .addField ("?stop", "Stop the currently playing song.")
    .addField("?queue", "Shows the queue.")
    .addField("?pause","pause the custome music.")
    .addField("?skip", "Skips the currently playing song.")
    .addField("?volume", "Set the volume of the song.")
    .addField("?resume", "Resume the paused song.")
 .setFooter("If you found a bug please report it using ?bugreport")
  .setTimestamp()

message.channel.send(embed);
}

module.exports.help = {
  name: "?music"
}