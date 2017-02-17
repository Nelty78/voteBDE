'use strict';

var express = require('express'),
    session = require('express-session'),
    routes = require('./app/routes/index.js'),
    sassMiddleware = require('node-sass-middleware'),
    path = require('path'),
    mongo = require('mongodb').MongoClient,
    bodyParser = require('body-parser'),
    passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    User = require('./app/controllers/userHandler.server.js'),
    cookieParser = require('cookie-parser');

var app = express();

var srcPath = __dirname;
var destPath = __dirname;
app.use(sassMiddleware({
  src: srcPath,
  dest: destPath,
  debug: true,
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
app.use(session({
    secret: 'sunscep',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000}
    }));
app.use(passport.initialize());
app.use(passport.session());



passport.use(new GoogleStrategy({
    clientID: '282525321476-nopagupo09jbvbvnh8frecrr7rjlrtsj.apps.googleusercontent.com',
    clientSecret: 'QNP6X8HnZ5bfshg9FBeBhSi9',
    callbackURL: "https://bde-nelty78.c9users.io/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
        var user = new User();
        
        var profileUser = user.extractProfile(profile);
        
        done(null, profileUser.email);

  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(id, done) {
    done(null, id);
});


mongo.connect('mongodb://admin:admin@ds145289.mlab.com:45289/bde', function (err, db) {

    if (err) {
        throw new Error('Database failed to connect!');
    } else {
        console.log('MongoDB successfully connected.');
    }


    routes(app, db, passport);

    app.listen(80, function () {
        console.log('Listening on port 80...');
    });

});