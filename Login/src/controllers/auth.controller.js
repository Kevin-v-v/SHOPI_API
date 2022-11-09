const User = require('../models/User.model');

module.exports = {
    auth: function(req,res){
        if(req.session.userId){
            User.findById(req.session.userId).then(user=>{
                if(user){
                    req.user = user;
                    res.status(200).send({
                        success: true,
                        msg: "Autenticado"
                    });
                }else{
                    res.status(401).send({
                    success: false,
                    msg: "No autenticado"
                    });
                }
            }).catch(err=>{
                console.log(err);
                res.status(401).send({
                    success: false,
                    msg: "No autenticado"
                });
            })
        }else{
            res.status(401).send({
                success: false,
                msg: "No autenticado"
            });
        }
    }
}