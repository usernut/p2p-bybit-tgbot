const getCommands = (commandFiles) => {
    const result = {}

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

    return result
}
module.exports = { getCommands }