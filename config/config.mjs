import dotenv from 'dotenv';

dotenv.config()

const config = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
  enviroment: process.env.NODE_ENV || 'development',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  Jwt_SecretKey: process.env.Jwt_SecretKey,
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
  SESSION_SECRET: process.env.SESSION_SECRET,
}

export default config;
