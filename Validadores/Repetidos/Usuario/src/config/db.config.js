const {connect} = require('mongoose');

connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_LOCATION}`).then(db=>{
    console.log('[RepetidosUsuario] DB connected to', db.connection.name);
}).catch(err=>{
    console.log(err);
});
