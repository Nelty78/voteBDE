$( document ).ready(function() {

function checkTimeLeft() {
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
      
      var seconds_left = restant; 
      
      if(seconds_left < 0) { 
          $( '#tiles' ).removeClass('color-full');
          $( '#tiles' ).removeClass('color-half');
          $( '#tiles' ).addClass('color-empty');
          var countdown = document.getElementById("tiles"); // get tag element
          countdown.innerHTML = "<span>Temps écoulé.</span>"; 
          $(" #form ").addClass('hide');
          $(" #login ").addClass('hide');
          $(" #welcome ").addClass('hide');
          $(" #submit ").attr('disabled','disabled');
      
      }
      else {
          //var time_limit = ((60 * 60 ) * 1000); // 60 minutes
          
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
          
      
          // calculate (and subtract) whole days
          var daysRestant = ('0' + Math.floor(restant / 86400).toString()).slice(-2);
          restant -= daysRestant * 86400;
      
          // calculate (and subtract) whole hours
          var hoursRestant = ('0' + (Math.floor(restant / 3600) % 24).toString()).slice(-2);
          restant -= hoursRestant * 3600;
          
          // calculate (and subtract) whole minutes
          var minutesRestant = ('0' + (Math.floor(restant / 60) % 60).toString()).slice(-2);
          restant -= minutesRestant * 60;
          
          var secondsRestant = Math.floor(restant);
          secondsRestant = (secondsRestant < 10 ? '0' : '') + secondsRestant;
          
          daysRestant = daysRestant+'';
          hoursRestant = hoursRestant+'';
          minutesRestant = minutesRestant+'';
          secondsRestant = secondsRestant+''
          
          if(daysRestant == "00j") daysRestant = "";
          if(hoursRestant == "00h") hoursRestant = "";
      
          restant = daysRestant + hoursRestant + minutesRestant + secondsRestant;
         
          //$(" #debut ").text(debut);
          //$(" #cloture ").text(cloture);
          //$(" #now ").text(nowDate);
          //$(" #restant ").text(restant); 
          
        // format countdown string + set tag value
        
        var countdown = document.getElementById("tiles"); // get tag element
        countdown.innerHTML = "<span>" + daysRestant + ":</span><span>" + hoursRestant + ":</span><span>" + minutesRestant + ":</span><span>" + secondsRestant + "</span>"; 
      }
    });
}
setInterval(checkTimeLeft, 1000);
});

 /*   var minutes = $( '#set-time' ).val();
    
    var target_date = new Date().getTime() + ((minutes * 60 ) * 1000); // set the countdown date
    var time_limit = ((minutes * 60 ) * 1000);
    //set actual timer
    setTimeout(time_limit );
    
    var days, hours, minutes, seconds; // variables for time units
    
    var countdown = document.getElementById("tiles"); // get tag element
    
    getCountdown();
    
    setInterval(function () { getCountdown(); }, 1000);
    
    function getCountdown(){
    
    	// find the amount of "seconds" between now and target
    	//var current_date = new Date().getTime();
    	//var seconds_left = (target_date - current_date) / 1000;
        var seconds_left = checkTimeLeft();
        console.log('Seconds :::'+seconds_left)
        
    if ( seconds_left >= 0 ) {
      console.log(time_limit);
       if ( (seconds_left * 1000 ) < ( time_limit / 2 ) )  {
         $( '#tiles' ).removeClass('color-full');
         $( '#tiles' ).addClass('color-half');
    
    		} 
        if ( (seconds_left * 1000 ) < ( time_limit / 4 ) )  {
        	$( '#tiles' ).removeClass('color-half');
        	$( '#tiles' ).addClass('color-empty');
        }
      
    	days = pad( parseInt(seconds_left / 86400) );
    	seconds_left = seconds_left % 86400;
    		 
    	hours = pad( parseInt(seconds_left / 3600) );
    	seconds_left = seconds_left % 3600;
    		  
    	minutes = pad( parseInt(seconds_left / 60) );
    	seconds = pad( parseInt( seconds_left % 60 ) );
    
    	// format countdown string + set tag value
    	countdown.innerHTML = "<span>" + hours + ":</span><span>" + minutes + ":</span><span>" + seconds + "</span>"; 
      
    
      
    }
       
      
      
    }
    
    function pad(n) {
    	return (n < 10 ? '0' : '') + n;
    }
});*/