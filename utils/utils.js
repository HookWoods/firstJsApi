const cache = require('./cache');
const fs = require("fs");

module.exports = {
    getRouterJson: function () {
        return readJsonFileSync('./stockage/domains.json');
    },

    saveRouterJson: function (jsonContent) {
        return saveJsonFile('./stockage/domains.json', jsonContent);
    },

    getCache: function () {
        return cache;
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