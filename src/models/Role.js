module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('role', {
        title: {
            type: DataTypes.STRING(32),
            allowNull: false,
            unique: true
        }
    })

    return Role
}