const {Router} = require('express');
const sendEmail = require('../sendMail');
let router = Router();

router.get('/', sendEmail);

module.exports = router;