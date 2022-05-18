import Ajv from 'ajv'
import ajvErrors from 'ajv-errors'
import ajvFormats from 'ajv-formats'
import log from './..//util/log'

const optionsAjv = {
    allErrors: true,
    strictTypes: false,
    strictTuples: false
}
const ajv = new Ajv(optionsAjv)
ajvErrors(ajv, { singleError: false })
ajvFormats(ajv)
const mapDataschemas = new Map()

class RequestValidatorController {
    validateRequest(nameSchema, request) {
        let schema = {}
        let validateSchema
        if (mapDataschemas.get(`./schema_${nameSchema}.json`) === undefined) {
            schema = require(`./../util/ValidateSchema/schema_${nameSchema}.json`)
            mapDataschemas.set(`./schema_${nameSchema}.json`, schema)
            ajv.addSchema(schema, nameSchema)
            validateSchema = ajv.getSchema(nameSchema)
        } else {
            validateSchema = ajv.getSchema(nameSchema)
        }

        if (!validateSchema(request)) {
            const messageError = `Error al realizar las validaciones [json-schema] : ${JSON.stringify(validateSchema.errors)}`
            log.error('', '', messageError)
            return false
        }

        if (!this.validateRequestInformation(request)) {
            return false
        }

        return true
    }

    validateRequestInformation(data) {
        //Validación Request
        if (data.startId > data.endId || data.endId < data.startId) {
            const messageError = `Error al realizar las validaciones [json-schema] : Rango errado`
            log.error('', '', messageError)
            return false
        }

        return true
    }
}

module.exports = {
    RequestValidatorController,
    requestValidatorController: new RequestValidatorController()
}
