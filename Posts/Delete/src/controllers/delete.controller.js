const User = require('../models/User.model');
const Post = require('../models/Post.model');

module.exports = async function(req,res){
    const user_id = req.headers['user-id'];
    const {post_id} = req.body;
    let admin = false;
    try{
        let user = await User.findById(user_id);
        if(user){
            if(user.user_type === 0){
                admin = true
            }
        }else{
            return res.status(500).json({
                success: false,
                msg: "Usuario no válido"
            });
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: "El usuario no pudo ser validado"
        });
    }
    let post = null;
    try{
    if(admin){
         post = await Post.findById(post_id);
    }else{
         post = await Post.findOne({_id: post_id, user_id});
    }
    if(post){
        switch(post.status){
            case 0:
                return res.json({
                    success: false,
                    msg: "El post fue eliminado previamente"
                });
            case 1:
            case 2:
                post.status = 0;
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
            msg: "Se realizó la eliminación satisfactoriamente"
        });

    }else{
        res.status(404).json({
            success: false,
            msg: "El post no existe o no tiene permisos para eliminar el post"
        });
    }
    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            msg: "Error al recuperar la publicación o guardarla"
        });
    }

}