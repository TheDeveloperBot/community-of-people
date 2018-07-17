const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
message.channel.send({embed: {
    color: 3447003,
    author: {
      name: bot.user.username,
      icon_url: bot.user.avatarURL
    },
    title: "Bot Information",
    url: "http://google.com",
    description: "Thx for using our nice and cool discord bot!",
    fields: [{
        name: "The Owner",
        value: "It's the one and only JACKHDz#5248"
      },
           {
        name: "Developers",
        value: "We love the community and also our team MD. Jamie#2767 CrozzedSX#4155  LordBruffy#3562 Sap-Hapling09#1646 "
      },
      {
        name: "Feedback",
        value: "[Discord Server](https://discord.gg/DrpkVTS) | [Vote](https://discordbots.org/bot/447044725820620810/vote)"
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: bot.user.avatarURL,
      text: "© Community Of People Developers"
    }
  }
});
}
module.exports.help = {
name:"?info"
}