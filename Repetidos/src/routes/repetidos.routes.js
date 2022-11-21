const {Router} = require('express');
const postTitleController = require('../controllers/post.title.controller');
const phoneController = require('../controllers/phone.controller');
const emailController = require('../controllers/email.controller');
const usernameController = require('../controllers/username.controller');
let router = Router();

router.get('/api/repetidos/post', postTitleController);
router.get('/api/repetidos/email', emailController);
router.get('/api/repetidos/phone', phoneController);
router.get('/api/repetidos/username', usernameController);

module.exports = router;