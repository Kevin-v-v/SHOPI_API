const {Router} = require('express');
const registerController = require('../controllers/register.controller');
const multerInit = require('../config/multer.config');
let router = Router();

router.post('/api/user/add', multerInit, registerController.register);

module.exports = router;