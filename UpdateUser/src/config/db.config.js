const {connect} = require('mongoose');

connect(process.env.DB_CONNECTION_STRING).then(db=>{
    console.log('[Update User] DB connected to', db.connection.name);
}).catch(err=>{
    console.log(err);
});
