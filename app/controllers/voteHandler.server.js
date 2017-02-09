'use strict';



function voteHandler (db) {

    var clicks = db.collection('votes');
    this.newVote = function (req, res) {
    
    console.log(req.body.exampleRadios);
    res.send(req.body.exampleRadios);
    
      /*var voteProjection = { 'value': false };
    
      clicks.findOne({}, clickProjection, function (err, result) {
         if (err) {
            throw err;
         }
    
         if (result) {
            res.json(result);
         } else {
            clicks.insert({ 'clicks': 0 }, function (err) {
               if (err) {
                  throw err;
               }
    
               clicks.findOne({}, clickProjection, function (err, doc) {
                  if (err) {
                     throw err;
                  }
    
                  res.json(doc);
               });
            });
         }
      });*/
    };
}

module.exports = voteHandler;