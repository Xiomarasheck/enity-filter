import NodeCache from 'node-cache'
const cache = new NodeCache({ stdTTL: 15 })

class CacheAdapter {
    constructor() {
        this.timeout = 10000
    }

    setValue(key, value) {
        cache.set(key, value)
    }

    getValue(key) {
        if (cache.has(key)) {
            return cache.get(key)
        }
        return false
    }
}

module.exports = {
    CacheAdapter,
    cacheAdapter: new CacheAdapter()
}
