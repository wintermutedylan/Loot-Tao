const lootModel = require("../models/lootSchema");
const { userMention, memberNicknameMention, channelMention, roleMention, hyperlink, hideLinkEmbed } = require('@discordjs/builders');
const { Client, Message} = require('discord.js');
const lucky = require('lucky-item').default;

module.exports = {
    name: 'use',
    aliases: [],
    permissions: [],
    description: "users can roll loot boxes",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @returns 
     */
    async execute(client, message, cmd, args, Discord){
        
        let playerData; 
        playerData = await lootModel.findOne({ userID: message.author.id});
        let channelID = message.channel.id;
        
        
        
        if (!playerData) return message.reply("Looks like there was an error finding your profile.  Try running g$register then try again");
        if (args.length > 1) {
            return message.reply('Please only enter one number');
        }
        if (args.length === 0){
            args.push('1');
        }
        
        let boxesRoll = Number(args[0]);
        
        let roleGet = false;
        let fragments = 0;
        let fragmentsCount = 0;
        let rickroll = false;
        const url = 'https://youtu.be/dQw4w9WgXcQ';
        const link = hyperlink('Link', url);
        let rollChannel = "852360137528049684";
        const arr = [
            { id: 1, weight: 1 },
            { id: 2, weight: 2 },
            { id: 3, weight: 97 }
        ];
        
        if (channelID === rollChannel)   { 
            if (boxesRoll > playerData.boxes) return message.reply("You don't have enough loot boxes.");
            let itemsGet = lucky.itemsBy(arr, 'weight', boxesRoll, { unique: false });
            
            for (let i = 0; i < itemsGet.length; i++){
                if (itemsGet[i].id === 1){
                    roleGet = true;

                } else if(itemsGet[i].id === 2) {
                    rickroll = true;

                } else if(itemsGet[i].id === 3){
                    fragments++;
                    fragmentsCount = fragmentsCount + getRandomArbitrary(3, 6);

                }
            }
            
            var users = await client.users.fetch(message.author.id);
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#E76AA3')
            .setAuthor(`${users.username} has opened ${boxesRoll} boxes`);
            
            if (roleGet){
                let target = message.guild.members.cache.get(message.author.id);
                let role = "963900655859273799";
                if (!target.roles.cache.some(role => role.name === "Qiqi's Cocogoat Milk")){
                    target.roles.add(role);
                    if (rickroll){
                        newEmbed.setDescription(`You have obtained the role
                        You have obtained ${fragmentsCount} role fragments
                        You also managed to pull this special ${link}`)
                        newEmbed.setImage('https://media.discordapp.net/attachments/927374124114911272/963506023694491798/unknown.png?width=910&height=910')
                    } else {
                        newEmbed.setDescription(`You have obtained the role
                        You have obtained ${fragmentsCount} role fragments`)
                        newEmbed.setImage('https://media.discordapp.net/attachments/927374124114911272/963506023694491798/unknown.png?width=910&height=910')
                    }
                } else {
                    if (rickroll){
                        newEmbed.setDescription(`You have already obtained the role
                        You have obtained ${fragmentsCount} role fragments
                        You also managed to pull this special ${link}`)
                        newEmbed.setImage('https://media.discordapp.net/attachments/927374124114911272/963491449322758204/unknown.png?width=910&height=910')
                    } else {
                        newEmbed.setDescription(`You have already obtained the role
                        You have obtained ${fragmentsCount} role fragments`)
                        newEmbed.setImage('https://media.discordapp.net/attachments/927374124114911272/963491449322758204/unknown.png?width=910&height=910')
                    }
                }
            } else {
                if (rickroll){
                    newEmbed.setDescription(`You have obtained ${fragmentsCount} role fragments
                    You also managed to pull this special ${link}`)
                    newEmbed.setImage('https://media.discordapp.net/attachments/927374124114911272/963491449322758204/unknown.png?width=910&height=910')
                } else {
                    newEmbed.setDescription(`You have obtained ${fragmentsCount} role fragments`)
                    newEmbed.setImage('https://media.discordapp.net/attachments/927374124114911272/963491449322758204/unknown.png?width=910&height=910');
                }
            }
            removeBoxes(boxesRoll, message.author.id);
            giveFragments(fragmentsCount, message.author.id);


            message.reply({ embeds: [newEmbed] });

            
            
        

            






            
        } else {
            message.reply(`Please only roll in these channels: ${channelMention(rollChannel)}`);
        }    
    

    }
    
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
async function giveFragments(ammount, ID){
    try {
        await lootModel.findOneAndUpdate(
            {
                userID: ID
            },
            {
                $inc: {
                    fragments: ammount
                    
                },
            }
        );

    } catch(err){
        console.log(err);
    }
}
async function removeBoxes(ammount, ID){
    try {
        await lootModel.findOneAndUpdate(
            {
                userID: ID
            },
            {
                $inc: {
                    boxes: -ammount
                    
                },
            }
        );

    } catch(err){
        console.log(err);
    }
}


