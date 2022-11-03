const User = require('../models/User.model')
const {getTokenData} = require('../config/jwt.config');


module.exports = async (req,res)=>{
    try{
        console.log(req.params)
        let data = getTokenData(req.params.token);

        if(data == null){
            return res.json({
                success: false,
                msg: "Error al obtener datos del usuario"
            })
        }
        console.log(data);
        const user = await User.findById(data.data.code) || null;
        if(!user){
            return res.json({
                success: false,
                msg: "Usuario no existE"
            })
        }
        user.user_status = 1;
        await user.save();

        return res.send("Verificadisimo papu");
        

    }catch(error){
        console.log(error);
        return res.json({
            success: false,
            msg: "Error al verificar el correo electrónico"
        })

    }
    
}