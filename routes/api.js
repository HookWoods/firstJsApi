const express = require('express');
const router = express.Router();
const controller = require('../controllers/domainController')

router.get('/', (req, res) => controller.listDomains(req, res))
router.get('/domains', (req, res) => controller.getDomain(req, res))
router.delete('/domains', (req, res) => controller.deleteDomain(req, res))
router.post('/domains', (req, res) => controller.createDomain(req, res))
router.put('/domains', (req, res) => controller.updateDomain(req, res))

module.exports = router;