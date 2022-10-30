const buttons = require('../../buttons')
const commandBase = require('../command-base')
const bybit = require('../../services/bybit')
const tfa = require('../../services/2fa')

const command = {
	commands: buttons.PAYMENT_RECEIVED.callback_data,
	permissions: ['WORKER', 'ADMIN'],
	__proto__: commandBase,

    callback: async (ctx, params) => {
        try {
            const { orderId } = params
            const { code } = tfa.generateToken(process.env.BYBIT_OAUTH_TOKEN)

            const data = await bybit.paymentReceived(orderId, code)

            if (!data?.result?.success) {
				await ctx.answerCbQuery()
				await ctx.reply('Не удалось подтвердить получение средств.')
				return
			}

			await ctx.editMessageReplyMarkup({})
			await ctx.reply('Получение средств успешно подтверждено.')
		} catch (e) {
			await ctx.reply('Не удалось подтвердить получение средств.')
		}
		await ctx.answerCbQuery()
	}
}

module.exports = command