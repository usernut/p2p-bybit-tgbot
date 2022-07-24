module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        telegram_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        username: {
            type: DataTypes.STRING(64),
            allowNull: false
        }
    })

    User.associate = (models) => {
        models.Role.hasOne(User)

        User.belongsTo(models.Role, {
            foreignKey: {
                name: 'role_id'
            }
        })
    }

    return User
}