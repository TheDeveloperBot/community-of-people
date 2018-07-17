const Discord = require('discord.js');
const superagent = require("superagent");
const send = require("quick.hook");

module.exports.run = async (bot, message, args) => {
        const { body } = await superagent 
        .get('http://www.rrrather.com/botapi'); 
        const rEmbed = new Discord.RichEmbed() 
        .setTitle(`${body.title}`)
        .setURL(body.link)
        .setDescription(`${body.choicea} or ${body.choiceb}?`)
        .setFooter('Powered by Community Of People!');
    
        message.channel.send(rEmbed);
	},
    
 module.exports.help = {
    name: '?wur'
 }