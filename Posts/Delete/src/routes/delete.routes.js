const {Router} = require('express');
const deleteController = require('../controllers/delete.controller');
let router = Router();

router.delete('/api/posts/delete', deleteController);


module.exports = router;