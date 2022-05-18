import path from "path"
import log from "../src/util/log"

const FILES = {
    "LOCAL": "local.env",
    "DEV": "dev.env"
}


export const loadVariablesEnvironment = () => {
    try {
        if(process.env.STAGE === "LOCAL"){
            const result = require("dotenv").config({
                path: path.resolve("./config/env", FILES[process.env.STAGE || "LOCAL"])
            })

            if (result.error) {
                log.error("[ERROR-ENVS] Archivo no encontrado, o variable STAGE mal configurada", result.error)
                process.exit(1)
            }
        }
    } catch (error) {
        log.error("[ERROR-ENVS-EXCEPTION] Archivo no encontrado, o variable STAGE mal configurada", error)
        process.exit(1)
    }
}