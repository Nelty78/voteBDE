'use strict';

var express = require('express'),
    session = require('express-session'),
    MongoDBStore = require('connect-mongodb-session')(session),
    routes = require('./app/routes/index.js'),
    sassMiddleware = require('node-sass-middleware'),
    path = require('path'),
    mongo = require('mongodb').MongoClient,
    bodyParser = require('body-parser'),
    passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    User = require('./app/controllers/userHandler.server.js'),
    cookieParser = require('cookie-parser');

var port = process.env.PORT || 8080;

var app = express();

var srcPath = __dirname;
var destPath = __dirname;
app.use(sassMiddleware({
  src: srcPath,
  dest: destPath,
  debug: false, // change to 'true' if some .scss files are not working properly
  outputStyle: 'compressed',
  prefix: ''
}),
express.static(path.join(__dirname, 'public')));
// Note: you must place sass-middleware *before* `express.static` or else it will
// not work.
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

// DB

mongo.connect(process.env.MONGODB_URI, function (err, db) {

    if (err) {
        throw new Error('Database failed to connect!');
    } else {
        console.log('MongoDB successfully connected.');
    }


    // Sessions
    
    var store = new MongoDBStore(
          {
            uri: process.env.MONGODB_URI,
            mongooseConnection: db,
            collection: 'mySessions'
          });
     
        // Catch errors 
        store.on('error', function(error) {
          throw error;
        });
    
    app.use(session({
        path    : '/',
        secret: 'sunscep',
        resave: true,
        store: store,
        saveUninitialized: true,
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000}
        }));
    app.use(passport.initialize());
    app.use(passport.session());

var UserDB = db.collection('users');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.CALLBACK_URL,
  },
    function(token, refreshToken, profile, done) {
      process.nextTick(function() {
        
        UserDB.findOne({ 'id': profile.id }, function(err, user) {
          if (err)
            return done(err);
          if (user) {
            return done(null, user);
          } else {
              
             var newUser = {};
             newUser.id = profile.id;
             newUser.token = token;
             newUser.name = profile.displayName;
             newUser.email = profile.emails[0].value;            
             UserDB.insert({ 'id': profile.id, 'token': token, 'name': profile.displayName , 'email': profile.emails[0].value}, function (err) {
                   if (err) {
                      throw err;
                   }
                   return done(null, newUser);
            });
        }
      });
    });
    }));
    
    passport.serializeUser(function(user, done) {
        console.log('Serializing user:'+user.id);
        done(null, user);
    });
    
    
    passport.deserializeUser(function (user, done) {
        
        console.log('Deserializing user:');
        console.log(user);
        return UserDB.findOne({ id: user.id }, function (error, user) {
            console.log('Found :');
            console.log(user);
            return done(error, user);
        });
    });

    routes(app, db, passport);

    app.listen(port, function () {
        console.log('Listening on port '+port+'...');
    });

});



