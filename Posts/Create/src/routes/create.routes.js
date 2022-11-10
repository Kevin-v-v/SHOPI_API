const {Router} = require('express');
const createController = require('../controllers/create.controller');
let router = Router();

router.get('/api/posts/create', createController);

module.exports = router;