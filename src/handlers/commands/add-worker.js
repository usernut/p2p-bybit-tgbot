const buttons = require('../../buttons')
const commandBase = require('../template')

const command = {
    commands: buttons.ADD_WORKER,
    permissions: [ 'ADMIN' ],
    __proto__: commandBase,

    callback: (ctx) => {
        ctx.scene.enter('add-worker')
    }
}

module.exports = command