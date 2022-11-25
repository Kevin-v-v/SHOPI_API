const {Router, json} = require('express');
const toggleController = require('../controllers/toggle.controller');
let router = Router();

router.patch('/api/posts/toggle', json(), toggleController);


module.exports = router;