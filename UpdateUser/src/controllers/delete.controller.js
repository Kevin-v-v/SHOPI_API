const User = require('../models/User.model');

module.exports = async function (req,res){
    const admin_id = req.headers['user-id'];
    let admin;
    try {
        admin = await User.findById(admin_id);
        if(admin){
            if(admin.user_type != 0){
                return res.status(403).json({
                    success: false,
                    msg: "Usuario no tiene permisos para realizar esta acción"
                })
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: "Error al verificar datos del usuario"
        })
    }
    let username = req.body.username;
    let user;
    try{
        user = await User.findOne({username}) || null;
        if(!user){
            return res.status(404).json({
                success: false,
                msg: "El usuario no existe"
            });
        }
        if(user.user_status === 2){
            return res.json({
                success: false,
                msg: "El usuario se eliminó previamente"
            });
        }
        
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: "Error al buscar datos del usuario"
        });
    }

    user.user_status = 2;

    try{
        userSaved = await user.save();
        return res.json({
            success: true,
            msg: "Usuario eliminado con éxito"
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: "Error al eliminar al usuario"
        });

    }

}

