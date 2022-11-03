const {Router} = require('express');
const usersController = require('../controllers/users.controller');
let router = Router();

router.post('/api/user/add',usersController.register);
router.get('/api/user/verify/:token', usersController.verify)
module.exports = router;