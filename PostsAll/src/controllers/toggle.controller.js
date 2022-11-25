const User = require('../models/User.model');
const Post = require('../models/Post.model');

module.exports = async function(req,res){
    const user_id = req.headers['user-id'];
    const {post_id} = req.body;

    try{
    let post = await Post.findOne({_id: post_id, user_id});
    if(post){
        console.log(post);
        switch(post.status){
            case 0:
                return res.json({
                    success: false,
                    msg: "El post fue eliminado previamente"
                });
            case 1:
                post.status = 2;
                break;
            case 2:
                post.status = 1;
                break;
            default:
                return res.status(500).json({
                    success: false,
                    msg: "Ocurrio un error desconocido"
                });
        } 
        const result = await post.save();
        return res.json({
            success: true,
            msg: "Se realizó el cambio satisfactoriamente"
        });

    }else{
        res.status(404).json({
            success: false,
            msg: "El post no existe o el usuario no es quien lo publicó"
        })
    }
    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            msg: "Error al recuperar la publicación o guardarla"
        });
    }

}