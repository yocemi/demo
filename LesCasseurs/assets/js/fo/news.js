const router = require('../router.js');

var processing;

function ajaxLoadNews() {

	processing = true;

  var limit = 5;
  var offset = $("#offset").val();
  var params = "offset="+offset+"&limit="+limit;

	$(".loader").removeClass("d-none");

  $.ajax({
    type : "POST",
    url : router.routing.generate('news_list_load'),
    data : params,
    dataType: "json",
    success : function (data) {

      $(".news-list").append(data.html)

			offset = parseInt(offset)+limit;

      $("#offset").val(offset);
			$(".loader").addClass("d-none");

			if(parseInt(offset) >= parseInt(data.total)){
        $(".ajax-load").hide();
      }
    }
  });
}


$( document ).ready(function() {

  $("#offset").val(0);

  ajaxLoadNews();

	$(".ajax-load").click(function(e){
    ajaxLoadNews();
  });

});
