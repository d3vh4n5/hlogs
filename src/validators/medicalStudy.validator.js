const { body } = require('express-validator')
const { validateResult } = require('../utils/validateHelper')
const {
    baseStringChain,
    baseDateChain
} = require('./fields.validator')

exports.medicalStudyValidatorRoules = [
    baseStringChain('name'),
    baseStringChain('description'),
    baseDateChain('date'),
    body('type')
        .exists()
        .trim()
        .escape()
        .notEmpty()
        .isInt(),
    body('file')
        .custom((value, { req }) => {
            const { file } = req
            
            if (!file){
                throw new Error("Archivo requerido") 
            }

            return true // Siempre tiene que devolver un true
        }),

    validateResult
]