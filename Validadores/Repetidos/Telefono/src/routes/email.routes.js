const {Router} = require('express');
const emailController = require('../controllers/email.controller');
let router = Router();

router.get('/', emailController);

module.exports = router;