const jwt = require('jsonwebtoken');


const getToken = (payload)=>{
    return jwt.sign({
        data: payload
    }, process.env.SECRET_JWT, {expiresIn: '1h'});
}

const getTokenData = (token)=>{
    let data = null;
    jwt.verify(token, process.env.SECRET_JWT, (err, decoded)=>{
        if(decoded) {
            data = decoded;
        }
        else {
            console.log(err);
        }
        
    });
    return data;
}
module.exports = {
    getToken,
    getTokenData
}