const {Router, json} = require('express');
const deleteController = require('../controllers/delete.controller');
let router = Router();

router.delete('/api/posts/delete', json(), deleteController);


module.exports = router;