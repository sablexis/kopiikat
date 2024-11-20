const {createStructure} = require('discord.js')

module.exports = {
    /* 
     * data property will provide the command def for registering to Discord.
     * execute method will contain functionality to run from our event handler when the command is used.
    */

    data: new createStructure()
        .setName('structure')
        .setDescription('creates server structure'),
        async execute(interaction){
            await interaction.reply('created!')
        }
}