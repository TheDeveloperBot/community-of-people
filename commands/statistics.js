 const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

let embed = new Discord.RichEmbed()
.setTitle("Statistics") 
  .setAuthor(`${bot.user.tag}`, bot.user.displayAvatarURL)
.setThumbnail("https://cdn.glitch.com/f216f59c-fdda-43ec-8a7f-cede07534573%2Fwebsite-traffic-buy-home.gif?1530388247777")
.addField("?stats", "Provides bot's statistics.")
  .addField("?twitch","Search for a twicth channel")
  .addField("?anime","Find Your Favoret anime")
  .addField ("?manga","Find Your Favoret Manga")
.addField("?botstat", "Provides more bot's statistics.")
.addField ("?emojiinfo","Shows information of a specified emoji of your Discord server.")
.addField("?userinfo", "Provide user statistics")
.addField("?ping","Get your internet speed.")
.addField("?serverinfo", "Provide server statistics.")
.addField("?info","More About The Bot and us.")
.addField("?svs","Show the servers that the bot's in.")
.addField ("?member","A custome member count.")
.addField("?invites","Get the server invites leaderboard")
.addField("?date","Displays the date of a city you give it.")
.addField ("?math","like a calculator.")
.addField ("?spotify","Provides info about someone who is listening to spotify.")
  .setFooter("If you found a bug please report it using ?bugreport | Do ?invite to invite me to your server")
    .setTimestamp()

message.author.send({embed});
  message.reply ("l just send you all the **__statistics__** commands in your DMs 📥")
}

module.exports.help = {
  name: "?statistics"
}
