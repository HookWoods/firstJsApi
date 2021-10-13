const cache = require('./cache');
const fs = require("fs");
const pattern = new RegExp('^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}' +
    '|((\\d{1,3}\\.){3}\\d{1,3}))(\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)' +
    '?(\#[-a-z\\d_]*)?$', 'i').compile();
const axios = require("axios")
module.exports = {
    getRouterJson: function () {
        return readJsonFileSync('./stockage/domains.json');
    },

    saveRouterJson: function (jsonContent) {
        return saveJsonFile('./stockage/domains.json', jsonContent);
    },

    getCache: function () {
        return cache;
    },

    isValidURL: function (string) {
        return pattern.test(string)
    },

    isSiteWorking: function (site) {
        let working = false
        axios.get(site).then(function (response) {
            if (!response.request) {
                working = true
            }
        });

        return working
    }
}

function readJsonFileSync(filepath, encoding) {
    if (typeof (encoding) == 'undefined') {
        encoding = 'utf8';
    }
    const file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

function saveJsonFile(filepath, jsonContent) {
    fs.writeFile(filepath, jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file has been saved.");
    });
}