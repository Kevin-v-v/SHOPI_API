const {Router} = require('express');
const changeMailController = require('../controllers/changemail.controller');

let router = Router();

router.patch('/api/user/update/email', changeMailController);

module.exports = router;