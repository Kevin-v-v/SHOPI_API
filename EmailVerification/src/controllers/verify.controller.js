const User = require('../models/User.model')
const {getTokenData} = require('../config/jwt.config');


module.exports = async (req,res)=>{
    
    console.log(req.params)
    let data = getTokenData(req.params.token);

    if(!data){
        return res.json({
            success: false,
            msg: "Error al obtener datos del usuario"
        })
    }

    let user;

    try{
        user = await User.findById(data.data.code) || null;
        if(!user){
            return res.json({
                success: false,
                msg: "El usuario no existe"
            })
        }
        if(user.user_status === 1){
            return res.json({
                success: false,
                msg: "El usuario ya fue verificado"
            })
        }
        user.user_status = 1;
    }catch(error){
        console.log(error);
        return res.json({
            success: false,
            msg: "Error al verificar el correo electrónico"
        })

    }

    try{
        await user.save();
        return res.json({
            success: true,
            msg: "Verificación exitosa"
        })
        

    }catch(error){
        console.log(error);
        return res.json({
            success: false,
            msg: "Error al verificar el correo electrónico"
        })

    }
    
}