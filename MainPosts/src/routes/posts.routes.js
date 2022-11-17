const {Router} = require('express');
const postsController = require('../controllers/posts.controller');
let router = Router();

router.get('/api/posts/get', postsController.latest);
router.get('/api/posts/get/:id', postsController.getOne);
module.exports = router;