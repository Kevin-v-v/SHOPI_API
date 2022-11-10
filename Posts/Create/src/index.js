const express = require('express');
const createRoutes = require('./routes/create.routes');
const multerInit = require('./config/multer.config');
const app = express();


app.use(multerInit);
app.use(createRoutes);


app.listen(process.env.PORT, process.env.HOST, ()=>{
    console.log('Server on ' + process.env.HOST + ":" + process.env.PORT);
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