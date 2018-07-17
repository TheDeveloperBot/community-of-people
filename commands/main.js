const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
  let embed = new Discord.RichEmbed()
    .setTitle("list of Commands")
  .setAuthor(`${bot.user.tag}`, bot.user.displayAvatarURL)
    .setThumbnail(bot.user.displayAvatarURL)
  .addField("?getquote","Get some random quotes")
    .addField("?pokemon","Show a pokemon information \n Either enter the french or english name")
  .addField("?cowsay","Make the cow say anything")
  .addField("?yomama","funny jokes")
  .addField("?punch","Punches a user.")
  .addField("?user","Get user info")
  .addField ("?google","Google anything you want")
  .addField("?pat","Pat someone")
  .addField("?join","join your vc")
  .addField("?fight","fight someone and get xp!")
  .addField("?bunny","Get random bunny pictures")
  .addField("?coins","Have a look how many coins do you have.")
  .addField("?daily","Get daily money.")
  .addField("?money","see how many money do you have.")
  .addField("?photograph","Get random photos.")
  .addField("?urban", "Usage: ?urban [word here]")
  .addField("?pages", "To find out more about us!")
  .addField("?bank","your bank.")
    .addField("?rate","Ask me to rate someone or something")
  .addField("?jumboemoji","make any emoji into a pic.")
    .addField("?wur","Would you rather.")
  .addField("?bond", "Displays how well two users would love/bond together.")
.addField("?tts", "Usage: ?tts [word here]")
   .addField("?seizure", "Usage: ?seizure")
.addField("?ship", "Usage: ?ship [@user1] [@user2]")
  .setColor("#e2df1b")
    .setFooter("if you want to suggest us something you can do it by doing ?suggest <suggestion>")
    .setTimestamp()
    message.channel.send(embed);
}
module.exports.help = {
    name: "?main"
}