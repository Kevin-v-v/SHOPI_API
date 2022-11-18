const Post = require('../models/Post.model');
const Category = require('../models/Category.model');

module.exports = async function(req,res){
    const {post_id, title, description, category} = req.body;
    const user_id = req.headers['user-id'];
    let image = null;
    if(req.file){
        image = req.file.path;
    }
    let post;
    let found = null;
    let result;
    try{
        post = await Post.findOne({post_id, user_id, status:{$ne: 0}});
    }catch(err){
        console.log(err);
        return res.json({
            success: false,
            msg: "Error al buscar el post"
        })
    }
    if(post){
        if(await Post.findOne({title, user_id, status:{$ne: 0}, _id: {$ne: post._id}})){
            return res.json({
                success: false,
                msg: "Ya existe un post con ese nombre que le pertenece al mismo usuario"
            })
        }
        if(title){
            post.title = title;
        }
        if(description){
            post.description = description;
        }
        try{
            if(category){
            found = await Category.findOne({name: category});
            }
        }catch(err){
            console.log(err);
        }
        if(found){
            post.category = category;
        }else{
            post.category = "Ninguna";
        }
        if(image){
            post.image = image;
        }
        try{
            result = await post.save();
        }catch(err){
            console.log(err);
            return res.status(500).json({
                success: false,
                msg: "Error al guardar el post"
            })
        }
        return res.json({
            success: true,
            msg: "Post actualizado"
        })
    }else{
        return res.json({
            success: false,
            msg: "Post no existe"
        })
    }
}