/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you require will output into a single css file (app.css in this case)
require('../css/app_fo.scss');

//import 'bootstrap';


// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.
const $ = require('jquery');
require('bootstrap');

// create global $ and jQuery variables
global.$ = global.jQuery = $;

require('lazyload');


$( document ).ready(function() {

  $('.navbar-toggler').click(function(){
		$("#nav-toggler-icon").toggleClass('open');
	});

  $(".lazy").lazyload();


});
