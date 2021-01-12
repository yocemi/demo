require('bootstrap-slider');
require('bootstrap-slider/dist/css/bootstrap-slider.min.css');
const router = require('../router.js');

$( document ).ready(function() {

  initializeCouleur();
  initializeAllZone();

  $(".impact-vehicle").find(".zone").click(function(e){
    var clicked = $(this);
    clicked.toggleClass('impact-ok');
    var hasImpact = clicked.hasClass("impact-ok");

    toogleCheckbox(clicked, hasImpact, 'front-left', '#search_impacts_0');
    toogleCheckbox(clicked, hasImpact, 'front-right', '#search_impacts_1');
    toogleCheckbox(clicked, hasImpact, 'back-left', '#search_impacts_2');
    toogleCheckbox(clicked, hasImpact, 'back-right', '#search_impacts_3');
    toogleCheckbox(clicked, hasImpact, 'side-left', '#search_impacts_4');
    toogleCheckbox(clicked, hasImpact, 'side-right', '#search_impacts_5');

  });

  //initializeRadius();

  var radiusSlider = $(".radius-range").bootstrapSlider({
    formatter: function(value) {
  		return value + ' km';
  	}
  });

  $(".radius").find(".custom-checkbox").click(function(e){
    let col = $(this).closest("div");
    let radius = $(this).closest(".radius");

    radius.children("div").each(function(){
      $(this).find(".custom-checkbox").removeClass("selected");
    });
    col.prevAll().find(".custom-checkbox").addClass("selected");
  });

  $("#home").find(".advanced-search").click(function(e){
    let panel = $(".advanced-search-panel");
    panel.removeClass("d-none");
  });

  $("#home").find(".my-search").children("i").click(function(e){
    let panel = $(".advanced-search-panel");
    panel.addClass("d-none");
  });


  $("#search").find(".quick-search").find(".advanced-search").click(function(e){
    let panel = $(this).closest(".quick-search-wrapper").next(".advanced-search-wrapper");
    let col = $(this).parent(".col-advanced-search");

    if(col.hasClass("active")){
      col.removeClass("active");
      panel.addClass("d-none");
    }
    else {
      col.addClass("active");
      panel.removeClass("d-none");
    }
  });

  $( "#search_location" ).autocomplete({
     minLength: 3,
     delay: 300,
     source: function( request, response ) {
       $.ajax({
         url: router.routing.generate('code_postal_location'),
         dataType: "json",
         data: { location: request.term },
         success: function( data ) {
           response( $.map( data, function( item ) {
             return {
               libelle_acheminement: item.libelle_acheminement,
               code_postal: item.code_postal
             }
           }))
         }
       });
     },
     focus: function( event, ui ) {
     $("#search_location").val(ui.item.libelle_acheminement);
     return false;
     },
     select: function( event, ui ) {
     $("#search_location").val(ui.item.libelle_acheminement);
     $("#search_postCode").val(ui.item.code_postal);
     geocode(ui.item.code_postal, ui.item.libelle_acheminement);
     return false;
     }
   })
   .data( "ui-autocomplete" )._renderItem = function( ul, item ) {
     return $( "<li>" )
     .append( "<a>" + item.code_postal + " <b>" + item.libelle_acheminement + "</b></a>" )
     .appendTo( ul );
   };

});

$(document).on("click", ".btn-submit", function(e){
  displayAlert(".filter-brand");
  displayAlert(".filter-model");
});

$(document).on("click", "#home #_mobile_search .advanced-search", function(){
  $("body").addClass("overflow-hidden");
});

$(document).on("click", "#home #_mobile_search .my-search i", function(){
  $("body").removeClass("overflow-hidden");
});

$(document).on("click", "#home #_desktop_search .advanced-search", function(){
  let container = $("#_desktop_search").find(".quick-search");
  let arrow = container.children(".arrow");

  arrow.removeClass("d-none");
});

$(document).on("click", "#home #_desktop_search .close-panel", function(){
  let container = $("#_desktop_search").find(".quick-search");
  let arrow = container.children(".arrow");

  arrow.addClass("d-none");
  $("#_desktop_search").find(".advanced-search-panel").addClass("d-none")
});

