const buttons = require('../../buttons.json')
const keyboards = require('../../keyboards')
const commandBase = require('../command-base')
const tfa = require('../../services/2fa')

const command = {
    commands: buttons.BYBIT_2FA_CODE,
    permissions: [ 'ADMIN' ],
    __proto__: commandBase,

    callback: (ctx) => {
        const { code, remaining } = tfa.generateToken(process.env.BYBIT_OAUTH_TOKEN)
        ctx.reply(`\`${code}\`, осталось ${remaining} сек.`, keyboards.DEFAULT())
    }
}

module.exports = command