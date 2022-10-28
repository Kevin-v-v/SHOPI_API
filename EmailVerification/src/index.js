const express = require('express');
const mailingRoutes = require('./routes/mailing.routes');
const app = express();
app.use(express.json());
app.use(mailingRoutes);

app.listen(5000,()=>{
    console.log('server on port 5000');
})