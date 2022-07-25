const buttons = require('./buttons.json')

const options = {
    ADMIN_STATS_MENU: () => ({
        reply_markup: {
            resize_keyboard: true,
            keyboard: [
                [ buttons.GET_TODAY_STATS, buttons.GET_STATS_BY_DATES ],
                [ buttons.BACK_TO_ADMIN_MENU ]
            ]
        }
    }),
    
    ADMIN_MENU: () => ({
        reply_markup: {
            resize_keyboard: true,
            keyboard: [
                [ buttons.USERS, buttons.STATS ], 
                [ buttons.ADD_WORKER, buttons.ADS_LIST ],
                [ buttons.BYBIT_2FA_CODE ]
            ]
        }
    }),

    WORKER_MENU: () => ({
        reply_markup: {
            resize_keyboard: true,
            keyboard: [
                [ buttons.GET_TODAY_STATS_WORKER ],
                [ buttons.ORDER_LIST, buttons.ADS_LIST ]
            ]
        }
    }),

    EDIT_ROLE: (telegram_id) => {
        const { text, callback_data } = buttons.EDIT_ROLE

        return {
            reply_markup: {
                inline_keyboard: [
                    [{ text, callback_data: `${callback_data}_${telegram_id}`}]
                ]
            }
        }
    },
    
    PAYMENT_RECEIVED: (orderId) => {
        const { text, callback_data } = buttons.PAYMENT_RECEIVED

        return { 
            disable_web_page_preview: true,
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [{ text, callback_data: `${callback_data}_${orderId}`}]
                ]
            }
        }
    },
    
    PAYMENT_SENT: (orderId) => {
        const { text, callback_data } = buttons.PAYMENT_SENT

        return {
            disable_web_page_preview: true,
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [{ text, callback_data: `${callback_data}_${orderId}`}]
                ]
            }
        }
    },

    DEFAULT: () => ({
        disable_web_page_preview: true,
        parse_mode: 'Markdown',
    })
}

module.exports = options

