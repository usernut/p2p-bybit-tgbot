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

        users.forEach(({ telegram_id, username, role }) => {
            ctx.reply(`@${username}\nРоль: ${role.title}`, keyboards.EDIT_ROLE(telegram_id))
        })
    }
}

module.exports = command