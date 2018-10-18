const express = require('express');
const router = express.Router({ mergeParams: true });
const uploader = require('../config/multer.config');
const posts = require('../controllers/posts.controller');
const secure = require('../middlewares/secure.middleware');
const user = require('../middlewares/user.middleware');

router.get('/:companyId', posts.list);
router.post('/:companyId', posts.create);
router.get('/:id', posts.get);
router.delete('/:id', posts.delete);

module.exports = router;