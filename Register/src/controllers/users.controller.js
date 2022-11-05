const User = require('../models/User.model');
const request = require('request');
const {getToken} = require('../config/jwt.config');

module.exports = {
    register : async function (req,res){
        let pass = req.body.password;
        let regex = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/gm;
        if(!regex.test(pass)){
            return res.json({
                success : false,
                msg: 'Contraseña no segura'
            });
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

            request(options, (error,res,body)=>{
                if(error) console.log("[Registration] Mail Result: " + error);
                else console.log("[Registration] Mail Result: " + body);
            });
            //manda correo aunque no jale el correo
            res.json({
                success: true,
                msg: "Correo enviado"
            });
            
        }catch(err){
            console.log("[Registration] Save Result: " + err);
            res.json({
                success: false,
                msg: "Error al guardar el usuario"
            });
        }
    }
}