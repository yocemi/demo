require('../utils/jsConfirm/jquery-confirm.min.js');
require('../utils/jsConfirm/jquery-confirm.min.css');

$( document ).ready(function() {

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
                "Êtes-vous sur de vouloir supprimer ce paramètre ?"
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


});
