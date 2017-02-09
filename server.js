'use strict';

var express = require('express'),
    routes = require('./app/routes/index.js'),
    mongo = require('mongodb').MongoClient,
    bodyParser = require('body-parser');

var app = express();

//app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

mongo.connect('mongodb://localhost:27017/vote-beta', function (err, db) {

    if (err) {
        throw new Error('Database failed to connect!');
    } else {
        console.log('MongoDB successfully connected on port 27017.');
    }

    app.use('/public', express.static(process.cwd() + '/public'));
    app.use('/controllers', express.static(process.cwd() + '/app/controllers'));

    routes(app, db);

    app.listen(8080, function () {
        console.log('Listening on port 8080...');
    });

});