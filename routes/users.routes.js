const express = require('express');
const router = express.Router();
const uploader = require('../config/multer.config');
const users = require('../controllers/users.controller');
const secure = require('../middlewares/secure.middleware');
const user = require('../middlewares/user.middleware');

router.post('/', uploader.single('avatar'), users.create);
router.get('/', secure.isAuthenticated, users.list);
router.get('/:id', secure.isAuthenticated, users.get)
router.delete('/:id', secure.isAuthenticated, user.isMe(), users.delete)

module.exports = router;