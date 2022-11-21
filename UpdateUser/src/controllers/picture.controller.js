const User = require('../models/User.model')
const axios = require('axios').default || require('axios');
const fs = require('fs');
const FormData = require('form-data');
module.exports = async (req,res)=>{
    const user_id = req.headers['user-id'];
    if(!req.file){
        return res.json({
            success: false,
            msg: "Peticion no contiene imagen"
        })
    }

    let user;

    try{
        user = await User.findById(user_id) || null;
        if(!user){
            return res.status(500).json({
                success: false,
                msg: "El usuario no existe"
            })
        }
        
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: "Error al buscar datos del usuario"
        })

    }

    const formData = new FormData();

    formData.append('key', process.env.THUMBSNAP_KEY);
    formData.append('media', fs.createReadStream(req.file.path));
    const image_response = await axios.post('https://thumbsnap.com/api/upload', formData, {
        headers: formData.getHeaders()
    });
    fs.unlink(req.file.path, (err) => {
        if (err) {
            console.log(err);
        }
        console.log("Image Deleted Successfully");
    });

    if(!image_response.data.success){
        console.log(image_response.data.error.message);
        return res.status(500).json({
            success: false,
            msg: "No se pudo guardar la imagen"
        });
    }

    user.image = image_response.data.data.media;

    try{
        userSaved = await user.save();
        res.json({
            success: true,
            msg: "Imagen cambiada con éxito",
            image_url: userSaved.image
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: "Error al guardar la imagen en la base de datos"
        });

    }
    
}