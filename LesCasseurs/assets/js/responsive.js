
window.responsive = window.responsive || {};

responsive.current_width = window.innerWidth;
responsive.min_width = 992;
responsive.mobile = responsive.current_width < responsive.min_width;

function swapChildren(obj1, obj2)
{
	var temp = obj2.children().detach();
	obj2.empty().append(obj1.children().detach());
	obj1.append(temp);
}


function toggleMobileStyles()
{
	if (responsive.mobile) {
		$("*[id^='_desktop_']").each(function(idx, el) {
			var target = $('#' + el.id.replace('_desktop_', '_mobile_'));
			if (target.length) {
				swapChildren($(el), target);
			}
		});

    $(".filter-mobile").each(function(){

			$(this).find(".options").children(".item").each(function(i){
				if(i > 3){
	        $(this).addClass("d-none");
	      }
			});
    });

	} else {
		$("*[id^='_mobile_']").each(function(idx, el) {
			var target = $('#' + el.id.replace('_mobile_', '_desktop_'));
			if (target.length) {
				swapChildren($(el), target);
			}
		});

    $(".filter-desktop").find(".options").children(".item").each(function(i){
        $(this).removeClass("d-none");
    });

	}

}

$(window).on('resize', function() {
	var _cw = responsive.current_width;
	var _mw = responsive.min_width;
	var _w = window.innerWidth;
	var _toggle = (_cw >= _mw && _w < _mw) || (_cw < _mw && _w >= _mw);
	responsive.current_width = _w;
  responsive.mobile = responsive.current_width < responsive.min_width;
	if (_toggle) {
		toggleMobileStyles();
	}

});

$(window).on("load", function() {
	if (responsive.mobile) {
		toggleMobileStyles();
	}
});
