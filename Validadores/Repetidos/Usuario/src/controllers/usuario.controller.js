const User = require ('../models/User.model')
const router = require('../routes/usuario.routes')

module.exports = async (req,res) => {
    const regex = /[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?)*/

    if(regex.test(req.query.user)){

        try {
            usuario = await User.findOne(
                {
                    usuario1: req.query.user
                }
            )
        } catch (error) {
            console.log(error)
            res.json({
                success: false,
                msg: "Error al buscar el usuario",
                alreadyExist: false
            })
        }
        
        if(usuario){
            res.json({
                success: true,
                msg: "",
                alreadyExist: true
            })
        }else{
            res.json({
                success: true,
                msg: "Usuario no existe",
                alreadyExist: false
            })
        }


        
    } else{
        res.json({
            success: false,
            msg: "Usuario invalido",
            alreadyExist: false
        })
    }
    
}