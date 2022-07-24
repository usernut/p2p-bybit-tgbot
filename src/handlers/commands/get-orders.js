
const buttons = require('../../buttons.json')
const keyboards = require('../../keyboards')
const commandBase = require('../template')
const bybit = require('../../services/bybit')

const command = {
    commands: buttons.ORDER_LIST,
    permissions: [ 'WORKER', 'ADMIN' ],
    __proto__: commandBase,

    callback: async (ctx) => {
        const orders = await bybit.getPendingOrders()

        orders.forEach(_order => {
            const order = new Order(_order)
            let keyboard = null
            
            if (!side) {
                keyboard = order.status === 10 ? keyboards.PAYMENT_SENT(order.id) : keyboard
            } else {
                keyboard = order.status === 20 ? keyboards.PAYMENT_RECEIVED(order.id) : keyboard
            }
        
            ctx.reply(order.text, keyboard)
        })        
    }
}

module.exports = command