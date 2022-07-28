const bybit = require('./bybit')

const types = ['buy', 'sell']

const getStats = async (_from, _to = _from) => {
    const result = {
        buy: { count: 0 },
        sell: { count: 0 },
        turnover: 0
    }
    // is-valid
    const from = +new Date(_from)
    const to = +new Date(_to) + 3600 * 24 * 1000
    let page = 1

    outer_loop:
    while (true) {
        const orders = await bybit.getOrderList(page)

        if (!orders.length) {
            break
        }

        for (const order of orders) {
            const {
                amount, side, status, createDate
            } = order

            if (+createDate < from) {
                break outer_loop
            }

            if (+createDate > from && +createDate < to && status === 50) {
                result.turnover += +amount

                const type = types[side]
                result[type].count += 1
            }
        }

        page++
    }

    result.turnover = Math.trunc(result.turnover)

    return result
}

module.exports = {
    getStats
}