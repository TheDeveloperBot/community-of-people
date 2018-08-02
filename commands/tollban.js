const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(bUser === message.author) return message.channel.send("Are you retarded? Why do you want to ban yourself?")
    if(!bUser) return message.channel.send("Can't find user!");
    let bReason = args.join(" ").slice(22);
   if(!bReason) return message.channel.send("Please provide a reason!")
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("**You don't have `BAN_MEMBERS` permissons.**");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("Ban")
    .setColor("#bc0000")
    .addField("User", bUser.user.tag)
    .addField("Moderator", message.author.tag)
    .addField("Reason", `${bReason ? bReason : "None."}`)
    .setTimestamp()
    let embed = new Discord.RichEmbed()
    .setTitle("BAN")
    .addField("Banned In", message.guild.name)
    .setColor("#bc0000")
    .addField("Moderator", message.author.tag)
    .addField("Reason", `${bReason ? bReason : "None."}`)
  message.channel.send(`${bUser.user.tag} you have been banned for ${bReason ? bReason : "None."}`)

}

module.exports.help = {
  name:"?banne"
}