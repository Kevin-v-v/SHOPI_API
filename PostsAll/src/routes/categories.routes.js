const {Router, json} = require('express');
const categoriesController = require('../controllers/categories.controller');
let router = Router();

router.get('/api/categories', json(), categoriesController.getCategories);
 
module.exports = router;