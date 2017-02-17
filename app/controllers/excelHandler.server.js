'use strict';
var fs = require('fs');

function excelHandler (db, passport) {
    
    var clicks = db.collection('votes');
    
        this.getVotes = function (req, res) {
       clicks.find({ 'value': 'stacks' }, { 'email': 1 }).count().then(function (nbstacks) {
          console.log('stacks : '+nbstacks); 
          
          clicks.find({ 'value': 'ted' }).count().then(function (nbted) { 
             console.log('ted : '+nbted); 
             
             var json = { stacks: nbstacks, 
                    ted: nbted };
            
             res.send(json);
             
          }); 
          
       }); 
        

    }
    
    this.export = function(req, res) {
        res.send('success');
        var writeStream = fs.createWriteStream("file.csv");

        var header="Sl No"+","+" Age"+","+"Name"+"\n";
        var row1 = "0"+","+" 21"+","+"Rob"+"\n";
        var row2 = "1"+","+" 22"+","+"bob"+"\n";
        
        writeStream.write(row1);
        writeStream.write(header);
        writeStream.write(row2);
        
        writeStream.close();
        
        
    }
    
}

module.exports = excelHandler;