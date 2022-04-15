const { userMention, memberNicknameMention, channelMention, roleMention  } = require("@discordjs/builders");

const lootModel = require("../models/lootSchema");
module.exports = {
    name: 'createProfile',
    aliases: ['register', 'create'],
    permissions: [],
    description: "Create user profile",
    async execute(client, message, cmd, args, Discord){
        let playerData;

        try {
            playerData = await lootModel.findOne({ userID: message.author.id });
            if (!playerData){
                let player = await lootModel.create({
                    
                    userID: message.author.id,
                    boxes: 0,
                    rafflePoints: 0,
                    fragments: 0
                    
                });
                player.save();
            }
        } catch(err){
            console.log(err);
        }
        
        
        message.channel.send(`${userMention(message.author.id)} Profile created.`);
        

        
    }
}

