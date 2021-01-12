const router = require('./router.js');

window.inProgressBrand = 0;
window.inProgressModel = 0;
window.inProgressVersion = 0;
window.inProgressBodywork = 0;
window.inProgressGearbox = 0;
window.inProgressEnergy = 0;
window.inProgressYear = 0;

$( document ).ready(function() {
  ajaxBrandChoice();
});


window.displayAlert=function(dropdown){

  let tpl = '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>';
  let title = 'Choisir une valeur';

  let dd = $(getContext()+dropdown);

  let checked = false;

  dd.find(".options").children(".item").each(function(i){
    let radio = $(this).find(".input-radio");
    if(radio.prop("checked") == true){
      checked = true;
    }
  });

  if(checked == false){

    dd.children(".button-wrapper").tooltip({
      template: tpl,
      title: title,
      placement: "bottom",
    }).tooltip('show');

  }

  return checked;
}


$(document).on("click", ".filter label .input-radio", function(){

  let options = $(this).closest(".options");

  options.children(".item").each(function(i){
    $(this).find(".input-radio").removeClass("checked");
  });

});


$(document).on("click", ".filter-desktop .button-wrapper", function(){

  let form = $(this).closest(".search-form");

  form.find(".filter-desktop").each(function(i){

    let btn = $(this).children(".button-wrapper");
    let opt = $(this).children(".options-wrapper-1");

    if(btn.hasClass("hide")){
      btn.removeClass("hide").addClass("show");
    }

    if(opt.hasClass("d-none") === false){
      opt.addClass("d-none");
    }

  });


  if($(this).hasClass("show")){

    let _w = $(this).width();
    let btn = $(this).next(".options-wrapper-1");
    btn.find(".options-wrapper-5").width(_w + 30);
    btn.removeClass("d-none");
    $(this).removeClass("show").addClass("hide");
  }
  else {
    $(this).next(".options-wrapper-1").addClass("d-none");
    $(this).removeClass("hide").addClass("show");
  }
});


$(document).on("click", ".filter-desktop label", function(){
  let value = $(this).children(".item-label").html();
  let button = $(this).closest(".options-wrapper-1").prev(".button-wrapper");
  button.parent().addClass("active");
  button.children(".select").html(value).removeClass('required');
});

$(document).on("click", ".filter-desktop .btn-erase", function(){
    let options = $(this).closest(".options-footer-wrapper").prev(".options-wrapper-7").find(".options");
    let button = $(this).closest(".options-wrapper-1").prev(".button-wrapper");

    options.children(".item").each(function(i){
      $(this).find(".input-radio").prop('checked', false);
      $(this).find(".input-radio").removeClass("checked");
    });

    button.parent().removeClass("active");

    let label = $(this).closest(".options-wrapper-4").children(".options-label").html();

    button.children(".select").html(label);
});


$(document).on("click", ".filter-desktop .btn", function(){
  $(this).closest(".options-wrapper-1").addClass("d-none");
  $(this).closest(".options-wrapper-1").prev(".button-wrapper").removeClass("hide").addClass("show");
});


$(document).on("click", ".filter-mobile .toggle-items", function(){
  let options = $(this).prev(".options");
  let toggle = $(this);

  if(toggle.hasClass("show")){
    options.children(".item").each(function(i){
      $(this).removeClass("d-none");
    });

    toggle.removeClass("show").addClass("hide").html("Voir moins");
  }
  else {
    options.children(".item").each(function(i){
      if(i > 3){
        $(this).addClass("d-none");
      }
    });

    toggle.removeClass("hide").addClass("show").html("Voir plus");
  }
});


$(document).on("click", ".filter-mobile .filter-reset", function(){

  let options = $(this).closest(".filter-mobile").children(".options");
  let toggle = $(this).closest(".filter-mobile").children(".toggle-items");

  options.children(".item").each(function(i){
    $(this).find(".input-radio").prop('checked', false);
    $(this).find(".input-radio").removeClass("checked");
    if(toggle.hasClass("hide")){
      if(i > 3){
        $(this).addClass("d-none");
      }
    }
  });

  if(toggle.hasClass("hide")){
    toggle.removeClass("hide").addClass("show").html("Voir plus");
  }
});

