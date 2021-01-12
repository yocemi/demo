const router = require('../router.js');
var EXIF = require('exif-js/exif.js');
//var loadImage = require('blueimp-load-image');

var inProgress = 0;

let form            =   document.querySelector('form');
let formData        =   null;

var fileReader = new FileReader();
var filterType = /^(?:image\/gif|image\/jpeg|image\/pipeg|image\/png|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

fileReader.onload = function(readerEvent) {
  var image = new Image();

  image.onload = function(imageEvent) {

    EXIF.getData(image, function () {


      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');

      var orientation = this.exifdata.Orientation;

      console.log(orientation);

      var max_width_or_height = 1024;

      var result_width, result_height;

      if(max_width_or_height && (image.width > max_width_or_height||image.height > max_width_or_height)) {
    		if(image.width>image.height){
    			var ratio = max_width_or_height/image.width;
      		result_width = image.width*ratio;
      		result_height = image.height*ratio;
    		}
    		else{
    			var ratio = max_width_or_height/image.height;
      		result_width = image.height*ratio;
      		result_height = image.width*ratio;
    		}
    	}
    	else{
    		result_width = image.width;
    		result_height = image.height;
    	}

      canvas.width  = result_width;
      canvas.height = result_height;

      if(orientation == 6 && image.height > image.width) {
        canvas.width  = result_height;
        canvas.height = result_width;

        // 90° rotate left
        ctx.rotate(-0.5 * Math.PI);
        ctx.translate(-result_width,0);
      }

      if(orientation == 8 && image.height > image.width) {

        // 90° rotate right
        ctx.rotate(0.5 * Math.PI);
        ctx.translate(0,-image.height);

      }

      ctx.save();



      console.log(result_width);
      console.log(result_height);

      ctx.drawImage(image, 0, 0, result_width, result_height);

      var dataUrl = canvas.toDataURL('image/jpeg' );
      var resizedImage = dataURLToBlob(dataUrl);

      console.log(resizedImage);

      // CustomEvent to trigger when the process is done, 'detail' is the only way to pass an object
      var evt = new CustomEvent('imageResized', {
          bubbles: true,
          'detail': resizedImage,
      });
      document.dispatchEvent(evt);

    });

  };

  image.src = readerEvent.target.result;

};


function ResizeImage(input) {
  var id = input.attr("id");
  var uploadImage = document.getElementById(id);

  //check and retuns the length of uploded file.
  if (uploadImage.files.length === 0) {
    return;
  }

  //Is Used for validate a valid file.
  var uploadFile = document.getElementById(id).files[0];
  if (!filterType.test(uploadFile.type)) {
    alert('Veuillez sélectionner un format d\'image valide.');
    return;
  }

  fileReader.readAsDataURL(uploadFile);

}

// We listen to the image resize so we can display it when it's done
document.addEventListener('imageResized', function(event){

    formData = new FormData(form);
    formData.set('file', event.detail );

    var li = $("#photo-fields-list").find("li").last().prev();
    li.find(".btn-upload-photo").trigger("click");

});

/* Utility function to convert a canvas to a BLOB */
var dataURLToBlob = function(dataURL) {
    // console.log("DataURLToBlob")
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = parts[1];

        return new Blob([raw], {type: contentType});
    }

    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], {type: contentType});
}
/* End Utility function to convert a canvas to a BLOB      */


function ajaxUploadPhoto(btn) {

  var li = btn.closest("li")
  //var input = li.find(".custom-file-input");

  //formData.append('file', input[0].files[0]);

  $.ajax({
    type : "POST",
    url : router.routing.generate('vehicle_upload_photo'),
    data:  formData,
    contentType: false,
    cache: false,
    processData:false,
    dataType: "json",
    beforeSend: handleBefore(),
    success : function (data) {
      li.find("input[type=text]").val(data.name);
      li.find("input[type=file]").val("");
      li.find(".photo-wrapper").removeClass("loader").html(data.html);
      addPhotoFormDeleteLink(li);
      handleComplete();
    }
  });
}

function handleBefore() {
        inProgress++;
};

function handleComplete() {
    if (!--inProgress) {
      $("#btn-save").attr("disabled", false);
    }
};


$( document ).on("click", ".btn-upload-photo", function(e){
    e.preventDefault();



    ajaxUploadPhoto($(this));

    //var counter = $collectionHolder.find("li").length;
    //if(counter > 3){
      //$collectionHolder.find(".btn-add-photo").parent("li").detach();
    //}
});


var $collectionHolder;

// setup an "add a tag" link
var $addPhotoButton = $('<button type="button" class="btn btn-add-photo"></button>');
var $newLinkLi = $('<li></li>').append($addPhotoButton);

$(document).ready(function() {
    // Get the ul that holds the collection of tags
    $collectionHolder = $('#photo-fields-list');

    // add a delete link to all of the existing tag form li elements
    $collectionHolder.find('li').each(function() {
        addPhotoFormDeleteLink($(this), $newLinkLi);
    });

    // add the "add a tag" anchor and li to the tags ul
    $collectionHolder.append($newLinkLi);

    // count the current form inputs we have (e.g. 2), use that as the new
    // index when inserting a new item (e.g. 2)
    $collectionHolder.data('index', $collectionHolder.find(':input').length);

    $addPhotoButton.on('click', function(e) {
        // add a new tag form (see next code block)
        addPhotoForm($collectionHolder, $newLinkLi);
    });

    //var counter = $collectionHolder.data('widget-counter');
    //if(counter > 2){
      //$collectionHolder.find(".btn-add-photo").parent("li").detach();
    //}

});


function addPhotoForm($collectionHolder, $newLinkLi) {
    // Get the data-prototype explained earlier
    var prototype = $collectionHolder.data('prototype');

    // get the new index
    var index = $collectionHolder.data('index');

    var newForm = prototype;
    // You need this only if you didn't set 'label' => false in your tags field in TaskType
    // Replace '__name__label__' in the prototype's HTML to
    // instead be a number based on how many items we have
    // newForm = newForm.replace(/__name__label__/g, index);

    // Replace '__name__' in the prototype's HTML to
    // instead be a number based on how many items we have
    newForm = newForm.replace(/__name__/g, index);

    // increase the index with one for the next item
    $collectionHolder.data('index', index + 1);

    // Display the form in the page in an li, before the "Add a tag" link li
    var $newFormLi = $('<li></li>').append(newForm);
    $newLinkLi.before($newFormLi);

    // add a delete link to the new form
    addPhotoFormDeleteLink($newFormLi, $newLinkLi);
}

function addPhotoFormDeleteLink($photoFormLi, $newLinkLi) {
    var $removeFormButton = $('<button type="button" class="btn btn-remove-photo"></button>');
    $photoFormLi.children(".photo-wrapper").append($removeFormButton);

    $removeFormButton.on('click', function(e) {
        // remove the li for the tag form
        $photoFormLi.remove();
        var counter = $collectionHolder.find("li").length;


        //if(counter < 3){
          // add the "add a tag" anchor and li to the tags ul
          //$collectionHolder.append($newLinkLi);
        //}

    });
}

$(document).on("click", ".btn-add-photo", function(e){
  var li = $(this).parent("li");
  var input = li.prev().find(".photo-input-file").trigger("click");

});

$(document).on("change", ".photo-input-file", function(e){
  $("#btn-save").attr("disabled", true);
  ResizeImage($(this));
  var li = $(this).closest("li");
  li.append('<div class="photo-wrapper loader"></div>');
});
