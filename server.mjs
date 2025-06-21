import express from 'express';
import config from './config/config.mjs'; 
import session from 'express-session';
import passport from './config/passport.mjs';
import MongoStore from 'connect-mongo';
import DB from './DB.mjs'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import ensureAuthenticated from './middleware/ensureAuthentication.mjs';



const app = express();

DB()

const store = MongoStore.create({
  mongoUrl: config.MONGO_URI,
  ttl: 14 * 24 * 60 * 60,
  autoRemove: 'native',
  });

app.use(session({
  secret: config.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: config.NODE_ENV === 'production',
    sameSite: 'lax',
    httpOnly: true,
  }
}))



app.use(passport.initialize())
app.use(passport.session())

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
    ['email','profile'] },
  ));

app.get('/auth/google/callback',
  passport.authenticate( 'google', {  failureRedirect: '/login'}),
  function(req,res){
    res.redirect('/');
  }
);

app.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);

app.get(
  '/auth/spotify',
  passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private'],
    showDialog: true
  })
);

app.get('/auth/soundcloud',
  passport.authenticate('soundcloud',{
    scope: ['non-expiring'],
  }
));

app.get('/auth/soundcloud/callback',
  passport.authenticate('soundcloud',{failureRedirect: '/login'}),
  function(req,res){
    res.redirect('/');
  }
);

app.get('/logout', function(req, res, next){
  req.logout();
  res.redirect('/');
})

const PORT = config.PORT || 3030;
app.listen (PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});


