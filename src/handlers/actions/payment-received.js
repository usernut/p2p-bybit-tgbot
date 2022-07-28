const buttons = require('../../buttons')
const commandBase = require('../command-base')
const bybit = require('../../services/bybit')
const tfa = require('../../services/2fa')

const command = {
    commands: buttons.PAYMENT_RECEIVED.callback_data,
    permissions: [ 'WORKER', 'ADMIN' ],
    __proto__: commandBase,

    callback: async (ctx, params) => {
        try {
            const { orderId } = params
            const { code } = tfa.generateToken(process.env.BYBIT_OAUTH_TOKEN)
            
            const data = await bybit.paymentReceived(orderId, code)

            if (!data?.result?.success) {
                ctx.answerCbQuery()
                return ctx.reply('Не удалось подтвердить получение средств.')
            }
            
            ctx.editMessageReplyMarkup({})
            ctx.reply('Получение средств успешно подтверждено.')
        } catch (e) {
            ctx.reply('Не удалось подтвердить получение средств.')
        }
        ctx.answerCbQuery()
    }
}

module.exports = command