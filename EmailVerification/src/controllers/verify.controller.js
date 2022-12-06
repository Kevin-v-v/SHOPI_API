const User = require('../models/User.model')
const {getTokenData} = require('../config/jwt.config');


module.exports = async (req,res)=>{
    
    console.log(req.params)
    let data = getTokenData(req.params.token);

    if(!data){
        return res.redirect('https://purple-sky-01e24dc0f.2.azurestaticapps.net/email/error');
    }

    let user;

    try{
        user = await User.findById(data.data.code) || null;
        if(!user){
            return res.redirect('https://purple-sky-01e24dc0f.2.azurestaticapps.net/email/error');
        }
        if(user.user_status === 1){
            return res.redirect('https://purple-sky-01e24dc0f.2.azurestaticapps.net/email/verified');
        }
        user.user_status = 1;
    }catch(error){
        console.log(error);
        return res.redirect('https://purple-sky-01e24dc0f.2.azurestaticapps.net/email/error');

    }

    try{
        await user.save();
        return res.redirect('https://purple-sky-01e24dc0f.2.azurestaticapps.net/email/success');
        

    }catch(error){
        console.log(error);
        return res.redirect('https://purple-sky-01e24dc0f.2.azurestaticapps.net/email/error');

    }
    
}