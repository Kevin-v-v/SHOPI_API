const {Router} = require('express');
const authController = require('../controllers/auth.controller');
let router = Router();

router.get('/auth', authController.auth);

module.exports = router;