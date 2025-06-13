import passport from 'passport'
import GoogleStrategy from '../strategies/google.mjs';
import USERS from '../models/user.mjs';
import SpotfyStrategy from '../strategies/spotify.mjs';
import SoundCloudStrategy from '../strategies/soundcloud.mjs';

passport.use(GoogleStrategy)
passport.use(SpotfyStrategy)
passport.use(SoundCloudStrategy)

passport.serializeUser(async (id,done) =>{
    try{
      const user = await USERS.findbyID(id)
        done(null,user);
    }catch(e){
        done(err,null);
    }
  });

passport.deserializeUser(async (id,done)=> {
    try {
      const user = await USERS.findById(id);
      done(null,user);
    }catch(e){
      done(err,null);
    }
  });       

export default passport 
