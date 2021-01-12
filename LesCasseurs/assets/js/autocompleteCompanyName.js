
const router = require('./router.js');

$( document ).ready(function() {

  $("#company_select_company_name").focus(function(){
    $(this).val("");
    $("#company_select_company_id").val("");
  });

});


$( ".autocomplete_company" ).autocomplete({
   minLength: 3,
   delay: 300,
   source: function( request, response ) {
     $.ajax({
       url: router.routing.generate('company_name_autocomplete'),
       dataType: "json",
       data: { name: request.term },
       success: function( data ) {
         response( $.map( data, function( item ) {
           return {
             company_name: item.company_name,
             company_id: item.company_id
           }
         }))
       }
     });
   },
   focus: function( event, ui ) {
   $(".autocomplete_company").val(ui.item.company_name);
   return false;
   },
   select: function( event, ui ) {
   $(".autocomplete_company").val(ui.item.company_name);
   $(".autocomplete_company_id").val(ui.item.company_id);
   return false;
   }
 })
 .data( "ui-autocomplete" )._renderItem = function( ul, item ) {
   return $( "<li>" )
   .append( "<a>" + item.company_name + "</a>" )
   .appendTo( ul );
 };
