require('dotenv').config();

/**
 * these 3 things are to keep track of all the stats for coin drop
 */


module.exports = async (Discord, client, message) => {
    const prefix = process.env.PREFIX;
    //Checking the message to see if it starts with the prefix or if its a bot
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    
    /**
     * Creating the player data in the database if they don't have an account
     */
        
    

    

    
    
    
    
    //the next 2 lines look for the command and if it doesn't find the command it returns the provided message
    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));
    
    if (!command) return message.channel.send("This command doesn't exist!");
    //The valid permissions to use in the commands
    const validPermissions = [
        "ADMINISTRATOR",
        "CREATE_INSTANT_INVITE",
        "KICK_MEMBERS",
        "BAN_MEMBERS",
        "MANAGE_CHANNELS",
        "MANAGE_GUILD",
        "ADD_REACTIONS",
        "VIEW_AUDIT_LOG",
        "PRIORITY_SPEAKER",
        "STREAM",
        "VIEW_CHANNEL",
        "SEND_MESSAGES",
        "SEND_TTS_MESSAGES",
        "MANAGE_MESSAGES",
        "EMBED_LINKS",
        "ATTACH_FILES",
        "READ_MESSAGE_HISTORY",
        "MENTION_EVERYONE",
        "USE_EXTERNAL_EMOJIS",
        "VIEW_GUILD_INSIGHTS",
        "CONNECT",
        "SPEAK",
        "MUTE_MEMBERS",
        "DEAFEN_MEMBERS",
        "MOVE_MEMBERS",
        "USE_VAD",
        "CHANGE_NICKNAME",
        "MANAGE_NICKNAMES",
        "MANAGE_ROLES",
        "MANAGE_WEBHOOKS",
        "MANAGE_EMOJIS"
    ];
    //checking if the person running the command has the required permissions for the command being ran
    if (command.permissions.length) {
        let invalidPerms = [];
        for (const perm of command.permissions){
            if (!validPermissions.includes(perm)){
                return console.log(`Invalid Permissions ${perm}`);
            }
            if (!message.member.permissions.has(perm)){
                invalidPerms.push(perm);
            }
        }
        if (invalidPerms.length) {
            return message.channel.send(`Missing Permissions: \`${invalidPerms}\``);
        }
    }

    //this is actually running the command.  sending all the info to the command file to use
    try {
        command.execute(client, message, cmd, args, Discord);
    } catch (err){
        message.reply("There was an error trying to execute this command!");
        console.log(err);
    }
}