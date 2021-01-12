require('../utils/jsConfirm/jquery-confirm.min.js');
require('../utils/jsConfirm/jquery-confirm.min.css');

$( document ).ready(function() {

  var accordion = $(".form-accordion");

  accordion.children(".tab").click(function(e){
      accordion.children(".form-content").slideToggle(function(){
        accordion.children(".tab").toggleClass("open");
      });
  });

  $(".delete").click(function(e) {
    e.preventDefault();
    var clicked = $(this);

    $.confirm({
        title: 'Confirmation de suppression',
        type: 'red',
        columnClass: 'medium',
        typeAnimated: true,
        onOpenBefore: function () {
            this.$content.html(
                "Êtes-vous sur de vouloir supprimer cet établissement ?"
            );
        },
        buttons: {
            Valider: {
                btnClass: 'btn-primary',
                action: function () {
                    clicked.parent('form').submit();
                }
            },
            Annuler: {
                btnClass: 'btn-secondary',
            }
        }
    });
  });


  $(".unlock").click(function(e){
		e.preventDefault();

    if($(this).children(".fa").hasClass("fa-lock")){
      $(this).children(".fa").removeClass("fa-lock").addClass("fa-unlock-alt");
  		$("#facility_edit_latitude").removeAttr("readonly");
  		$("#facility_edit_longitude").removeAttr("readonly");
    }
    else {
      $(this).children(".fa").removeClass("fa-unlock-alt").addClass("fa-lock");
  		$("#facility_edit_latitude").attr("readonly","readonly");
  		$("#facility_edit_longitude").attr("readonly","readonly");
    }
  });


});
