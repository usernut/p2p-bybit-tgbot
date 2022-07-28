require('dotenv').config()
const { Telegraf, session } = require('telegraf')
const { sequelize } = require('./models')
const user = require('./services/user')
const ws = require('./ws')
const addAccount = require('./scenes/add-worker')
const { commands, actions } = require('./handlers')

const bot = new Telegraf(process.env.TELEGRAM_TOKEN)

bot.use(
    session(),
    i18n.middleware(),
    user.middleware,
    addAccount.middleware()
)

bot.use(commands, actions)

sequelize.sync({}).then(() => {
    ws.connect(bot)
    bot.launch()
})

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))