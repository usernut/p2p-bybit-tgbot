const buttons = require('../../buttons')
const commandBase = require('../template')
const bybit = require('../../services/bybit')

const command = {
    commands: buttons.PAYMENT_SENT.callback_data,
    permissions: [ 'WORKER', 'ADMIN' ],
    __proto__: commandBase,

    callback: async (ctx) => {
        try {
            const orderId = ctx.callbackQuery.data.split('_')[2]
            const data = await bybit.paymentSent(orderId)
            
            if (!data?.result?.success) {
                ctx.answerCbQuery()
                return ctx.reply('Не удалось подтвердить отрпавку средств.')
            }
            
            ctx.editMessageReplyMarkup({})
            ctx.reply('Отправка средств успешно подтверждена.')
        } catch (e) {
            ctx.reply('Не удалось подтвердить отрпавку средств.')
        }
        ctx.answerCbQuery()
    }
}

module.exports = command