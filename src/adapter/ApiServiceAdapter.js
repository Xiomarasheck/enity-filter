import axios from "axios"

class ApiServiceAdapter {
    constructor() {
        this.params = {}
        this.timeout = 10000
        this.httpsAgent = null
    }

    setUrl(url) {
        this.url = url
        return this
    }
    setHeaders(headers) {
        this.headers = headers
        return this
    }
    setData(data) {
        this.data = data
        return this
    }
    setQuery(query) {
        this.query = query
        return this
    }
    setParams(params) {
        this.params = params
        return this
    }

    setTimeOut(timeout) {
        this.timeout = timeout
        return this
    }

    setHttpsAgent(httpsAgent) {
        this.httpsAgent = httpsAgent
        return this
    }

    setDataParams(method, urlService, dataSendService) {
        this.params = {
            headers: {
                'content-type': 'application/json'
            },
            method: method,
            url: urlService,
            data: dataSendService,
            json: true
        }

        return this
    }

    async requestFromParams() {
        return this.request(this.params)
    }

    async get() {
        return this.request({
            headers: this.headers,
            url: this.url,
            query: this.query,
            params: this.params,
            timeout: this.timeout
        })
    }

    async request(params) {
        return new Promise(async (resolve, reject) => {
            await axios(params)
                .then((res) => {
                    return resolve(res)
                })
                .catch((error) => {
                    return reject(error)
                })
        })
    }
}

module.exports = {
    ApiServiceAdapter,
    apiServiceAdapter: new ApiServiceAdapter()
}
