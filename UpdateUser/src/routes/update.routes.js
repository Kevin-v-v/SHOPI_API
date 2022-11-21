const {Router} = require('express');
const mailController = require('../controllers/mail.controller');
const phoneController = require('../controllers/phone.controller');
const passwordController = require('../controllers/pass.controller');
const pictureController = require('../controllers/picture.controller');
let router = Router();

router.patch('/api/user/update/email', mailController);
router.patch('/api/user/update/phone', phoneController);
router.patch('/api/user/update/password', passwordController);
router.patch('/api/user/update/picture', pictureController);

module.exports = router;