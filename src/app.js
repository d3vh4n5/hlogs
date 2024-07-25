const path = require('node:path');
const express = require('express')
const app = express()
const cors = require('cors')
const expressLayouts = require('express-ejs-layouts')

const appRouter = require('./routes/appRouter.cjs')
const contactMessageRouter = require('./routes/contactMessageRouter')
const authRouter = require('./routes/authRouter')
const clinicHistoryRouter = require('./routes/clinicHistoryRouter')

// middlewares
app.use(cors()) // Por temas de seguridad del navegador
app.use(express.json()) // Para que lea los json del body
// Middleware para registrar cada solicitud recibida
app.use((req, res, next) => {
    console.log('Solicitud recibida:', req.method, req.url);
    next(); // Llama a next() para pasar el control al siguiente middleware
});
// Configurar el directorio de vistas y el motor de plantillas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// middleware para hacer layouts con ejs
app.use(expressLayouts)
// Servidor de archivos estáticos
app.use(express.static('public', { extensions: ["html", "css", "js", "png"] })) 
// app.use(express.static(path.join(__dirname, 'public'))) 


// Rutas de aplicacion
app.use('/', appRouter);


// Rutas de API
app.use('/api/v1/contact-messages', contactMessageRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/clinic-histories', clinicHistoryRouter)

// Middleware para manejar rutas no encontradas (404)
app.use((req, res, next) => {
    res.status(404).send({ error: 'Ruta no encontrada' });
});

// Middleware para manejar otros errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Algo salió mal!' });
});

module.exports = app