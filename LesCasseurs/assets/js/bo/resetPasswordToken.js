
const $ = require('jquery');

$('body').on('click', '#showPass', function () {
    var newPass = $('.newPass input');

    if (newPass.attr("type") === "password") {
        newPass.attr("type", "text");
    } else {
        newPass.attr("type", "password");
    }
});


$('.newPass').keyup(function () {

    var pass = $(this).find('input');
    var sizeInfo = $('.sizeInfo');
    var majInfo = $('.majInfo');
    var numInfo = $('.numInfo');

    var hasNumber = /\d+/;
    var hasMaj = /[A-Z]+/;

    if (pass.val().length < 8) {
        sizeInfo.addClass('list-group-item-danger');
        sizeInfo.attr('data-size', 'false');
    } else {
        sizeInfo.removeClass('list-group-item-danger');
        sizeInfo.addClass('list-group-item-success');
        sizeInfo.attr('data-size', 'true');
    }

    if (hasMaj.test(pass.val())) {
        majInfo.removeClass('list-group-item-danger');
        majInfo.addClass('list-group-item-success');
        majInfo.attr('data-maj', 'true');
    } else {
        majInfo.addClass('list-group-item-danger');
        majInfo.attr('data-maj', 'false');
    }

    if (hasNumber.test(pass.val())) {
        numInfo.removeClass('list-group-item-danger');
        numInfo.addClass('list-group-item-success');
        numInfo.attr('data-num', 'true');
    } else {
        numInfo.addClass('list-group-item-danger');
        numInfo.attr('data-num', 'false');
    }

    valideButton();
});

function valideButton() {

    var sizeInfo = $('.sizeInfo').attr('data-size');
    var majInfo = $('.majInfo').attr('data-maj');
    var numInfo = $('.numInfo').attr('data-num');



    var valideMdp = $('.valideMdp');

    if ((sizeInfo !== 'false') && (majInfo !== 'false') && (numInfo !== 'false')) {

        if(valideMdp.children().length === 0){
            valideMdp.append(
                $("<button />", {
                    type: 'submit',
                    text: 'Valider',
                    class: 'btn btn-success btnValide'
                })
            ).hide().fadeIn(500);
        }

    } else if((sizeInfo === 'false') || (majInfo === 'false') || (numInfo === 'false')) {
        $(".btnValide").fadeOut(500, function () {
            $(this).remove();
        });
    }
}
