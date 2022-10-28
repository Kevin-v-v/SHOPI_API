const User = require('../models/User.model');
const request = require('request');
module.exports = {
    register : async function (req,res){
        let data = {
            username: req.body.username,
            name: req.body.name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            email: req.body.email,
            user_type: 1,
            user_status: 0,
            password: req.body.password,
            image: req.body.image
        }
        let user = User(data);
        try{
            const userSaved = await user.save();  
            request({ 
                url:`localhost:5000?email=${data.email}&name=${data.name}`,
                json: true
            },(error,res,body)=>{
                console.log(body)
            })
            res.json(userSaved);
            
        }catch(err){
            res.json(err);
        }
    }
}