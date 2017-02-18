/* global $ */

$( document ).ready(function() {
 
 $.get('admin/getVotes', function(data) { 
      $(" #votes ").text(data);
      var nbstacks = data.stacks;
      var nbted = data.ted;
      var nbtotal = nbstacks+nbted;
      var pcstacks = (nbstacks/nbtotal*100).toFixed(2);
      var pcted = (nbted/nbtotal*100).toFixed(2);
      
      $(" #nbtotal ").text(nbtotal);
      $(" #nbstacks ").text(nbstacks);
      $(" #pcstacks ").text(pcstacks);
      $(" #nbted ").text(nbted);
      $(" #pcted ").text(pcted);
 });

$.get('admin/getListVotes', function(data) { 

    
    var html = '<table class="responstable"><tr><th>Campus</th><th data-th="Votant"><span>Adresse e-mail</span></th><th>Vote</th><th>Heure</th></tr>';
    
    for(var i = 0; i < data.length; i++) {
        var vote = data[i].value;
        if(vote == "ted") vote = "Ted'Quila";
        else vote = "Stacks & Furious";
        
        var campus = data[i].campus;
        var campusClass = '';
        switch(campus) {
            case 'Berlin':
                campusClass = 'btn-info';
                break;
            case 'Londres':
                campusClass = 'btn-danger';
                break;
            case 'Madrid':
                campusClass = 'btn-success';
                break;
            case 'Turin':
                campusClass = 'btn-warning';
                break;
        }
        var time = data[i].time;
        html += '<tr><td><button class="btn '+campusClass+'">'+campus+'</button></td><td>'+data[i].email+'</td><td>'+vote+'</td><td>'+time+'</td></tr>';
    }
    
    html += '</table>';
    
    $(" #table ").html(html);
    
    
});

});