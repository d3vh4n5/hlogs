const { db } = require('../database/db')
const { DataTypes } = require('sequelize')
/**
 * id integer autoincremental
 * created_at tipo date
 * name varchar
 * surnmae varchar
 * message tipo text
 * type de tipo integer porque referira a una tabla de tipos de consulta
 */

const ContactMessage = db.define("contact_messages", {
    name: { type: DataTypes.STRING },
    surname: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    subject: { type: DataTypes.STRING },
    message: { type: DataTypes.STRING },
    type: { type: DataTypes.INTEGER },
    file: { type: DataTypes.STRING },
    read: { 
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

module.exports = ContactMessage