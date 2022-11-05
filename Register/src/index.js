const express = require('express');
const dotenv = require('dotenv');
const multerInit= require('./config/multer.config');
const path = require('path');
const usersRoutes = require('./routes/users.routes');

dotenv.config({
    path: path.resolve(__dirname, '../' + process.env.NODE_ENV + '.env')
});

require ('./config/db.config');

const app = express();

app.use(multerInit);
app.use(usersRoutes);


app.listen(process.env.PORT, process.env.HOST,()=>{
    console.log('[Registration] Server on ' + process.env.HOST + ':' + process.env.PORT);
});

