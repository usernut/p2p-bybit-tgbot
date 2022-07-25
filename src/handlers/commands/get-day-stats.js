const buttons = require('../../buttons.json')
const stats = require('../../services/stats')
const keyboards = require('../../keyboards')
const commandBase = require('../command-base')

const command = {
    commands: [ buttons.GET_TODAY_STATS, buttons.GET_TODAY_STATS_WORKER ],
    permissions: [ 'WORKER', 'ADMIN' ],
    __proto__: commandBase,

    callback: async (ctx) => {
        const [ day, month, year ] = new Date().toLocaleDateString().split('.')
        const { buy, sell, turnover } = await stats.getStats(`${month}.${day}.${year}`)
    
        ctx.reply(`(Buy \`${buy.count}\` | \`${sell.count}\` Sell)\nОборот: \`${turnover}\``, keyboards.DEFAULT())
    }
}

module.exports = command