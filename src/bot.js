require('dotenv').config()
const { Telegraf, session } = require('telegraf')
const { sequelize } = require('./models')
const user = require('./services/user')
const ws = require('./ws')
const addAccount = require('./scenes/add-worker')
const { commands, actions } = require('./handlers')

const bot = new Telegraf(process.env.TELEGRAM_TOKEN)

bot.use(session())
bot.use(addAccount.middleware())
bot.use(user.middleware)

bot.on('text', async (ctx) => {
    try {
        const text = ctx.message.text
        const command = commands[text.toLowerCase()]

        if (command?.validation(ctx)) {
            command?.callback(ctx)
        }
    } catch ({ message }) {
        ctx.reply('Что то пошло не так')
        console.log(`[error]: ${message}`)
    }
})

bot.on('callback_query', async (ctx) => {
    try {
        const data = ctx.callbackQuery.data.replace(/_[0-9]*$/, '')
        const action = actions[data.toLowerCase()]

        if (action?.validation(ctx)) {
            action?.callback(ctx)
        }
    } catch ({ message }) {
        ctx.reply('Что то пошло не так')
        console.log(`[error]: ${message}`)
    }
})

sequelize.sync({}).then(() => {
    ws.connect(bot)
    bot.launch()
})

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))