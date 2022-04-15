/*
var axios = require('axios');
require('dotenv').config();
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
module.exports = {
    name: 'apitest',
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "Displays all the commands a user can use",
    async execute(client, message, cmd, args, Discord, profileData){
        var data = JSON.stringify({
            "collection": "hutaocarnivalbots",
            "database": "GanyuXHuTao",
            "dataSource": "HuTaoCarnivalBot",
            "filter": {
                "userID": message.author.id
            }
        });

        var config = {
            method: 'post',
            url: 'https://data.mongodb-api.com/app/data-ngvmz/endpoint/data/beta/action/findOne',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'api-key': process.env.API_KEY
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                
                
                message.channel.send(`User: ${userMention(response.data.document.userID)}, Score: ${response.data.document.score}`)
                console.log(response.data.document.score);
            })
            .catch(function (error) {
                console.log(error);
            });
        
        
        // const newEmbed = new Discord.MessageEmbed()
        // .setColor('#BE0000')
        // .setTitle('Available Commands')
        // .setDescription(``)
        

        // message.channel.send({ embeds: [newEmbed] });
        

    
        
    }
}
*/