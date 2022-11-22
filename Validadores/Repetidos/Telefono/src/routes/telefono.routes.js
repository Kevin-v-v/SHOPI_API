const {Router} = require('express');
const telefonoController = require('../controllers/telefono.controller');
let router = Router();

router.get('/', telefonoController);

module.exports = router;