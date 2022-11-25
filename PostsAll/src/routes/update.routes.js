const {Router} = require('express');
const updateController = require('../controllers/update.controller');
const multerInit = require('../config/multer.config');
let router = Router();

router.put('/api/posts/update', multerInit, updateController);

module.exports = router;