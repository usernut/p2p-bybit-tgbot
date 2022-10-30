const buttons = require('../../buttons.json')
const keyboards = require('../../keyboards')
const commandBase = require('../command-base')

const command = {
    commands: buttons.STATS,
    permissions: [ 'ADMIN' ],
    __proto__: commandBase,

    callback: async (ctx) => {
        await ctx.reply('Статистика', keyboards.adminStatsMenu())
    }
}

module.exports = command