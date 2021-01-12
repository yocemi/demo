require('../utils/jsConfirm/jquery-confirm.min.js');
require('../utils/jsConfirm/jquery-confirm.min.css');
var Cleave = require('../../../node_modules/cleave.js/src/Cleave.js');
var cleave;

function swapWidget(obj1, obj2)
{
	var temp = obj2.children().detach();
	obj2.empty().append(obj1.children().detach());
	obj1.append(temp);
}

function cleave_instance(target) {
  return new Cleave(target, {
      delimiter: '-',
      blocks: [2, 3, 2],
      uppercase: true
  });
}


const router = require('../router.js');

$( document ).ready(function() {

  let format;
  let newformat = $('.format').children('.new');
  let oldformat = $('.format').children('.old');

  cleave = cleave_instance('.cleave-immat');

  $('#vehicle_step1_format').children('.form-check').each(function(){
    let input = $(this).children('input');

    if(input.attr('checked') == "checked") {
      format = input.val();
    }

    switch(format) {

      case "old":
        cleave.destroy();
        oldformat.removeClass('d-none');
        newformat.addClass('d-none');
        swapWidget(newformat, oldformat);
        $("#vehicle_step1_registration").val('').removeClass('new-format').removeClass('cleave-immat').addClass('old-format');

      break;
    }


  });


  $('#vehicle_step1_format').children('.form-check').children('label').click(function(e){
    e.stopPropagation();
    format = $(this).prev('input').val();
    cleave.destroy();

    switch(format) {
      case "new":
        if(newformat.hasClass('d-none')) {
          newformat.removeClass('d-none');
          oldformat.addClass('d-none');
          swapWidget(oldformat, newformat);
          $("#vehicle_step1_registration").removeClass('old-format').addClass('new-format').addClass('cleave-immat').val('');
        }
        cleave = cleave_instance('.cleave-immat');
      break;

      case "old":
        if(oldformat.hasClass('d-none')) {
          oldformat.removeClass('d-none');
          newformat.addClass('d-none');
          swapWidget(newformat, oldformat);
          $("#vehicle_step1_registration").removeClass('new-format').removeClass('cleave-immat').addClass('old-format').val('');
        }
      break;
    }
  });


  $('#vehicle_step1_registration').keyup(function(){
    $(this).val($(this).val().toUpperCase());
  });


	$(document).on('click',	'.delete-proceed', function(e) {
	  e.preventDefault();
	  var clicked = $(this);

	  $.confirm({
	      title: 'Confirmation de suppression',
	      type: 'red',
	      columnClass: 'medium',
	      typeAnimated: true,
	      onOpenBefore: function () {
	          this.$content.html(
	              "Êtes-vous sur de vouloir supprimer ce véhicule ?"
	          );
	      },
	      buttons: {
	          Valider: {
	              btnClass: 'btn-primary',
	              action: function () {
	                  deleteVehicle(clicked);
	              }
	          },
	          Annuler: {
	              btnClass: 'btn-secondary',
	          }
	      }
	  });
	});


	function deleteVehicle(obj) {
	  var form = obj.parent('form')
	  var id = form.children('.id').val();
	  var _token = form.children('._token').val();
	  var _method = form.children('._method').val();

	  var params = "id="+id+"&_token="+_token+"&_method="+_method;

	  $.ajax({
	      type : "POST",
	      url : router.routing.generate('vehicle_delete',),
	      data : params,
	      dataType: "json",
	      success : function (data) {
	        obj.closest("tr").slideUp();
	      }
	    });
	}


  $(".expired .renew").click(function(e){
    var clicked = $(this);

    $.confirm({
        title: 'Confirmation du renouvellement',
        type: 'red',
        columnClass: 'medium',
        typeAnimated: true,
        onOpenBefore: function () {
            this.$content.html(
                "Êtes-vous sur de vouloir renouveller ce véhicule ?"
            );
        },
        buttons: {
            Valider: {
                btnClass: 'btn-primary',
                action: function () {
                    renewVehicle(clicked);
                }
            },
            Annuler: {
                btnClass: 'btn-secondary',
            }
        }
    });
  });

  function renewVehicle(obj) {
    var idVehicle = obj.attr("rel");
    var params = "id="+idVehicle;

    $.ajax({
        type : "POST",
				url : router.routing.generate('vehicle_renew'),
				data : params,
				dataType: "json",
				success : function (data) {
					obj.closest("tr").slideUp();
				}
			});

  }

});
