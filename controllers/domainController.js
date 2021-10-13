const model = require('../models/domainModel')
const utils = require("../helper/utils")

module.exports = {
    getDomain: (req, res) => {
        const domainName = req.query.domain
        res.send(typeof domainName !== 'undefined' ? model.getDomain(domainName) : "set a link")
    },

    createDomain: function (req, res) {
        const domainName = req.query.domain
        res.send(typeof domainName !== 'undefined' ? model.createDomain(domainName)
            : "error while trying to create the domain")
    },

    updateDomain: function (req, res) {
        const domainName = req.query.domain
        const newDomain = req.query.newDomain
        res.send(typeof domainName !== 'undefined' && typeof newDomain !== 'undefined' ?
            model.updateDomain(domainName, newDomain) : "error while trying to update the domain")
    },

    deleteDomain: function (req, res) {
        const domainName = req.query.domain
        res.send(typeof domainName !== 'undefined' ? model.deleteDomain(domainName)
            : "error while trying to delete the domain")
    },

    listDomains: function (req, res) {
        res.send(model.listDomain())
    }
}