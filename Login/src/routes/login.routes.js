const {Router} = require('express');
const loginController = require('../controllers/login.controller');
let router = Router();

router.post('/api/login', loginController.login);

module.exports = router;