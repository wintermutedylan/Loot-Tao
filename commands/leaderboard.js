const jirachiModel = require("../models/jirachiGameSchema");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
module.exports = {
    name: 'leaderboard',
    aliases: ['lb'],
    permissions: [],
    description: "leaderboard for users.  based off CP",
    async execute(client, message,cmd,args,Discord){
        return message.channel.send("Under Construction");
        let allPlayerData = await jirachiModel.find({});
        
        if (args.length > 1) {
            return message.reply('Please only enter one number');
        }
        if (args.length === 0){
            args.push('1');
        }
        var pageNumber = args[0];
        var pos;
        let userPos = 0;

        var sorted = allPlayerData.sort((a, b) => (b.score) - (a.score));
        for (let i = 0; i < sorted.length; i++){
            pos = i + 1;
            if (sorted[i].userID === message.author.id){
                userPos = pos;
                break;

            }
        }

        pageNumber = Number(pageNumber) - 1; 
        if (sorted.length > 10) sorted = sorted.slice(pageNumber * 10, pageNumber * 10 + 10);


        pos = 0;
        let rankString = "";
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#E76AA3')
        .setTitle("**Leaderboard**")
        
        
        for (let j = 0; j < sorted.length; j++){
            pos = j + 1;
            rankString = rankString + `**#${Number(pos) + Number(pageNumber) * 10}**: ${userMention(sorted[j].userID)} Score: ${new Intl.NumberFormat().format(sorted[j].score)}\n`
            /*
            let user = await client.users.fetch(sorted[j].userID);
            newEmbed.addFields(
                { name: `#${Number(pos) + Number(pageNumber) * 10}: ${user.tag}`, value: `Score: ${new Intl.NumberFormat().format(sorted[j].score)}`}//${user.username}#${user.discriminator}
            )
            */


        }
        newEmbed.setDescription(`__**Your Ranking: ${userPos}**__\n\n${rankString}`)
        pageNumber++;
        newEmbed.setFooter(`Page # ${pageNumber}`)
        message.channel.send({ embeds: [newEmbed] });


    }
}
