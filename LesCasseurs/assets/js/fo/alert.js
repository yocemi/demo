const router = require('../router.js');

$( document ).ready(function() {

  $('.btn-alert').click(function(e){
    e.preventDefault();

    let email = $('#alert_email').val();
    var params = "email="+email;

    $.ajax({
      type : "POST",
      url : router.routing.generate('alert_register'),
      data : params,
      dataType: "html",
      success : function (html) {
        $('#alert_email').val("");
        $('#alert-flash').html(html);
      }
    });
  });


});
