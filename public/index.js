var rand = Math.random();
var src_ted = "public/img/logoted.jpg";
var src_stacks = "public/img/logostacks.png";
var names = ["Stacks & Furious", "Ted'Quila"];

$( document ).ready(function() {

    $.get('api/isAdmin', function (result) {
      if(result === true) $(" .admin ").html('<a href="/admin""><i class="fa fa-lock fa-lg" aria-hidden="true"></i> Administration</a>');
    });
    
    $.get('api/connected', function(data) { 
      if(data.connected) {
        $(" #login ").removeClass('alert alert-danger');
        $(" #welcome ").addClass('hide');
        $(" #form ").removeClass('hide');
        $(" #login ").html('Bienvenue !');
        $(" .logout ").removeClass('hide');
        $(" .logout ").html('<a href="/logout"">Déconnexion <i class="fa fa-sign-out fa-lg" aria-hidden="true"></i></a>');
      }
      else {
        if(data.message != "") {
          $(" #login ").text(data.message);
          $(" #login ").addClass('alert alert-danger'); 
        }
        else {
          $(" #login ").html('');
        }
        $(" #form ").addClass('hide');
        $(" .logout ").addClass('hide');
        $(" #welcome ").removeClass('hide');  
      }
      
      
      
    });

    if(rand < 0.5) {
      $(" body ").css('background', 'linear-gradient(90deg, RGB(156,21,29) 50%, #F5E834 50%)');
      $(" .img-left ").attr('src', src_stacks);
      $(" .img-right ").attr('src', src_ted);
      $(" #name1 ").text(names[0]);
      $(" #name2 ").text(names[1]);
      $(" #radio-one ").css('color', 'RGB(156,21,29)');
      $(" #radio-one ").attr('value', 'stacks');
      $(" #radio-two ").css('color', '#F5E834');
      $(" #radio-two ").attr('value', 'ted');
      }
    else {
      $(" body ").css('background', 'linear-gradient(90deg, #F5E834 50%, RGB(156,21,29) 50%)'); 
      $(" .img-left ").attr('src', src_ted);
      $(" .img-right ").attr('src', src_stacks);
      $(" #name1 ").text(names[1]);
      $(" #name2 ").text(names[0]);
      $(" #radio-one ").css('color', '#F5E834');
      $(" #radio-one ").attr('value', 'ted');
      $(" #radio-two ").css('color', 'RGB(156,21,29)');
      $(" #radio-two ").attr('value', 'stacks');
    
    }

});


function submite() {
  $(" #form ").addClass('hide');
  $(" #welcome ").addClass('hide');
  $(" #login ").html('');
  $(" .spinner ").removeClass('hide');
  $.post( "/vote", { exampleRadios: $('input[name=exampleRadios]:checked').val(), campus: $('select option:selected').text() }, function (data) {
    $(" .spinner ").addClass('hide');
    $(" #login ").removeClass('hide').html(data);
  });
}

