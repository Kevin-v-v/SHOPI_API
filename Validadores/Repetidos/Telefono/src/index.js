const express = require('express');
const emailRoutes = require('./routes/email.routes');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, '../' + process.env.NODE_ENV + '.env')
});

require('./config/db.config');
const app = express();

app.use(emailRoutes);

app.listen(process.env.PORT, process.env.HOST,()=>{
    console.log('[RepetidosEmail] Server on ' + process.env.HOST + ':' + process.env.PORT);
})
