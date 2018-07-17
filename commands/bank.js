const botconfig = require("../botconfig.json")
const Discord = require("discord.js");
const money = require('discord-money');
const moment = require('moment');
require("moment-duration-format");
const ms = require("ms");
let prefix = botconfig.prefix;

module.exports.run = async (bot, message, args) => {
  money.fetchBal(message.author.id).then((i) => { // money.fetchBal grabs the userID, finds it, and puts it into 'i'.
  message.channel.send(`**Balance:** ${i.money}`);
    });
}

module.exports.help = {
    name: '?bank'
}