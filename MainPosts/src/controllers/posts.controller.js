const User = require('../models/User.model');
const Post = require('../models/Post.model');

module.exports = {
    latest: async function(req,res){
        console.log(Post.find({status: 1}).sort({ _id: -1 }).limit(10));

    }


}