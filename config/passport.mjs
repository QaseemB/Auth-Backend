import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import config from './config.mjs';
import USERS from '../models/user.mjs';

passport.use( new GoogleStrategy({
  clientID: config.GOOGLE_CLIENT_ID, clientSecret:config.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
  passReqToCallback: true
 },
  async ( accessToken, refreshToken, profile, done) => {
    try {
    let user = await USERS.findOne({ googleID: profile.id});
    if (!user){
      user = await USERS.create({
        googleID: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value
      });
    }
      return done(null, user);
    }catch (e) {
      return done(e,user);
    }
   }));
passport.serializeUser(async (id,done) =>{
  try {
    const user = await USERS.findById(id);
    dont(null, user);
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
