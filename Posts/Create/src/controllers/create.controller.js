const Post = require('../models/Post.model')

module.exports = async function (req, res){
    const {title, description, userId} = req.body
    const image = req.file
    let data = {
        title,
        description,
        status: 1,
        userId,
        image: image.path
    };
    let post = Post(data);
    try{
        const postSaved = await post.save();
    }catch(err){
        console.log(err);
        res.send({
            success: false,
            msg: "No se pudo guardar la publicación"
        });
    }
}