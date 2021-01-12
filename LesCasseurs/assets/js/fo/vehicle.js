const router = require('../router.js');

var processing;

function ajaxLoadVehicle() {

	processing = true;

	let token = $("#search__token").val();

  var limit = 10;
  var offset = $("#offset").val();
  var params = "offset="+offset+"&limit="+limit+"&token="+token;

	$(".loader").removeClass("d-none");

  $.ajax({
    type : "POST",
    url : router.routing.generate('vehicle_list_load'),
    data : params,
    dataType: "json",
    success : function (data) {
      $(".vehicle-list tbody").append(data.html)

			$(".result").find(".totalv").html(data.result);
			$(".result").find(".totalf").html(data.facilities);
			if(data.result > 1){
				$(".result").find(".plural").html("s");
			}

			offset = parseInt(offset)+limit;

      $("#offset").val(offset);
			$(".loader").addClass("d-none");

			if(offset < data.result){
				processing = false;
			}
    }
  });
}


$( document ).ready(function() {

  $("#offset").val(0);

  ajaxLoadVehicle();

});

$(document).scroll(function() {

   let scrollTop = $(window).scrollTop();
   let documentHeight = $(document).height();
   let windowHeight = $(window).height();
   let footeralert = $('.footer-alert').height();
	 let footernewsletter = $('.footer-newsletter').height();
   let footer = $('footer').height();

   if (processing){
      return false;
   }

   if (scrollTop >= (documentHeight - windowHeight - footeralert - footernewsletter - footer) ){
        ajaxLoadVehicle();
   }

});

$(document).on("click", ".vehicle-row a", function(e){
	e.preventDefault();

	let row = $(this).closest(".vehicle-row");
	let sheetUrl = $(this).attr("href");

	let vehicleId = row.find("#vehicle_id").val();
	let token = $("#search__token").val();
	let params = "vehicle_id="+vehicleId+"&token="+token;

	$.ajax({
		type : "POST",
		url : router.routing.generate('click_vehicle_add'),
		data: params,
		dataType: "json",
		success : function (data) {
			window.location.href = sheetUrl;
		}
	});

});
