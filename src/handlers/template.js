const commandBase = {
    commands: '',
    permissionError: 'У вас недостаточно прав',
    permissions: [],

    validation(ctx) {
        if (typeof this.permissions === 'string') {
            this.permissions = [this.permissions]
        }

        if (!this.permissions.length || this.permissions.includes(ctx.user.role?.title)) {
            return true
        } 

        ctx.reply(this.permissionError)
        return false
    }
}

module.exports = commandBase