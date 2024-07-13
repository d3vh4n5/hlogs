const multer = require('multer')
const path = require('node:path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ 
    storage,
    // archivs permitidos:
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|pdf|doc|txt/;
        const mimetype = filetypes.test(file.mimetype)
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase())

        console.log('Mimetype:', file.mimetype);  // Log para comprobar mimetype
        console.log('Extname:', path.extname(file.originalname).toLowerCase());  // Log para comprobar extensión

        if (mimetype && extname){
            return cb(null, true)
        }

        cb(JSON.stringify({ error: "Tipo de archivo no soportado" }));
        // cb(new Error('Error: Tipo de archivo no soportado'));
    },

    limits: { fileSize: 5000000 } // 5mb
})


module.exports = upload