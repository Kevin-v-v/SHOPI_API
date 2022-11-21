const Post = require('../models/Post.model');

module.exports = async function (req,res){
    const title = req.query.title;
    const user_id = req.headers['user-id']
    try{
        if(await Post.findOne({title, user_id, status:{$ne: 0}})){
            return res.json({
                success: true,
                msg: "Ya existe una publicación de este usuario con ese título",
                alreadyExists: true
            });
        }else{
            return res.json({
                success: true,
                msg: "No se encontró publicación con el mismo título",
                alreadyExists: false
            });
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: "Error al buscar publicaciones repetidas",
            alreadyExists: true
        });
    }
}