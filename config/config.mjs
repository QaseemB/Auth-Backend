import dotenv from 'dotenv';

dotenv.config()

export const config = {
  PORT: process.env.PORT,
  enviroment: process.env.NODE_ENV || 'development',
}
