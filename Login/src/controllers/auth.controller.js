const User = require('../models/User.model');

module.exports = {
    auth: function(req,res){
        if(req.session.userId){
            User.findById(req.session.userId).then(user=>{
                if(user){
                    req.user = user;
                    res.status(200).send(user);
                }
                res.status(500).send();
            }).catch(err=>{
                console.log(err);
                res.status(401);
            })
        }else{
            res.status(401).send("Not Authenticated");
        }
    }
}