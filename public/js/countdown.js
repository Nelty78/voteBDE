/* global $ */

$( document ).ready(function() {

function disableForm(message) {
    $( '#tiles' ).removeClass('color-full');
    $( '#tiles' ).removeClass('color-half');
    $( '#tiles' ).addClass('color-empty');
    var countdown = document.getElementById("tiles"); // get tag element
    countdown.innerHTML = "<span>"+message+"</span>"; 
    $(" #form ").addClass('hide');
    $(" #login ").addClass('hide');
    $(" #welcome ").addClass('hide');
    $(" #submit ").attr('disabled','disabled');
}

function checkTimeLeft() {
$.get('api/getStartEnd', function(data) {
      
      var start = new Date(data.start);
      var end = new Date(data.end);
      var now = new Date();
      
      if((start-now) > 0) { // The vote hasn't started yet! 
          disableForm("Revenez plus tard.");
      }
      else {
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
          
          var nowHours = now.getHours();
          var nowMinutes = now.getMinutes();
          var nowHour = (nowHours < 10 ? '0' : '') + nowHours; // adjust +1 according to server time
          var nowMinute = (nowMinutes < 10 ? '0' : '') + nowMinutes;
          var nowTime = nowHour+'h'+nowMinute;
          
          var nowDate = ('0' + now.getDate()).slice(-2) + '/'
                   + ('0' + (now.getMonth()+1)).slice(-2) + ' ' + nowTime;
          var restant = (end-now)/1000;
          
          var seconds_left = restant; 
          
          if(seconds_left < 0) { 
              disableForm('Temps écoulé.');
          }
          else {
              if ( seconds_left >= 0 ) {
               if ( (seconds_left * 1000 ) < ( 60*60*1000 ) )  { // One hour
                 $( '#tiles' ).removeClass('color-full');
                 $( '#tiles' ).addClass('color-half');
            		} 
               if ( (seconds_left * 1000 ) < ( 20*60*1000 ) )  { // 20 minutes
                	$( '#tiles' ).removeClass('color-half');
                	$( '#tiles' ).addClass('color-empty');
                }      
              }
              
              var daysRestant = ('0' + Math.floor(restant / 86400).toString()).slice(-2);
              restant -= daysRestant * 86400;
              var hoursRestant = ('0' + (Math.floor(restant / 3600) % 24).toString()).slice(-2);
              restant -= hoursRestant * 3600;
              var minutesRestant = ('0' + (Math.floor(restant / 60) % 60).toString()).slice(-2);
              restant -= minutesRestant * 60;
              var secondsRestant = Math.floor(restant);
              secondsRestant = (secondsRestant < 10 ? '0' : '') + secondsRestant;
          
              restant = daysRestant + hoursRestant + minutesRestant + secondsRestant;
            
              var countdown = document.getElementById("tiles"); // get tag element
              countdown.innerHTML = "<span>" + daysRestant + ":</span><span>" + hoursRestant + ":</span><span>" + minutesRestant + ":</span><span>" + secondsRestant + "</span>"; 
          }
              
      }
});
}
setInterval(checkTimeLeft, 1000);
});