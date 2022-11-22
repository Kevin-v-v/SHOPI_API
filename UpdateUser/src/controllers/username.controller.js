const User = require('../models/User.model');

module.exports = async function (req,res){
    const user_id = req.headers['user-id'];
    const regex = /^[a-zA-Z0-9]{3,20}$/;
    if(!req.body){
        return res.json({
            success: false,
            msg: "Peticion no contiene nombre de usuario nuevo"
        })
    }else if(!req.body.username){
        return res.json({
            success: false,
            msg: "Peticion no contiene nombre de usuario nuevo"
        })
    }else if(!regex.test(req.body.username)){
        return res.json({
            success: false,
            msg: "El nombre de usuario nuevo no es válido"
        });
    }

    let user;

    try{
        user = await User.findById(user_id) || null;
        if(!user){
            return res.status(500).json({
                success: false,
                msg: "El usuario no existe"
            });
        }
        if(user.username === req.body.username){
            return res.json({
                success: false,
                msg: "El nombre de usuario es igual al antiguo"
            })
        }
        
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: "Error al buscar datos del usuario"
        })

    }

    let duplicated = null;
    try{
        duplicated = await User.findOne({username: req.body.username});
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: "No se pudo validar los datos"
        });
    }

    if(duplicated){
        return res.json({
            success: false,
            msg: "El usuario ya existe"
        })
    }
    user.username = req.body.username;
    try{
        userSaved = await user.save();
        res.json({
            success: true,
            msg: "Nombre de usuario cambiado con exito",
            username: userSaved.username
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: "Error al guardar el nuevo nombre de usuario"
        });

    }
    
}