exports.run = async (bot, message, args) => {
    let waveMessage = await message.channel.send('o/');
    waveMessage.edit(`1`);
    waveMessage.edit(`2`);
    waveMessage.edit(`5`);
    waveMessage.edit(`4`);
    waveMessage.edit(`6`);
    waveMessage.edit(`7`);
    message.channel.send(waveMessage);
 }

 module.exports.help = {
    name: "?wave"
  }