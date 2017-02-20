'use strict';

var VoteHandler = require(process.cwd() + '/app/controllers/voteHandler.server.js');
var UserHandler = require(process.cwd() + '/app/controllers/userHandler.server.js');
var ExcelHandler = require(process.cwd() + '/app/controllers/excelHandler.server.js');

module.exports = function (app, db, passport, user) {

    var user = new UserHandler();
    var voteHandler = new VoteHandler(db, passport);
    var excelHandler = new ExcelHandler(db, passport);

    app.route('/')
        .get(function (req, res) {
            res.sendFile(process.cwd() + '/public/index.html');
        });

    app.route('/admin/export')
        .get(user.admin, excelHandler.export);

    app.route('/admin')
        .get(user.admin, function (req, res) {
            res.sendFile(process.cwd() + '/public/admin.html');
        });        
     
    app.route('/admin/getVotes')
        .get(user.admin, voteHandler.getVotes);
        
    app.route('/admin/getListVotes')
        .get(user.admin, voteHandler.getListVotes);

    app.route('/vote')
        .post(user.connected, voteHandler.newVote); // Only grant access if he is connected
    
    app.route('/api/getStartEnd')
        .get(voteHandler.getStartEnd);

    app.route('/api/connected')
        .get(user.isconnected);
        
    app.route('/api/isAdmin')
        .get(user.isAdmin);
    
    app.route('/auth/google')   
        .get(passport.authenticate('google', { scope: ['email profile'] }));
        
    app.route('/auth/google/callback')
        .get(passport.authenticate('google', { failureRedirect: '/' }),
            function(req, res) {
                res.redirect('/');
            });
    app.route('/logout')
        .get(function(req, res){
            req.logout();
            res.redirect('/');
});    

};