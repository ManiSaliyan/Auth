import './config/db.js';
import express from 'express';
import UserRoute from './api/User.js';
import bodyParser from 'express';
import cors from 'cors';
const app = express();
const port = process.env.PORT||3000;


app.use(bodyParser.json());
app.use(cors());
app.use('/user',UserRoute)
module.exports = app;
app.listen(port,()=>{
    console.log(`server running on PORT: ${port}`)
})
