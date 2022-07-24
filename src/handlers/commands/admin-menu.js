const buttons = require('../../buttons.json')
const keyboards = require('../../keyboards')
const commandBase = require('../template')

const command = {
    commands: [ buttons.ADMIN, buttons.BACK_TO_ADMIN_MENU ],
    permissions: [ 'ADMIN' ],
    __proto__: commandBase,

    callback: (ctx) => {
        ctx.reply('Меню администратора', keyboards.ADMIN_MENU())
    }
}

module.exports = command