$(document).on("click", ".filter-brand .reset", function(){
  resetVehicle(1);
});

$(document).on("click", ".filter-model .reset", function(){
  resetVehicle(2);
});

$(document).on("click", ".filter-version .reset", function(){
  resetVehicle(3);
});

$(document).on("click", ".filter-brand label .input-radio", function(e){
  resetVehicle(1);

  let brand = $(this).val();
  ajaxModelChoice(brand);
});

$(document).on("click", ".filter-mobile.filter-brand label .input-radio", function(e){

  let options = $(this).closest(".options");
  let toggle = $(this).closest(".filter-mobile").children(".toggle-items");

  options.children(".item").each(function(i){
    let checked = $(this).find(".input-radio").prop('checked');

    if(checked == false){
      $(this).addClass("d-none");
    }
  });

  if(toggle.hasClass("hide")){
    toggle.removeClass("hide").addClass("show").html("Voir plus");
  }

  window.scrollTo(0,0);

});


$(document).on("click", ".filter-model label .input-radio", function(){
  resetVehicle(2);

  let brand;
  let radio;

  $(".filter-brand").find(".options").children(".item").each(function(){
    radio = $(this).find(".input-radio");

    if(radio.prop("checked")){
      brand = radio.val();
    }
  });

  let model = $(this).val();

  ajaxVersionChoice(brand, model);

});


$(document).on("click", ".filter-mobile.filter-model label .input-radio", function(e){

  let options = $(this).closest(".options");
  let toggle = $(this).closest(".filter-mobile").children(".toggle-items");

  options.children(".item").each(function(i){
    let checked = $(this).find(".input-radio").prop('checked');

    if(checked == false){
      $(this).addClass("d-none");
    }
  });

  if(toggle.hasClass("hide")){
    toggle.removeClass("hide").addClass("show").html("Voir plus");
  }

  window.scrollTo(0,0);

});


$(document).on("click", ".filter-version label .input-radio", function(){
  resetVehicle(3);

  let brand;
  let model;
  let radio;

  $(".filter-brand").find(".options").children(".item").each(function(){
    radio = $(this).find(".input-radio");

    if(radio.prop("checked")){
      brand = radio.val();
    }
  });

  $(".filter-model").find(".options").children(".item").each(function(){
    radio = $(this).find(".input-radio");

    if(radio.prop("checked")){
      model = radio.val();
    }
  });

  let version = $(this).val();

  ajaxBodyworkChoice(brand, model, version);
  ajaxGearboxChoice(brand, model, version);
  ajaxEnergyChoice(brand, model, version);
  ajaxYearChoice(brand, model, version);

});


$(document).on("click", ".filter-yearStart label .input-radio", function(){

  let brand;
  let model;
  let version;
  let yearStartEnd;
  let radio;

  $(".filter-brand").find(".options").children(".item").each(function(){
    radio = $(this).find(".input-radio");

    if(radio.prop("checked")){
      brand = radio.val();
    }
  });

  $(".filter-model").find(".options").children(".item").each(function(){
    radio = $(this).find(".input-radio");

    if(radio.prop("checked")){
      model = radio.val();
    }
  });

  $(".filter-version").find(".options").children(".item").each(function(){
    radio = $(this).find(".input-radio");

    if(radio.prop("checked")){
      version = radio.val();
    }
  });

  let year = $(this).val();

  let pattern = /^([0-9]{6})\|([0-9]{1,6})$/;
  yearStartEnd = year.match(pattern);

  ajaxPhaseFill(brand, model, version, yearStartEnd[1], yearStartEnd[2]);

});


window.getContext = function(){

  let context = ".filter-desktop";

  if(responsive.mobile == true){
    context = ".filter-mobile";
  }

  return context;
}


function ajaxBrandChoice() {

  $.ajax({
    type : "POST",
    url : router.routing.generate('catdata_choice_brand'),
    dataType: "html",
    beforeSend: handleBeforeBrand(),
    success : function (html) {

      $(getContext()+".filter-brand").find(".options").html(html);

      var items = $(".filter-mobile.filter-brand").find(".options").children(".item");
      items.each(function(i){
        if(i > 3){
          $(this).addClass("d-none");
        }
      });

      if(items.length < 4){
        $(".filter-mobile.filter-brand").find(".toggle-items").addClass("d-none");
      }

      handleCompleteBrand();

    }
  });
}

