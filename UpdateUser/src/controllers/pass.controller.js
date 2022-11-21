const User = require('../models/User.model')
const bcrypt = require('bcrypt');

function getPasswordHash(password){
    return new Promise((res, rej)=>{
        bcrypt.hash(password, 10, (err, hash)=>{ 
            if(err) rej(err)
            else res(hash);
        }) 
    });
}

function authenticatePassword(user, password){
    return new Promise((res,rej)=>{
        bcrypt.compare(password, user.password_hash, function(err, valid){
            if(err) return rej(err);
            return res(valid)
        })
    })
}

module.exports = async (req,res)=>{
    const user_id = req.headers['user-id'];
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,16}$/;
    if(!req.body){
        return res.json({
            success: false,
            msg: "Falta algún dato"
        })
    }else if(!req.body.new_password || !req.body.old_password){
        return res.json({
            success: false,
            msg: "Falta algun dato"
        })
    }else if(!regex.test(req.body.new_password)){
        return res.json({
            success: false,
            msg: "La nueva contraseña no es segura"
        })
    }

    let user;
    let hash;
    try{
        user = await User.findById(user_id) || null;
        if(!user){
            return res.status(500).json({
                success: false,
                msg: "El usuario no existe"
            })
        }
        
        old_password_correct = await authenticatePassword(user, req.body.old_password);
        if(!old_password_correct){
            return res.json({
                success: false,
                msg: "Contraseña antigua incorrecta"
            })
        }
        old_password_same = await authenticatePassword(user, req.body.new_password);
        if(old_password_same){
            return res.json({
                success: false,
                msg: "La contraseña nueva no puede ser igual a la anterior"
            });
        }
        hash = await getPasswordHash(req.body.new_password);
        
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: "Error al buscar datos del usuario o procesar los datos"
        })

    }

    user.password_hash = hash;

    try{
        userSaved = await user.save();
        res.json({
            success: true,
            msg: "Contraseña cambiada con éxito"
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: "Error al guardar la nueva contraseña"
        });

    }
    
}