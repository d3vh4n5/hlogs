
const { validateResult } = require('../utils/validateHelper')
const { 
    baseEmailChain,
    baseNameChain,
    basePasswordChain
} = require('./fields.validator')


// Fake custom validation
const checkEmailNotInUse = (value, { req }) => {
    console.log({ value })
    if (value === 'admin@admin.com'){
        throw new Error('Este email está reservado')
    }
    // console.log({ req })
    return true // Siempre tiene que devolver un true
}

//Estoy creando u array de middlewares para checkear varios campos y 
// finalmente una funcion para manejar lo que pasa si hay errores
exports.registerValidatorRoules = [
    baseNameChain(),
    basePasswordChain(),
        // .isStrongPassword({
        //     minLength: 6,
        //     minLowercase: 1,
        //     minUppercase: 1,
        //     minNumbers: 1,
        //     minSymbols: 1
        // }).withMessage("La contraseña es muy debil"),
    baseEmailChain().custom(checkEmailNotInUse),

    // este se encarga de la respuesta en caso de errores
    validateResult
]
