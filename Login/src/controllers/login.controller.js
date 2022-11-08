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
            where: {
                email
            }
        }).then(function(user){
            if(user){
                return authenticatePassword(user, password).then(valid=>{
                    if(valid){
                        req.session.userId = user._id;
                        res.send(user);
                    } 
                    else res.status(401).send(null);
                });
            }else{
                return null;
            }
        }).catch(err=>{
            console.log(err);
            res.status(500).send(null);
        })
    }
}