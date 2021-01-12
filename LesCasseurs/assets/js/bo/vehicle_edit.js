
//var Cleave = require('../../../node_modules/cleave.js/src/Cleave.js');

//var cleave = new Cleave('.cleave-immat', {
    //delimiter: '-',
    //blocks: [2, 3, 2],
    //uppercase: true
//});

// Fancybox
const fancybox = require('@fancyapps/fancybox');
// Fancybox Stylesheet
const fancyboxCSS = require('@fancyapps/fancybox/dist/jquery.fancybox.css');

require('jquery-ui/ui/core.js');
require('jquery-ui/ui/widgets/datepicker.js');
require('../utils/jquery-ui/jquery.ui.datepicker-fr.js');
require('../utils/jquery-ui/themes/smoothness/jquery-ui.min.css');

$( document ).ready(function() {

  initializeAllZone();

  $('.datepicker').datepicker({
	  changeYear: true,
	  yearRange: "c-80:c+20"
	});

  $(".impact-vehicle").find(".zone").click(function(e){
    var clicked = $(this);
    clicked.toggleClass('impact-ok');
    var hasImpact = clicked.hasClass("impact-ok");

    toogleCheckbox(clicked, hasImpact, 'front-left', '#vehicle_impacts_0');
    toogleCheckbox(clicked, hasImpact, 'front-right', '#vehicle_impacts_1');
    toogleCheckbox(clicked, hasImpact, 'back-left', '#vehicle_impacts_2');
    toogleCheckbox(clicked, hasImpact, 'back-right', '#vehicle_impacts_3');
    toogleCheckbox(clicked, hasImpact, 'side-left', '#vehicle_impacts_4');
    toogleCheckbox(clicked, hasImpact, 'side-right', '#vehicle_impacts_5');

  });

  $('#vehicle_registration').keyup(function(){
    $(this).val($(this).val().toUpperCase());
  });

  $('#vehicle_vin').keyup(function(){
    $(this).val($(this).val().toUpperCase());
  });

});

$(document).on("click", ".filter-brand label .input-radio", function(){
  let value = $(this).val();
  $("#vehicle_brand").val(value);
});

$(document).on("click", ".filter-brand .reset", function(){
  $("#vehicle_brand").val("");
});

$(document).on("click", ".filter-model label .input-radio", function(){
  let value = $(this).val();
  $("#vehicle_model").val(value);
});

$(document).on("click", ".filter-model .reset", function(){
  $("#vehicle_model").val("");
});

$(document).on("click", ".filter-version label .input-radio", function(){
  let value = $(this).val();
  $("#vehicle_version").val(value);
});

$(document).on("click", ".filter-version .reset", function(){
  $("#vehicle_version").val("");
});

$(document).on("click", ".filter-bodywork label .input-radio", function(){
  let value = $(this).val();
  $("#vehicle_bodywork").val(value);
});

$(document).on("click", ".filter-bodywork .reset", function(){
  $("#vehicle_bodywork").val("");
});

$(document).on("click", ".filter-gearbox label .input-radio", function(){
  let value = $(this).val();
  $("#vehicle_gearbox").val(value);
});

$(document).on("click", ".filter-gearbox .reset", function(){
  $("#vehicle_gearbox").val("");
});

$(document).on("click", ".filter-energy label .input-radio", function(){
  let value = $(this).val();
  $("#vehicle_energy").val(value);
});

$(document).on("click", ".filter-energy .reset", function(){
  $("#vehicle_energy").val("");
});

$(document).on("click", ".filter-yearStart label .input-radio", function(){
  let value = $(this).val();

  let pattern = /^([0-9]{6})\|([0-9]{1,6})$/;
  let year = value.match(pattern);

  $("#vehicle_yearStart").val(year[1]);
  $("#vehicle_yearEnd").val(year[2]);
});

