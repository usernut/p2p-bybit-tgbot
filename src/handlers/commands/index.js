const { Composer } = require('telegraf')
const { getFiles } = require('../get-files')

const composer = new Composer()
const commandFiles = getFiles(__dirname)

for (const commandFile of commandFiles) {
    const options = require(commandFile)
    let commands = options.commands
    
    if (!commands) {
        continue
    }

    composer.hears(commands, async (ctx) => {
        try {
            if (options.validation(ctx)) {
                options.callback(ctx)
            }
        } catch ({ message }) {
            await ctx.reply('Что то пошло не так')
            console.log(`[error]: ${message}`)
        }
    })
}

module.exports = composer