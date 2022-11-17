const User = require('../models/User.model');
const Post = require('../models/Post.model');


module.exports = {
    latest: async function(req,res){
        let page = 0;
        let total_count = 0;
        let category = req.query.category;

        if(!isNaN(req.query.page)){
            page = req.query.page - 1;
        } 
            let posts;
            let pages = 0;
            let count = 0;
        try{
            if(category){
                count = await Post.countDocuments({status: 1, category})
            }else{
                count = await Post.countDocuments({status: 1});
            }
            if(count > 0){
                pages = Math.ceil(count/10);
                if(page > pages){
                    return res.json({
                        success: false,
                        msg: "Página no válida"
                        });
                }else{
                    if(category){
                        posts = await Post.find({status: 1, category}).skip(page * 10).sort({ _id: -1 }).limit(10)
                    }else{
                        posts = await Post.find({status: 1}).skip(page * 10).sort({ _id: -1 }).limit(10)
                    }
                }
            }else{
                return res.json({
                    success: true, 
                    total_count
                });
            }

            }catch(err){
            console.log(err);
            res.json({
                success: false,
                msg: "Error al buscar publicaciones"
            });
            }

            
            let result = {
                success: true,
                page: page + 1,
                total_pages: pages,
                document_count: count,
                data: []
            };

           for(let post of posts){
                    
                try{
                    let user = await User.findById(post.user_id);
                    if(!user){
                        continue;
                    }
                    result.data.push({
                        id: post._id,
                        title: post.title,
                        description: post.description,
                        user_name : user.name,
                        user_last_name: user.last_name,
                        image: post.image,
                        whatsapp_url : `https://wa.me/+521${user.phone}`
                    });
                }catch(err){
                    console.log(err);
                }
            }
            res.json(result);
    },
    getOne: async function(req,res){
        const post_id = req.params.id;
        try{
            let post = await Post.findById(post_id); 
            if(post){
                if(post.status != 1){
                    return res.status(404).json({
                        success: false,
                        msg: "El post no está disponible"
                    });
                }
                try{
                    let user = await User.findById(post.user_id);
                    if(user){
                    return res.json({
                        success: true,
                        msg: "",
                        data : { 
                            id: post._id,
                            title: post.title,
                            description: post.description,
                            user_name : user.name,
                            user_last_name: user.last_name,
                            image: post.image,
                            whatsapp_url : `https://wa.me/+521${user.phone}`
                        }
                    });
                    }else{
                        return res.status(500).json({
                            success: false,
                            msg: "Vendedor no válido"
                        });
                    }
                }catch(err){
                    return res.status(500).json({
                        success: false,
                        msg: "Error al buscar informacion del vendedor"
                    });
                }
            }else{
                return res.status(404).json({
                    success: false,
                    msg: "Post no encontrado"
                });
            }
        }catch(err){
            return res.status(500).json({
                success: false,
                msg: "Error al buscar el post"
            });
        }
    }


}