const buttons = require('../../buttons')
const commandBase = require('../command-base')
const bybit = require('../../services/bybit')

const command = {
	commands: buttons.PAYMENT_SENT.callback_data,
	permissions: ['WORKER', 'ADMIN'],
	__proto__: commandBase,

    callback: async (ctx, params) => {
        try {
            const { orderId } = params
            const data = await bybit.paymentSent(orderId)
            
            if (!data?.result?.success) {
				await ctx.answerCbQuery()
				await ctx.reply('Не удалось подтвердить отрпавку средств.')
				return
			}

			await ctx.editMessageReplyMarkup({})
			await ctx.reply('Отправка средств успешно подтверждена.')
		} catch (e) {
			await ctx.reply('Не удалось подтвердить отрпавку средств.')
		}
		await ctx.answerCbQuery()
	}
}

module.exports = command