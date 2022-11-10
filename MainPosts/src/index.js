const express = require('express');
const dotenv = require('dotenv');

dotenv.config({
    path: path.resolve(__dirname, '../' + process.env.NODE_ENV + '.env')
});

const app = express();
 


app.listen(process.env.PORT, process.env.HOST, ()=>{
    console.log('Server on ' + process.env.HOST + ":" + process.env.PORT);
});