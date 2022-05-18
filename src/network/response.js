exports.success = function ( res, status,data) {
    let statusCode = status || 200
    let dataMessage = data || {}
    return res.status(statusCode).json({
        items: dataMessage
    })
}

exports.error = function (res, status, messageError) {
    let statusCode = status || 500
    let statusMessage = messageError || 'Internal Service Error'

    return res.status(statusCode).json({
        Error: statusMessage
    })
}