$(document).on("click", ".filter-brand label .input-radio", function(){
  let value = $(this).val();
  $("#search_brand").val(value);
  $(".my-search").find(".brand").html(value);
  $(".my-search").find(".model").html("");
  $(".my-search").find(".version").html("");
});

$(document).on("click", ".filter-brand .reset", function(){
  $("#search_brand").val("");
  $(".filter-brand").children(".button-wrapper").children(".select").addClass("required");
  $(".filter-model .reset").trigger("click");
});

$(document).on("click", ".filter-model label .input-radio", function(){
  let value = $(this).val();
  $("#search_model").val(value);
  $(".my-search").find(".model").html(value);
  $(".my-search").find(".version").html("");
});

$(document).on("click", ".filter-model .reset", function(){
  $("#search_model").val("");
  $(".filter-model").children(".button-wrapper").children(".select").addClass("required");
});

$(document).on("click", ".filter-version label .input-radio", function(){
  let value = $(this).val();
  $("#search_version").val(value);
  $(".my-search").find(".version").html(value);
});

$(document).on("click", ".filter-version .reset", function(){
  $("#search_version").val("");
});

$(document).on("click", ".filter-bodywork label .input-radio", function(){
  let value = $(this).val();
  $("#search_bodywork").val(value);
});

$(document).on("click", ".filter-bodywork .reset", function(){
  $("#search_bodywork").val("");
});

$(document).on("click", ".filter-couleur label .input-radio", function(){
  let value = $(this).val();
  $("#search_couleur").val(value);
});

$(document).on("click", ".filter-couleur .reset", function(){
  $("#search_couleur").val("");
});

$(document).on("click", ".filter-gearbox label .input-radio", function(){
  let value = $(this).val();
  $("#search_gearbox").val(value);
});

$(document).on("click", ".filter-gearbox .reset", function(){
  $("#search_gearbox").val("");
});

$(document).on("click", ".filter-energy label .input-radio", function(){
  let value = $(this).val();
  $("#search_energy").val(value);
});

$(document).on("click", ".filter-energy .reset", function(){
  $("#search_energy").val("");
});

$(document).on("click", ".filter-yearStart label .input-radio", function(){
  let value = $(this).val();

  let pattern = /^([0-9]{6})\|([0-9]{1,6})$/;
  let year = value.match(pattern);

  $("#search_yearStart").val(year[1]);
  $("#search_yearEnd").val(year[2]);
});

$(document).on("click", ".filter-yearStart .reset", function(){
  $("#search_yearStart").val("");
  $("#search_yearEnd").val("");
});

function toogleCheckbox(clicked, state, zone, checkbox)
{
  if($(clicked).hasClass(zone)){
    if ( state ) {
      $( checkbox ).attr("checked","checked");
    } else {
      $( checkbox ).removeAttr("checked");
    }
  }
}

function initializeZone(checkbox, zone)
{
  if($(checkbox).attr("checked") == "checked")
  {
    $(".impact-vehicle").find(zone).addClass('impact-ok');
  }
}

function initializeAllZone()
{
  initializeZone('#search_impacts_0', '.front-left');
  initializeZone('#search_impacts_1', '.front-right');
  initializeZone('#search_impacts_2', '.back-left');
  initializeZone('#search_impacts_3', '.back-right');
  initializeZone('#search_impacts_4', '.side-left');
  initializeZone('#search_impacts_5', '.side-right');

}

function initializeCouleur()
{
  let couleur = $("#search_couleur").val();

  let dropdown = $(getContext()+".filter-couleur");

  if(couleur != "" && couleur != undefined){

    let options = dropdown.find(".options");
    let item;
    let label;

    options.children(".item").each(function(i){
      let radio = $(this).find(".input-radio");
      let v = radio.val();

      if(v == couleur){
        radio.addClass("checked");
        radio.prop("checked", true);
        item = radio.closest(".item");
        item.prependTo(options).removeClass("d-none");
        label = item.find(".item-label").html();
      }
    });

    dropdown.children(".button-wrapper").children(".select").html(label);
  }
}


