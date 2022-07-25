const buttons = require('../../buttons')
const commandBase = require('../command-base')
const keyboards = require('../../keyboards')

const command = {
    commands: buttons.WORKER,
    permissions: [ 'WORKER', 'ADMIN' ],
    __proto__: commandBase,

    callback: (ctx) => {
        ctx.reply('Меню работника', keyboards.WORKER_MENU())
    }
}

module.exports = command