const { db } = require('../database/db')
const { DataTypes } = require('sequelize')
const UserModel = require('./UserModel')

const RefreshTokenModel = db.define('refresh_tokens', {
    token: { type: DataTypes.TEXT}
})

// Asociaciones
UserModel.hasOne(RefreshTokenModel, {
    // onDelete: 'RESTRICT',
    // onUpdate: 'RESTRICT',
})
RefreshTokenModel.belongsTo(UserModel)

// RefreshTokenModel.sync()

module.exports = RefreshTokenModel