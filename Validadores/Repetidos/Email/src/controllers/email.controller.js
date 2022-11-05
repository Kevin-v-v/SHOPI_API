const User = require ('../models/User.model')

module.exports = async (req,res) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+){1,2}$/
    
    if(regex.test(req.query.email)){
        //aquí se busca en la base de datos. 
    } else{
        //{alreadyExist: false}
        res.json({alreadyExist: false})
    }
    //req.query.email
    //aquí se hace la funcionalidad.:((
    //Hacer consulta en la base de datos, en donde se busque el correo electrónico que se recibió y
    // si ya existe, entonces tengo que devolver un valor booleano con un verdadero alreadyExist devolver un json
    // que solo tiene un valor
    //{alreadyExist: true} lo que se va a devolver cuando se encuentra un registro. false en caso que no
    // Recibe query params, cómo extraer estos parámetros 
}