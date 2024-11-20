const {createStructure} = require('discord.js')

module.exports = {
    /* 
     * data property will provide the command def for registering to Discord.
     * execute method will contain functionality to run from our event handler when the command is used.
    */

    data: new createStructure()
        .setName('structure')
        .setDescription('creates server structure')
        .addStringOption(option > 
            option
                .setName('markdown')
                .setDescription('channel structure in markdown'
                .setRequired(true)
                .setMaxLength(2000))
        .setDefaultMemberPermissions(PermissionFlagsBits.MANAGE_CHANNELS)
        ),
        async execute(interaction){
            // the logic that interprets the string passed by the user
            // markdown keyword so bot knows that the following command is the structure we want
            const markdown = interaction.options.getString('markdown');
            // split our mssg into individual lines 
            const lines = markdown.split('\n')

            try {

                
            // for each loop to iterate over the lines we split earlier
            lines.forEach(line => {
                // indentLvl variable which stores # of leading spaces using reg exp.
                const indentLvl = line.search(/[^ ]/)
                // boolean var to see if line is to be converted to channel or category
                const isChannel = indentLvl > 0
                // creating map to store create empty object/map to store structure
                const structureMap = new Map();
                

                if(indentLvl === 1){
                    throw new Error(`Error: Invalid indentation in line: "${line}". Use no spaces for categories or 2 spaces for channels.`);
                    
                }
                // name var that stores name passed in '' by user
                const name = line.substring(
                    line.indexOf("'") + 1,
                    line.lastIndexOf("'")
                )

                // if the line does not start with a ', end with a ' or has no quotes at all throw an error
                if (line.indexOf("'") === -1 || line.lastIndexOf("'") === line.indexOf("'")) {
                    throw new Error(`Error: Invalid name in line: "${line}". Use '' for names!`);
                }

                if (!isChannel){

                    // current category in map
                    let currCategory

                    currCategory = name;
                    structureMap.set(currCategory,[])
                    
                } else {
                    structureMap.get(currCategory).push(name)
                }

                if (!currCategory){
                    throw new Error(`Error: Can't have channel without category`);
                }
               
            });

            

        }
        catch (error) {
            await interaction.reply(error.message);
            return;

        }
            //await interaction.reply('created!')
        }
}