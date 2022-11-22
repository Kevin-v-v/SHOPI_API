const User = require ('../models/User.model')
const router = require('../routes/telefono.routes')

module.exports = async (req,res) => {
    const regex = /^[0-9]{10}$/gm

    if(regex.test(req.query.phone)){

        try {
            usuario = await User.findOne(
                {
                    phone: req.query.phone
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
                msg: "Telefono no existe",
                alreadyExist: false
            })
        }


        
    } else{
        res.json({
            success: false,
            msg: "Telefono invalido",
            alreadyExist: false
        })
    }
    
}