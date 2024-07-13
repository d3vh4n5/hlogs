const { dbConnTest } = require('../database/db')
const UserModel = require('../models/UserModel')

exports.indexView = async (req, res) => {
    const context = {
        title: "Bienvenidos a nuestra API",
        dbStatus: await  dbConnTest(),
        frontendURL: "https://healthupcac.netlify.app/",
    }

    res.render('index', context);
}

exports.docsView = async (req, res) => {
    res.render('pages/docs');
}



exports.usersView = async (req, res) => {
    try {
        const users = await UserModel.findAll()
        res.render('pages/users', { users })
    } catch (error) {
        res.send("<h1>Hubo agún problema</h1>")
    }
}

exports.restClient = (req, res)=>{
    res.render('pages/restClient')
}