
const router = require('./router.js');

$( ".autocomplete_registration" ).autocomplete({
   minLength: 2,
   delay: 300,
   source: function( request, response ) {
     $.ajax({
       url: router.routing.generate('vehicle_registration'),
       dataType: "json",
       data: { find: request.term },
       success: function( data ) {
         response( $.map( data, function( item ) {
           return {
             registration: item.registration,
             vehicle: item.vehicle,
             vehicle_id: item.vehicle_id
           }
         }))
       }
     });
   },
   focus: function( event, ui ) {
   $(".autocomplete_registration").val(ui.item.registration);

   return false;
   },
   select: function( event, ui ) {
   $(".autocomplete_registration").val(ui.item.registration);
   $(".vehicle_id").val(ui.item.vehicle_id);
   return false;
   }
 })
 .data( "ui-autocomplete" )._renderItem = function( ul, item ) {
   return $( "<li>" )
   .append( "<a>" + item.registration + "<br>" + item.vehicle )
   .appendTo( ul );
 };
