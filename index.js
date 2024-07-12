import e from "express";
import { config } from "dotenv";

const app = e()
config()

const PORT = process.env.PORT || '3000'

app.get('/', (req, res)=> {
    res.json({msg: "Hola, estoy funcionando"})
})

app.listen(PORT, ()=>{
    console.log(`App corriendo en http://localhost:${PORT}`)
})