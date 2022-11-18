const {Router} = require('express');
const updateController = require('../controllers/update.controller');
let router = Router();

router.put('/api/posts/update', updateController);

module.exports = router;