const buttons = require('./buttons.json')

const adminStatsMenu = () => ({
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [ buttons.GET_TODAY_STATS, buttons.GET_STATS_BY_DATES ],
            [ buttons.BACK_TO_ADMIN_MENU ]
        ]
    }
})

const adminMenu = () => ({
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [ buttons.USERS, buttons.STATS ], 
            [ buttons.ADD_WORKER, buttons.ADS_LIST ],
            [ buttons.BYBIT_2FA_CODE ]
        ]
    }
})

const workerMenu = () => ({
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [ buttons.GET_TODAY_STATS_WORKER ],
            [ buttons.ORDER_LIST, buttons.ADS_LIST ]
        ]
    }
})

const editRole = (telegram_id) => {
    const { text, callback_data } = buttons.EDIT_ROLE

    return {
        reply_markup: {
            inline_keyboard: [
                [{ text, callback_data: JSON.stringify({ callback_data, params: { telegram_id } }) }]
            ]
        }
    }
}

const paymentReceived = (orderId) => {
    const { text, callback_data } = buttons.PAYMENT_RECEIVED

    return { 
        disable_web_page_preview: true,
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [{ text, callback_data: JSON.stringify({ callback_data, params: { orderId } }) }]
            ]
        }
    }
}

const paymentSent = (orderId) => {
    const { text, callback_data } = buttons.PAYMENT_SENT

    return {
        disable_web_page_preview: true,
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [{ text, callback_data: JSON.stringify({ callback_data, params: { orderId } }) }]
            ]
        }
    }
}

const common = () => ({
    disable_web_page_preview: true,
    parse_mode: 'Markdown'
})

module.exports = {
    adminStatsMenu, adminMenu, workerMenu, editRole, paymentReceived, paymentSent, common
}