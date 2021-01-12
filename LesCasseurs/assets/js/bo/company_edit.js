const router = require('../router.js');

$(document).ready(function() {

  $("#company_admin_pdf").change(function(){
    ajaxUploadContract($(this));
  });

});

$(document).on("click", ".btn-remove-pdf", function(e) {
  e.preventDefault();
  $("#company_admin_contract").val("");
  $(this).parent(".contract-wrapper").hide().detach();
});


function ajaxUploadContract(input) {

  var filterType = /^(?:application\/pdf)$/i;

  var uploadFile = input[0].files[0];
  if (!filterType.test(uploadFile.type)) {
    alert('Veuillez sélectionner un fichier au format PDF.');
    return;
  }

  formData = new FormData();
  formData.append('file', uploadFile);

  //console.log(formData);

  $.ajax({
    type : "POST",
    url : router.routing.generate('company_upload_contract'),
    data:  formData,
    contentType: false,
    cache: false,
    processData:false,
    dataType: "json",
    success : function (data) {
      $("#company_admin_contract").val(data.name);
      $("#pdf_contract").html(data.html);
    }
  });
}
