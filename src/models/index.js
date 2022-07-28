const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: 'postgres',
    logging: false,
    define: {
        timestamps: true,
        underscored: true,
        updatedAt: false
    }
})

const models = {
    User: require('./User')(sequelize, DataTypes),
    Role: require('./Role')(sequelize, DataTypes)
}

Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models)
    }
})

models.sequelize = sequelize
models.Sequelize = Sequelize

module.exports = models