exports.run = (Bastion, message, args) => {
  message.channel.send({
    embed: {
      title: `R.I.P ${args.length ? args.join(' ') : 'Everything'}`,
      image: {
        url: 'https://resources.bastionbot.org/images/tombstone_rip.png'
      },
      footer: {
        text: 'May the Soul Rest in Peace.'
      }
    }
  })
};

exports.config = {
  aliases: [],
  enabled: true
};

exports.help = {
  name: '?rip',
}