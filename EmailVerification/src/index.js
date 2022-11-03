const express = require('express');
const mailingRoutes = require('./routes/mailing.routes');
const verifyRoutes = require('./routes/verify.routes');
require('./config/db.config');


const app = express();

app.use(express.json());
app.use(mailingRoutes);
app.use(verifyRoutes);


app.listen(5000,()=>{
    console.log('server on port 5000');
})