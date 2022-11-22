const {connect} = require('mongoose');

connect(`mongodb://database:27017/SHOPI`).then(db=>{
    console.log('[Update User] DB connected to', db.connection.name);
}).catch(err=>{
    console.log(err);
});