window.handleBeforeBrand=function() {
    inProgressBrand++;
};

window.ajaxModelChoice=function(brand) {

  var params = "brand="+brand;

  $.ajax({
    type : "POST",
    url : router.routing.generate('catdata_choice_model'),
    data: params,
    dataType: "html",
    beforeSend: handleBeforeModel(),
    success : function (html) {

      $(".filter-mobile.filter-model").find(".toggle-items").removeClass("d-none");

      $(getContext()+".filter-model").find(".options").html(html);

      var items = $(".filter-mobile.filter-model").find(".options").children(".item");
      items.each(function(i){
        if(i > 3){
          $(this).addClass("d-none");
        }
      });

      if(items.length < 4){
        $(".filter-mobile.filter-model").find(".toggle-items").addClass("d-none");
      }

      handleCompleteModel();

    }
  });
}

window.handleBeforeModel=function() {
    inProgressModel++;
};

window.ajaxVersionChoice=function(brand, model) {

  var params = "brand="+brand+"&model="+model;

  $.ajax({
    type : "POST",
    url : router.routing.generate('catdata_choice_version'),
    data: params,
    dataType: "html",
    beforeSend: handleBeforeVersion(),
    success : function (html) {

      $(".filter-mobile.filter-version").find(".toggle-items").removeClass("d-none");

      $(getContext()+".filter-version").find(".options").html(html);

      var items = $(".filter-mobile.filter-version").find(".options").children(".item");
      items.each(function(i){
        if(i > 3){
          $(this).addClass("d-none");
        }
      });

      if(items.length < 4){
        $(".filter-mobile.filter-version").find(".toggle-items").addClass("d-none");
      }

      handleCompleteVersion();

    }
  });
}

window.handleBeforeVersion=function() {
    inProgressVersion++;
};

window.ajaxBodyworkChoice=function(brand, model, version) {

  var params = "brand="+brand+"&model="+model+"&version="+version;

  $.ajax({
    type : "POST",
    url : router.routing.generate('catdata_choice_bodywork'),
    data: params,
    dataType: "html",
    beforeSend: handleBeforeBodywork(),
    success : function (html) {

      $(getContext()+".filter-bodywork").find(".options").html(html);

      var items = $(".filter-mobile.filter-bodywork").find(".options").children(".item");
      items.each(function(i){
        if(i > 3){
          $(this).addClass("d-none");
        }
      });

      if(items.length < 4){
        $(".filter-mobile.filter-bodywork").find(".toggle-items").addClass("d-none");
      }

      handleCompleteBodywork();
    }
  });
}


window.handleBeforeBodywork=function() {
    inProgressBodywork++;
};


window.ajaxGearboxChoice=function(brand, model, version) {

  var params = "brand="+brand+"&model="+model+"&version="+version;

  $.ajax({
    type : "POST",
    url : router.routing.generate('catdata_choice_gearbox'),
    data: params,
    dataType: "html",
    beforeSend: handleBeforeGearbox(),
    success : function (html) {

      $(getContext()+".filter-gearbox").find(".options").html(html);

      var items = $(".filter-mobile.filter-gearbox").find(".options").children(".item");
      items.each(function(i){
        if(i > 3){
          $(this).addClass("d-none");
        }
      });

      if(items.length < 4){
        $(".filter-mobile.filter-gearbox").find(".toggle-items").addClass("d-none");
      }

      handleCompleteGearbox();
    }
  });
}


window.handleBeforeGearbox=function() {
    inProgressGearbox++;
};


window.ajaxEnergyChoice=function(brand, model, version) {

  var params = "brand="+brand+"&model="+model+"&version="+version;

  $.ajax({
    type : "POST",
    url : router.routing.generate('catdata_choice_energy'),
    data: params,
    dataType: "html",
    beforeSend: handleBeforeEnergy(),
    success : function (html) {

      $(getContext()+".filter-energy").find(".options").html(html);

      var items = $(".filter-mobile.filter-energy").find(".options").children(".item");
      items.each(function(i){
        if(i > 3){
          $(this).addClass("d-none");
        }
      });

      if(items.length < 4){
        $(".filter-mobile.filter-energy").find(".toggle-items").addClass("d-none");
      }

      handleCompleteEnergy();
    }
  });
}


