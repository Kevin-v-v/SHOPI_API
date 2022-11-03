const express = require('express');

const multerInit= require('./config/multer.config');

const usersRoutes = require('./routes/users.routes');

require ('./config/db.config');

const app = express();

app.use(multerInit);
app.use(usersRoutes);

app.listen(3000, ()=>{
    console.log('Server on port 3000');
});


