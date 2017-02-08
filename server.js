'use strict';

var express = require('express'),
    routes = require('./app/routes/index.js');

var app = express();
app.use(express.static(__dirname + '/public'));

routes(app);

app.listen(8080, function () {
    console.log('Listening on port 8080...');
});