const bybit = require('./bybit')

const types = ['buy', 'sell']

const getStats = async (_from, _to = _from) => {
    const result = {
        'buy': { count: 0 },
        'sell': { count: 0 },
        turnover: 0
    }
    // is-valid
    const from = +new Date(_from)
    const to = +new Date(_to) + 3600*24*1000
    let page = 1

    outer_loop:
    while (true) {
        const orders = await bybit.getOrderList(page)

        if (!orders.length) break
        
        for (const order of orders) {
            const { amount, side, status, createDate } = order

            if (+createDate < from) break outer_loop

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

// (async ()=> {
//     console.log(await getStats('07.18.2022'))
// })()

// const style = document.createElement('style')

// style.className = 'extension-styles'
// style.innerHTML = `
//     .input-price-amount::-webkit-outer-spin-button,
//     .input-price-amount::-webkit-inner-spin-button {
//         -webkit-appearance: none;
//         margin: 0;
//     }

//     .my-order {
//         background-color: #fbd26829;
//     }

//     .input-price-amount {
//         font-size: 22px;
//         font-weight: 800;
//         width: 60px;
//         font-family: monospace;
//         border: 0;outline: none;
//         margin-left: -3px;
//         background-color: #ffffff00;
//     }
// `

// if (!document.querySelector('extension-styles')) {
//     document.head.appendChild(style)
// }

// const orders = document.querySelectorAll('.fiat__spin-container table tbody tr')

// for (const order of orders) {
//     const name = order.querySelector('.advertiser-name').textContent
    
//     if (name !== 'MONEY_MAKER' || order.classList.contains('my-order')) continue
//     console.log('kek')
//     order.className = 'my-order'

//     const priceAmount = order.querySelector('.price-amount')
    
//     const input = document.createElement('input')
//     input.className = 'input-price-amount'
//     input.type = 'number'
//     input.value = priceAmount.textContent
//     input.step = 0.01
    
//     priceAmount.replaceWith(input)
// }





//////////////////////////////////////////////////////////////////////////////////////
// 
// for (const order of orders) {
//     const name = order.querySelector('.advertiser-name').textContent
// 
//     if (name !== 'shelves' || order.classList.contains('my-order')) continue
// 
//     order.className = 'my-order'
// 
//     const priceAmount = order.querySelector('.price-amount')
//     priceAmount.style.display = 'none'
// 
//     const input = document.createElement('input')
//     input.className = 'input-price-amount'
//     input.type = 'number'
//     input.value = priceAmount.textContent
//     input.step = 0.01
//    
//     priceAmount.parentNode.insertBefore(input, priceAmount)
// }
// 
//////////////////////////////////////////////////////////////////////////////////////
