//import './config/db.js';
//import express from 'express';
//import UserRoute from './api/User.js';
//import bodyParser from 'express';
const cors = require('cors');
//const app = express();
const port = process.env.PORT||3000;


//app.use(bodyParser.json());
//app.use(cors());
//app.use('/user',UserRoute)

//app.listen(port,()=>{
    //console.log(`server running on PORT: ${port}`)
//})
const express = require('express');
const app = express();
const PORT = 3000;
app.use(cors())
// Example GET route: /get-letter?filename=example.jpg
app.get('/get-letter', (req, res) => {
    const filename = req.query.filename;

    if (!filename) {
        return res.status(400).json({ error: 'Filename is required as a query parameter' });
    }
    var index;
    const f = filename.charAt(0).toUpperCase();
    if(f==='C'){
    index=0;
    }else if(f==='R'){
    index = 3;
    }if(f==='N'){
    index= 2;
    }else{
    index = 1;
    }
    res.json({
        prediction: index;
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
