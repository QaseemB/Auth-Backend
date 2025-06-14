import passport from 'passport'
import GoogleStrategy from '../strategies/google.mjs';
import USERS from '../models/user.mjs';
import SpotfyStrategy from '../strategies/spotify.mjs';
import SoundCloudStrategy from '../strategies/soundcloud.mjs';

passport.use(GoogleStrategy)
passport.use(SpotfyStrategy)
passport.use(SoundCloudStrategy)

<<<<<<< HEAD
passport.use(
  new SpotifyStrategy(
    {
      clientID: config.SPOTIFY_CLIENT_ID, 
      clientSecret: config.SPOTIFY_CLIENT_SECRET,
      callbackURL: 'https://abb7-2600-4041-559d-5300-9120-e50d-728f-3ee2.ngrok-free.app/auth/spotify/callback'
    },
    async (accessToken, refreshToken, expires_in, client, done)=> {
      try{
      let user = USERS.findOne({clientID: client._id});
      if (!user){
        user = await USERS.create({
          clientID: client._id,
          name:client.name,
          email:client.email,
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
    },
    async ( accessToken, rereshToken,expires_in, client, done) => {
      try{
        let user = USERS.findOne({clientID: client._id});
        if (!user) {
          user await USERS.create({
            clientID: client._id,
            name: client.name,
            email: client.email,
          });
        }
          retrun done(null, user);
      }catch(e){
        done(e,null);
      }
    }));
 
=======
>>>>>>> 360b63760e5bf5cb16bd9740c4a51d0122469f0c
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
