import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import config from './config/config.mjs'; 
import session from 'express-session';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20'
import MongoStore from 'connect-mongo';
import LocalStrategy from 'passport-local'
import DB from './DB.mjs'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'


const app = express();

DB()


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: config.MONGO_URI})
}))

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(
  (username, password, done)=> {
  }
));


passport.use( new GoogleStrategy({
  clientID: config.GOOGLE_CLIENT_ID, clientSecret:config.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
  passReqToCallback: true
 },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleID: profile.id}, function (err,user){
      return done(err,user);
    });
   }
));

app.set('views', './views');
app.set('view engine', 'ejs');
app.use( express.static( '/public'));
app.use( cookieParser()); 
app.use( bodyParser.json());
app.use( bodyParser.urlencoded({
	extended: true
}));

app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/login', function(req, res){
  res.render('login', { user: req.user });
});

app.get('/auth/google',
  passport.authenticate('google', {scope:
    ['email','profile'] }
  ));

app.get ('auth/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/',
    failureRedirect: '/login'
 }));

app.get('/logout', function(req, res, next){
  req.logout(function(err){
    if(err) return next(err);
  res.redirect('/');
  })
});

const PORT = config.PORT || 3030;
app.listen (PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});


