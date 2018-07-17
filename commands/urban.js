const Discord = require("discord.js");
const urban = require('relevant-urban');

module.exports.run = async (bot, message, args) => {
    
    if (!args[0]) return message.channel.send(`***Please specify the text!***`)

    let res = await urban(args.join(' ')).catch(e => {
        return message.channel.send('***Error, word not found!***')
    });

    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(res.word)
    .setURL(res.urbanURL)
    .setDescription(`**Definition:**\n*${res.definition}*\n\n**Example:**\n*${res.example}*`)
    .addField('Author', res.author, true)
    .addField('Rating', `**\`Upvotes: ${res.thumbsUp} | Downvotes: ${res.thumbsDown}\`**`)

    if (res.tags.length > 0 && res.tags.join(' ').length < 1024) {
        embed.addField('Tags', res.tags.join(', '), true)
    }

    message.channel.send(embed);
}


module.exports.help = {
    name:"?urban" 
 }