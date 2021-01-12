
const router = require('./router.js');

$( ".autocomplete_brand" ).autocomplete({
   minLength: 3,
   delay: 300,
   source: function( request, response ) {
     $.ajax({
       url: router.routing.generate('brand_name_autocomplete'),
       dataType: "json",
       data: { brand: request.term },
       success: function( data ) {
         response( $.map( data, function( item ) {
           return {
             brand_name: item.brand_name,
             brand_id: item.brand_id
           }
         }))
       }
     });
   },
   focus: function( event, ui ) {
   $(".autocomplete_brand").val(ui.item.brand_name);
   return false;
   },
   select: function( event, ui ) {
   $(".autocomplete_brand").val(ui.item.brand_name);
   $(".autocomplete_brand_id").val(ui.item.brand_id);
   return false;
   }
 })
 .data( "ui-autocomplete" )._renderItem = function( ul, item ) {
   return $( "<li>" )
   .append( "<a>" + item.brand_name + "</a>" )
   .appendTo( ul );
 };
