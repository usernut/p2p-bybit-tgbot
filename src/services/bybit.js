const fetch = require('node-fetch')

const getData = async (url, body, method = 'POST') => {
    const res = await fetch(url, {
        headers: {
            accept: 'application/json',
            'accept-language': 'en-US',
            'content-type': 'application/x-www-form-urlencoded',
            usertoken: process.env.BYBIT_USER_TOKEN,
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
        },
        body,
        method
    })
    const data = await res.json()

    return data
}

const getOrderById = async (orderId) => {
    const url = 'https://api2.bybit.com/spot/api/otc/new/order/info'
    const body = `orderId=${orderId}`

    const data = await getData(url, body)

    return data.result
}

const getOrderList = async (page = 1, size = 20) => {
    const url = 'https://api2.bybit.com/spot/api/otc/order/list'
    const body = `tokenId=USDT&page=${page}&size=${size}`

    const data = await getData(url, body)

    return data.result.items
}

const paymentSent = async (orderId, paymentType = 75) => {
    const url = 'https://api2.bybit.com/spot/api/otc/order/pay'
    const body = `orderId=${orderId}&paymentType=${paymentType}`

    const data = await getData(url, body)

    return data
}

const paymentReceived = async (orderId, code) => {
    const url = 'https://api2.bybit.com/spot/api/otc/order/finish'
    const body = `orderId=${orderId}&paymentType=75&emailVerifyCode=&mobileVerifyCode=&googleVerifyCode=${code}&verifyFrom=2&countryCode=RU`

    const data = await getData(url, body)

    return data
}

const getPendingOrders = async () => {
    const url = 'https://api2.bybit.com/spot/api/otc/order/pending/list'
    const body = 'page=1&size=20'

    const data = await getData(url, body)

    return data.result
}

module.exports = {
    getOrderById, getOrderList, paymentSent, paymentReceived, getPendingOrders
}