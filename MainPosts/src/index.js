const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const postsRoutes = require('./routes/posts.routes');
dotenv.config({
    path: path.resolve(__dirname, '../' + process.env.NODE_ENV + '.env')
});
require('./config/db.config');
const app = express();
 
app.use(postsRoutes);

app.listen(process.env.PORT, process.env.HOST, ()=>{
    console.log('[Posts Main] Server on ' + process.env.HOST + ":" + process.env.PORT);
});