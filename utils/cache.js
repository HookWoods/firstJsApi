function Cache() {
    let cacheLocal = Object.create(null);
    let size = 0;
    let debug = false;

    this.put = function (key, value, time, timeoutCallback) {
        if (debug) {
            console.log('caching: %s = %j (@%s)', key, value, time);
        }

        if (typeof time !== 'undefined' && (typeof time !== 'number' || isNaN(time) || time <= 0)) {
            throw new Error('Cache timeout must be a positive number');
        } else if (typeof timeoutCallback !== 'undefined' && typeof timeoutCallback !== 'function') {
            throw new Error('Cache timeout callback must be a function');
        }

        const oldRecord = cacheLocal[key];
        if (oldRecord) {
            clearTimeout(oldRecord.timeout);
        } else {
            size++;
        }

        const record = {
            value: value,
            expire: time + Date.now()
        };

        if (!isNaN(record.expire)) {
            record.timeout = setTimeout(function () {
                _del(key);
                if (timeoutCallback) {
                    timeoutCallback(key, value);
                }
            }.bind(this), time);
        }

        cacheLocal[key] = record;

        return value;
    };

    this.del = function (key) {
        let canDelete = true;

        const oldRecord = cacheLocal[key];
        if (oldRecord) {
            clearTimeout(oldRecord.timeout);
            if (!isNaN(oldRecord.expire) && oldRecord.expire < Date.now()) {
                canDelete = false;
            }
        } else {
            canDelete = false;
        }

        if (canDelete) {
            _del(key);
        }

        return canDelete;
    };

    function _del(key) {
        size--;
        delete cacheLocal[key];
    }

    this.clear = function () {
        for (let key in cacheLocal) {
            clearTimeout(cacheLocal[key].timeout);
        }
        size = 0;
        cacheLocal = Object.create(null);
    };

    this.get = function (key) {
        const data = cacheLocal[key];
        if (typeof data != "undefined") {
            if (isNaN(data.expire) || data.expire >= Date.now()) {
                return data.value;
            } else {
                size--;
                delete cacheLocal[key];
            }
        }
        return null;
    };

    this.has = function(key) {
        return typeof cacheLocal[key] != "undefined";
    }

    this.size = function () {
        return size;
    };

    this.debug = function (bool) {
        debug = bool;
    };

    this.keys = function () {
        return Object.keys(cacheLocal);
    };

    this.exportJson = function () {
        let plainJsCache = [];

        for (let key in cacheLocal) {
            plainJsCache.push(key);
        }

        return JSON.stringify(plainJsCache);
    };
}

module.exports = new Cache();
module.exports.Cache = Cache;
