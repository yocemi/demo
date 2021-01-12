require('jquery-ui/ui/core.js');
require('jquery-ui/ui/widgets/datepicker.js');
require('../utils/jquery-ui/jquery.ui.datepicker-fr.js');
require('../utils/jquery-ui/themes/smoothness/jquery-ui.min.css');


$( document ).ready(function() {

  $('.datepicker').datepicker({
	  changeYear: true,
	  yearRange: "c-80:c+20"
	});


  from = $( "#debut" )
	.datepicker({
		defaultDate: "+1w",
		changeMonth: true,
		numberOfMonths: 3
	})
	.on( "change", function() {
		to.datepicker( "option", "minDate", getDate(this.value) );
	}),
	to = $( "#fin" ).datepicker({
		defaultDate: "+1w",
		changeMonth: true,
		numberOfMonths: 3
	})
	.on( "change", function() {
		from.datepicker( "option", "maxDate", getDate(this.value) );
	});

	function getDate( str ){
		var dateString = str.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
		var d = new Date( dateString[3], dateString[2]-1, dateString[1] );

		return d;
	}

	$(".periode").find("label").click(function(e){
		$(this).find("input").attr("checked","checked");
		$("#submitFiltrePeriode").trigger('click');
	});


});
