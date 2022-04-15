

const lootModel = require("../models/lootSchema");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');

module.exports = {
    name: 'claimrole',
    aliases: [],
    permissions: [],
    description: "my items",
    async execute(client, message,cmd,args,Discord){
        let playerData; 
        playerData = await lootModel.findOne({ userID: message.author.id});
        if (!playerData) return message.channel.send("You don't exist. Please try again.");
        let target = message.guild.members.cache.get(message.author.id);
        let role = "963900655859273799";
        if (playerData.fragments >= 75 && !target.roles.cache.some(role => role.name === "Qiqi's Cocogoat Milk")){
            target.roles.add(role);
            return message.reply("You have claimed the role.  Congrats");
            
            
        } else {
            return message.reply("You either don't have enough fragments or you already have the role. You can check your fragment count by running g$inventory");
        }

    }
}