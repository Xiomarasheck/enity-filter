import express from 'express'
import { api } from './config/serviceVariables'
import entityRoutes from './src/network/entityRoutes'
import response from './src/network/response'
import { statusResponse, messageResponse } from './config/serviceVariables'
import log from './src/util/log'

//Creación Servidor
const app = express()
app.disable('x-powered-by')

app.use(express.urlencoded({ extended: true, limit: '60mb' }))
app.use(express.json({ limit: '60mb' }))

app.use((err, _req, res, _next) => {
    log.error('PARECE QUE HUBO UN ERROR', '', err)
    response.error(res, statusResponse.INPUT_ERROR, messageResponse[statusResponse.INPUT_ERROR])
})

//Rutas
app.use('/entities', entityRoutes)

app.get('/develop/health', (_req, res) =>
    res.status(200).send({
        message: 'Service Working.'
    })
)

//Service
app.listen(api.SERVICE_PORT, () => {
    log.info(`Server is running on PORT ${api.SERVICE_PORT}`)
})


export default app