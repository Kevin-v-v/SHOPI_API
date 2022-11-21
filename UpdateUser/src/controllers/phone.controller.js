const User = require('../models/User.model')
const axios = require('axios');

module.exports = async (req,res)=>{
    const user_id = req.headers['user-id'];
    const regex = /^[0-9]{10}$/gm;
    if(!req.body){
        return res.json({
            success: false,
            msg: "Peticion no contiene teléfono"
        })
    }else if(!req.body.phone){
        return res.json({
            success: false,
            msg: "Peticion no contiene teléfono"
        })
    }else if(!regex.test(req.body.phone)){
        return res.json({
            success: false,
            msg: "El telefono no es válido"
        })
    }

    let user;

    try{
        user = await User.findById(user_id) || null;
        if(!user){
            return res.status(500).json({
                success: false,
                msg: "El usuario no existe"
            })
        }
        if(user.phone === req.body.phone){
            return res.json({
                success: false,
                msg: "El telefono es igual al antiguo"
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
        duplicated = await User.findOne({phone: req.body.phone});
    }catch(err){
        console.log(err);
    }

    if(duplicated){
        return res.json({
            success: false,
            msg: "El telefono está registrado con otra cuenta"
        })
    }
    user.phone = req.body.phone;
    try{
        userSaved = await user.save();
        res.json({
            success: true,
            msg: "Telefono cambiado con éxito",
            phone: userSaved.phone
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: "Error al guardar el nuevo teléfono"
        });

    }
    
}