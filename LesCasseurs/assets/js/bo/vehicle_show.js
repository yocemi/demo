// Fancybox
const fancybox = require('@fancyapps/fancybox');
// Fancybox Stylesheet
const fancyboxCSS = require('@fancyapps/fancybox/dist/jquery.fancybox.css');


$( document ).ready(function() {

  var impacts = $(".impacts").val();
  impacts = JSON.parse(impacts);

  impacts.forEach(function(impact) {
    $(".zone").each(function(){
      if($(this).hasClass(impact))
      {
        $(this).addClass("impact-ok");
      }
    });

  });

});
