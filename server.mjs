import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import {config} from './config/config.mjs'; 
import session from 'express-session';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20'
import MongoStore from 'connect-mongo';
import LocalStrategy from 'passport-local'
import DB
const app = express();

mongoose.connect(config.MONGO_URI,{
  useNewUrlParser:true,
  useUnifiedTopology: true
}

app.use(session({
  secret: "secret",
  resave: false,
  saveUnintialized: true,
}))



app.use(passport.initalize())
app.use(passport.session())
app.use(new LocalStrategy (authUser))


passport.use( new GoogleStrategy({
  clientID: config.GOOGLE_CLIENT_ID,
  clientSecret:config.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback".
  passReqToCallback: true
 },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleID: profile.id}, function (err,user){
      return done(err,user);
    });
   }
));

app.get('/', (req, res) =>{
  res.send('Hello World')
});

app.get('/auth/google',
  passport.authenticate('google', {scope:
    ['email','profile'] }
  ));

app.get ('auth/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/auth/google/success',
    failureRedirect: '/auth/google/failure
 }));

const PORT = config.PORT || 3030;
app.listen (PORT, () => {
e console.log(`Server is running on port ${PORT}`);
});


