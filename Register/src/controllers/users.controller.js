const User = require('../models/User.model');
const axios = require('axios').default || require('axios');
const bcrypt = require('bcrypt');

///^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/
///^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/gm;

function getPasswordHash(password){
    return new Promise((res, rej)=>{
        bcrypt.hash(password, 10, (err, hash)=>{ 
            if(err) rej(err)
            else res(hash);
        }) 
    });
}
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
        let hash;
        try{
        hash = await getPasswordHash(req.body.password);
        
        // getPasswordHash(req.body.password).then((hash)=>{
        //     console.log(hash);
        //     this.password_hash = hash;
        // }).catch(err=>{
        //     console.log("falló la contraseña hash");
        // });
        }catch(err){
            console.log("Couldn't hash" + err);
        }
        let data = {
            username: req.body.username,
            name: req.body.name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            email: req.body.email,
            user_type: 1,
            user_status: 0,
            password_hash: hash,
            image: req.file.path
        }

        let user = User(data);
        let userSaved;

        try{
            userSaved = await user.save(); 
        }catch(err){
            console.log("[Registration] Save Result: " + err);
            return res.json({
                success: false,
                msg: "Error al guardar el usuario"
            });
        }
        
        try{
            const response = await axios.get('http://emailverification:5000/sendMail',{
                params:{
                    email: data.email,
                    name: data.name,
                    id: userSaved._id
                }
            });
            response.data.success = true;
            res.send(response.data);
        }catch(err){
            console.log("[Registration] Mail Result: " + err);
            return res.json({
                success: true,
                msg: "Error al enviar el correo"
            });
        }
    }
}





            // const options = {
            //     url: `http://localhost:5000/sendMail?email=${data.email}&name=${data.name}&id=${userSaved._id}`,
            //     method: 'GET',
            //     headers: {}
            // };
            
            // let body_response_mail;
            // request(options, (error,res,body)=>{
            //     body_response_mail = body;
            //     if(error) console.log("[Registration] Mail Result: " + error);
            //     else console.log("[Registration] Mail Result: " + body);
            // });
            //manda correo aunque no jale el correo
            //res.json(JSON.parse(body_response_mail))
            //res.json({
            //     success: true,
            //     msg: "Correo enviado"
            // });