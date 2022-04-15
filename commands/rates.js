const lootModel = require("../models/lootSchema");

const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
module.exports = {
    name: 'rates',
    aliases: [],
    permissions: [],
    description: "Displays all the commands a user and use",
    async execute(client, message, cmd, args, Discord, profileData){
        // let playerData; 
        // playerData = await playerModel.findOne({ userID: message.author.id});
        // if (playerData.starterSelected === false) return message.reply("You need to run g$register first before anything else");
        // var ID = message.author.id;
        
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#BE0000')
            .setTitle('Rates')
            .setDescription('Role - 1% chance \nLink - 2% chance \nFragments - 97% chance')

            message.channel.send({ embeds: [newEmbed] });
        
    }
}