window.handleBeforeEnergy=function() {
    inProgressEnergy++;
};


window.ajaxYearChoice=function(brand, model, version) {

  var params = "brand="+brand+"&model="+model+"&version="+version;

  $.ajax({
    type : "POST",
    url : router.routing.generate('catdata_choice_year'),
    data: params,
    dataType: "html",
    beforeSend: handleBeforeYear(),
    success : function (html) {

      $(getContext()+".filter-yearStart").find(".options").html(html);

      var items = $(".filter-mobile.filter-yearStart").find(".options").children(".item");
      items.each(function(i){
        if(i > 3){
          $(this).addClass("d-none");
        }
      });

      if(items.length < 4){
        $(".filter-mobile.filter-yearStart").find(".toggle-items").addClass("d-none");
      }

      handleCompleteYear();
    }
  });
}


window.handleBeforeYear=function() {
    inProgressYear++;
};


window.ajaxPhaseFill=function(brand, model, version, yearStart, yearEnd) {

  var params = "brand="+brand+"&model="+model+"&version="+version+"&year_start="+yearStart+"&year_end="+yearEnd;

  var test =router.routing.generate('catdata_fill_phase');
  //console.log(test);

  $.ajax({
    type : "POST",
    url : router.routing.generate('catdata_fill_phase'),
    data: params,
    dataType: "html",
    success : function (html) {

      console.log(html);

      $(".input-phase").val(html);

    }
  });
}


window.autoCheck=function(dropdown, value, label){

  dropdown.children(".button-wrapper").children(".select").html(label);
  let options = dropdown.find(".options");
  let item;

  options.children(".item").each(function(i){
    let radio = $(this).find(".input-radio");
    let v = radio.val();

    if(v == value){
      radio.addClass("checked");
      radio.prop("checked", true);
      item = radio.closest(".item");
      item.prependTo(options).removeClass("d-none");
    }
  });

}

window.checkSingleOption=function(dropdown, input){

  let options = dropdown.find(".options");
  let nbOptions = options.children(".item").length;

  if(nbOptions == 1){
    let radio = options.children(".item").find(".input-radio");
    radio.prop("checked", true).addClass("checked");
    let value = radio.val();
    input.val(value);
    dropdown.children(".button-wrapper").children(".select").html(value);
  }

}


window.checkSingleOptionYear=function(dropdown, start, end){

  let options = dropdown.find(".options");
  let nbOptions = options.children(".item").length;

  let pattern = /^([0-9]{6})\|([0-9]{1,6})$/;

  if(nbOptions == 1){
    let radio = options.children(".item").find(".input-radio");
    radio.prop("checked", true).addClass("checked");
    let value = radio.val();
    let year = value.match(pattern);
    start.val(year[1]);
    end.val(year[2]);

    let pattern2 = /^([0-9]{4})([0-9]{2})$/;
    let yearStartLabel = year[1].match(pattern2);
    let yearEndLabel = year[2].match(pattern2);
    let yearLabel = yearStartLabel[2]+"/"+yearStartLabel[1]+" - "+(year[2] == 0 ? "aujourd'hui" : yearEndLabel[2]+"/"+yearEndLabel[1]);
    dropdown.children(".button-wrapper").children(".select").html(yearLabel);
  }

}

function resetVehicle(step) {

  if(step < 3){
    resetOption(".filter-version");
  }
  if(step < 2){
    resetOption(".filter-model");
  }

  resetOption(".filter-bodywork");
  resetOption(".filter-gearbox");
  resetOption(".filter-energy");
  resetOption(".filter-yearStart");

}

function resetOption(dropdown){
    $(dropdown).prev("input").val("");
    $(dropdown).removeClass("active").find(".options").html("");
    let label = $(".filter-desktop"+dropdown).find(".options-wrapper-4").children(".options-label").html();
    $(".filter-desktop"+dropdown).children(".button-wrapper").children(".select").html(label);

    if(dropdown == ".filter-yearStart"){
      $(".year-end").val("");
    }
}
