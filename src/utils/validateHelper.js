const { validationResult } = require('express-validator')

exports.validateResult = (req, res, next) => {
    try {
        const result = validationResult(req).throw()
        console.log(result)
        return next()
    } catch (error) {
        console.error(error)
        res.status(422)
        res.send({
            error: "Error de validacion",
            issues: error.array()
        })
    }
}