const { body } = require('express-validator')
const { validateResult } = require('../utils/validateHelper')
const { 
    baseEmailChain,
    baseStringChain,
    baseSelectChain
} = require('./fields.validator')
const path = require('node:path')
const { allowedExtentions } = require('../config/allowedFilesExtentions')

exports.contactMessageValidatorRoules = [
    baseEmailChain(),
    baseStringChain('name'),
    baseStringChain('surname'),
    baseStringChain('subject'),
    baseStringChain('message'),
    baseStringChain(['g-recaptcha-response']),
    baseSelectChain('type'),
    // Validar que esté el captcha
    body('file').custom((value, { req }) => {
        const { file } = req

        if (file) {
            if (file.size >= (2 * 1024 * 1024)) throw new Error("Archivo muy grande")
            const extName = path.extname(file.originalname)
            if(!allowedExtentions.includes(extName)) throw new Error("Archivo no permitido")
        }
        
        return true // Siempre tiene que devolver un true
    }),
    validateResult
]