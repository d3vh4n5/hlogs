const fs = require('node:fs')
const ClinicHistoryModel = require('../models/ClinicHistoryModel')
const { saveFile } = require('../utils/saveFile')

const returnAllHistorias = async (req, res) => {
    try {
        const historias = await ClinicHistoryModel.findAll()
        res.json( historias )

    } catch (error) {
        res.status(500).json({
            error: "Ocurrió un error en el servidor, comuniquese con el administrador"
        })

    }
    
}

const returnOneHistoria = async (req, res) => {
    try {
        const { id } = req.params
        const historia = await ClinicHistoryModel.findByPk(+id)

        if (historia){
            res.json(historia)
        } else {
            res.status(404).json( { error: "Historia Clínica no encontrada" } )
        }

    } catch (error) {
        res.status(500).json({
            error: "Ocurrió un error en el servidor, comuniquese con el administrador"
        })

    }
}

const returnUserHistory = async (req, res) => {
    try {
        const userId = req.user.id
        const clinicHistory = await ClinicHistoryModel.findOne({
            where: { userId }
        })
        res.send(clinicHistory)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "Ocurrió un error al obtener la historia"
        })
    }
}

const returnUserHistories = async (req, res) => {
    try {
        const userId = req.user.id
        const clinicHistories = await ClinicHistoryModel.findAll({
            where: { userId }
        })
        res.send(clinicHistories)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "Ocurrió un error al obtener las historias"
        })
    }
}

const addNewHistoria = async (req, res) => {
    const { body } = req
    body.userId = req.user.id

    try{
        const historia = new ClinicHistoryModel(body)
        await historia.save()
        res.json(historia)
    } catch (e){
        console.log("Hubo un error: ",e)
        res.status(500).json({ 
            error: "No se pudo subir la Historia Médica."
        })
    }
}

const updateHistoria = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.user.id
        const clinicHistory = await ClinicHistoryModel.findByPk(+id)

        if (clinicHistory){
            if (!clinicHistory.userId === userId ) {
                return res.status(400).json({
                    error: "La historia no pertenece al usuario"
                })
            }
            const updatedHistoria = await ClinicHistoryModel.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
    
            res.status(200).json({ 
                msg: "Historia clínica actualizada con éxito",
                updatedHistoria,
                data: req.body
            })
        } else {
            res.status(404).json({
                error: "No se encontró la historia clínica"
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "Ocurrió un error al obtener la historia"
        })
    }
}

const deleteHistoria = async (req, res) => {
    try {
        const { id } = req.params
        const clinicHistory = await ClinicHistoryModel.findOne({
            where: { id }
        })
        
        if (!clinicHistory) return res.status(404).json({
            error: "No existe la Historia Clínica"
        })

        const deletedHistoria = await ClinicHistoryModel.destroy({where: { id: id }})
        
        res.status(200).json({ deletedHistoria })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "No se pudo eliminar la Historia"
        })
    
    }
}

module.exports = { 
    returnAllHistorias, 
    returnOneHistoria, 
    addNewHistoria,
    updateHistoria,
    deleteHistoria,
    returnUserHistory,
    returnUserHistories
}
