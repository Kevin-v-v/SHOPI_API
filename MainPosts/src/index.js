const express = require('express');
const cors = require('cors')
const app = express()
 

app.set('trust proxy', (ip) => {
    if (ip === '127.0.0.1:80') return true // trusted IPs
    else return false
  });

app.get('/posts', (req,res)=>{
    res.send("How did we get here?")
})

app.listen(3250, ()=>{
    console.log('Server on port 3250');
});