const express = require('express');
require ('./database')

const usersRoutes = require('./routes/users.routes');

const app = express();

app.use(express.json());
app.use(usersRoutes);

app.listen(3000, ()=>{
    console.log('Server on port 3000');
});


