'use strict';

var userHandler = function (req, res) {
    
    var admin = ["leo.roux@edu.escpeurope.eu", "clement.allouard@edu.escpeurope.eu",
                "solene.pratmarty@edu.escpeurope.eu", "francois.chapoulart@edu.escpeurope.eu"];
    
    this.extractProfile = function (profile) {
        var profile = { email: profile.emails[0].value,
                        lastName: profile.name.familyName,
                        firstName: profile.name.givenName
                        };
        return profile;
    }
    this.connected = function (req, res, next) {
        if (req.user && req.user.split("@")[1] == "edu.escpeurope.eu") {
            next();
        } else {
            res.redirect('/');
        }
    }
    this.isconnected = function(req, res, next) {
        var result = { connected: false, message: "" };
        if(req.user) { if(req.user.split("@")[1] == "edu.escpeurope.eu") { result.connected = true; } else { result.message = "Il faut te connecter avec ton adresse ESCP !"; }}
        else { result.message = ""; }
        res.send(result);
    }
    this.admin = function(req, res, next) {
        if(admin.indexOf(req.user) > -1) next();
        else return res.redirect('/');
    }
    this.isAdmin = function(req, res) {
        var result = false
        if(admin.indexOf(req.user) > -1) result = true;
        res.send(result);
    }
}

module.exports = userHandler;