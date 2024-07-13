const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/config.cjs')
const UserModel = require('../models/UserModel')
const RefreshTokenModel = require('../models/RefreshTokenModel')


exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.findAll()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener los usuarios"
        })
    }
}

exports.getOneUser = async (req, res) => {
    try {
        const user = await UserModel.findByPk(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "No se pudo registrar el usuario"
        })
    }
}

exports.registerUser = async (req, res) => {
    // validacion de que llegue la informacion y esté correcta
    try {
        console.log("Punto d control 1")

        const emailExists = await UserModel.findOne({
            where: {
                email: req.body.email
            }
        })
    
        if (emailExists) return res.status(409).json({
            error: "Ya existe un usuario con este email"
        })

        console.log("Punto d control 3")

        // const salt = await bcrypt.genSalt(10)
        // const hashPassword = await bcrypt.hash(req.body.password, salt)
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        req.body.password = hashedPassword

        const newUser = await UserModel.create(req.body)
        res.status(201).json( newUser )
    } catch (error) {
        res.status(500).json({
            error: "No se pudo registrar el usuario"
        })
    }
}

exports.updateUser = async (req, res) => {
    // validacion de que llegue la informacion y esté correcta
    try {
        // controlo que el usuario existe
        const usuario = await UserModel.findByPk( req.params.id )
        if (!usuario) {
            return res.status(404).json({
                error: "No existe el usuario"
            })
        }

        // control del email
        const emailExists = await UserModel.findOne({
        where: {
            email: req.body.email
        }
        })

        if (emailExists) return res.status(409).json({
            error: "Ya existe un usuario con este email"
        })

        const updatedUser = await UserModel.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.status(201).json({ updatedUser })
    } catch (error) {
        res.status(500).json({
            error: "No se pudo actualizar el usuario"
        })
    }
}

exports.deleteUser = async (req, res) => {
    // validacion de que llegue la informacion y esté correcta
    try {
        const usuario = await UserModel.findByPk( req.params.id )
        if (!usuario) {
            return res.status(404).json({
                error: "No existe el usuario"
            })
        }

        // Hago un borrado Lógico
        const updatedUser = await UserModel.update({
            state: false
        }, {
            where: {
                id: req.params.id
            }
        })
        res.status(204).json({ updatedUser })
    } catch (error) {
        res.status(500).json({
            error: "No se pudo actualizar el usuario"
        })
    }
}



exports.getTokens = async (req, res) => {
    try {
        
        const { user } = req
    
        if (!user) return res.status(500).json({
            error: "Hubo un error, no se encuentra al usuario"
        })
    
        const accessToken = generateAccessToken(user)
        const refreshToken = jwt.sign(user, config.secret.refreshToken, { expiresIn: '7d' })
        
        const rfTokenExists = await RefreshTokenModel.findOne({
            where: {
                userId: user.id
            }
        })
        
        if (!rfTokenExists) {

            const createRefreshToken = await RefreshTokenModel.create({
                token: refreshToken,
                userId: user.id
            })
            console.log(createRefreshToken)
        } else {
            await RefreshTokenModel.update({
                token: refreshToken
            }, {
                where: {
                    id: rfTokenExists.id
                }
            })
        }

        res.json({ 
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                state: user.state
            }, 
            accessToken, 
            refreshToken 
    })
    } catch (error) {
        console.error('Error al generar tokens:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

// esto va a la carpeta helpers o utils
function generateAccessToken(user){
    // jwt.sign( payloadObject, secretkey, expirationdate)
    return jwt.sign(user, config.secret.accessToken, { expiresIn: '90d' })
}

exports.refreshToken = async (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)

    const refreshTokenExists = await RefreshTokenModel.findOne({
        where: {
            token: refreshToken
        }
    })

    if (!refreshTokenExists) return res.status(403).json({
        error: "Token inexistente"
    })
    
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({
            error: "Token inválido"
        })
        const accessToken = generateAccessToken({ 
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            state: user.state
        })
        res.json({ accessToken })
    })
}