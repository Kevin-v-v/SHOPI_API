const {Router} = require('express');
const loginController = require('../controllers/login.controller');
let router = Router();

router.post('/login', loginController.login);

module.exports = router;