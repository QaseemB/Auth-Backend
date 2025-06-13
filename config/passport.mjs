import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import config from './config.mjs';
import USERS from '../models/user.mjs';
import {Strategy as SpotifyStrategy} from 'passport-spotify';
import { Strategy as SoundCloudStrategy} from 'passport-soundcloud';

passport.use( new GoogleStrategy({
  clientID: config.GOOGLE_CLIENT_ID,
  clientSecret:config.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://abb7-2600-4041-559d-5300-9120-e50d-728f-3ee2.ngrok-free.app/auth/google/callback",
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
      return cb(null, user);
    }catch (e) {
      return cb(e,null);
    }
   }));

passport.use(
  new SpotifyStrategy(
    {
      clientID: config.SPOTIFY_CLIENT_ID, 
      clientSecret: config.SPOTIFY_CLIENT_SECRET,
      callbackURL: 'https://abb7-2600-4041-559d-5300-9120-e50d-728f-3ee2.ngrok-free.app/auth/spotify/callback'
    },
    async (accessToken, refreshToken, expires_in, profile, done)=> {
      try{
      let user = USERS.findOne({spotifyID: profile._id});
      if (!user){
        user = await USERS.create({
          spotifyID: profile._id,
          name:profile.name,
          email:profile.email,
        });
      }
        return done(null,user);
      }catch(e){
        done(e,null);
      }
    }));
passport.use(
  new SoundCloudStrategy(
    {
      clientID: config.SOUNDCLOUD_CLIETN_ID,
      clentSecret: config.SOUNDCLOUD_CLIENT_SECRET,
      callbackURL:' https://abb7-2600-4041-559d-5300-9120-e50d-728f-3ee2.ngrok-free.app/auth/soundcloud.callback'
    }
    async ( accessToken, rereshToken,expires_in, profile, done) => {
      try{
        let user = USERS.findOne({soundcloudID: profile._id});
        if (!user) {
          user await USERS.create({
            soundcloudID: profile._id,
            name: profile.name,
            email: profile.email,
          });
        }
          retrun done(null, user);
      }catch(e){
        done(e,null);
      }
    }));
 
passport.serializeUser(async (id,done) =>{
    done(null,user._id);
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
