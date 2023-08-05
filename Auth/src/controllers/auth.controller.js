const User = require('../models/User.model');

module.exports = {
    auth: function(req,res){
        if(req.session.userId){
            User.findById(req.session.userId).then(user=>{
                if(user){
                    if(user.user_status === 2){
                        return res.status(401).json({
                            success: false,
                            msg: "El usuario fue baneado por mal comportamiento"
                        })
                    }
                    let user_id_string = user._id.toString();
                    res.setHeader('User-Id', user_id_string);
                    //req.user = user;
                    res.status(200).send({
                        success: true,
                        msg: "Autenticado",
                        user_data: {
                            username: user.username,
                            name: user.name,
                            last_name: user.last_name,
                            email: user.email,
                            phone: user.phone,
                            image: user.image,
                            user_type: user.user_type,
                            user_status: user.user_status
                        }

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