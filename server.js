
const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const superagent = require('superagent')
const moment = require('moment');
const giphy = require('quick-giphy')
const fs = require("fs");
const time = new Date()
const rb = '```'
const randomAnimeWallpapers = require('random-anime-wallpapers')
let coins = require("./coins.json");
let xp = require("./xp.json");
var Cleverbot = require('cleverbot-node')
Cleverbot = new Cleverbot()
Cleverbot.configure({botapi: 'CC84lQxZ2T7W_HNqf3yd4ICGFpQ'})
const { logbotchannel } = require('./botconfig.json');
const bot = new Discord.Client({disableEveryone: false});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`》${f} loaded and running! ✅`);
    bot.commands.set(props.help.name, props);
  });

});

// //Setting up the bots presences
bot.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
 bot.user.setActivity(`v1.4 -|- ?help -|- bata`, { type: 'STREAMING' }); 
});

bot.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  bot.user.setActivity(`v1.4 -|- ?help -|- bata`, { type: 'STREAMING' });
});

bot.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  bot.user.setActivity(`v1.4 -|- ?help -|- bata`, { type: 'STREAMING' });
});

bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find('name', "welcome");
  if (!channel) return;
	//Embed Creation
	let memberEmbed = new Discord.RichEmbed()
	.setColor('#a193ff')
	.setDescription(`**${member}** has joined`)
	.setFooter(`ID - ${member.id}`)
	.setTimestamp();

  channel.send(memberEmbed);
});

bot.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find('name', "welcome");
  if (!channel) return;
	//Embed Creation
	let memberEmbed2 = new Discord.RichEmbed()
	.setColor('#66545e')
	.setDescription(`**${member}** has left`)
	.setFooter(`ID - ${member.id}`)
	.setTimestamp();

  channel.send(memberEmbed2);
});

bot.on('messageUpdate', (message, UpdatedMessage) => {
    if (message.author.bot) return;
    if (message.content === UpdatedMessage.content) return
    if (message.channel.type !== 'text') return;
    if (message.content > 1000) return;
    if (message.content <= 0) return;
    if (UpdatedMessage.content >= 1000) return;
    if (UpdatedMessage.content <= 0) return;
    let guild = message.guild;
    let modlog = guild.channels.find('name', "logging");
    if (!modlog) return;
    const embed = new Discord.RichEmbed()
        .setColor(0x738BD7)
        .setTitle("Message Edited")
        .addField("Message Author:", message.author.username)
        .addField("From Channel:", message.channel)
        .addField("Before Edit: ", message.content)
        .addField("After Edit: ", UpdatedMessage.content)
    	.setTimestamp();
    bot.channels.get(modlog.id).send({
        embed
    });
});

