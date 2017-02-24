/* global $ */

$( document ).ready(function() {

var formDisabled = false;
var beforeVote = false; // If the vote hasn't started we'll set this to true;

function disableForm(beforeVote, message) {
    formDisabled = true;  // let's use this var to only disable the form once...
    
    $( '#tiles' ).removeClass('color-full');
    $( '#tiles' ).removeClass('color-half');
    $( '#tiles' ).addClass('color-empty');
    if(beforeVote) $(" .countdown-label ").text('Revenez plus tard');
    else $("#tiles").text(message);
    $(" #form ").addClass('hide');
    $(" #login ").addClass('hide');
    $(" #welcome ").addClass('hide');
    $(" #submit ").attr('disabled','disabled');
}

function enableForm() {
    formDisabled = false;
    
    $( '#tiles' ).addClass('color-full');
    $( '#tiles' ).removeClass('color-empty');
    $(" .countdown-label ").text('Temps restant');
    $(" #login ").removeClass('hide');
    $(" #welcome ").removeClass('hide');
    $(" #submit ").removeAttr("disabled");
}

function checkTimeLeft() {

$.get('api/getStartEnd', function(data) {

      
      var start = new Date(data.start);
      var end = new Date(data.end);
      var now = new Date(data.now);
      
      
      if((start-now) > 0) { // The vote hasn't started yet! 
          end = start;
          beforeVote = true;
          if(!formDisabled) disableForm(beforeVote);
      }
      else {
          if(beforeVote == true) { 
              beforeVote = false;
              enableForm();
          }
      }
      
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
              disableForm(false, 'Temps écoulé.');
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
              
     
});
}
setInterval(checkTimeLeft, 1000);
});