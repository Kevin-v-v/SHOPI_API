const express = require('express');
const mailingRoutes = require('./routes/mailing.routes');
const verifyRoutes = require('./routes/verify.routes');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

dotenv.config({
    path: path.resolve(__dirname, '../development.env')
});

var corsOptions = {
    origin: true,
    credentials: true
    //optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

require('./config/db.config');
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(mailingRoutes);
app.use(verifyRoutes);


app.listen(process.env.PORT, process.env.HOST,()=>{
    console.log('[EmailVerification] Server on ' + process.env.HOST + ':' + process.env.PORT);
})