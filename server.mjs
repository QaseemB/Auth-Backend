import express from 'express';
import dotenv from 'dotenv';
import {config} from './config/config.mjs' 


const app = express();




const PORT = config.PORT || 3030;
app.listen (PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


