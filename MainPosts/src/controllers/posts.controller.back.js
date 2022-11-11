const User = require('../models/User.model');
const Post = require('../models/Post.model');

async function hasCategoryThenFind(category = null){
    let posts;
    //try{
        if(category){
            posts = await Post.find({status: 1, category}).skip(page * 10).sort({ _id: -1 }).limit(10)
        }else{
            posts = await Post.find({status: 1}).skip(page * 10).sort({ _id: -1 }).limit(10)
        }
        return posts;
    //}catch(err){
        //return err;
    //}
}

async function hasCategoryThenCount(category = null){
    let count;

    try{
        if(category){
            count = await Post.countDocuments({status: 1, category})
        }else{
            count = await Post.countDocuments({status: 1});
        }
    }catch(err){
        console.log(err);
    }
    return count;
}

function validatePages(count, page, pages){

    if(count == 0 || pages == 0){
        return 0; 
    }
    if(page > pages){
        return -1;
    }
    return 1;
}



module.exports = {
    latest: async function(req,res){
        let page = 0;
        let total_count = 0;
        let category = req.query.category;

        if(!Number.isNaN(req.query.page)){
            page = req.query.page - 1;
        } 

            let posts;
            let pages = 0;
            let count = 0;
        try{
             count = await hasCategoryThenCount(category);
            if(count){
                pages = Math.ceil(count/10);
                switch(validatePages(count, page, pages)){
                    case -1: 
                        return res.json({
                        success: false,
                        msg: "Página no válida"
                        });
                    case 0:
                        return res.json({
                            success: true, 
                            total_count
                        });
                    case 1:
                        posts = await hasCategoryThenFind(category);
                }
            }else{
                return res.json({
                    success: false,
                    msg: "Error al buscar publicaciones"
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
                    console.log(post);
                try{
                    let user = await User.findById(post.user_id);
                    if(!user){
                        continue;
                    }
                    result.data.push({
                        id: post._id,
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
    }


}