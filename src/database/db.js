import { Sequelize } from "sequelize";
import { config } from "../config/config.js";

export const db = new Sequelize(
    config.database.name,
    config.database.user,
    config.database.password,
    {
        host: config.database.host,
        dialect: "mysql",
        port: config.database.port,
        logging: false // Esto es para que no muestre las consultas en la consola
    }
)

db.authenticate()
    .then(()=> console.log("Database connected!"))
    .catch(err=> console.error("Error al conectar la DB: " + err))

db.sync()
    .then(()=> console.log("DB Sincronizada"))
    .catch(err=> console.error("Error al sincronizar la DB: " + err))

