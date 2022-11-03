const User = require('../models/User.model');
const request = require('request');
const {getToken, getTokenData} = require('../config/jwt.config');

module.exports = {
    register : async function (req,res){
        let pass = req.body.password;
        if(!/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/gm.test(pass)){
            return res.send('contraseña pedorra');
        }

        let data = {
            username: req.body.username,
            name: req.body.name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            email: req.body.email,
            user_type: 1,
            user_status: 0,
            password: req.body.password,
            image: req.file.path
        }
        let user = User(data);

        

        try{
            const userSaved = await user.save(); 
            const token = getToken({email: userSaved.email, code: userSaved._id});

            const options = {
                url: `http://localhost:5000/sendMail?email=${data.email}&name=${data.name}&token=${token}`,
                method: 'GET',
                headers: {}
            };

            console.log('this is the token ' + token);
            request(options, (error,res,body)=>{
                if(error) console.log(error);
                else console.log(body);
            })
            res.json(userSaved);
            
        }catch(err){
            res.json(err);
        }
    },

    verify: async (req,res)=>{
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

}