// Fancybox
const fancybox = require('@fancyapps/fancybox');
// Fancybox Stylesheet
const fancyboxCSS = require('@fancyapps/fancybox/dist/jquery.fancybox.css');

require('jquery-ui/ui/core.js');
require('jquery-ui/ui/widgets/datepicker.js');
require('../utils/jquery-ui/jquery.ui.datepicker-fr.js');
require('../utils/jquery-ui/themes/smoothness/jquery-ui.min.css');
var Cleave = require('../../../node_modules/cleave.js/src/Cleave.js');
var cleave;

function swapWidget(obj1, obj2)
{
	var temp = obj2.children().detach();
	obj2.empty().append(obj1.children().detach());
	obj1.append(temp);
}

function cleave_instance(target) {
  return new Cleave(target, {
      delimiter: '-',
      blocks: [2, 3, 2],
      uppercase: true
  });
}


$( document ).ready(function() {

  initializeAllZone();

  let format;
  let newformat = $('.format').children('.new');
  let oldformat = $('.format').children('.old');

  if($("#vehicle_step1_registration").hasClass('cleave-immat')) {
    cleave = cleave_instance('.cleave-immat');
  }

  $('#vehicle_step1_format').children('.form-check').each(function(){
    let input = $(this).children('input');

    if(input.attr('checked') == "checked") {
      format = input.val();
    }

    switch(format) {

      case "old":
        cleave.destroy();
        oldformat.removeClass('d-none');
        newformat.addClass('d-none');
        swapWidget(newformat, oldformat);
        $("#vehicle_step1_registration").val('').removeClass('new-format').removeClass('cleave-immat').addClass('old-format');

      break;
    }


  });


  $('#vehicle_step1_format').children('.form-check').children('label').click(function(e){
    e.stopPropagation();
    format = $(this).prev('input').val();
    cleave.destroy();

    switch(format) {
      case "new":
        if(newformat.hasClass('d-none')) {
          newformat.removeClass('d-none');
          oldformat.addClass('d-none');
          swapWidget(oldformat, newformat);
          $("#vehicle_step1_registration").removeClass('old-format').addClass('new-format').addClass('cleave-immat').val('');
        }
        cleave = cleave_instance('.cleave-immat');
      break;

      case "old":
        if(oldformat.hasClass('d-none')) {
          oldformat.removeClass('d-none');
          newformat.addClass('d-none');
          swapWidget(newformat, oldformat);
          $("#vehicle_step1_registration").removeClass('new-format').removeClass('cleave-immat').addClass('old-format').val('');
        }
      break;
    }
  });

  $('.datepicker').datepicker({
	  changeYear: true,
	  yearRange: "c-80:c+20"
	});

  $('#vehicle_step1_registration').keyup(function(){
    $(this).val($(this).val().toUpperCase());
  });

  $('#vehicle_step2_registration').keyup(function(){
    $(this).val($(this).val().toUpperCase());
  });

  $('#vehicle_step2_vin').keyup(function(){
    $(this).val($(this).val().toUpperCase());
  });

  $(".impact-vehicle").find(".zone").click(function(e){
    var clicked = $(this);
    clicked.toggleClass('impact-ok');
    var hasImpact = clicked.hasClass("impact-ok");

    toogleCheckbox(clicked, hasImpact, 'front-left', '#vehicle_step3_impacts_0');
    toogleCheckbox(clicked, hasImpact, 'front-right', '#vehicle_step3_impacts_1');
    toogleCheckbox(clicked, hasImpact, 'back-left', '#vehicle_step3_impacts_2');
    toogleCheckbox(clicked, hasImpact, 'back-right', '#vehicle_step3_impacts_3');
    toogleCheckbox(clicked, hasImpact, 'side-left', '#vehicle_step3_impacts_4');
    toogleCheckbox(clicked, hasImpact, 'side-right', '#vehicle_step3_impacts_5');

  });

  $('.add-another-collection-widget').click(function (e) {
        var list = $($(this).attr('data-list-selector'));
        // Try to find the counter of the list or use the length of the list
        var counter = list.data('widget-counter') || list.children().length;

        // grab the prototype template
        var newWidget = list.attr('data-prototype');
        // replace the "__name__" used in the id and name of the prototype
        // with a number that's unique to your emails
        // end name attribute looks like name="contact[emails][2]"
        newWidget = newWidget.replace(/__name__/g, counter);
        // Increase the counter
        counter++;
        // And store it, the length cannot be used if deleting widgets is allowed
        list.data('widget-counter', counter);

        // create a new list element and add it to the list
        var newElem = $(list.attr('data-widget-tags')).html(newWidget);
        newElem.appendTo(list);
    });



});


