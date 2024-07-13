const { db } = require('../database/db')
const { DataTypes } = require('sequelize')
const UserModel = require('./UserModel')

// Historia clinica resumida
const ClinicHistoryModel = db.define("clinic_history", {
    name: { type: DataTypes.STRING },  
    dateOfBirth: { type: DataTypes.DATE },
    gender: { type: DataTypes.STRING },
    maritalStatus: { type: DataTypes.STRING },
    weight: { type: DataTypes.INTEGER },
    height: { type: DataTypes.INTEGER },
    bloodType: { type: DataTypes.STRING },
    hypertension: { type: DataTypes.BOOLEAN, 
        defaultValue: false
    },
    diabetes: { type: DataTypes.BOOLEAN, 
        defaultValue: false
    },
    asthma: { type: DataTypes.BOOLEAN, 
        defaultValue: false
    },
    allergies: { type: DataTypes.BOOLEAN, 
        defaultValue: false
    },
    heartFailure: { type: DataTypes.BOOLEAN, 
        defaultValue: false
    },
    tobacco: { type: DataTypes.BOOLEAN, 
        defaultValue: false
    },
    alcohol: { type: DataTypes.BOOLEAN, 
        defaultValue: false
    },
    dope: { type: DataTypes.BOOLEAN, 
        defaultValue: false
    },
    cocaine: { type: DataTypes.BOOLEAN, 
        defaultValue: false
    },
    otherDrugs: { type: DataTypes.BOOLEAN, 
        defaultValue: false
    },
    
})

// Asociaciones
UserModel.hasMany(ClinicHistoryModel, {
    // onDelete: 'RESTRICT',
    // onUpdate: 'RESTRICT',
})

ClinicHistoryModel.belongsTo(UserModel)

module.exports = ClinicHistoryModel