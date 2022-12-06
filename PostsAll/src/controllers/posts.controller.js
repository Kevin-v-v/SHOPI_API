const User = require('../models/User.model');
const Post = require('../models/Post.model');


module.exports = {
    latest: async function(req,res){
        let page = 0;
        let total_count = 0;
        let category = req.query.category;
        let keywordRegex = new RegExp(req.query.keyword, "i") ;
        let parameters = {
            status: 1
        };
        if(category) parameters.category = category

        parameters.title = {
            $regex : keywordRegex
        };
        
        if(!isNaN(req.query.page)){
            page = req.query.page - 1;
        } 
            let posts;
            let pages = 0;
            let count = 0;
        try{

                count = await Post.countDocuments(parameters);
            
            if(count > 0){
                pages = Math.ceil(count/12);
                if(page + 1 > pages){
                    return res.json({
                        success: false,
                        msg: "Página no válida"
                        });
                }else{
                        posts = await Post.find(parameters).skip(page * 12).sort({ _id: -1 }).limit(12)
                }
            }else{
                return res.json({
                    success: true, 
                    total_count
                });
            }

            }catch(err){
            console.log(err);
            res.status(500).json({
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
                    let data = {
                        id: post._id,
                        title: post.title,
                        description: post.description,
                        user_username: user.username,
                        user_name : user.name,
                        user_last_name: user.last_name,
                        user_image_url: user.image,
                        post_image_url: post.image,
                        category: post.category,
                        whatsapp_url : `https://wa.me/+521${user.phone}`
                    }
                    result.data.push(data);
                }catch(err){
                    console.log(err);
                }
            }
            res.json(result);
    },
    getOne: async function(req,res){
        const post_id = req.params.id;
        const user_id = req.headers['user-id'];
        
        try{
            let post = await Post.findById(post_id); 
            if(post){
                if(post.status == 0){
                    return res.status(404).json({
                        success: false,
                        msg: "El post no existe"
                    });
                }else if(post.status == 2){
                    if(post.user_id != user_id){
                        return res.status(404).json({
                            success: false,
                            msg: "El post no está disponible"
                        });
                    }
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
                            user_image_url: user.image,
                            post_image_url: post.image,
                            category: post.category,
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
    },
    ownPosts : async function(req,res){
        const user_id = req.headers['user-id'];
        let page = 0;
        let total_count = 0;

        if(!isNaN(req.query.page)){
            page = req.query.page - 1;
        } 
            let posts;
            let pages = 0;
            let count = 0;
        try{
            
            count = await Post.countDocuments({user_id, status: {$ne: 0}});
            
            if(count > 0){
                pages = Math.ceil(count/12);
                if(page > pages){
                    return res.json({
                        success: false,
                        msg: "Página no válida"
                        });
                }else{
                        posts = await Post.find({user_id, status: {$ne: 0}}).skip(page * 12).sort({ _id: -1 }).limit(12)
                }
            }else{
                return res.json({
                    success: true, 
                    total_count: count
                });
            }

            }catch(err){
            console.log(err);
            res.status(500).json({
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
                    let data = {
                        id: post._id,
                        title: post.title,
                        description: post.description,
                        user_username: user.username,
                        user_name : user.name,
                        user_last_name: user.last_name,
                        post_status: post.status,
                        image: post.image,
                        category: post.category,
                        whatsapp_url : `https://wa.me/+521${user.phone}`
                    }
                    result.data.push(data);
                }catch(err){
                    console.log(err);
                }
            }
            res.json(result);
    }


}