const Post = require('../models/Post.model');
const User = require('../models/User.model');
const Category = require('../models/Category.model');
module.exports = async function (req, res){
    const {title, description, category} = req.body;
    
    const image = req.file;
    const user_id = req.headers['user-id'];
    try{
        let user = await User.findOne({_id: user_id});
        if(user){
            if(user.user_status == 0){
                return res.json({
                    success: false,
                    msg: "El usuario no está verificado"
                });
            }else if(user.user_status == 2){
                return res.json({
                    success: false,
                    msg: "El usuario ha sido baneado por mal comportamiento"
                });
            }
        }else{
            return res.status(500).json({
                success: false,
                msg: "Error al verificar información del usuario"
            })
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            msg: "Error al verificar información del usuario"
        })
    }


    try{
        if(await Post.findOne({title, user_id, status:{$ne: 0}})){
            return res.json({
                success: false,
                msg: "Ya existe una publicación de este usuario con ese título"
            })
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: "Error al buscar publicaciones repetidas"
        });
    }
    let found = null;
    try{
        if(category){
        found = await Category.findOne({name: category});
        }
    }catch(err){
        console.log(err);
    }
    let data = {
        title,
        description,
        status: 1,
        user_id,
        image: image.path
    };
    if(found){
        data.category = category;
    }else{
        data.category = "Ninguna";
    }
    
    let post = Post(data);
    try{
        const postSaved = await post.save();
        return res.send({
            success: true,
            msg: "Publicación guardada con éxito"
        })
    }catch(err){
        console.log(err);
        res.status(500).send({
            success: false,
            msg: "No se pudo guardar la publicación"
        });
    }
}