$(document).on("click", ".filter-energy .reset", function(){
  $("#vehicle_yearStart").val("");
  $("#vehicle_yearEnd").val("");
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
  initializeZone('#vehicle_impacts_0', '.front-left');
  initializeZone('#vehicle_impacts_1', '.front-right');
  initializeZone('#vehicle_impacts_2', '.back-left');
  initializeZone('#vehicle_impacts_3', '.back-right');
  initializeZone('#vehicle_impacts_4', '.side-left');
  initializeZone('#vehicle_impacts_5', '.side-right');

}

window.handleCompleteBrand=function() {
  if (!--inProgressBrand) {
    let brand = $("#vehicle_brand").val();
    let dropdown = $(getContext()+".filter-brand");

    if(brand != "" && brand != undefined){
      autoCheck(dropdown, brand, brand);
      ajaxModelChoice(brand);
    }
  }
}

window.handleCompleteModel=function() {
  if (!--inProgressModel) {
    let brand = $("#vehicle_brand").val();
    let model = $("#vehicle_model").val();
    let dropdown = $(getContext()+".filter-model");

    if(model != "" && model != undefined){
      autoCheck(dropdown, model, model);
      ajaxVersionChoice(brand, model);
    }
  }
}

window.handleCompleteVersion=function() {
  if (!--inProgressVersion) {
    let brand = $("#vehicle_brand").val();
    let model = $("#vehicle_model").val();
    let version = $("#vehicle_version").val();
    let dropdown = $(getContext()+".filter-version");

    if(version != "" && version != undefined){
      autoCheck(dropdown, version, version);
      ajaxYearChoice(brand, model, version);
      ajaxBodyworkChoice(brand, model, version);
      ajaxGearboxChoice(brand, model, version);
      ajaxEnergyChoice(brand, model, version);

    }
  }
}

window.handleCompleteBodywork=function() {
  if (!--inProgressBodywork) {
    let input = $("#vehicle_bodywork");
    let bodywork = input.val();
    let dropdown = $(getContext()+".filter-bodywork");

    if(bodywork != "" && bodywork != undefined){
      autoCheck(dropdown, bodywork, bodywork);
    }
    else {
      checkSingleOption(dropdown, input);
    }
  }
}

window.handleCompleteGearbox=function() {
  if (!--inProgressGearbox) {
    let input = $("#vehicle_gearbox");
    let gearbox = input.val();
    let dropdown = $(getContext()+".filter-gearbox");

    if(gearbox != "" && gearbox != undefined){
      autoCheck(dropdown, gearbox, gearbox);
    }
    else {
      checkSingleOption(dropdown, input);
    }
  }
}

window.handleCompleteEnergy=function() {
  if (!--inProgressEnergy) {
    let input = $("#vehicle_energy");
    let energy = input.val();
    let dropdown = $(getContext()+".filter-energy");

    if(energy != "" && energy != undefined){
      autoCheck(dropdown, energy, energy);
    }
    else {
      checkSingleOption(dropdown, input);
    }
  }
}

window.handleCompleteYear=function() {
  if (!--inProgressYear) {
    let inputStart = $("#vehicle_yearStart");
    let inputEnd = $("#vehicle_yearEnd");

    let yearStart = inputStart.val();
    let yearEnd = inputEnd.val();
    let dropdown = $(getContext()+".filter-yearStart");

    if(yearStart != "" && yearEnd != "" && yearStart != undefined && yearEnd != undefined){
      let year = yearStart+"|"+yearEnd;

      let pattern = /^([0-9]{4})([0-9]{2})$/;
      let yearStartLabel = yearStart.match(pattern);
      let yearEndLabel = yearEnd.match(pattern);

      let yearLabel = yearStartLabel[2]+"/"+yearStartLabel[1]+" - "+(yearEnd == 0 ? "aujourd'hui" : yearEndLabel[2]+"/"+yearEndLabel[1]);

      autoCheck(dropdown, year, yearLabel);

    }
    else {
      checkSingleOptionYear(dropdown, inputStart, inputEnd);
    }
  }
}

$(document).on("click", "#btn-save", function(e){

  displayAlert(".filter-brand");
  displayAlert(".filter-model");
  displayAlert(".filter-version");
  displayAlert(".filter-yearStart");
  displayAlert(".filter-bodywork");
  displayAlert(".filter-gearbox");
  displayAlert(".filter-energy");

});
