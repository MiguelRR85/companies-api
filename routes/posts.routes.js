const express = require('express');
const router = express.Router();
const posts = require('../controllers/posts.controller');

router.post('/', posts.create);
router.get('/', posts.list);
router.post('/:id', posts.edit);
router.post('/:id', posts.delete);

module.exports = router;