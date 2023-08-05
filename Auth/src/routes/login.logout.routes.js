const {Router, json} = require('express');
const loginController = require('../controllers/login.controller');
const logoutController = require('../controllers/logout.controller');
let router = Router();

router.post('/api/login', json(), loginController.login);
router.delete('/api/logout', json() ,logoutController);
module.exports = router;