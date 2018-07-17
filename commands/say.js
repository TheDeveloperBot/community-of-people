
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

      if(!message.member.hasPermission("SEND_MESSAGES")) return;
      const sayMessage = args.join(" ");
      message.channel.send(sayMessage);

}

module.exports.help = {
  name: "?say"
}