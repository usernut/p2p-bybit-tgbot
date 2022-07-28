const { Composer } = require('telegraf')
const { getFiles } = require('../get-files')

const composer = new Composer()
const commandFiles = getFiles(__dirname)
const actions = {}

for (const commandFile of commandFiles) {
    const options = require(commandFile)
    const commands = options.commands
    
    if (!commands) {
        continue
    }

    if (Array.isArray(commands)) {
        commands.forEach(c => actions[c] = options)
        continue
    }

    actions[commands] = options
}

composer.on('callback_query', async (ctx) => {
    try {
        const { callback_data, params } = JSON.parse(ctx.callbackQuery.data)
        const action = actions[callback_data]

        if (action.validation(ctx)) {
            action.callback(ctx, params)
        }
    } catch ({ message }) {
        ctx.reply('Что то пошло не так')
        console.log(`[error]: ${message}`)
    }
})

module.exports = composer