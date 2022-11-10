const {Router} = require('express');
const controller = require('controller');
let router = Router();

router.get('/', controller);

module.exports = router;