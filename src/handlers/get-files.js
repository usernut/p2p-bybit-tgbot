const fs = require('fs')

const getFiles = (dir, suffix = '.js') => {
    const files = fs.readdirSync(dir, {
        withFileTypes: true
    })

    let commandFiles = []

    for (const file of files) {
        if (file.name.startsWith('index')) {
            continue
        }

        if (file.isDirectory()) {
            commandFiles = [
                ...commandFiles,
                ...getFiles(`${dir}/${file.name}`, suffix)
            ]
        } else if (file.name.endsWith(suffix)) {
            commandFiles.push(`${dir}/${file.name}`)
        }
    }

    return commandFiles
}

module.exports = { getFiles }