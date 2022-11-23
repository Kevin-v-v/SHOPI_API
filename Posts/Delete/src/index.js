const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const deleteRoutes = require('./routes/delete.routes');
const cors = require('cors');
// dotenv.config({
//     path: path.resolve(__dirname, '../' + process.env.NODE_ENV + '.env')
// });
var corsOptions = {
    origin: '*'
    //optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

require('./config/db.config');
const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(deleteRoutes);

app.listen(process.env.PORT, process.env.HOST, ()=>{
    console.log('[Delete Posts] Server on ' + process.env.HOST + ":" + process.env.PORT);
});