const { validateResult } = require('../utils/validateHelper')
const { 
    baseEmailChain,
    basePasswordChain
} = require('./fields.validator')

exports.loginValidatorRoules = [
    baseEmailChain(),
    basePasswordChain(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]