const {Router} = require('express');
const createController = require('../controllers/create.controller');
const multerInit = require('../config/multer.config');
let router = Router();

router.post('/api/posts/create', multerInit, createController);

module.exports = router;