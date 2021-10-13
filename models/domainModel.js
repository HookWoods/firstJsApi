const utils = require("../helper/utils")
const axios = require("axios");

const pattern = new RegExp('^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}' +
    '|((\\d{1,3}\\.){3}\\d{1,3}))(\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)' +
    '?(\#[-a-z\\d_]*)?$', 'i').compile();

module.exports = {

    getDomain: (domainName) => {
        if (utils.getCache().has(domainName)) {
            return "The url exist: " + domainName;
        } else {
            return "Error, the domain doesn't exist'!"
        }
    },

    createDomain: (domainName) => {
        if (!utils.getCache().has(domainName)) {
            if (isValidURL(domainName)) {
                if (isSiteWorking(domainName)) {
                    utils.getCache().put(domainName, "")

                    let json = utils.getRouterJson();
                    json.push(domainName)

                    utils.saveRouterJson(JSON.stringify(json))
                    return "Nice, the url has been created in the router !"
                }
                return "Error, this site can't be reached !"
            }
            return "Error, this site doesn't pass the regex test !"
        }
        return "Error, the domain already exists in the router!"
    },

    updateDomain: (domainName, newDomain) => {
        if (utils.getCache().has(domainName)) {
            if (isValidURL(domainName)) {
                if (isSiteWorking(domainName)) {
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
                }
                return "Error, this site can't be reached !"
            }
            return "Error, this site doesn't pass the regex test !"
        } else {
            return "Error, this domain is not yet registered!"
        }
    },

    deleteDomain: (domainName) => {
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

    listDomain: () => utils.getCache().exportJson()

}

function isValidURL(string) {
    return pattern.test(string)
}

function isSiteWorking(site) {
    let working = false
    axios.get(site).then(function (response) {
        if (!response.request) {
            working = true
        }
    });

    return working
}