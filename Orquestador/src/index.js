const express = require('express');
const axios = require('');
const app = express();
axios.defaults.withCredentials = true

const res = await axios.get('http://httpbin.org/get?answer=42', {
  // `proxy` means the request actually goes to the server listening
  // on localhost:3000, but the request says it is meant for
  // 'http://httpbin.org/get?answer=42'
  proxy: {
    host: 'localhost',
    port: 3500
  }
});

// app.get("/auth",(req,res)=>{
//     axios({
//         method: req.method,
//         url: 'localhost:3500/' + req.params.path,
//         headers: req.headers,
//         data: req.body
//     })
// })

app.listen(3150, ()=>{
    console.log('Server on 3150');
});
