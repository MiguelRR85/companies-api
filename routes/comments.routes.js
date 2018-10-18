const express = require('express');
const router = express.Router({ mergeParams: true });
const comments = require('../controllers/comment.controller');
const secure = require('../middlewares/secure.middleware');

router.post('/',  comments.create);
router.delete('/:id', comments.delete);

module.exports = router;