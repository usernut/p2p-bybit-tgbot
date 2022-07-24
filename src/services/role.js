const { Role } = require('../models')

const getRoleByTitle = async (title) => {
    return await Role.findOne({ where: { title } })
}

module.exports = { getRoleByTitle }