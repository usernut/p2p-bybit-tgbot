const { User, Role, Sequelize: { Op } } = require('../models')

const getUserByName = async (username) => {
    const user = await User.findOne({ 
        include: [{ model: Role, attributes: ['title'] }], 
        where: { username } 
    })
    
    return user
}

const getUserByTelegramId = async (telegram_id) => {
    const user = await User.findOne({ 
        include: [{ model: Role, attributes: ['title'] }], 
        where: { telegram_id } 
    })
    
    return user
}

const create = async (telegram_id, username) => {
    return await User.create({ telegram_id, username })
}

const getUsersWithRole = async () => {
    const users = await User.findAll({ 
        include: {
            model: Role,
            required: false,
            where: {  
                title: {
                    [Op.ne]: null
                } 
            }
        }
    })

    return users.map(obj => obj.get({ plain: true }))
}

const middleware = async (ctx, next) => {
    const { from } = ctx.callbackQuery || ctx.message

    const id = from.id
    const username = from.username || from.first_name
    // const { id, username } = ctx.callbackQuery?.from || ctx.message?.from
    const data = ctx.callbackQuery?.data || ctx.message?.text
    
    const user = await getUserByTelegramId(id) || await create(id, username)

    if (user.username !== username) {
        await user.update({ username })
    }

    ctx.user = user
    ctx.user.data = data

    next()
}

module.exports = { getUserByTelegramId, getUserByName, getUsersWithRole, create, middleware }