bot.on("message", async message => {
  if(message.author.bot) return;
    if (message.channel.type === 'dm') {
                console.log(`--------------------------------------------------------------------------------------------------------`)
            console.log(message.author.tag + " : " + message.cleanContent);
      Cleverbot.write(message.content, (response) => {
                      console.log("messgae From Kim: " + response.output);
        message.channel.startTyping()
        setTimeout(() => {
          message.channel.send(response.output).catch(console.error)
          message.channel.stopTyping()
        }, Math.random() * (1 - 3) + 1 * 1000)
    
      })
    }  
  if(!coins[message.author.id]){
  coins[message.author.id] = {
    coins: 0
  }
 }
  
let coinAmt = Math.floor(Math.random() * 50) + 1;
let baseAmt = Math.floor(Math.random() * 50) + 1;
console.log(`🔰 Coin Amt: ${coinAmt} | Base Amt:  ${baseAmt}  |  User:  ${message.author.username}   |  Discord Server name:  ${message.guild.name}`);

if(coinAmt === baseAmt){
  coins[message.author.id] = {
    coins: coins[message.author.id].coins + coinAmt
  };
fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
  if (err) console.log(err)
});
let coinEmbed = new Discord.RichEmbed()
.setAuthor(message.author.username)
.setColor("#0000FF")
.addField(":money_with_wings:", `${coinAmt} coins added to your bank ${message.author.username}!`)
.setImage("https://cdn.glitch.com/f216f59c-fdda-43ec-8a7f-cede07534573%2Ftenor.gif?1531500354999")
.setFooter("you can see your coins bank by doing ?coins","https://cdn.glitch.com/f216f59c-fdda-43ec-8a7f-cede07534573%2Fvideotogif_2018.06.12_19.51.27.gif?1530360190573")
.setTimestamp()

message.channel.send(coinEmbed)
}
  
  let xpAdd = Math.floor(Math.random() * 7) + 8;
  console.log(`XP Added:   ${xpAdd}   |  User:   ${message.author.username}`);

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }


  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 300;
  xp[message.author.id].xp =  curxp + xpAdd;
  if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    let lvlup = new Discord.RichEmbed()
    .setTitle("Level Up!")
    .setAuthor(`Keep going ${message.author.username}!`)
    .setColor(0x000000)
    .addField("unlock Level", curlvl + 1)
    .setImage ("https://cdn.glitch.com/f216f59c-fdda-43ec-8a7f-cede07534573%2FLevel_Up_Logo.gif?1531500641079")
    .setFooter("you can see your xp/level/rank by doing ?level","https://cdn.glitch.com/f216f59c-fdda-43ec-8a7f-cede07534573%2Fvideotogif_2018.06.12_19.51.27.gif?1530360190573")
    .setTimestamp()

    message.channel.send(lvlup)
  }
  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
  });

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
  

  
  
  
  
  
  
  
  
  //obc!say Command
  
    if(cmd == '?developer'){
    
      return message.reply(`Logged in as ${bot.user.tag}`);
  
  }
  
  if (cmd == "?test"){
    
      return message.channel.send(`l'm runing with  ${bot.users.size} users`)
  }
  
      if (message.content.toLowerCase().startsWith('?gifs')) {
      const args = message.content.split(' ').splice(1)

      giphy({apiKey: 'P66vSybfG3Deu1DBHYc8vNnRwKHuV3d5', query: args})
  .then(url => {
    message.channel.send({
      embed: {
        image: {
          url: url
        }
      }

    }).catch(e => console.warn('wew tf happened here ' + e))
  })
    }

  if (message.content.toLowerCase().startsWith('?wallpaper')) {
      const args = message.content.split(' ').splice(1)
      randomAnimeWallpapers(args)
      .then(images => {
        let img = images[Math.floor(Math.random() * images.length)]
        if (!img) return message.channel.send('no result fund for **' + args + '**')
        message.channel.send({
          embed: {
            image: {
              url: img.full
            }
          }

        }).catch(e => console.warn('wew tf happened here ' + e))
      })
  }
  
      if (message.content.toLowerCase().startsWith('?dm')) {
      const args = message.content.split(' ').splice(1)
      if (!args) return message.channel.send('you specify what should i send.')
      const memeber = message.mentions.members.first()
      if (!memeber) return message.channel.send('you need add a mention to the command dummy.')
      const args1 = args.slice(1).join(' ')
      if (!args1) return message.channel.send('You need to add something to send')
      const embed = new Discord.RichEmbed()
      .setAuthor(message.author.username + ' sent you a DM!')
      .setDescription('DM been sent to you!')
      .setColor('RED')
      .setThumbnail(message.author.displayAvatarURL)
      .setFooter('DM been sent at: ', bot.user.displayAvatarURL)
      .setTimestamp()
      .addField('Content:', args1)

      bot.users.find('id', message.mentions.members.first().id).send({embed: embed})

      message.channel.send('DM Successfuly sent!')
      message.delete()
    }
  
  if (message.content.toLowerCase().startsWith('?emojis')) {
      const emojiList = message.guild.emojis.map(e => e.toString()).join(' ')
      if (!emojiList) return message.channel.send('you have no costume emojis in your guild!')

      message.channel.send(`YEET! Here are** ${message.guild.name} **Emojis: \n${emojiList}`)
    
    }
  
  if (message.content.startsWith("?ascii")) {
            if (data.length < 2000) {
                message.channel.send("\`\`\`" + "\n" + data + "\n" + "\`\`\`").catch(console.error);
            } else if (data.length > 2000) {
                message.reply("The length of my messages must be less than 2,000 characters. ").catch(console.error);
            }
        }  
         if (cmd === "??rps") {
        const choices = ['paper', 'rock', 'scissors'];
        let choice = message.content.toLowerCase().split(" ").slice(1); // Make so caps dont matter 
        const response = choices[Math.floor(Math.random() * choices.length)];
        if (choice === 'rock') {
            if (response === 'rock') return message.reply('I Picked Rock! Its A Tie.');
            else if (response === 'paper') return message.reply('I Picked Paper! I win!');
            else if (response === 'scissors') return message.reply('I Picked Scissors! Damn I Lost');
        } else if (choice === 'paper') {
            if (response === 'rock') return message.reply('I Picked Rock! Damn I Lost');
            else if (response === 'paper') return message.reply('I Picked Paper! Its A Tie');
            else if (response === 'scissors') return message.reply('I Picked Scissors! I win!');
        } else if (choice === 'scissors') {
            if (response === 'rock') return message.reply('I Picked Rock! Yes! I win!');
            else if (response === 'paper') return message.reply('I Picked Paper! Damn I Lost');
            else if (response === 'scissors') return message.reply('I Picked Scissors! Its A Tie');
        } else {
            return message.reply('That was not a valid choice please try again');
        }
         }
          
 if(message.content.startsWith("?facepalm")) {
							const embed = new Discord.RichEmbed()
							var rdmgif =["https://media1.tenor.com/images/0f78af841f453545a036b6cceb3620cc/tenor.gif", "https://media1.tenor.com/images/06655070b3cc8faaff4824eee848adc0/tenor.gif", "https://media1.tenor.com/images/fa7be96565d6a62208b61497b92576b7/tenor.gif", "https://media1.tenor.com/images/943c9749155767d167660c6a8e45357c/tenor.gif", "https://media1.tenor.com/images/662a736b3f807c6265b79981f115fd87/tenor.gif", "https://media1.tenor.com/images/0111c62d35b8e0ad45a24ee6c01e9279/tenor.gif", "https://media1.tenor.com/images/a4ffc23c3537fc4eb8c076c4fb072f32/tenor.gif", "https://media1.tenor.com/images/f758feb1edaa0718d9cfe2fd7701a8dd/tenor.gif"];
							var rdmgif2 = Math.floor(Math.random()*rdmgif.length);
								embed.setTitle(message.author.username + " facepalm")
								embed.setAuthor(bot.user.username, bot.user.avatarURL)
								embed.setColor(0x00AE86)
								embed.setFooter(bot.user.username, bot.user.avatarURL);
								embed.setImage(rdmgif[rdmgif2])
								embed.addField("Facepalmed", "¯\_(ツ)_/¯")
								embed.setTimestamp()
								message.channel.send({embed});
						} 
