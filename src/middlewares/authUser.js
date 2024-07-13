const bcrypt = require('bcrypt')
const UserModel = require('../models/UserModel')

// middleware que controla la información de logeo
exports.authenticateUser = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({
            where: {
                email: req.body.email
            }
        })

        if (!user) {
            return res.status(401).json({ 
                error: 'Usuario o contraseña incorrectos' 
            });
        }

        if ( await bcrypt.compare(req.body.password, user.password)) {
            // res.send('Success')
            console.log("Contraseña aprobada")
            req.user = user.dataValues
            next()
            return
        } else {
            return res.status(401).json({ 
                error: 'Usuario o contraseña incorrectos' 
            });
        }
    } catch {
        res.status(500).send()
    }
}