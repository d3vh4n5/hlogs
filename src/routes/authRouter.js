const { Router } = require('express')
const router = Router()
const {
    registerUser,
    updateUser,
    getAllUsers,
    getOneUser,
    deleteUser,
    getTokens,
    refreshToken
} = require('../controllers/authController')
const { authenticateUser } = require('../middlewares/authUser')
const { authenticateToken } = require('../middlewares/authToken')
const { registerValidatorRoules } = require('../validators/register.validator')
const { loginValidatorRoules } = require('../validators/login.validator')

router.post('/register', registerValidatorRoules, registerUser)
router.post('/login', loginValidatorRoules, authenticateUser, getTokens)
router.post('/refresh-token', refreshToken)
router.delete('/refresh-token', ) // Este deber ser la ruta de logout
router.post('/forgotten-password', )

// Rutas d eusuario protegidas
router.get('/users', authenticateToken, getAllUsers) // admin route
router.get('/users/:id', authenticateToken, getOneUser) // admin route
router.put('/users/:id', authenticateToken, updateUser) // admin route
router.delete('/users/:id', authenticateToken, deleteUser) // admin route

// rutas para testeo
router.get('/protected', authenticateToken, (req, res) => {
    res.json({
        msgServer: "Si estas aquí, estas validado y tu GET salió bien",
        user: req.user
    })
})
router.post('/protected', authenticateToken, (req, res) => {
    res.json({
        msgServer: "Si estas aquí, estas validado y tu POST salió bien",
        payload: req.body,
        user: req.user,
    })
})

module.exports = router