const User = require('../models/User.model')
const axios = require('axios');

module.exports = async (req,res)=>{
    const user_id = req.headers['user-id'];
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+){1,2}$/;
    if(!req.body){
        
        return res.json({
            success: false,
            msg: "Peticion no contiene Email"
        })
    }else if(!req.body.email){
        return res.json({
            success: false,
            msg: "Peticion no contiene Email"
        })
    }else if(!regex.test(req.body.email)){
        return res.json({
            success: false,
            msg: "El email no es válido"
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
        if(user.email === req.body.email){
            return res.json({
                success: false,
                msg: "El correo es igual al antiguo"
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
        duplicated = await User.findOne({email: req.body.email});
    }catch(err){
        console.log(err);
    }

    if(duplicated){
        return res.json({
            success: false,
            msg: "El correo está registrado con otra cuenta"
        })
    }
    user.email = req.body.email;
    user.user_status = 0;
    try{
        userSaved = await user.save();
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: "Error al guardar el correo electrónico"
        });

    }

    try{
        const response = await axios.get('http://emailverification:3010/api/sendmail',{
            params:{
                username: userSaved.username
            }
        });
        response.data.success = true;
        res.send(response.data);
    }catch(err){
        console.log("[Registration] Mail Result: " + err);
        return res.json({
            success: true,
            msg: "Error al enviar el correo de verificación"
        });
    }
    
}