'use strict';

var userHandler = function (req, res) {
    
    var admin = ["baptiste.foulon@edu.escpeurope.eu", "clement.allouard@edu.escpeurope.eu", "francois.chapoulart@edu.escpeurope.eu",
                    "leo.roux@edu.escpeurope.eu", "solene.pratmarty@edu.escpeurope.eu"];
    
    this.extractProfile = function (profile) {
        var profile = { email: profile.emails[0].value,
                        lastName: profile.name.familyName,
                        firstName: profile.name.givenName
                        };
        return profile;
    }
    this.connected = function (req, res, next) {
        if (req.user.email && req.user.email.split("@")[1] == "edu.escpeurope.eu") {
            next();
        } else {
            res.redirect('/');
        }
    }
    this.isconnected = function(req, res, next) {
        var result = { connected: false, message: "" };
        if(req.user) { if(req.user.email.split("@")[1] == "edu.escpeurope.eu") { result.connected = true; } else { result.message = "Il faut te connecter avec ton adresse ESCP !"; }}
        else { result.message = ""; }
        res.send(result);
    }
    this.admin = function(req, res, next) {
        if(req.user) { if(admin.indexOf(req.user.email) > -1) next(); else return res.redirect('/'); }
        else return res.redirect('/');
    }
    
    this.isAdmin = function(req, res) {
        var result = false;
        if(req.user) { if(admin.indexOf(req.user.email) > -1) result = true } ;
        res.send(result);
    }
}

module.exports = userHandler;