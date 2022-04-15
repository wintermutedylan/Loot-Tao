const lootModel = require("../models/lootSchema");

const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');


module.exports = {
    name: 'inventory',
    aliases: [],
    permissions: [],
    description: "my items",
    async execute(client, message,cmd,args,Discord){
        
        let playerData; 
        playerData = await lootModel.findOne({ userID: message.author.id});
        
        if (!playerData) return message.channel.send("You don't exist. Please try again.");
        
        
        
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#E76AA3')
        .setAuthor(`${message.author.username}'s Items`)
        .setDescription("These are your items that you currently have")
        .addFields(
            {name: "Loot boxes", value: `Count: ${playerData.boxes}`},
            {name: "Fragments", value: `Count: ${playerData.fragments}`},
            
        )
        .setImage('https://media.discordapp.net/attachments/927374124114911272/963491506772140032/unknown.png?width=910&height=910')
        .setThumbnail(message.author.avatarURL())

        
        
        
        message.reply({ embeds: [newEmbed] });

    }
}
