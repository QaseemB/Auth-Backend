import USERS from '../models/user.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config.mjs'


  export const generateToken = (user) => {
      const payload = {
        user:{ 
          id: user._id, 
          username: user.username, 
          name: user.name, 
          email: user.email}
        };
      
        return jwt.sign(payload, config.Jwt_SecretKey, {expiresIn: '1h'})
      };
      
  
  export const authenticateUser = async (username, password) => {
      const user = await USERS.findOne({username});
      if (!user) throw new Error ('invalid credentials');

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error('invalid credentials');
      
      const token = generateToken(user)
      
      return { token, user}