//   if(cmd === `${prefix}serverinfo`){

//     let sicon = message.guild.iconURL;
//     let serverembed = new Discord.RichEmbed()
//     .setDescription("Server Information")
//     .setColor("#15f153")
//     .setThumbnail(sicon)
//     .addField("Server Name", message.guild.name)
//     .addField("Created On", message.guild.createdAt)
//     .addField("You Joined", message.member.joinedAt)
//     .addField("Total Members", message.guild.memberCount);

//     return message.channel.send(serverembed);
//   }



//   if(cmd === `${prefix}botinfo`){

//     let bicon = bot.user.displayAvatarURL;
//     let botembed = new Discord.RichEmbed()
//     .setDescription("Bot Information")
//     .setColor("#15f153")
//     .setThumbnail(bicon)
//     .addField("Bot Name", bot.user.username)
//     .addField("Created On", bot.user.createdAt);

//     return message.channel.send(botembed);
//   }
//     if(cmd === `${prefix}kick`){

//     //!kick @daeshan askin for it

//     let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
//     if(!kUser) return message.channel.send("Can't find user!");
//     let kReason = args.join(" ").slice(22);
//     if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
//     if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

//     let kickEmbed = new Discord.RichEmbed()
//     .setDescription("~Kick~")
//     .setColor("#e56b00")
//     .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
//     .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
//     .addField("Kicked In", message.channel)
//     .addField("Tiime", message.createdAt)
//     .addField("Reason", kReason);

//     let kickChannel = message.guild.channels.find(`name`, "incidents");
//     if(!kickChannel) return message.channel.send("Can't find incidents channel.");

//     message.guild.member(kUser).kick(kReason);
//     kickChannel.send(kickEmbed);

//     return;
//   }

//   if(cmd === `${prefix}ban`){

//     let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
//     if(!bUser) return message.channel.send("Can't find user!");
//     let bReason = args.join(" ").slice(22);
//     if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
//     if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

//     let banEmbed = new Discord.RichEmbed()
//     .setDescription("~Ban~")
//     .setColor("#bc0000")
//     .addField("Banned User", `${bUser} with ID ${bUser.id}`)
//     .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
//     .addField("Banned In", message.channel)
//     .addField("Time", message.createdAt)
//     .addField("Reason", bReason);

//     let incidentchannel = message.guild.channels.find(`name`, "incidents");
//     if(!incidentchannel) return message.channel.send("Can't find incidents channel.");

//     message.guild.member(bUser).ban(bReason);
//     incidentchannel.send(banEmbed);


//     return;
//   }


//   if(cmd === `${prefix}report`){

//     //!report @ned this is the reason

//     let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
//     if(!rUser) return message.channel.send("Couldn't find user.");
//     let reason = args.join(" ").slice(22);

//     let reportEmbed = new Discord.RichEmbed()
//     .setDescription("Reports")
//     .setColor("#15f153")
//     .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
//     .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
//     .addField("Channel", message.channel)
//     .addField("Time", message.createdAt)
//     .addField("Reason", reason);

//     let reportschannel = message.guild.channels.find(`name`, "reports");
//     if(!reportschannel) return message.channel.send("Couldn't find reports channel.");


//     message.delete().catch(O_o=>{});
//     reportschannel.send(reportEmbed);

//     return;
//   }

bot.on('serverNewMember', function(server, user) {
	bot.sendMessage(server, "A new member has arrived. Welcome, " + user.username + " to " + server.name + ". Type ?help for commands.");
});  
  
  
});

bot.login(process.env.BOT_TOKEN);
