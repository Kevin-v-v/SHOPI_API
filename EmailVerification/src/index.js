const express = require('express');
const mailingRoutes = require('./routes/mailing.routes');
const verifyRoutes = require('./routes/verify.routes');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, '../' + process.env.NODE_ENV + '.env')
});

require('./config/db.config');
const app = express();

app.use(express.json());
app.use(mailingRoutes);
app.use(verifyRoutes);


app.listen(process.env.PORT, process.env.HOST,()=>{
    console.log('[EmailVerification] Server on ' + process.env.HOST + ':' + process.env.PORT);
})