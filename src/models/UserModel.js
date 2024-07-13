const { db } = require('../database/db')
const { DataTypes } = require('sequelize')

const UserModel = db.define('users', {
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    state: { type: DataTypes.BOOLEAN, defaultValue: true },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user'
    }
})

module.exports = UserModel