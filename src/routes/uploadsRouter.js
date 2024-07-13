const { Router } = require('express')
const router = Router()
const { authenticateToken } = require('../middlewares/authToken')
const {
    downloadFile,
} = require('../controllers/uploadsController')
const upload = require('../middlewares/multer')

router.get('/:fileName', authenticateToken, downloadFile)

// Estas son solo de prueba

// router.post('/single', upload.single('archivo'), (req, res)=> {
//     console.log({ info: req.file })
//     const filepath = saveFile(req.file)
//     res.json({ msg:'Archivo subido con éxito', filepath})
// })

// router.post('/multiple', upload.array('archivos', 10), (req, res)=> {
//     console.log({ info: req.files })
//     req.files.map(saveFile)
//     res.json({ msg:'Archivos subidos con éxito'})
// })

module.exports = router