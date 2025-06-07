import dotenv from 'dotenv';

dotenv.config()

const config = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
  enviroment: process.env.NODE_ENV || 'development',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  Jwt_SecretKey: process.env.Jwt_SecretKey,
}

export default config;
