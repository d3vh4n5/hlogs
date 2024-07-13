const fs = require('node:fs')
const path = require('node:path')

exports.saveFile = file => {
    // const newPath = `uploads/${file.originalname}`;
    const newPath = `uploads/${file.filename}${path.extname(file.originalname)}`;
    fs.renameSync(file.path, newPath)
    return newPath
}

