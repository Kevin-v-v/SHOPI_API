const {Router} = require('express');
const toggleController = require('../controllers/toggle.controller');
let router = Router();

router.patch('/api/posts/toggle', toggleController);


module.exports = router;