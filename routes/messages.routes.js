const express = require('express');
const router = express.Router();
const messages = require('../controllers/messages.controller');

router.post('/', messages.create);
router.get('/', messages.list);
router.post('/:id', messages.edit);
router.post('/:id', messages.delete);

module.exports = router;