const {Router} = require('express');
const mailController = require('../controllers/mail.controller');
let router = Router();

router.get('/api/sendmail', mailController);

module.exports = router;