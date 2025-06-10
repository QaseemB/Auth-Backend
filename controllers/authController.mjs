import config from '../config/config.mjs'
import USERS from '../models/user.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const register = async (req,res) => {
  const {username,password,email,name} = req.body;

  try {
    let user = await USERS.findOne({$or: [{username}, {email}]});
    if (user)
      return res.status(400).json({msg:'Username or Email already have been registered to this application'})
  user = new USERS({username,password,email, name});
   
    const salt = await bcrypt.genSalt(10);
   
    user.password = await bcrypt.hash(password,salt);

    await user.save();

    const secretKey = config.Jwt_SecretKey

    const payload = {user: user._id, username: user.username};

    const token = jwt.sign(payload,secretKey,{expiresIn: '1h'});

    return res.status(201).json({token})
  }catch(e){
     console.error('Registration Error:' , e.message);
    return res.status(500).json({msg: 'Server error during registration'});

  }
}; 
 let login = async (req, res) => {
    const {username,password} = req.body;
  try {
    let user = await USERS.findOne({username});
    if(!user) {
      return res.status(400).json({msg: 'invalid credentials'})
    }

    const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch) {
        return res.status(400).json({msg: 'invalid credentials'});
      }
    const payload = { user: user._id};
    
    const token = jwt.sign(payload,secretKey,{expiresIn: '1h'});

    return res.status(201).json({token})
    }catch(e){
      console.error('Login Verification Error:', e.message);
      return res.status(500).send('Server Error')
    }
 };

 const logout = (req,res) => {
   try {
     res.cookie(;token", "")
     console.log('Token cleared from cookies.')
     res.jsson({msg: 'Logged out succssfully'}).status(200);
   }catch(e){
     console.error('Error during logout:', err);
     res.status(500).send('Server Error');
   }
 };

cons checkAuth = async (req,res) => {
  try {
    if (req.user) {
      res.json({user: id: req.user._id, name: req.username, username: rew.user.username} );
  }else {
    res.status(401).json({msg: 'Not authenticated'});
  }
}catch(e){
  console.error(e.message);
  res.status(500).send('Server Error');
  }
};


