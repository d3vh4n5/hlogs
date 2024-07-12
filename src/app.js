import e from "express";
import cors from 'cors'


// Creo la app
const app = e()

//middlewares
app.use(cors())
app.use(e.json())
// Middleware para registrar cada solicitud recibida
app.use((req, res, next) => {
    console.log('Solicitud recibida:', req.method, req.url);
    next()
});
app.use(e.static('public'))

//App routes
app.get('/', (req, res)=>{
    res.json({
        msg: "Aplicación funcionando"
    })
})

// API Routes
app.use('/api/v1/test', (req, res) => {
    res.json({
        msg: "Estas en la api"
    })
})

// Middleware para manejar rutas no encontradas (404)
app.use((req, res, next) => {
    res.status(404).send({ error: 'Ruta no encontrada' });
});

// Middleware para manejar otros errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Algo salió mal!' });
});

export default app
