const buttons = require('../../buttons')
const commandBase = require('../command-base')
const keyboards = require('../../keyboards')

const command = {
    commands: buttons.WORKER,
    permissions: [ 'WORKER', 'ADMIN' ],
    __proto__: commandBase,

    callback: async (ctx) => {
        await ctx.reply('Меню работника', keyboards.workerMenu())
    }
}

module.exports = command