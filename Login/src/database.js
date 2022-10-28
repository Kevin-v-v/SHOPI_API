const {connect} = require('mongoose');

connect("mongodb://localhost/SHOPI").then(db=>{
    console.log('DB connected to', db.connection.name);
}).catch(err=>{
    console.log(err);
});
