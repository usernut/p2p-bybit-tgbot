const buttons = require('../../buttons.json')
const keyboards = require('../../keyboards')
const commandBase = require('../command-base')

const command = {
    commands: [ 
        buttons.ADMIN, 
        buttons.BACK_TO_ADMIN_MENU 
    ],
    permissions: [ 'ADMIN' ],
    __proto__: commandBase,

    callback: async (ctx) => {
        await ctx.reply('Меню администратора', keyboards.adminMenu())
    }
}

module.exports = command