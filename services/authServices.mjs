import USERS from '../models/user.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config.mjs'


export const authenticateUser = async (username, password) => {
  const user = USERS.findOne({username});
  if (!user) throw new Error ('invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('invalid credentials');

  const payload = {user._id};
  const token = jwt.sign(payload, config.jwt_secretKey, {expiresIn; '1h'})

  return {token, user}
