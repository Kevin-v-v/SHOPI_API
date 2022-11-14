const express = require('express');
const loginRoutes = require('./routes/login.routes');
const authRoutes = require('./routes/auth.routes');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');
const mongoStore = require('connect-mongo');
const cors = require('cors');


dotenv.config({
    path: path.resolve(__dirname, '../' + process.env.NODE_ENV + '.env')
});

var corsOptions = {
    origin: '*'
    //optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }



app.use(session({
    secret: [process.env.SECRET_KEY_1, process.env.SECRET_KEY_2],
    saveUninitialized: false,
    resave: false,
    rolling: true,
    cookie: {
        maxAge: 1800000
    },
    store: mongoStore.create({ mongoUrl: "mongodb://database:27017/SHOPI" })
}));

require('./config/db.config');
app.use(cors(corsOptions));
app.use(express.json());
app.use(loginRoutes);
app.use(authRoutes);

app.listen(process.env.PORT, process.env.HOST, ()=>{
    console.log('[Login] Server on ' + process.env.HOST + ":" + process.env.PORT);
});
