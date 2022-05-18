require('./config').loadVariablesEnvironment()

const consts = Object.freeze({
    SERVICE_VERSION: process.env.SERVICE_VERSION,
    TRACING_LEVEL: process.env.TRACING_LEVEL,
    HOST_ENTITY: process.env.HOST_ENTITY
})

const api = Object.freeze({
    SERVICE_PORT: process.env.SERVICE_PORT
})

const statusResponse = Object.freeze({
    SUCCESS: 200,
    INPUT_ERROR: 400,
    RANGE_ERROR: 404
})

const messageResponse = Object.freeze({
    400: 'Error en validación datos de entrada',
    404: "Error no se encuentra para rango especificado"
})

module.exports = Object.freeze({ consts, api, statusResponse,messageResponse })
