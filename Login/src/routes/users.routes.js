const {Router} = require('express');
const usersController = require('../controllers/users.controller');
let router = Router();

router.post('/api/user/add',usersController.register);

module.exports = router;