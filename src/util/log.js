const log4js = require('log4js')
const logger = log4js.getLogger()

//Config Global logs
log4js.configure({
    appenders: {
        out: {
            type: 'stderr',
            layout: {
                type: 'pattern',
                pattern: '[%p] [%m]'
            }
        }
    },
    categories: {
        default: {
            appenders: ['out'],
            level: 'ALL'
        }
    }
})

exports.info = function(message = '') {
    let logMessage = null
    logger.level = 'info'
    logMessage = logger.info('', message)
    return logMessage
}

exports.warning = function (message = '') {
    let logMessage = null
    logger.level = 'warning'
    logMessage = logger.warn('', message)
    return logMessage
}

exports.error =  function error(clas = '', method = '', message = '') {
    let messageFinal = null
    if (message.stack != undefined) {
        messageFinal = message.stack.split('\n').join(';')
    } else {
        messageFinal = message
    }
    let logMessage = null
    logger.level = 'error'
    logMessage = logger.error(`${clas}.${method}`, messageFinal)
    return logMessage
}

exports.debug = function debug(clas = '', method = '', message = '') {
    let tracing = 'DEBUG'
    let logMessage = null
    logger.level = 'debug'
    if (tracing === 'DEBUG') {
        logMessage = logger.debug(`${clas}.${method}`, message)
        return logMessage
    }
}
