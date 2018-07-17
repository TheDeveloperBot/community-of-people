const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const botconfig = require("../botconfig.json");
const red = botconfig.red;
const green = botconfig.green;
const orange = botconfig.orange;


module.exports.run = async (bot, message, args) => {
  let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You can't do that.");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("Couldn't find them yo");
  
  let warnlevel = warns[wUser.id].warns;

  let warnlevelembed = new Discord.RichEmbed()
  .setDescription("Warn Level")
  .setColor(orange)
  .setAuthor(`User: ${wUser}`)
  .addField("no. of warns", warnlevel);

  message.channel.send(warnlevelembed);

}

module.exports.help = {
  name: "?warnlevel"
}