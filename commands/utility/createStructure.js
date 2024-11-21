const {createStructure, ChannelType, SlashCommandBuilder, PermissionFlagsBits} = require('discord.js')
/* 
 * helper function for createStructure
 * takes in guild and structure map
*/


async function createChannelsFromMap(guild, structureMap) {
    // results map to track whether things were created correctly
    const results = {
        success: [],
        failures: []
    };

    // outer try loop to catch category errors
    try {
        // lets iterate over the map we passed through
            for (const [catName, subChannels] of structureMap) {
                // inner try loop to catch category errors
                try {
                    /* 
                    * interaction.guild - gets the server (guild) where command was used
                    * channels - channel manager 
                    * create - takes category name plus type
                    */
                    const category = await guild.channels.create({
                        name: catName,
                        type: ChannelType.GuildCategory
                    });
                    // push result to result map success array if passed
                    results.success.push(`Created category: ${catName}`);

                // nested for loop to access subChannels WHICH IS AN ARRAY, NOT A MAP— JUST STORED IN A MAP
                for (const chanName of subChannels) {
                    // inner INNER try loop to catch channel errors
                    try {
                        /* 
                        * guild - gets the server (guild) where command was used
                        * channels - channel manager 
                        * create - takes category name plus type plus parent category
                        */
                        await guild.channels.create({
                            name: chanName,
                            type: ChannelType.GuildText,
                            parent: category.id
                        });
                        // push result to result map success array if passed
                        results.success.push(`Created channel: ${chanName}`);
                    } catch (channelError) {
                        // push result to result map failure array if error
                        results.failures.push(`Failed to create channel ${chanName}: ${channelError.message}`);
                    }
                    
                }
                } catch (categoryError) {
                    // push result to result map failure array if error
                    results.failures.push(`Failed to create category ${catName}: ${categoryError.message}`);
                }
                
            }
            return results
    }

    catch (error){
        results.failures.push(`Unexpected error: ${error.message}`);
    }

    return results
}

module.exports = {
    /* 
     * data property will provide the command def for registering to Discord.
     * execute method will contain functionality to run from our event handler when the command is used.
    */

    data: new SlashCommandBuilder()
        .setName('structure')
        .setDescription('creates server structure')
        .addStringOption(option => 
            option
                .setName('markdown')
                .setDescription('channel structure in markdown')
                .setRequired(true)
                .setMaxLength(2000))
        .setDefaultMemberPermissions(PermissionFlagsBits.MANAGE_CHANNELS)
        ,
        async execute(interaction){
            // the logic that interprets the string passed by the user
            // markdown keyword so bot knows that the following command is the structure we want



            try {

                
                    await interaction.deferReply();
                    const markdown = interaction.options.getString('markdown');
                    const structureMap = new Map();
             
                    // Split into category blocks
                    const categoryBlocks = markdown.split('|').map(block => block.trim());
                    
                    // Process each block
                    categoryBlocks.forEach(block => {
                        const [categoryPart, channelsPart] = block.split(':').map(part => part.trim());
                        // Extract category name from quotes
                        const categoryName = categoryPart.substring(
                            categoryPart.indexOf("'") + 1,
                            categoryPart.lastIndexOf("'")
                        ).trim();
                        
                        // Split channels string into array and clean each channel name
                        const channels = channelsPart.split(',')
                            .map(chan => chan.trim())
                            .map(chan => chan.substring(
                                chan.indexOf("'") + 1,
                                chan.lastIndexOf("'")
                            ).trim());
                        
                        structureMap.set(categoryName, channels);
                    });
            

            console.log('Structure Map:', Object.fromEntries(structureMap));

            const results = await createChannelsFromMap(interaction.guild, structureMap);

            


                const successList = results.success
                const failureList = results.failures
                const successCount = successList.length
                const failureCount = failureList.length
                const userName = interaction.member.displayName

                const sucessMap = successList.map(successElem => "- " + successElem).join('\n')
                const failureMap = failureList.map(failureElem => "- " + failureElem).join('\n')

                let templateOutput;

                if (failureCount === 0) {
                    templateOutput = `hii ${userName}!
                    ✅ Successful!!
                    ${sucessMap} \n
                    \n ${successCount} of ${successCount + failureCount} elements created.`;
                }
                else {
                    templateOutput = `hii ${userName}!
                    ✅ Successful!!
                    ${sucessMap} \n
                    😔 not so much
                    ${failureMap}
                    \n ${successCount} of ${successCount + failureCount} elements created.`;
                }

                 
            await interaction.editReply(templateOutput)

            }
            catch (error) {
                
                    await interaction.editReply({ content: `Error: ${error.message}`, ephemeral: true });
                

            }


            

            

        }
}