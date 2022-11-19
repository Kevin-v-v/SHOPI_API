const User = require ('../models/User.model')

module.exports = async (req,res) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+){1,2}$/
    let email = req.query.email;
    if(regex.test(email)){

        let user = await User.findOne({ email }) || null;
        if(user !== null){
            return res.json({
                success: true,
                msg: "",
                alreadyExist: true
            })
        } else {
            return res.json({
                success: true,
                msg: "",
                alreadyExist: false
            })
        }

    } else{
        return res.json({
            success: false,
            msg: "Correo invalido",
            alreadyExist: false
        })
    }

}