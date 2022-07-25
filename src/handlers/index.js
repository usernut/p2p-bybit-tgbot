const { getFiles } = require('./get-files')
const { getCommands } = require('./get-commands')

const commandFiles = getFiles(__dirname + '/commands')
const actionFiles = getFiles(__dirname + '/actions')

const commands = getCommands(commandFiles)
const actions = getCommands(actionFiles)

const handlers = { commands, actions }

module.exports = handlers