const Category = require('../models/Category.model');

module.exports = {
    getCategories : async function(req,res){
        let categories;
        try{
            categories = await Category.find({});
            // res.json({
            //     success: true,
            //     categories
            // });
        }catch(err){
            console.log(err);
            return res.status(500).json({
                success: false,
                msg: "Error al buscar categorias"
            });
        }
        let result = {
            success: true,
            msg: "",
            data: []
        }
        for (let category of categories){
            result.data.push(category.name);
        }

        return res.json(result);

    }
}