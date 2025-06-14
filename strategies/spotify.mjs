import config from "../config/config.mjs";
import USERS from "../models/user.mjs";
import { Strategy } from "passport-spotify";


const SpotfyOAuthStrategy = new Strategy(
    {
      clientID: config.SPOTIFY_CLIENT_ID, 
      clientSecret: config.SPOTIFY_CLIENT_SECRET,
      callbackURL: 'https://abb7-2600-4041-559d-5300-9120-e50d-728f-3ee2.ngrok-free.app/auth/spotify/callback'
    },
    async (accessToken, refreshToken, expires_in, profile, done)=> {
      console.log('spotify profile:', profile)
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
    });

export default SpotfyOAuthStrategy
