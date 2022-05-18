import { apiServiceAdapter } from '../adapter/ApiServiceAdapter'
import { consts } from './../../config/serviceVariables'
import { get } from 'lodash'
import log from './../util/log'

module.exports = async (entityId) => {
    return new Promise(async (resolve) => {
        try {
            const reponseEntity = await apiServiceAdapter
                .setHeaders({
                    'content-type': 'application/json'
                })
                .setUrl(consts.HOST_ENTITY + entityId)
                .setQuery(1)
                .get()
            
            if (get(reponseEntity, 'data.code') === 'F132') {
                let mapEntity = { entityId: 'entityId', name: 'name', identificationNumber: 'identificationNumber', expirationDate: 'expirationDate', contactName: 'contactName', contactEmail: 'contactMail', logo: 'logo' }
                let orderData = Object.keys(mapEntity).sort()
                return resolve({
                    error: false,
                    data: orderData.sort().reduce((obj, key) => {
                        obj[key] = reponseEntity.data.data[mapEntity[key]]
                        return obj
                    }, {})
                })
            }

            log.error('callEntityService', 'get', "No se econtro información de la entidad")
            return resolve({
                error: true,
                data: {}
            })
        } catch (error) {
            log.error('callEntityService', 'get', error)
            return resolve({
                error: true,
                data: {}
            })
        }
    })
}
