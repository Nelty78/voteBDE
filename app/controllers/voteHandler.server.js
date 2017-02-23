'use strict';

function voteHandler (db, passport) {

    var clicks = db.collection('votes');
    var startEnd = db.collection('startEnd');
    
    this.getStartEnd = function (req, res) {
        startEnd.findOne(function (err, doc) {
            if(err) throw err;
            doc.now = new Date();
            res.send(doc);
        });
    }
    
    this.getVotes = function (req, res) {
       clicks.find({ 'value': 'stacks' }, { 'email': 1 }).count().then(function (nbstacks) {
          
          clicks.find({ 'value': 'ted' }).count().then(function (nbted) { 
             clicks.find({ 'value': 'blanc' }).count().then(function (nbblanc) { 
                 
                var json = { stacks: nbstacks, 
                        ted: nbted,
                        blanc: nbblanc};
            
                res.send(json);
             });
          }); 
          
       }); 
        

    }
    
    this.getListVotes = function (req, res) {
       clicks.find({}, {'email': 1, 'value': 1, 'time': 1, 'campus': 1}).sort( { _id: -1 } ).toArray(function (err, data) {
          if (err) {
             throw err;
          }
          res.send(data);
       });
    }
    
    this.newVote = function (req, res) {
    

      var voteProjection = { 'email': 1, 'value': 1, 'time': 1 };
    
      clicks.findOne({'email': req.user.email }, voteProjection, function (err, result) {
         if (err) {
            throw err;
         }
    
         if (result) {
             var vote = result.value;
             switch(vote) {
                          case 'ted':
                              vote = "pour Ted'Quila";
                              break;
                          case 'stacks':
                              vote = "pour Stacks & Furious";
                              break;
                          case 'blanc':
                              vote = "blanc";
                              break;
                          default:
                              vote = "[ Vote invalide ]";
                              break;
                      }
            res.send('Tu as déjà voté '+vote+' !');
         } else {
            var date = new Date();
            
            // Let's check the POST data
            var radioValue = req.body.exampleRadios;
            var possibleRadios = ['ted', 'stacks', 'blanc'];
            var selectValue = req.body.campus;
            var possibleSelects = ['Madrid', 'Berlin', 'Londres', 'Turin', 'Césure'];
            
            if(possibleRadios.indexOf(radioValue) === -1 || possibleSelects.indexOf(selectValue) === -1) {
             res.send('Petit malin.');   
            }
            else {
                clicks.insert({ 'email': req.user.email, 'value': radioValue, 'time': date , 'campus': selectValue}, function (err) {
                   if (err) {
                      throw err;
                   }
        
                   clicks.findOne({'email': req.user.email}, voteProjection, function (err, doc) {
                      if (err) {
                         throw err;
                      }
                     
                      var vote = doc.value;
                      switch(vote) {
                          case 'ted':
                              vote = "pour Ted'Quila";
                              break;
                          case 'stacks':
                              vote = "pour Stacks & Furious";
                              break;
                          case 'blanc':
                              vote = "blanc";
                              break;
                          default:
                              vote = "[ Vote invalide ]";
                              break;
                      }

                      res.send("Merci d'avoir voté "+vote+".");
                   });
                });
            }
         }
      });
    };
}

module.exports = voteHandler;