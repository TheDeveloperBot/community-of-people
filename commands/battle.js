const Discord = require("discord.js");
const usersOnCooldown = new Set();

exports.run = async (client, message, args) =>
{
    if (args.length != 1)
    {
        return message.reply("Incorrect command you have to tag someone first.");
    }

    var mentionedUser = message.mentions.users.firstKey();

    // If tagged user is the same as the author of the message
    if (mentionedUser === message.author.id)
    {
        return message.reply("You cannot battle yourself");
    }

    // If the tagger user is a bot
    if (client.users.get(mentionedUser).bot)
    {
        return message.reply("You cannot battle a bot.");
    }

    // Since this command results in a lot of spam it would be best to use on separate channel.
    if ((message.channel.name != process.env.BATTLE_CHAT_1) && (message.channel.name != process.env.BATTLE_CHAT_2))
    {
        return message.reply(`You cannot battle outside of #${process.env.BATTLE_CHAT_1}, #${process.env.BATTLE_CHAT_2} channel.`);
    }

    // If the tagged user's status is offline/idle
    if (message.guild.members.get(mentionedUser).presence.status === 'offline' ||
        message.guild.members.get(mentionedUser).presence.status === 'idle')
        return message.reply("You cannot battle against an afk/offline member.");

    // Initiate game variables
    var gameRunning = true;

    var firstPlayer = message.author;
    var secondPlayer = message.guild.members.get(mentionedUser);
    var currentPlayer;
    var targetPlayer;
    var turn = true;

    firstPlayer.health = 500;
    firstPlayer.guard = false;
    firstPlayer.missedTurn = 0;

    secondPlayer.health = 500;
    secondPlayer.guard = false;
    secondPlayer.missedTurn = 0;

    // If the users are not in the cooldown list, continue.
    if (!usersOnCooldown.has(firstPlayer) && !usersOnCooldown.has(secondPlayer))
    {
        // Add users on cooldown until the game finishes.
        usersOnCooldown.add(firstPlayer);
        usersOnCooldown.add(secondPlayer);
        setTimeout(() =>
        {
            usersOnCooldown.delete(firstPlayer);
            usersOnCooldown.delete(secondPlayer);
        }, 5 * 60 * 1000);

        message.channel.send(new Discord.RichEmbed().setTitle(':crossed_swords: | Battle')
            .setColor(0x00AE86)
            .setDescription(`<@!${mentionedUser}> if you accept type '**yes**', otherwise type '**no**'. \n\nYou have **30** second(s).`));

        // Await for tagged user's answer.
        const filter = m => (m.content.toLowerCase() === 'yes' || m.content.toLowerCase() === 'no') && m.author.id === mentionedUser;
        await message.channel.awaitMessages(filter,
        {
            max: 1,
            time: 30 * 1000,
            errors: ['time']
        }).
        then(async answer =>
        {
            let msg = answer.first().content.toLowerCase();

            // If the reply from the tagged user is yes, start the game
            if (msg === 'yes')
            {
                // Choose a person to flip coin
                var randomPerson = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
                var personToFlip = randomPerson === 1 ? firstPlayer : secondPlayer;

                await message.channel.send(new Discord.RichEmbed().setTitle(':crossed_swords: | Battle')
                    .setColor(0x00AE86)
                    .setDescription(`We shall have a flip coin to see who starts first!\n${personToFlip} what's your choice '**heads**' or '**tails**'? \n\nYou have **30** second(s).`));

                const filter = m => (m.content.toLowerCase() === 'heads' || m.content.toLowerCase() === 'tails') && m.author.id === personToFlip.id;
                await message.channel.awaitMessages(filter,
                {
                    max: 1,
                    time: 30 * 1000,
                    errors: ['time']
                }).then(async answer =>
                {
                    let choice = answer.first().content.toLowerCase();

                    // Coin randomization
                    var randCoin = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
                    var coinResult = randCoin === 1 ? 'heads' : 'tails';
                    var result = coinResult === choice ? 'yes' : 'no';

                    // If the firstPlayer won or secondPlayer lost, then it's firstPlayer's turn.
                    // If the firstPlayer lost or secondPlayer won, then it's secondPlayer's turn.
                    if ((result === 'yes' && personToFlip === firstPlayer) || (result === 'no' && personToFlip === secondPlayer))
                        turn = true;
                    else
                        turn = false;

                    await message.channel.send(`The coin rolled and landed on: **${coinResult}**`);

                    // That person gets to pick heads or tails.
                    while (gameRunning)
                    {
                        // If turn is true, it's author's turn, otherwise it's tagged user's turn.
                        if (turn)
                        {
                            currentPlayer = firstPlayer;
                            targetPlayer = secondPlayer;
                        }
                        else
                        {
                            currentPlayer = secondPlayer;
                            targetPlayer = firstPlayer;
                        }

                        // Let the users know about moves they can use along with their health stats.
                        await message.channel.send(new Discord.RichEmbed().setTitle(':crossed_swords: | Battle')
                            .setColor(0x00AE86)
                            .setDescription(`${currentPlayer} it's your turn, make your move.\n➾ **Attack** - Attacks the enemy. Damage 20 - 100.\n➾ **Guard** - Blocks the next incoming attack.\n➾ **Special** - Launches a powerful attack but has **15** % chance of landing. Damage 120 - 200.\n➾ **Run** - Runs as fast as you possibly can to escape death. \n\n${firstPlayer} HP : ${firstPlayer.health}\n${secondPlayer} HP : ${secondPlayer.health}\n\nYou have **10** second(s).`));

                        // Await for current player's choice
                        const filter = m => (m.content.toLowerCase() === 'attack' ||
                            m.content.toLowerCase() === 'guard' || m.content.toLowerCase() === 'special' ||
                            m.content.toLowerCase() === 'run') && m.author.id === currentPlayer.id;
                        await message.channel.awaitMessages(filter,
                        {
                            max: 1,
                            time: 10 * 1000,
                            errors: ['time']
                        }).
                        then(async answer =>
                        {
                            let choice = await answer.first().content.toLowerCase();

                            // Check for the player's choice, and execute the appropriate behaviour.
                            switch (choice)
                            {
                                case 'attack':
                                    // Randomize a damage value between 20 - 100.
                                    var damageVal = Math.floor(Math.random() * (100 - 20) + 20);

                                    // If the current player had previously used guard, but did not get attacked remove the guard.
                                    if (currentPlayer.guard)
                                    {
                                        currentPlayer.guard = false;
                                    }

                                    // If the enemy used guard move on previous round, block any incoming attacks.
                                    if (targetPlayer.guard)
                                    {
                                        message.channel.send(`${targetPlayer} was on guard for any incoming attacks on this turn.`);
                                        targetPlayer.guard = false;
                                    }
                                    else
                                    {
                                        // If the enemy didn't use guard move, sap his health.
                                        targetPlayer.health -= damageVal;

                                        // If the enemy's health dropped below 0, the current player has won the game.
                                        if (targetPlayer.health <= 0)
                                        {
                                            targetPlayer.health = 0;
                                            winner = currentPlayer;
                                            gameRunning = false;
                                        }
                                        message.channel.send(`${currentPlayer} attacked and dealt **${damageVal}** damage.`);
                                    }
                                    break;
                                case 'guard':
                                    // If the current player chose to guard, enable the boolean flag for the next turn.
                                    message.channel.send(`${currentPlayer} prepares to block your next attack!`);
                                    currentPlayer.guard = true;
                                    break;
                                case 'special':
                                    // Randomize a chance between 0 - 100.
                                    var chance = Math.random() * 100;

                                    // If the current player had previously used guard, but did not get attacked remove the guard.
                                    currentPlayer.guard = false;

                                    // If the chance is within 0 - 15 % then the special blow succeeded.
                                    if (chance <= 15)
                                    {
                                        // If the enemy used guard move on previous round, block any incoming attacks.
                                        if (targetPlayer.guard)
                                        {
                                            message.channel.send(`${targetPlayer} was on guard for any incoming attacks on this turn.`);
                                            targetPlayer.guard = false;
                                        }
                                        else
                                        {
                                            // Randomize a damage value between 120 - 250.
                                            var damageVal = Math.floor(Math.random() * (250 - 120) + 120);

                                            // If the enemy didn't use guard move, sap his health.
                                            targetPlayer.health -= damageVal;

                                            // If the enemy's health dropped below 0, the current player has won the game.
                                            if (targetPlayer.health <= 0)
                                            {
                                                targetPlayer.health = 0;
                                                winner = currentPlayer;
                                                gameRunning = false;
                                            }
                                            message.channel.send(`${currentPlayer} attacked with his special attack and dealt a whooping **${damageVal}** damage!`);
                                        }
                                    }
                                    else
                                    {
                                        // If the current player's special attack fails but the enemy used guard on previous turn, consume it.
                                        if (targetPlayer.guard)
                                        {
                                            targetPlayer.guard = false;
                                        }

                                        message.channel.send(`Special attack failed!`);
                                    }
                                    break;
                                case 'run':
                                    // Randomize a chance between 0 - 100.
                                    var chance = Math.random() * 100;

                                    // Consume guards of both players.
                                    targetPlayer.guard = false;
                                    currentPlayer.guard = true;

                                    // If the chance is within 0 - 25% then current player fled successfully and declared the opponent player as the winner.
                                    if (chance <= 100)
                                    {
                                        winner = targetPlayer;
                                        gameRunning = false;
                                        message.channel.send(`${currentPlayer} chose to run away with his tails between his legs! Hahaha!!`);
                                    }
                                    else
                                    {
                                        message.channel.send(`${currentPlayer} tried to flee from the battle but got caught!`);
                                    }
                                    break;
                                default:
                                    message.reply("Wrong choice");
                            }

                            // After the choice was made, change player turns.
                            turn = !turn;
                        }).catch(answer =>
                        {
                            // If the current player missed more than 2 turns, then it means he's busy/AFK and the enemy wins this battle.
                            if (currentPlayer.missedTurn >= 2)
                            {
                                gameRunning = false;
                                winner = targetPlayer;
                                message.channel.send(new Discord.RichEmbed()
                                    .setTitle(':crossed_swords: | Battle')
                                    .setColor(0xD11313)
                                    .setDescription(`${currentPlayer} missed 2 turns and yield the fight.`)
                                    .setTimestamp());
                            }
                            else
                            {
                                // If the time is out, the current player loses his turn and changes player turns.
                                currentPlayer.missedTurn++;
                                turn = !turn;
                                message.channel.send(new Discord.RichEmbed()
                                    .setTitle(':crossed_swords: | Battle')
                                    .setColor(0xD11313)
                                    .setDescription(`${currentPlayer}, you missed your turn.`)
                                    .setTimestamp());
                            }
                        });
                    }
                }).catch(answer =>
                {
                    // Since the request timed out, remove both players from the cooldown list.
                    usersOnCooldown.delete(firstPlayer);
                    usersOnCooldown.delete(secondPlayer);
                })

                // Since the battle is over, remove both players from the cooldown list.
                usersOnCooldown.delete(firstPlayer);
                usersOnCooldown.delete(secondPlayer);

                // Winner declaration message.
                message.channel.send(new Discord.RichEmbed()
                    .setTitle(':crown: | Battle')
                    .setColor(0x00AE86)
                    .setDescription(`The battle is over! Congratulations to the winner ${winner} !\n\n${firstPlayer} HP : ${firstPlayer.health}\n${secondPlayer} HP : ${secondPlayer.health}`)
                    .setTimestamp());

            }
            else if (msg === 'no')
            {
                // If the tagged user answered no.
                // Since the request was refused, remove both players from the cooldown list.
                usersOnCooldown.delete(firstPlayer);
                usersOnCooldown.delete(secondPlayer);

                message.channel.send(new Discord.RichEmbed()
                    .setTitle(':crossed_swords: | Battle')
                    .setColor(0x00AE86)
                    .setDescription(`Kek, not willing to fight eh. <@!${message.author.id}>`)
                    .setTimestamp());
            }
        }).catch(answer =>
        {
            // Since the request timed out, remove both players from the cooldown list.
            usersOnCooldown.delete(firstPlayer);
            usersOnCooldown.delete(secondPlayer);

            message.channel.send(new Discord.RichEmbed()
                .setTitle(':crossed_swords: | Battle')
                .setColor(0xD11313)
                .setDescription(`Time out. ${secondPlayer} did not answer to the request.`)
                .setTimestamp())
        });
    }
    else
    {
        // If the users are in the cooldown list.
        message.channel.send(new Discord.RichEmbed()
            .setTitle(':crossed_swords: | Battle')
            .setColor(0xD11313)
            .setDescription(`Your request has already been made. Try again later.`));
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: '?battle',
    description: 'Tag the person you wish to battle with.',
    usage: 'battle <tag>'
};