const express = require('express');
const updateRoutes = require('./routes/update.routes');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const multerInit = require('./config/multer.config');


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
app.use(multerInit);
app.use(updateRoutes);


app.listen(process.env.PORT, process.env.HOST,()=>{
    console.log('[Update User] Server on ' + process.env.HOST + ':' + process.env.PORT);
})