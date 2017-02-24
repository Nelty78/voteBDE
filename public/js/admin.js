/* global $ */

$( document ).ready(function() {
 
 $.get('admin/getVotes', function(data) { 
      $(" #votes ").text(data);
      var nbstacks = data.stacks;
      var nbted = data.ted;
      var nbblanc = data.blanc;
      var nbtotal = nbstacks+nbted+nbblanc;
      var pcstacks = (nbstacks/(nbted+nbstacks)*100).toFixed(2);
      var pcted = (nbted/(nbted+nbstacks)*100).toFixed(2);
      var pcblanc = (nbblanc/nbtotal*100).toFixed(2);
      
      $(" #nbtotal ").text(nbtotal);
      $(" #nbstacks ").text(nbstacks);
      $(" #nbblanc ").text(nbblanc);
      $(" #pcstacks ").text(pcstacks);
      $(" #nbted ").text(nbted);
      $(" #pcted ").text(pcted);
      //$(" #pcblanc ").text(pcblanc);
 });

$.get('api/getStartEnd', function(data) {
    
    var start = new Date(data.start);
    var end = new Date(data.end);

    var startHours = start.getHours();
    var startMinutes = start.getMinutes();
    var endHours = end.getHours();
    var endMinutes = end.getMinutes();
            
    var startHour = (startHours < 10 ? '0' : '') + startHours; // adjust +1 according to server time 
    var endHour = (endHours < 10 ? '0' : '') + endHours; // adjust +1 according to server time 
    
    var startMinute = (startMinutes < 10 ? '0' : '') + startMinutes;
    var endMinute = (endMinutes < 10 ? '0' : '') + endMinutes;
        
    var startTime = startHour+'h'+startMinute;
    var endTime = endHour+'h'+endMinute;
    
    var debut = ('0' + start.getDate()).slice(-2) + '/'
             + ('0' + (start.getMonth()+1)).slice(-2)+' '+startTime;
    var cloture = ('0' + end.getDate()).slice(-2) + '/'
             + ('0' + (end.getMonth()+1)).slice(-2)+' '+endTime;
    
    var now = new Date();
    var nowHours = now.getHours();
    var nowMinutes = now.getMinutes();
    var nowHour = (nowHours < 10 ? '0' : '') + nowHours; // adjust +1 according to server time
    var nowMinute = (nowMinutes < 10 ? '0' : '') + nowMinutes;
    var nowTime = nowHour+'h'+nowMinute;
    
    var nowDate = ('0' + now.getDate()).slice(-2) + '/'
             + ('0' + (now.getMonth()+1)).slice(-2) + ' ' + nowTime;
    var restant = (end-now)/1000;
    

    // calculate (and subtract) whole days
    var daysRestant = ('0' + Math.floor(restant / 86400).toString()).slice(-2);
    restant -= daysRestant * 86400;

    // calculate (and subtract) whole hours
    var hoursRestant = ('0' + (Math.floor(restant / 3600) % 24).toString()).slice(-2);
    restant -= hoursRestant * 3600;
    
    // calculate (and subtract) whole minutes
    var minutesRestant = ('0' + (Math.floor(restant / 60) % 60).toString()).slice(-2);
    restant -= minutesRestant * 60;
    
    daysRestant = daysRestant+'j';
    hoursRestant = hoursRestant+'h';
    minutesRestant = minutesRestant+'mn';
    
    if(daysRestant == "00j") daysRestant = "";
    if(hoursRestant == "00h") hoursRestant = "";

    restant = daysRestant + hoursRestant + minutesRestant;
    
    if((end-now) < 0) restant = 'vote terminé. ';
    
    $(" #debut ").text(debut);
    $(" #cloture ").text(cloture);
    $(" #now ").text(nowDate);
    $(" #restant ").text(restant);
});

$.get('admin/getListVotes', function(data) { 

    
    var html = '<table class="responstable display" id="dataTable"><thead><tr><th>Campus</th><th data-th="Votant"><span>Adresse e-mail</span></th><th>Vote</th><th>Date</th><th>Heure</th></tr></thead><tfoot><tr><th>Campus</th><th data-th="Votant"><span>Adresse e-mail</span></th><th>Vote</th><th>Date</th><th>Heure</th></tr></tfoot><tbody>';
    
    for(var i = 0; i < data.length; i++) {
        var vote = data[i].value;
        if(vote == "ted") vote = "Ted'Quila";
        if(vote == "stacks") vote = "Stacks & Furious";
        if(vote == "blanc") vote = "Blanc";
        
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
            case 'Césure':
                campusClass = 'btn-default';
                break;
        }
        var time = new Date(data[i].time);
        
        var hours = time.getHours();
        var minutes = time.getMinutes();
            
        var hour = (hours < 10 ? '0' : '') + hours; // adjust +1 according to server time 
        var minute = (minutes < 10 ? '0' : '') + minutes;
        
        var dateTab = ('0' + time.getDate()).slice(-2) + '/'
             + ('0' + (time.getMonth()+1)).slice(-2);
        time = hour+'h'+minute;
        html += '<tr><td><button class="btn '+campusClass+'">'+campus+'</button></td><td>'+data[i].email+'</td><td>'+vote+'</td><td>'+dateTab+'</td><td>'+time+'</td></tr>';
    }
    
    html += '</tbody></table>';
    
    $(" #table ").html(html);
    
    $('#dataTable').DataTable({
    dom: 'Blftipr',
    "bSort": false,
    buttons: [
        'excel', 'csv', 'pdf'
    ],
    "language": {
    "sProcessing":     "Traitement en cours...",
    "sSearch":         "Rechercher&nbsp;:",
    "sLengthMenu":     "Afficher _MENU_ &eacute;l&eacute;ments",
    "sInfo":           "Affichage de l'&eacute;l&eacute;ment _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
    "sInfoEmpty":      "Affichage de l'&eacute;l&eacute;ment 0 &agrave; 0 sur 0 &eacute;l&eacute;ment",
    "sInfoFiltered":   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
    "sInfoPostFix":    "",
    "sLoadingRecords": "Chargement en cours...",
    "sZeroRecords":    "Aucun &eacute;l&eacute;ment &agrave; afficher",
    "sEmptyTable":     "Aucune donn&eacute;e disponible dans le tableau",
    "oPaginate": {
        "sFirst":      "Premier",
        "sPrevious":   "Pr&eacute;c&eacute;dent",
        "sNext":       "Suivant",
        "sLast":       "Dernier"
    },
    "oAria": {
        "sSortAscending":  ": activer pour trier la colonne par ordre croissant",
        "sSortDescending": ": activer pour trier la colonne par ordre d&eacute;croissant"
    }
}
});

});

});