import { requestValidatorController } from './RequestValidatorController'
import callEntityService from './../service/callEntityService'
import response from './../network/response'
import { statusResponse, messageResponse } from './../../config/serviceVariables'
import { sortBy } from 'lodash'
import log from './../util/log'

class EntityController {
    constructor() {
        this.error = false
    }

    async filter(req, res) {
        try {
            log.info('Inicio proceso filtrado de entidades')
            //Validación Request
            const responseValidate = requestValidatorController.validateRequest('entity_filter', req.body)
            if (!responseValidate) {
                return response.error(res, statusResponse.INPUT_ERROR, messageResponse[statusResponse.INPUT_ERROR])
            }

            const startId = req.body.startId || 5
            const endId = req.body.endId || 1
            let error = false
            let responseData = []

            for (let entity = endId; entity >= startId; entity--) {
                let responseEntity = await callEntityService(entity)
                if (responseEntity.error) {
                    error = true
                    break
                }

                responseData.push(responseEntity.data)
            }

            if (error) {
                log.info('Fin proceso filtrado de entidades')
                return response.error(res, statusResponse.RANGE_ERROR, messageResponse[statusResponse.RANGE_ERROR])
            }

            let responseDataSort = sortBy(responseData, ['name'], ['asc'])

            log.info('Fin proceso filtrado de entidades')
            return response.success(res, statusResponse.SUCCESS, responseDataSort)
        } catch (error) {
            log.error('EntityController', 'filter', error)
            response.error(res, statusResponse.INPUT_ERROR, messageResponse[statusResponse.INPUT_ERROR])
        }
    }
}

module.exports = {
    EntityController,
    entityController: new EntityController()
}
