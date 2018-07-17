const Discord = require("discord.js");
const meme = require('memejs');

module.exports.run = async (bot, message, args) => {
    let searchMessage = await message.channel.send('> Searching for memes in the database... ');
    meme(function(data) {
    const embed = new Discord.RichEmbed()
    .setTitle(data.title[0])
    .setColor("RANDOM")
    .setImage(data.url[0])
    searchMessage.edit({embed});
  })
}

module.exports.help = {
    name: '?meme'
}