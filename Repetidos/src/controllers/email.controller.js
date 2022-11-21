const User = require ('../models/User.model')

module.exports = async (req,res) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+){1,2}$/
    let email = req.query.email;
    if(regex.test(email)){

        try{
            let user = await User.findOne({ email }) || null;
            if(user !== null){
                return res.json({
                    success: true,
                    msg: "El correo ya existe",
                    alreadyExist: true
                });
            } else {
                return res.json({
                    success: true,
                    msg: "El correo no existe",
                    alreadyExist: false
                });
            }
        }catch(err){
            console.log(err);
            return res.status(500).json({
                success: false,
                msg: "Ocurrio un error al buscar el correo",
                alreadyExist: true
            })
        }
    }else{
        return res.json({
            success: false,
            msg: "Correo invalido",
            alreadyExist: true
        });
    }
    
}