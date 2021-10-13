const utils = require("../utils/utils");
module.exports = {

    getDomain: function (domainName) {
        if (utils.getCache().has(domainName)) {
            return "The url exist: " + domainName;
        } else {
            return "Error, the domain doesn't exist'!"
        }
    },

    createDomain: function (domainName) {
        if (!utils.getCache().has(domainName)) {
            utils.getCache().put(domainName, "")

            let json = utils.getRouterJson();
            json.push(domainName)

            utils.saveRouterJson(JSON.stringify(json))
            return "Nice, the url has been created in the router !"
        } else {
            return "Error, the domain already exists in the router!"
        }
    },

    updateDomain: function (domainName, newDomain) {
        if (utils.getCache().has(domainName)) {
            utils.getCache().del(domainName)
            utils.getCache().put(newDomain, "")

            let json = utils.getRouterJson();
            for (let object in json) {
                if (json[object] === domainName) {
                    json[object] = newDomain
                }
            }

            utils.saveRouterJson(JSON.stringify(json))
            return "Nice, the url has been updated in the router !"
        } else {
            return "Error, this domain is not yet registered!"
        }
    },

    deleteDomain: function (domainName) {
        if (utils.getCache().has(domainName)) {
            utils.getCache().del(domainName)

            let json = utils.getRouterJson();
            for (let object in json) {
                if (json[object] === domainName) {
                    json.splice(object, 1)
                }
            }

            utils.saveRouterJson(JSON.stringify(json))
            return "Nice, the url has been removed from the router !"
        } else {
            return "Error, this domain is not registered !"
        }
    },

    listDomain: function () {
        return utils.getCache().exportJson();
    }
}