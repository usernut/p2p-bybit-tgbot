const buttons = require('../../buttons.json')
const keyboards = require('../../keyboards')
const commandBase = require('../template')

const command = {
    commands: buttons.STATS,
    permissions: [ 'ADMIN' ],
    __proto__: commandBase,

    callback: (ctx) => {
        ctx.reply('Статистика', keyboards.ADMIN_STATS_MENU())
    }
}

module.exports = command