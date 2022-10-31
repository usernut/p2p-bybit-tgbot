const user = require('../../services/user')
const buttons = require('../../buttons.json')
const keyboards = require('../../keyboards')
const commandBase = require('../command-base')

const command = {
    commands: buttons.USERS,
    permissions: [ 'ADMIN' ],
    __proto__: commandBase,

    callback: async (ctx) => {
        const users = await user.getUsersWithRole()

        users.forEach(async ({ telegram_id, username, role }) => {
            await ctx.reply(`@${username}\nРоль: ${role.title}`, keyboards.editRole(telegram_id))
        })
    }
}

module.exports = command