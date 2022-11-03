const {Router} = require('express');
const mailController = require('../controllers/mail.controller');
let router = Router();

router.get('/sendMail', mailController);

module.exports = router;