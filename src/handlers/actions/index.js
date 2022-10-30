const { Composer } = require('telegraf')
const { getFiles } = require('../get-files')

const composer = new Composer()
const commandFiles = getFiles(__dirname)
const actions = {}

commandFiles.forEach((commandFile) => {
	const options = require(commandFile)
	const { commands } = options

	if (!commands) {
		return
	}

	if (Array.isArray(commands)) {
		return commands.forEach((c) => {
			actions[c] = options
		})
	}

	actions[commands] = options
})

composer.on('callback_query', async (ctx) => {
    try {
        const { callback_data, params } = JSON.parse(ctx.callbackQuery.data)
        const action = actions[callback_data]

        if (action.validation(ctx)) {
            action.callback(ctx, params)
        }
    } catch ({ message }) {
		await ctx.reply('Что то пошло не так')
		console.log(`[error]: ${message}`)
	}
})

module.exports = composer