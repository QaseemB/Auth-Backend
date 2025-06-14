import config from "../config/config.mjs";
import USERS from "../models/user.mjs";
import { Strategy } from "passport-soundcloud";

const SoundCloudStrategy =  new Strategy(

    {
      clientID: config.SOUNDCLOUD_CLIENT_ID,
      clientSecret: config.SOUNDCLOUD_CLIENT_SECRET,
      callbackURL:' https://abb7-2600-4041-559d-5300-9120-e50d-728f-3ee2.ngrok-free.app/auth/soundcloud.callback',
    },
    async ( accessToken, rereshToken,expires_in, profile, done) => {
      try{
        let user = await USERS.findOne({soundcloudID: profile._id});
        if (!user) {
            user = await USERS.create({
            soundcloudID: profile._id,
            name: profile.name,
            email: profile.email,
          });
        }
          done(null, user);
      }catch(e){
        done(e,null);
      }
    });

export default SoundCloudStrategy 
