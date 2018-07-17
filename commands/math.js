const Discord = require('discord.js')
const math = require('math-expression-evaluator');

module.exports.run = (bot, message, args) => {
    // Form Embed
    const embed = new Discord.RichEmbed()
        .setColor(0xffffff);
    
    // Verify Input
    if (!args[0]) {
        
        // Configure Embed
        embed.setFooter('Please input an expression.');
        
        // Return & Send Embed
        return message.channel.send(embed);
        
    }
    
    // Evaluate Expression
    let result;
    try {
        
        result = math.eval(args.join(' '));
        
    } catch (e) { // This will catch any errors in the expression
        
        result = 'Error: "Invalid Input"';
        
    }
        
    
    // Configure Embed
    embed.addField('Input', `\`\`\`js\n${args.join(' ')}\`\`\``)
         .addField('Output', `\`\`\`js\n${result}\`\`\``);
         
    // Send Embed
    message.channel.send(embed);
}

module.exports.help = {
    name: "?math"
  }