$(document).on("click", ".filter-brand label .input-radio", function(){
  let value = $(this).val();
  $("#vehicle_step2_brand").val(value);
});

$(document).on("click", ".filter-brand .reset", function(){
  $("#vehicle_step2_brand").val("");
});

$(document).on("click", ".filter-model label .input-radio", function(){
  let value = $(this).val();
  $("#vehicle_step2_model").val(value);
});

$(document).on("click", ".filter-model .reset", function(){
  $("#vehicle_step2_model").val("");
});

$(document).on("click", ".filter-version label .input-radio", function(){
  let value = $(this).val();
  $("#vehicle_step2_version").val(value);
});

$(document).on("click", ".filter-version .reset", function(){
  $("#vehicle_step2_version").val("");
});

$(document).on("click", ".filter-bodywork label .input-radio", function(){
  let value = $(this).val();
  $("#vehicle_step2_bodywork").val(value);
});

$(document).on("click", ".filter-bodywork .reset", function(){
  $("#vehicle_step2_bodywork").val("");
});

$(document).on("click", ".filter-gearbox label .input-radio", function(){
  let value = $(this).val();
  $("#vehicle_step2_gearbox").val(value);
});

$(document).on("click", ".filter-gearbox .reset", function(){
  $("#vehicle_step2_gearbox").val("");
});

$(document).on("click", ".filter-energy label .input-radio", function(){
  let value = $(this).val();
  $("#vehicle_step2_energy").val(value);
});

$(document).on("click", ".filter-energy .reset", function(){
  $("#vehicle_step2_energy").val("");
});

$(document).on("click", ".filter-yearStart label .input-radio", function(){
  let value = $(this).val();

  let pattern = /^([0-9]{6})\|([0-9]{1,6})$/;
  let year = value.match(pattern);

  $("#vehicle_step2_yearStart").val(year[1]);
  $("#vehicle_step2_yearEnd").val(year[2]);
});

$(document).on("click", ".filter-energy .reset", function(){
  $("#vehicle_step2_yearStart").val("");
  $("#vehicle_step2_yearEnd").val("");
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
  initializeZone('#vehicle_step3_impacts_0', '.front-left');
  initializeZone('#vehicle_step3_impacts_1', '.front-right');
  initializeZone('#vehicle_step3_impacts_2', '.back-left');
  initializeZone('#vehicle_step3_impacts_3', '.back-right');
  initializeZone('#vehicle_step3_impacts_4', '.side-left');
  initializeZone('#vehicle_step3_impacts_5', '.side-right');

}

window.handleCompleteBrand=function() {
  if (!--inProgressBrand) {
    let brand = $("#vehicle_step2_brand").val();
    let dropdown = $(getContext()+".filter-brand");

    if(brand != "" && brand != undefined){
      autoCheck(dropdown, brand, brand);
      ajaxModelChoice(brand);

    }
  }
}


window.handleCompleteModel=function() {
  if (!--inProgressModel) {
    let brand = $("#vehicle_step2_brand").val();
    let model = $("#vehicle_step2_model").val();
    let dropdown = $(getContext()+".filter-model");

    if(model != "" && model != undefined){
      autoCheck(dropdown, model, model);
      ajaxVersionChoice(brand, model);

    }
  }
}

window.handleCompleteVersion=function() {
  if (!--inProgressVersion) {
    let brand = $("#vehicle_step2_brand").val();
    let model = $("#vehicle_step2_model").val();
    let version = $("#vehicle_step2_version").val();
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
    let input = $("#vehicle_step2_bodywork");
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
    let input = $("#vehicle_step2_gearbox");
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
    let input = $("#vehicle_step2_energy");
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

    let inputStart = $("#vehicle_step2_yearStart");
    let inputEnd = $("#vehicle_step2_yearEnd");

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
