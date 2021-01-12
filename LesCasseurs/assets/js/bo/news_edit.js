const router = require('../router.js');

$(document).ready(function() {

  $("#news_picture").change(function(){
    ajaxUploadCover($(this));
  });

});

$(document).on("click", ".btn-remove-cover", function(e) {
  e.preventDefault();
  $("#news_cover").val("");
  $(this).closest(".cover-wrapper").addClass("d-none").addClass("loader");
  $(this).closest(".cover-wrapper").children("div").hide().detach();  
});


function ajaxUploadCover(input) {

  $("#cover_thumb").children(".cover-wrapper").removeClass("d-none");

  var filterType = /^(?:image\/jpeg|image\/png)$/i;

  var uploadFile = input[0].files[0];
  if (!filterType.test(uploadFile.type)) {
    alert('Veuillez sélectionner une image au format JPG ou PNG.');
    return;
  }

  formData = new FormData();
  formData.append('file', uploadFile);

  //console.log(formData);

  $.ajax({
    type : "POST",
    url : router.routing.generate('news_upload_cover'),
    data:  formData,
    contentType: false,
    cache: false,
    processData:false,
    dataType: "json",
    success : function (data) {
      $("#news_cover").val(data.name);
      $("#news_picture").val("");
      $("#cover_thumb").children(".cover-wrapper").removeClass("loader").html(data.html);
    }
  });
}
