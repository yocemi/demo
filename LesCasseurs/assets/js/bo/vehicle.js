require('../utils/jsConfirm/jquery-confirm.min.js')
require('../utils/jsConfirm/jquery-confirm.min.css')

const router = require('../router.js');

$( document ).ready(function() {

  var accordion = $(".filters-accordion");

  accordion.children(".tab").click(function(e){
      accordion.children(".form-content").slideToggle(function(){
        accordion.children(".tab").toggleClass("open");
      });
  });

  $("#offset").val(0);
  ajaxLoadVehicle();

  $(".ajax-load").click(function(e){
    ajaxLoadVehicle();
  });

  $(".btn-filter-company").click(function(e){
    $("#company_select_company_name").val("");
    $("#company_select_company_id").val("");
    $("#filtreListVehicle").submit();
  });

  $(".btn-filter-facility").click(function(e){
    $("#facility_select_facility").val("");
    $("#filtreListVehicle").submit();
  });

  $(".btn-filter-validity").click(function(e){
    $("#vehicle_filter_validity").val("");
    $("#filtreListVehicle").submit();
  });

  $(".btn-filter-brand").click(function(e){
    $("#vehicle_filter_brand").val("");
    $("#filtreListVehicle").submit();
  });

  $(".btn-filter-registration").click(function(e){
    $("#vehicle_filter_registration").val("");
    $("#vehicle_filter_vehicle_id").val("");
    $("#filtreListVehicle").submit();
  });

  $(".impact-vehicle").find(".zone").click(function(e){
    $(this).toggleClass('impact-ok');
  });

});

$(document).on("click", ".filter-brand label", function(){
  let value = $(this).find(".input-radio").val();
  $("#vehicle_filter_brand").val(value);
});

$(document).on("click", ".filter-brand .reset", function(){
  $("#vehicle_filter_brand").val("");
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


$(document).on('click',	'.renew-proceed', function(e) {
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

function ajaxLoadVehicle() {

  var limit = 10;
  var offset = $("#offset").val();
  var params = "offset="+offset+"&limit="+limit;

  $.ajax({
    type : "POST",
    url : router.routing.generate('vehicle_load'),
    data : params,
    dataType: "json",
    success : function (data) {
      $(".vehicle-list tbody").append(data.html);

      var label = " résultat"+(data.total > 1 ? "s" : "") ;
      $(".total").html(data.total+label);

      offset = parseInt(offset)+limit;
      $("#offset").val(offset);

      if(parseInt(offset) >= parseInt(data.total)){
        $(".ajax-load").hide();
      }
    }
  });
}

function renewVehicle(obj) {
  var idVehicle = obj.attr("rel");
  var params = "id="+idVehicle;

  $.ajax({
      type : "POST",
      url : router.routing.generate('vehicle_renew'),
      data : params,
      dataType: "json",
      success : function (data) {
        var tr = obj.closest("tr")
        tr.removeClass("expired");
        tr.find(".renew").removeClass("renew-proceed");
        tr.find(".renew").children(".icon-renouveler-annonce-rouge").removeClass("icon-renouveler-annonce-rouge").addClass("icon-renouveler-annonce");
        tr.find(".icon-renouveler-annonce").children("span").css("color", "black").html(data.purchased.length);
      }
    });
}

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

window.handleCompleteBrand=function() {
}
