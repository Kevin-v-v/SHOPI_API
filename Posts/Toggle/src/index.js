const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const toggleRoutes = require('./routes/toggle.routes');
dotenv.config({
    path: path.resolve(__dirname, '../' + process.env.NODE_ENV + '.env')
});

require('./config/db.config');
const app = express();
 
app.use(toggleRoutes);

app.listen(process.env.PORT, process.env.HOST, ()=>{
    console.log('[Posts Toggle] Server on ' + process.env.HOST + ":" + process.env.PORT);
});