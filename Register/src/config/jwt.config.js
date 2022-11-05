const jwt = require('jsonwebtoken');


const getToken = (payload)=>{
    return jwt.sign({
        data: payload
    }, process.env.SECRET_JWT, {expiresIn: '1h'});
}

const getTokenData = (token)=>{
    let data = null;
    jwt.verify(token, process.env.SECRET_JWT, (err, decoded)=>{
        if(err) console.log('Error al obtener datos del token');
        else data = decoded;

    });
    return data;
}
module.exports = {
    getToken,
    getTokenData
}