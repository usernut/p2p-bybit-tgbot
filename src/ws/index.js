const WebSocket = require('ws')
const keyboards = require('../keyboards')
const bybit = require('../services/bybit')
const Order = require('../services/order')

const connect = async (bot) => {
    const ws = new WebSocket('wss://ws2.bybit.com/infra/channel/signal')
    
    ws.sendJSON = (json) => ws.send(JSON.stringify(json))

    ws.on('open', () => {
        console.log('Socket connection open')

        ws.sendJSON({ 
            biz: 'fiat-otc', 
            event: 'login',
            msgId: `fiat-otc-login-${Date.now()}`, 
            content: { token: process.env.BYBIT_USER_TOKEN } 
        })
        
        ws.sendJSON({ 
            biz: 'fiat-otc', 
            event: 'msg', 
            msgId: `OTC_ORDER_STATUS-SUBSCRIBE-${Date.now()}`, 
            content: { topic: 'OTC_ORDER_STATUS' }
        })

        setInterval(() => ws.sendJSON({ op: 'ping', args: [Date.now()] }), 15000)
    })
    // sell - Здравствуйте, я на месте, можете переводить. buy - Здравствуйте, я на месте, ожидайте получение средств. 
    ws.on('message', async (msg) => {
        const { event, content } = JSON.parse(msg.toString('utf8'))

        if (event === 'msg' && content.topic === 'OTC_ORDER_STATUS' && content.type === 'STATUS_CHANGE' && content.data.status === 10) {
            const orderData = await bybit.getOrderById(content.data.id)
            
            const order = new Order(orderData)
            const keyboard = order.side ? keyboards.PAYMENT_RECEIVED(order.id) : keyboards.PAYMENT_SENT(order.id)

            bot.telegram.sendMessage(374662940, order.text, keyboard)
        }

        if (event === 'msg' && content.topic === 'OTC_ORDER_STATUS' && content.type === 'STATUS_CHANGE' && content.data.side && content.data.status === 50) {
            const orderData = await bybit.getOrderById(content.data.id)

            bot.telegram.sendMessage(374662940, `Вы получили ${orderData.quantity} ${orderData.tokenId}`)
        }

        if (content?.topic === 'OTC_USER_CHAT_MSG' && content.type === 'RECEIVE' && content.data.roleType === 'user' && content.data.contentType === 'str') {
            const orderData = await bybit.getOrderById(content.data.orderId)
            const order = new Order(orderData)
            
            bot.telegram.sendMessage(
                374662940, 
                `[${order.username}](https://www.bybit.com/fiat/trade/otc/orderList/${order.id}): ${content.data.message}`, 
                { parse_mode: 'Markdown', disable_web_page_preview: true }
            )
        }
    })

    ws.on('close', () => {
        console.log('Socket connection closed')
        setTimeout(() => connect(bot), 5000)
    })
}

module.exports = { connect }