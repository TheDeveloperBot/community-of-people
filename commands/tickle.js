const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();

exports.run = (bot, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
    
        neko.getSFWTickle().then(tickle => {
            let tickleEmbed = new Discord.RichEmbed()
                .setDescription(`**${message.author.username}** tickles **${member.user.username}**...`)
                .setImage(tickle.url)
                .setFooter('Powered by nekos.life')
                .setColor(message.guild.me.displayColor)
                .setTimestamp();
            message.channel.send(tickleEmbed);
        });
}

module.exports.help = {
    name: '?tickle'
}
                                 