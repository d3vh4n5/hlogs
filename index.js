import app from "./src/app.js";
import { config } from "./src/config/config.js";

const PORT = config.app.port


app.listen(PORT, ()=>{
    console.log(`
        Nombre: G10 Backend Node
        Ambiente: ${config.env}
        Aplicacion funcionando en: http://localhost:${PORT}
    `)
})