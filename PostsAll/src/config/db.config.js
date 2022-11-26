const {connect} = require('mongoose');
const Category = require('../models/Category.model');

module.exports = async function(){
    connect(process.env.DB_CONNECTION_STRING).then(async db=>{
    console.log('[Posts Create] Database connected to', db.connection.name);
    try{
        const total = await Category.countDocuments()
        if(total === 0){
            await Category.insertMany([
                {name: "Comida"},
                {name: "Electrónica"},
                {name: "Anime"},
                {name: "Ropa"},
                {name: "Calzado"},
                {name: "Postres"},
                {name: "Videojuegos"},
                {name: "Servicios"},
                {name: "Asesorías"},
                {name: "Pines"},
                {name: "Stickers"},
                {name: "Trueque"},
                {name: "Variado"}
            ]);
            console.log("Categorias insertadas")
        }
    }catch(err){
        console.log("No se pudo inicializar o verificar las categorias");
    }
}).catch(err=>{
    console.log(err);
});

}

