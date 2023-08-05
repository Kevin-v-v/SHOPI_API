const {Router, json} = require('express');
const authController = require('../controllers/auth.controller');
let router = Router();

router.get('/api/auth', json(), authController.auth);

module.exports = router;