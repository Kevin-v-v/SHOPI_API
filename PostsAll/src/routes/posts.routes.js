const {Router, json} = require('express');
const postsController = require('../controllers/posts.controller');
let router = Router();

router.get('/api/posts/get', json(), postsController.latest);
router.get('/api/posts/get/:id', json(), postsController.getOne);
router.get('/api/posts/getown', json(), postsController.ownPosts);
module.exports = router;