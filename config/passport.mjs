import passport from 'passport'
import GoogleOAuthStrategy from '../strategies/google.mjs';
import USERS from '../models/user.mjs';
import SpotifyOAuthStrategy from '../strategies/spotify.mjs';
import SoundCloudOAuthStrategy from '../strategies/soundcloud.mjs';

passport.use(GoogleOAuthStrategy)
passport.use(SpotifyOAuthStrategy)
passport.use(SoundCloudOAuthStrategy)

passport.serializeUser(async (id,done) =>{
    try{
      const user = await USERS.findById(id)
        done(null,user);
    }catch(e){
        done(e,null);
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
