const express = require('express');
const companies = require('../controllers/companies.controller')
const router = express.Router();


router.get('/', companies.list);
router.post('/', companies.create);
router.get('/:id', companies.get);
router.post('/:id', companies.delete);


module.exports = router;