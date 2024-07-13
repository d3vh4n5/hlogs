const config = require('../config/config.cjs')

const { captchaSecretKey } = config.secret

const CAPTCHA_URL = `https://www.google.com/recaptcha/api/siteverify?secret=${captchaSecretKey}&response=`

const captchaValidation = async token => {

    if (token !== undefined){
        const resp = await fetch(CAPTCHA_URL + token)
        const data = await resp.json()
        return data.success
    } else {
        console.error("No se encuentra el token")
        return false
    }
}

exports.validateReCAPTCHA = async (req, res, next) => {
    const token = req.body['g-recaptcha-response']

    try {
        const captchaValid = await captchaValidation(token)
        if (captchaValid){
            next()
            return
        } else {
            res.status(422).json({ // 422 Unprocessable Entity
                error: "Captcha inválido"
            })
        }
    } catch (error) {
        console.log("Hubo un error: ", error)
        res.status(500).json({ 
            error: "No se pudo realizar la inserción."
        })
    }
}
