const User = require ('../models/User.model')

module.exports = async (req,res) => {
    let username = req.query.username;
    try{
        let user = await User.findOne({ username }) || null;
        if(user !== null){
            return res.json({
                success: true,
                msg: "El nombre de usuario ya existe",
                alreadyExist: true
            });
        } else {
            return res.json({
                success: true,
                msg: "El nombre de usuario no existe",
                alreadyExist: false
            });
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: "Ocurrio un error al buscar el nombre de usuario",
            alreadyExist: true
        })
    }
    
}