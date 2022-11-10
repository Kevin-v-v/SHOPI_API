const {Router} = require('express');
const verifyController = require('../controllers/verify.controller');

let router = Router();

router.get('/api/verify/:token', verifyController);

module.exports = router;