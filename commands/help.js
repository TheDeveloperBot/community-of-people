const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const embed = new Discord.RichEmbed()
  
  .setTitle("list of Commands.")
  .setDescription("__Community Of People™ at your service!__")
  
  .setColor("#4290AE")
  .setTimestamp()
  .setURL('https://discord.gg/DrpkVTS')
  .setAuthor(`Community Of People™`, "https://cdn.glitch.com/f216f59c-fdda-43ec-8a7f-cede07534573%2F20180712_162430.png?1531398356651")
  .setDescription(`Thanks you ${message.author} for using me! \n We love the community.`)
  .setThumbnail("https://cdn.glitch.com/f216f59c-fdda-43ec-8a7f-cede07534573%2Fvideotogif_2018.06.12_19.51.27.gif?1530360190573")
  .addField ("?welcome","**__set up your welcome message channel.__**")
  .addField("?main","**display all the __main__ commands** \n 25 cmds available.", false)
  .addField("?mod","**display all __mods__ commands** \n 9 cmds available.", false)
  .addField("?fun", "**display all __fun__ commands** \n 19 cmds available.", false)
  .addField("?time","**display all the __time__ commands** \n 3 cmds available.")
  .addField("?radio","**display all the __radio__ commands** \n 7 cmds available.")
  .addField("?game","**display the __game__ commands** \n 8 cmds available.",false)
  .addField("?music","**display all the __music__ commands** \n 9 cmds available.",false)
 .addField("?nsfw","**display all the __nsfw__ commands** \n 23 cmds available.",false)
  .addField("?dev","**display all the __developer__ commands** \n 4 cmds available.")
    .addField("?giveaway","**display all the __giveaways__ commands** \n 7 cmds available.")
  .addField("?statistics", "**display all the __statistics__ commands** \n 16 cmds available.", false)
  .addField("?ticket","**display all the __ticket__ commands** \n 3 cmds available.")
    .addField("??soundboard (IN WORK)","**display all the __soundboard__ command** \n 15 cmds available.")
        .addField("?hd","**HD music player** \n 10 cmds available.")
  .addField("Support","| [Support Server](https://discord.gg/EvbXSMV) | [Vote](https://discordbots.org/bot/447044725820620810/vote) | [Invite me to your Server](https://discordapp.com/api/oauth2/authorize?client_id=447044725820620810&permissions=8&scope=bot) |")
  .addField("bad words filter on ❌","This will remove all bad word.",false)
  .addField ("l'm always here to chat with you","``To chat with me all you have to do is put Kim before your message. Ex kim hi or chat with me on DM``")
  .setFooter("If you found a bug please report it using ?bugreport | make a channel name *logging*", "https://cdn.glitch.com/f216f59c-fdda-43ec-8a7f-cede07534573%2F1527593426949.png?1531314575611")
  

  message.channel.send(embed).then(message => message.react('✔'))

}
module.exports.help = {
  name: "?help"
}