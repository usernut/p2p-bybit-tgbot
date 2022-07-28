const commandBase = {
    commands: '',
    permissionError: 'У вас недостаточно прав',
    permissions: [],

    validation(ctx) {
        if (!this.permissions.length) {
            return true
        }

        if (typeof this.permissions === 'string') {
            this.permissions = [this.permissions]
        }

        if (this.permissions.includes(ctx.user.role?.title)) {
            return true
        } 

        ctx.reply(ctx.i18n.t(this.permissionError))
        return false
    }
}

module.exports = commandBase