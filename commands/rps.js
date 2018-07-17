const Discord = require('discord.js');

exports.run = async(client, msg, [user]) => {
	msg.delete();
	if (user == undefined) return msg.reply('You need to mention in order to play');
	if (user.bot == true) return msg.reply("You can't play with Bots, dummy.");
	if (user == msg.author) return msg.reply("You can't play with your self, duh...");
	var playerone = user;
	var playertwo = msg.author;
	await msg.channel.sendMessage(`${playerone} was invited! Please type yes to Accept the challange. The Invite will be canceled in 30 Seconds.`);
	const inviteAccepted = await msg.channel.awaitMessages(response => response.author.id === playerone.id && response.content === 'yes', {
		max: 1,
		time: 30000
	});
	if (!inviteAccepted.size) return msg.channel.sendMessage("Well he didn't accept the Invitation. Aborting..");
	await playerone.sendMessage('Ok, please choose. Rock, Paper or Scissors');
	const playerOneChose = await playerone.dmChannel.awaitMessages(response => response.content == 'Rock' || response.content == 'Paper' || response.content == 'Scissors', {
		max: 1,
		time: 30000
	});
	if (!playerOneChose.size) return msg.channel.sendMessage(`The Game was canceled, because Payer ${playerone} didnt choose`);
	await msg.channel.sendMessage(`Got Response from ${playerone}`);
	await playertwo.sendMessage('Ok, please choose. Rock, Paper or Scissors');
	const playerTwoChose = await playertwo.dmChannel.awaitMessages(response => response.content == 'Rock' || response.content == 'Paper' || response.content == 'Scissors', {
		max: 1,
		time: 30000
	});
	if (!playerTwoChose.size) return msg.channel.sendMessage(`The Game was canceled, because Player ${playertwo} didnt choose`);
	await msg.channel.sendMessage('Got Both Responses!');
	if (playerOneChose.first().content == 'Rock' && playerTwoChose.first().content == 'Rock') {
		msg.channel.sendMessage('You both Choose Rock!');
		msg.channel.sendMessage('Its a Draw!');
	} else if (playerOneChose.first().content == 'Rock' && playerTwoChose.first().content == 'Paper') {
		msg.channel.sendMessage(`${playerone} chose Rock! ${playertwo} chose Paper!`);
		msg.channel.sendMessage(`${playertwo} wins!`);
	} else if (playerOneChose.first().content == 'Rock' && playerTwoChose.first().content == 'Scissors') {
		msg.channel.sendMessage(`${playerone} chose Rock! ${playertwo} chose Scissors!`);
		msg.channel.sendMessage(`${playerone} wins!`);
	} else if (playerOneChose.first().content == 'Paper' && playerTwoChose.first().content == 'Rock') {
		msg.channel.sendMessage(`${playerone} chose Paper! ${playertwo} chose Rock!`);
		msg.channel.sendMessage(`${playerone} wins!`);
	} else if (playerOneChose.first().content == 'Paper' && playerTwoChose.first().content == 'Paper') {
		msg.channel.sendMessage('You both picked Paper');
		msg.channel.sendMessage("It's a Draw!");
	} else if (playerOneChose.first().content == 'Paper' && playerTwoChose.first().content == 'Scissors') {
		msg.channel.sendMessage(`${playerone} chose Paper! ${playertwo} chose Scissors!`);
		msg.channel.sendMessage(`${playertwo} wins!`);
	} else if (playerOneChose.first().content == 'Scissors' && playerTwoChose.first().content == 'Rock') {
		msg.channel.sendMessage(`${playerone} chose Scissors! ${playertwo} chose Rock!`);
		msg.channel.sendMessage(`${playertwo} wins!`);
	} else if (playerOneChose.first().content == 'Scissors' && playerTwoChose.first().content == 'Paper') {
		msg.channel.sendMessage(`${playerone} chose Scissors! ${playertwo} chose Paper!`);
		msg.channel.sendMessage(`${playerone} wins!`);
	} else if (playerOneChose.first().content == 'Scissors' && playerTwoChose.first().content == 'Scissors') {
		msg.channel.sendMessage('You both picked Scissors!');
		msg.channel.sendMessage("It's a draw!");
	} else {
		msg.channel.sendMessage('Welp.... i think i ran into an error, please report to Rob..');
	}
};

exports.conf = {
	enabled: true,
	runIn: ['text'],
	aliases: [],
	permLevel: 0,
	botPerms: [],
	requiredFuncs: []
};

exports.help = {
	name: '?rps'
    }
