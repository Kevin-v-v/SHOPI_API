const express = require('express');
const repetidosRoutes = require('./routes/repetidos.routes');

const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

// dotenv.config({
//     path: path.resolve(__dirname, '../' + process.env.NODE_ENV + '.env')
// });
var corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true
    //optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

require('./config/db.config');
const app = express();
app.use(cors(corsOptions));
app.use(repetidosRoutes);


app.listen(process.env.PORT, process.env.HOST, ()=>{
    console.log('[Repetidos] Server on ' + process.env.HOST + ":" + process.env.PORT);
});