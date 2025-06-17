import config from "../config/config.mjs";
import USERS from "../models/user.mjs";
import { Strategy } from "passport-soundcloud";


const SoundCloudOAuthStrategy =  new Strategy(
    {
      clientID: config.SOUNDCLOUD_CLIENT_ID,
      clientSecret: config.SOUNDCLOUD_CLIENT_SECRET,
      callbackURL:'https://abb7-2600-4041-559d-5300-9120-e50d-728f-3ee2.ngrok-free.app/auth/soundcloud/callback',
      scope: ['non-expiring'],
      state: true,
    },
    async ( accessToken, rereshToken,expires_in, profile, done) => {
      console.log('soundcloud profile:' , profile);
      try{
        let user = await USERS.findOne({soundcloudID: profile.id});
        if (!user) {
            user = await USERS.create({
            soundcloudID: profile.id,
            name: profile.displayName,
            username: profile.usename,
            avatar: profile.avatar_url,
            permalinkURL: profile.permalin_url,
          });
        }
        done(null, user);
      }catch(e){
        done(e,null);
      }
    });

export default SoundCloudOAuthStrategy 
