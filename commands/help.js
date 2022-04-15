const lootModel = require("../models/lootSchema");

const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
module.exports = {
    name: 'help',
    aliases: ['h'],
    permissions: [],
    description: "Displays all the commands a user can use",
    async execute(client, message, cmd, args, Discord, profileData){
        var ID = message.author.id;
        
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#BE0000')
            .setTitle('Available Commands')
            .setDescription(`__**Info**__
            Bot Name: Gacha Tao
            Bot prefix: g$
            
            __Commands__
            **g$inventory** - brings up number of boxes you own, number of fragments you own, number of raffle entries u have
            **g$use** <number> - opens a number of gacha boxes
            **g$help** - it's the help command
            **g$rates** - shows the rates for prizes from gacha boxes
            **g$create** - Creates your profile
            **g$claimrole** - Allows you to claim the role using fragments if you have enough`)
        

            message.channel.send({ embeds: [newEmbed] });
        

    
        
    }
}


