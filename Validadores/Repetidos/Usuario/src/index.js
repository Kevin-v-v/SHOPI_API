const express = require('express');
const telefonoRoutes = require('./routes/usuario.routes');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, '../' + process.env.NODE_ENV + '.env')
});

require('./config/db.config');
const app = express();

app.use(usuarioRoutes);

app.listen(process.env.PORT, process.env.HOST,()=>{
    console.log('[RepetidosUsuario] Server on ' + process.env.HOST + ':' + process.env.PORT);
})
