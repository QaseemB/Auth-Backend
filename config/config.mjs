import dotenv from 'dotenv';

dotenv.config()

const config = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
  enviroment: process.env.NODE_ENV || 'development',

  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,

  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,

  SOUNDCLOUD_CLIENT_ID: process.env.SOUNDCLOUND_CLIENT_ID,
  SOUNDCLOUD_CLIENT_SECRET: process.env.SOUNDCLOUND_CLIENT_SECRET,

  Jwt_SecretKey: process.env.Jwt_SecretKey,
  SESSION_SECRET: process.env.SESSION_SECRET,
  SOUNDCLOUD_CLIENT_ID: process.env.SOUNDCLOUD_CLIENT_ID,
  SOUNDCLOUD_CLIENT_SECRET: process.env.SOUNDCLOUD_CLIENT_SECRET
}


export default config;
