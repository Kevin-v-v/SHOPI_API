const {Router} = require('express');
const categoriesController = require('../controllers/categories.controller');
let router = Router();

router.get('/api/categories', categoriesController.getCategories);

module.exports = router;