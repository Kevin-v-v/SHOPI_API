const User = require ('../models/User.model')

module.exports = async (req,res) => {
    const regex = /^[0-9]{10}$/gm;
    let phone = req.query.phone;
    if(regex.test(phone)){

        try{
            let user = await User.findOne({ phone }) || null;
            if(user !== null){
                return res.json({
                    success: true,
                    msg: "El teléfono ya existe",
                    alreadyExist: true
                });
            } else {
                return res.json({
                    success: true,
                    msg: "El teléfono no existe",
                    alreadyExist: false
                });
            }
        }catch(err){
            console.log(err);
            return res.status(500).json({
                success: false,
                msg: "Ocurrio un error al buscar el teléfono",
                alreadyExist: true
            })
        }
    }else{
        return res.json({
            success: false,
            msg: "Teléfono invalido",
            alreadyExist: true
        });
    }
    
}