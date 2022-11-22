const {Router} = require('express');
const usuarioController = require('../controllers/usuario.controller');
let router = Router();

router.get('/', usuarioController);

module.exports = router;