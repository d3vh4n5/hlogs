exports.checkRoleAuth = (roles) => (req, res, next) => {
    // Este middleware deberia ejecutarse luego del que verifica el login y carga el usuario en el request
    const user = req.user

    if([].concat(roles).includes(user.role)){
        next()
        return
    } else {
        res.status(409).json({
            error: "Access denied"
        })
    }
}