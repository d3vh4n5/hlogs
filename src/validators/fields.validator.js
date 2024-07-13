// Check checkea la variable name de cualquier tipo, body checkea
// específicamente del cuerpo de la petición
const { check, body } = require('express-validator')

exports.baseEmailChain = ()=> 
    body('email')
        .exists()
        .trim()
        .escape()
        .notEmpty()
        .isEmail()
        .normalizeEmail()

exports.baseNameChain = ()=> 
    check('name')
        .exists()
        .trim().escape()
        .not()
        .isEmpty()
        .withMessage('Nombre inválido')

exports.basePasswordChain = () => 
    body('password')
        .exists()
        .bail() // separa los mensajes de eror en la respuesta
        .trim().escape()
        .notEmpty()
        .withMessage('Contraseña Inválida')

exports.baseStringChain = varName => 
    check(varName)
        .exists()
        .trim().escape()
        .not()
        .isEmpty()

exports.baseSelectChain = varName =>
    body(varName)
        .exists()
        .trim()
        .escape()
        .notEmpty()
        .isInt()

exports.baseDateChain = varName =>
    body(varName)
        .exists()
        .trim()
        .escape()
        .notEmpty()
        .isDate()

exports.baseIntChain = varName =>
    body(varName)
        .exists()
        .trim()
        .escape()
        .notEmpty()
        .isInt()

exports.baseBooleanChain = varName =>
    body(varName)
        .optional()
        .trim()
        .escape()
        .notEmpty()
        .isBoolean()
