const upload = require('../middlewares/multer')
const fs = require('fs');
const path = require('path');

exports.downloadFile = async (req, res) => {
    try {
        const { fileName } = req.params
        console.log({ fileName })
        const filePath = path.join(__dirname, '../../uploads', fileName);  // Ajuste de ruta para alcanzar la carpeta 'uploads'
        
        // Verificar si el archivo existe
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                error: "Archivo no encontrado"
            });
        }

        // Asegurar que el archivo esté en la carpeta 'uploads'
        if (!filePath.startsWith(path.join(__dirname, '../../uploads'))) {
            return res.status(403).json({
                error: "Acceso denegado"
            });
        }


        res.download(filePath)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Hubo un error en el servidor"
        })
    }
}