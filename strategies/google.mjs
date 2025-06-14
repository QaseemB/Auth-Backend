import config from "../config/config.mjs";
import USERS from "../models/user.mjs";
import { Strategy } from "passport-google-oauth20";

const GoogleOAuthStrategy = new Strategy({
  clientID: config.GOOGLE_CLIENT_ID,
  clientSecret:config.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://abb7-2600-4041-559d-5300-9120-e50d-728f-3ee2.ngrok-free.app/auth/google/callback",
  scope: ['profile', 'email'],
  state: true,
 },
  async ( accessToken, refreshToken, profile, cb) => {
    console.log('Google Profile:', profile);
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
       cb(e,null);
    }
   });

export default GoogleOAuthStrategy
