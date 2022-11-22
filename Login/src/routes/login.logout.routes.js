const {Router} = require('express');
const loginController = require('../controllers/login.controller');
const logoutController = require('../controllers/logout.controller');
let router = Router();

router.post('/api/login', loginController.login);
router.delete('/api/logout', logoutController);
module.exports = router;