const router = require('../router.js');

// Fancybox
const fancybox = require('@fancyapps/fancybox');
// Fancybox Stylesheet
const fancyboxCSS = require('@fancyapps/fancybox/dist/jquery.fancybox.css');

var position;

var counter = 0;

function success(p) {
	position = p;
  $("#latitude").val(position.coords.latitude);
  $("#longitude").val(position.coords.longitude);
}

function error (msg) {
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(success, error);
}


$(document).on("click", ".btn-facility", function(e){

	let facilityId = $("#facility_id").val();
	let token = $("#search__token").val();

	let params = "facility_id="+facilityId+"&counter="+counter+"&token="+token;

	$.ajax({
		type : "POST",
		url : router.routing.generate('click_facility_add'),
		data: params,
		dataType: "json",
		success : function (data) {
			$(".btn-facility").addClass("d-none");
			$(".facility").removeClass("d-none");
			counter++;
		}
	});

});


$(document).on("click", ".btn-nav", function(e){
	e.preventDefault();

	let sheetUrl = $(this).attr("href");
	let vehicleId = $(this).attr("data-id");
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




$( document ).ready(function() {

	$(".facility").find(".close").click(function(e){

		$(".btn-facility").removeClass("d-none");
		$(".facility").addClass("d-none");

	});

});
