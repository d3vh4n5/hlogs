const { Router } = require('express')
const router = Router()
const { 
    getAllMessages, 
    getOneMessage, 
    createNewMessage,
    updateMessage,
    deleteMessage
} = require('../controllers/contactMessageController')
const upload = require('../middlewares/multer')
const { validateReCAPTCHA } = require('../middlewares/captchaValidation')
const { contactMessageValidatorRoules } = require('../validators/contactMessage.validator')


router.get('/', getAllMessages)
router.get('/:id', getOneMessage)
router.post('/', 
    upload.single('file'), 
    contactMessageValidatorRoules, 
    validateReCAPTCHA, 
    createNewMessage)
router.put('/:id', updateMessage)
router.delete('/:id', deleteMessage)

module.exports = router
