const { getFiles } = require('../get-files')

const result = {}
const commandFiles = getFiles(__dirname)

for (const commandFile of commandFiles) {
    const options = require(commandFile)
    const commands = options.commands
    
    if (!commands) continue

    if (Array.isArray(commands)) {
        commands.forEach(c => {
            result[c.toLowerCase()] = options
        })
        continue
    }

    result[commands.toLowerCase()] = options
}

module.exports = result