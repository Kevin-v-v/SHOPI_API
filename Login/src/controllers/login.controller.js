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
                if(user.status == 2){
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
                            msg: "Sesión iniciada"
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