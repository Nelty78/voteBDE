'use strict';

function voteHandler (db, passport) {

    var clicks = db.collection('votes');
    
    this.getVotes = function (req, res) {
       clicks.find({ 'value': 'stacks' }, { 'email': 1 }).count().then(function (nbstacks) {
          
          clicks.find({ 'value': 'ted' }).count().then(function (nbted) { 
             
             var json = { stacks: nbstacks, 
                    ted: nbted };
            
             res.send(json);
             
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
             if(vote == 'ted') vote = "Ted'Quila";
             else vote = "Stacks & Furious";
             console.log(req.session);
            res.send('Tu as déjà voté ! Pour : '+vote);
         } else {
            var date = new Date();
            var hours = date.getHours()+1;
            var minutes = date.getMinutes();
            
            var hour = (hours < 10 ? '0' : '') + hours; // adjust +1 according to server time 
            var minute = (minutes < 10 ? '0' : '') + minutes;
            
            // Let's check the POST data
            var radioValue = req.body.exampleRadios;
            var possibleRadios = ['ted', 'stacks'];
            var selectValue = req.body.campus;
            var possibleSelects = ['Madrid', 'Berlin', 'Londres', 'Turin'];
            
            if(possibleRadios.indexOf(radioValue) === -1 || possibleSelects.indexOf(selectValue) === -1) {
             res.send('Petit malin.');   
            }
            else {
            
                var time = hour+'h'+minute;
                clicks.insert({ 'email': req.user.email, 'value': radioValue, 'time': time , 'campus': selectValue}, function (err) {
                   if (err) {
                      throw err;
                   }
        
                   clicks.findOne({'email': req.user.email}, voteProjection, function (err, doc) {
                      if (err) {
                         throw err;
                      }
                     
                      var vote = doc.value;
                      if(vote == 'ted') vote = "Ted'Quila";
                      else vote = "Stacks & Furious";
                      res.send("Merci d'avoir voté pour : "+vote);
                   });
                });
            }
         }
      });
    };
}

module.exports = voteHandler;