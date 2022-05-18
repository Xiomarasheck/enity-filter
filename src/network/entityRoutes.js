import { Router } from 'express'
import { entityController } from './../controller/EntityController'

const entityRoutes = Router()
entityRoutes.post('/filter', entityController.filter)
export default entityRoutes
