import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import {config} from './config/config.mjs'; 
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';


const app = express();


app.get('/', (req, res) =>{
  res.send('Hello World')
});

mongoose.connect(config.MONGO_URI,{
  useNewUrlParser:true,
  useUnifiedTopology: true
}

const PORT = config.PORT || 3030;
app.listen (PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


