 const Discord = require('discord.js');
exports.run = (client, message, args) => {
    if(!message.member.voiceChannel){
        message.channel.send("You are not in a voice channel.");
        return;
    }

    var botUserId = client.user.id;
    if(message.member.voiceChannel.members.get(botUserId)){
        message.channel.send("Already in your voice channe..");
        return;
    }

    // check all voice channels
    if(!message.member.guild.voiceConnection){
        message.channel.send("I can only come to your channel when I'm playing music. use `?play  <music name/URL>` first :)");
        return;
    }

    // only check for joinable if not already in voiceChannel
    if(!message.member.voiceChannel.members.get(botUserId)
                && !message.member.voiceChannel.joinable){
        message.channel.send("Not allowed to join. Maybe full channel.");
        return;
    }

    message.member.voiceChannel.join().then( () => {
        console.log("--> Joined voice channel: "
                    + message.member.voiceChannel.name);
    });
};

exports.help = {
    name: "?join"
    }