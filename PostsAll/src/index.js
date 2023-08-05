const express = require('express');
const createRoutes = require('./routes/create.routes');
const deleteRoutes = require('./routes/delete.routes');
const updateRoutes = require('./routes/update.routes');
const toggleRoutes = require('./routes/toggle.routes');
const mainRoutes = require('./routes/posts.routes');
const categoriesRoutes = require('./routes/categories.routes');
const mongoose = require('mongoose');

// const multerInit = require('./config/multer.config');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

// dotenv.config({
//     path: path.resolve(__dirname, '../' + process.env.NODE_ENV + '.env')
// });

var corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true
    //optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

const db_connection = require('./config/db.config');
db_connection();
const app = express();
app.use(cors(corsOptions));
// app.use(multerInit);
app.use(createRoutes);
app.use(deleteRoutes);
app.use(updateRoutes);
app.use(mainRoutes);
app.use(toggleRoutes);
app.use(categoriesRoutes)

// mongoose.connection.on('disconnected', () => {
//     db_connection();
// });

app.listen(process.env.PORT, process.env.HOST, ()=>{
    console.log('[Posts] Server on ' + process.env.HOST + ":" + process.env.PORT);
});

























// let date_data = {
//     available_at: {
//         monday : {
//             first_hour: 12,
//             first_minutes: 10,
//             end_hour: 14,
//             end_minutes: 10
//         },
//         tuesday : {
//             first_hour: null,
//             first_minutes: null,
//             end_hour: null,
//             end_minutes: null
//         },
//         wednesday : {
//             first_hour: null,
//             first_minutes: null,
//             end_hour: null,
//             end_minutes: null
//         },
//         thursday : {
//             first_hour: 12,
//             first_minutes: 10,
//             end_hour: 14,
//             end_minutes: 10
//         },
//         friday : {
//             first_hour: 12,
//             first_minutes: 10,
//             end_hour: 14,
//             end_minutes: 10
//         },
//         saturday : {
//             first_hour: null,
//             first_minutes: null,
//             end_hour: null,
//             end_minutes: null
//         }
//     }
// }

// let date_data2 = {
//     available_at: [[12,20,13,40],[null,null,null,null],[12,20,13,40],
//                     [null,null,null,null],[12,20,13,40],[12,20,13,40],]
// }