const Discord = require("discord.js");
const money = require('discord-money');
const moment = require('moment');
require("moment-duration-format");
const ms = require("ms");

module.exports.run = async (bot,message, args) => {
  let sicon = message.guild.iconURL;
   message.delete();
    if (money[message.author.username + message.guild.name] != moment().format('L')) {
    money[message.author.username + message.guild.name] = moment().format('L')
    money.updateBal(message.author.id, 50).then((i) => { // The daily ends of the day, so everyday they can get a daily bonus, if they missed it, they can't get it back again.
      let collectembed = new Discord.RichEmbed()
      .setTitle("Daily Reward")
      .setThumbnail(sicon)
      .setColor("#CFB53B")
      .setDescription(`The bank of ${message.guild.name}`)
      .addBlankField(true)
      .addField("Account Holder", `${message.author.username}`, true)
      .addField("Interest Amount", 50, true)
message.channel.send(collectembed)
  })
} else {
  let gicon = message.guild.iconURL;
  let collectedembed = new Discord.RichEmbed()
  .setTitle("Daily Reward")
  .setColor("#CFB53B")
  .setDescription(`The bank of ${message.guild.name}`)
  .setThumbnail(gicon)
  .setFooter(`You already collected the intersest for today. Check back in tomorrow for more`);
  message.channel.send(collectedembed);
  }
}

module.exports.help = {
    name: '?daily'
}