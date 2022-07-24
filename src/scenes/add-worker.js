const { Scenes: { WizardScene, Stage } } = require("telegraf")
const User = require('../services/user')
const Role = require('../services/role')

const superWizard = new WizardScene(
    'add-worker',
    ctx => {
        ctx.reply('Введите имя пользователя @username:')
        return ctx.wizard.next()
    },
    async ctx => {
        const message = ctx.message.text.replace('@', '')
    
        const user = await User.getUserByName(message)

        if (user) {
            const role = await Role.getRoleByTitle('WORKER')
        
            await user.update({ role_id: role.id })

            ctx.reply(`@${message} успешно добавлен`)
            return ctx.scene.leave()
        }

        ctx.reply(`Не удалось найти пользователя.\nУбедитесь, что пользователь начал диалог с ботом и вы указали правильное имя.`)
        return ctx.scene.leave()
    }
)

const stage = new Stage([superWizard])

module.exports = stage