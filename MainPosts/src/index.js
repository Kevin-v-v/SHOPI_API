const express = require('express');

const app = express();

app.get('/', (req,res)=>{
    res.send("How did we get here?")
})

app.listen(3250, ()=>{
    console.log('Server on port 3250');
});