function initializeRadius()
{
  $(".radius").find(".input-radio").each(function(){
    if($(this).prop("checked") == true){
      $(this).closest("div").prevAll().find(".custom-checkbox").addClass("selected");
    }
  });
}

function geocode(postcode, city) {
  var params = "postcode="+postcode+"&city="+city;

  $.ajax({
    type : "POST",
    url : router.routing.generate('code_postal_geocode'),
    data: params,
    dataType: "json",
    success : function (data) {
      $("#search_latitude").val(data.latitude).attr('value', data.latitude);
      $("#search_longitude").val(data.longitude).attr('value', data.longitude);
    }
  });
}

window.handleCompleteBrand=function() {
  if (!--inProgressBrand) {
    let brand = $("#search_brand").val();
    let dropdown = $(getContext()+".filter-brand");

    if(brand != "" && brand != undefined){
      autoCheck(dropdown, brand, brand);
      ajaxModelChoice(brand);

      $(".my-search").find(".brand").html(brand);
    }
  }
}

window.handleCompleteModel=function() {
  if (!--inProgressModel) {
    let brand = $("#search_brand").val();
    let model = $("#search_model").val();
    let dropdown = $(getContext()+".filter-model");

    if(model != "" && model != undefined){
      autoCheck(dropdown, model, model);
      ajaxVersionChoice(brand, model);

      $(".my-search").find(".model").html(model);
    }
  }
}

window.handleCompleteVersion=function() {
  if (!--inProgressVersion) {
    let brand = $("#search_brand").val();
    let model = $("#search_model").val();
    let version = $("#search_version").val();
    let dropdown = $(getContext()+".filter-version");

    if(version != "" && version != undefined){
      autoCheck(dropdown, version, version);
      ajaxYearChoice(brand, model, version);
      ajaxBodyworkChoice(brand, model, version);
      ajaxGearboxChoice(brand, model, version);
      ajaxEnergyChoice(brand, model, version);

      $(".my-search").find(".version").html(version);
    }
  }
}

window.handleCompleteBodywork=function() {
  if (!--inProgressBodywork) {
    let input = $("#search_bodywork");
    let bodywork = input.val();
    let dropdown = $(getContext()+".filter-bodywork");

    if(bodywork != "" && bodywork != undefined){
      autoCheck(dropdown, bodywork, bodywork);
    }
    else {
      //checkSingleOption(dropdown, input);
    }
  }
}

window.handleCompleteGearbox=function() {
  if (!--inProgressGearbox) {
    let input = $("#search_gearbox");
    let gearbox = input.val();
    let dropdown = $(getContext()+".filter-gearbox");

    if(gearbox != "" && gearbox != undefined){
      autoCheck(dropdown, gearbox, gearbox);
    }
    else {
      //checkSingleOption(dropdown, input);
    }
  }
}

window.handleCompleteEnergy=function() {
  if (!--inProgressEnergy) {
    let input = $("#search_energy");
    let energy = input.val();
    let dropdown = $(getContext()+".filter-energy");

    if(energy != "" && energy != undefined){
      autoCheck(dropdown, energy, energy);
    }
    else {
      //checkSingleOption(dropdown, input);
    }
  }
}

window.handleCompleteYear=function() {
  if (!--inProgressYear) {
    let inputStart = $("#search_yearStart");
    let inputEnd = $("#search_yearEnd");

    let yearStart = inputStart.val();
    let yearEnd = inputEnd.val();
    let dropdown = $(getContext()+".filter-yearStart");

    if(yearStart != "" && yearEnd != "" && yearStart != undefined && yearEnd != undefined){
      let year = yearStart+"|"+yearEnd;

      let pattern = /^([0-9]{4})([0-9]{2})$/;
      let yearStartLabel = yearStart.match(pattern);
      let yearEndLabel = yearStart.match(pattern);

      let yearLabel = yearStartLabel[2]+"/"+yearStartLabel[1]+" - "+(yearEnd == 0 ? "aujourd'hui" : yearEndLabel[2]+"/"+yearEndLabel[1]);

      autoCheck(dropdown, year, yearLabel);

    }
    else {
      //checkSingleOptionYear(dropdown, inputStart, inputEnd);
    }
  }
}
