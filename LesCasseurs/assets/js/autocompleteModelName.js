
const router = require('./router.js');

$( ".autocomplete_model" ).autocomplete({
   minLength: 3,
   delay: 300,
   source: function( request, response ) {
     var brand_id = $(".vehicle_brand_id").val();
     $.ajax({
       url: router.routing.generate('model_name_autocomplete'),
       dataType: "json",
       data: { model: request.term, brand_id: brand_id },
       success: function( data ) {
         response( $.map( data, function( item ) {
           return {
             model_name: item.model_name
           }
         }))
       }
     });
   },
   focus: function( event, ui ) {
   $(".autocomplete_model").val(ui.item.model_name);
   return false;
   },
   select: function( event, ui ) {
   $(".autocomplete_model").val(ui.item.model_name);
   return false;
   }
 })
 .data( "ui-autocomplete" )._renderItem = function( ul, item ) {
   return $( "<li>" )
   .append( "<a>" + item.model_name + "</a>" )
   .appendTo( ul );
 };
