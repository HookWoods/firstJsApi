const model = require('../models/domain-model')

module.exports = {
    getDomain: function (req, res) {
        let domainName = req.query.domain
        if (typeof domainName !== 'undefined') {
            const getCrud = model.getDomain(domainName)
            res.send(getCrud)
        } else {
            res.send("set a link")
        }
    },

    createDomain: function (req, res) {
        let domainName = req.query.domain
        if (typeof domainName !== 'undefined') {
            const createCrud = model.createDomain(domainName)
            res.send(createCrud)
        } else {
            res.send("error while trying to create the domain")
        }
    },

    updateDomain: function (req, res) {
        let domainName = req.query.domain
        let newDomain = req.query.newDomain
        if (typeof domainName !== 'undefined' && typeof newDomain !== 'undefined') {
            const updateCrud = model.updateDomain(domainName, newDomain)
            res.send(updateCrud)
        } else {
            res.send("error while trying to update the domain")
        }
    },

    deleteDomain: function (req, res) {
        let domainName = req.query.domain
        if (typeof domainName !== 'undefined') {
            const deleteCrud = model.deleteDomain(domainName)
            res.send(deleteCrud)
        } else {
            res.send("error while trying to delete the domain")
        }
    },

    listDomains: function (req, res) {
        res.send(model.listDomain())
    }
}