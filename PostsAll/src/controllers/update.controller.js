const Post = require('../models/Post.model');
const Category = require('../models/Category.model');
const axios = require('axios').default || require('axios');
const fs = require('fs');
const FormData = require('form-data');
module.exports = async function(req,res){
    const {post_id, title, description, category} = req.body;
    const user_id = req.headers['user-id'];
    

    //si los datos no están completos
    if(!post_id || !title || !description || !category){
        res.json({
            success: false,
            msg: "Datos incompletos"
        });
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

        

        //si trae o no una imagen nueva
    let image_response;
    if(req.file){
        const formData = new FormData();

        formData.append('key', process.env.THUMBSNAP_KEY);
        formData.append('media', fs.createReadStream(req.file.path));
        image_response = await axios.post('https://thumbsnap.com/api/upload', formData, {
            headers: formData.getHeaders()
        });
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.log(err);
            }
            console.log("Image Locally Deleted Successfully");
        });

        if(!image_response.data.success){
            console.log(image_response.data.error.message);
            return res.status(500).json({
                success: false,
                msg: "No se pudo guardar la imagen"
            });
        }else{
            post.image = image_response.data.data.media
        }

    }
        post.title = title;
        post.description = description;
        
        try{
            result = await post.save();
            console.log(result);
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