
const lootModel = require("../models/lootSchema");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
module.exports = {
    name: 'addpoint',
    aliases: [],
    permissions: [],
    description: "Give coins to users",
    async execute(client, message, cmd, args, Discord){
        var target = message.guild.members.cache.get(message.author.id);
        var eventRole = "830700055525589001";
        var adminRole = "831570884857823303";
        var guideRole = "831221217364017202";

        if (target.roles.cache.some(role => role.id === eventRole || role.id === guideRole || role.id === adminRole)){
            if (args.length === 0) return message.reply("Please enter an amount then a user ID");
            var ID = args.pop();
            var amount = args[0];
            

            if (amount < 1) return message.channel.send(`you can't add ${amount} to the user.`);


            let playerData; 
                
            playerData = await lootModel.findOne({ userID: ID});
            if (!playerData) return message.channel.send(`That user doesn't exist`);

            try {
                await lootModel.findOneAndUpdate(
                    {
                        userID: ID
                    },
                    {
                        $inc: {
                            rafflePoints: amount
                        },
                    }
                );

            } catch(err){
                console.log(err);
            }
            var user = await client.users.fetch(ID);
            message.reply(`You have added ${amount} raffle points to ${user.username}#${user.discriminator}`)
        }  else {
            message.channel.send("You don't have the required permissions to use this command");
            

        }
    }
}