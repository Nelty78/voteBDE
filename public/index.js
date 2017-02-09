var rand = Math.random();
var src_ted = "public/img/logoted.jpg";
var src_stacks = "public/img/logostacks.png";
var names = ["Stacks & Furious", "Ted'Quila"];

$( document ).ready(function() {

    if(rand < 0.5) {
      $(" body ").css('background', 'linear-gradient(90deg, RGB(156,21,29) 50%, RGB(244,232,52) 50%)');
      $(" .img-left ").attr('src', src_stacks);
      $(" .img-right ").attr('src', src_ted);
      $(" #name1 ").text(names[0]);
      $(" #name2 ").text(names[1]);
      $(" #radio-one ").css('color', 'RGB(156,21,29)');
      $(" #radio-one ").attr('value', 'stacks');
      $(" #radio-two ").css('color', 'RGB(244,232,52)');
      $(" #radio-two ").attr('value', 'ted');
      }
    else {
      $(" body ").css('background', 'linear-gradient(90deg, RGB(244,232,52) 50%, RGB(156,21,29) 50%)'); 
      $(" .img-left ").attr('src', src_ted);
      $(" .img-right ").attr('src', src_stacks);
      $(" #name1 ").text(names[1]);
      $(" #name2 ").text(names[0]);
      $(" #radio-one ").css('color', 'RGB(244,232,52)');
      $(" #radio-one ").attr('value', 'ted');
      $(" #radio-two ").css('color', 'RGB(156,21,29)');
      $(" #radio-two ").attr('value', 'stacks');
    
    }

});

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  $(" #login ").removeClass('alert alert-danger');
  $(" #welcome ").addClass('hide');
  $(" #form ").removeClass('hide');
  if(profile.getEmail().split("@")[1] == "edu.escpeurope.eu") {
    $(" #login ").html('Bienvenue '+profile.getName().split(' ')[0]);
       
    $(" .logout ").removeClass('hide');
    $(" .logout ").html('<div class="logout"><a href="#" onclick="signOut();">Déconnexion <i class="fa fa-sign-out fa-lg" aria-hidden="true"></i></a></div>');
    
  }
  else { 
    signOut();
    $(" #login ").html('Il faut te connecter avec ton adresse ESCP !');
    $(" #login ").addClass('alert alert-danger');
    
  }
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
  auth2.disconnect();
  $(" #login ").html('');
  $(" #form ").addClass('hide');
  $(" .logout ").addClass('hide');
  $(" #welcome ").removeClass('hide');
  }