const jwt = require('jsonwebtoken')

// Valido que el token esté y que sea válido
// Luego, al desencriptarlo, cargo el usuario en el objeto request

exports.authenticateToken = (req, res, next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null ) return res.sendStatus(401)

    // Acá obtengo un error, o el payload, que en este caso es el user
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        if (err) {
            console.log(err)
            return res.sendStatus(403)
        }
        
        req.user = user
        next()
        return
    })
}