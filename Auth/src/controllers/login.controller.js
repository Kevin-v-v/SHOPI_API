const User = require('../models/User.model');
const bcrypt = require('bcrypt');

function authenticatePassword(user, password){
    return new Promise((res,rej)=>{
        bcrypt.compare(password, user.password_hash, function(err, valid){
            if(err) return rej(err);
            return res(valid)
        })
    })
}

module.exports = {
    login: function (req,res){
        const {email, password} = req.body;
        User.findOne({
            email
        }).then(function(user){
            if(user){
                if(user.user_status == 2){
                    return res.send({
                        success: false,
                        msg: "Usuario baneado por mal comportamiento"
                    });
                }
                return authenticatePassword(user, password).then(valid=>{
                    if(valid){
                        req.session.userId = user._id;
                        res.send({
                            success: true,
                            msg: "Sesión iniciada",
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
                    } 
                    else res.status(401).send({
                        success: false,
                        msg: "Usuario o contraseña no válidos"
                    });
                });
            }else{
                return res.status(401).send({
                    success: false,
                    msg: "Usuario o contraseña no válidos"
                });
            }
        }).catch(err=>{
            console.log(err);
            res.status(500).send({
                success: false,
                msg: "Error al buscar usuario"
            });
        });
    }
}