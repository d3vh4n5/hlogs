const fs = require('node:fs')
const ContactMessage = require('../models/ContactMessageModel')
const { saveFile } = require('../utils/saveFile')


const getAllMessages = async (req, res) => {
    try {
        const messages = await ContactMessage.findAll()
        res.json( messages )
    } catch (error) {
        res.status(500).json({
            error: "Ocurrió un error en el servidor, comuniquese con el administrador"
        })
    }
}

const getOneMessage = async (req, res) => {
    try {
        const { id } = req.params
        const message = await ContactMessage.findByPk(+id)

        if (message){
            res.json(message)
        } else {
            res.status(404).json( { error: "Mensaje no encontrado" } )
        }
    } catch (error) {
        res.status(500).json({
            error: "Ocurrió un error en el servidor, comuniquese con el administrador"
        })
    }  
}

const createNewMessage = async (req, res) => {
    const { body } = req
    
    console.log({ body, file: req.file })

    if (req.file !== undefined){
        const filePath = saveFile(req.file)
        body.file = filePath
    } else {
        body.file = ""
    }

    try{
        const message = new ContactMessage(body)
        await message.save()
        res.status(201).json(message)
    } catch (e){
        if (body.file !== ""){
            fs.unlinkSync(body.file);
        }
        console.log("Hubo un error: ",e)
        res.status(500).json({ 
            error: "No se pudo realizar la inserción."
        })
    }
}

const updateMessage = async (req, res) => {
    try {
        const { id } = req.params
        const msg = await ContactMessage.findByPk(+id)

        // primero controlo que exista el mensaje
        if (!msg) return res.status(404).json({
            error: "No existe el mensaje"
        })

        const updatedMsg = await ContactMessage.update(req.body, {
            where: {
                id: req.params.id
            }
        })

        res.status(200).json({ 
            msg: "Recurso actualizado con éxito",
            updatedMsg,
            data: req.body
        })
    } catch (error) {
        console.log("Hubo un error: ",error)
        res.status(500).json({ 
            error: "Hubo un error al actualizar."
        })
    }
}

const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params
        const msg = await ContactMessage.findByPk(+id)

        // primero controlo que exista el mensaje
        if (!msg) return res.status(404).json({
            error: "No existe el mensaje"
        })

        // si existe, además puedo obtener la url del archivo a borrar
        const filePath = msg.file
        if (filePath !== '') fs.unlinkSync(filePath)// borro si hay url
        // Ahora borro el registro en la db
        const deletedMsg = await ContactMessage.destroy({where: { id: id }})
        
        
        res.status(200).json({ deletedMsg })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "No se pudo realizar la operación de eliminación"
        })
    }
}

module.exports = { 
    getAllMessages, 
    getOneMessage, 
    createNewMessage, 
    updateMessage,
    deleteMessage,
 }
