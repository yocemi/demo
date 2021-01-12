/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you require will output into a single css file (app.css in this case)

// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.
const $ = require('jquery');
require('../../css/app_bo.scss');
import '../app_bo';

const routes = require('../../../public/js/fos_js_routes.json');
import Routing from '../../../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router.min.js';
Routing.setRoutingData(routes);

// var exif = require('exif-js');

let rootURl =   "http://" + window.location.hostname + "/lescasseurs/public";
let url     =   rootURl + Routing.generate('enterprise_create');


let photosIndex     =   document.getElementsByClassName('formPhoto');
let form            =   document.querySelector('form');
let messageBox      =   document.getElementById('message_box');
let formData        =   null;

// If there is no Photo input we create one
photosIndex.length === 0  ? addFormPhoto() : false;


// Listener to catch form submit and change the file submit
form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('form', form);

    while (messageBox.firstChild){
        messageBox.removeChild( messageBox.firstChild );
    }

    let progress    =   document.getElementById('progress');
    if( !progress ){
        progress    =   document.createElement("progress");
        progress.id =   "progress";
        messageBox.insertAdjacentElement( 'beforeend', progress );
    }

    new Promise( function( resolve, reject)
    {
        let xhr =   new XMLHttpRequest();

        for( let data of formData.entries()){
            console.log(data[0] + ' , ' + data[1]);
        }

        xhr.open('POST', url );
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        xhr.upload.addEventListener("progress", (event) => {
            if(event.lengthComputable){
                progress.setAttribute( 'max', event.total);
                progress.setAttribute( 'value', event.loaded);
            }
        });
        xhr.addEventListener( 'load', function () {
                if( this.readyState === 4 ){
                    if( this.status === 200 ){
                        resolve(this.response);
                    }
                } else {
                    reject(this.status);
                }
        });
        xhr.send(formData);
    })
    .then( ( data ) => {
        console.log('data', data);
        // If the upload is done we replace it by a validation message
        let response    =   JSON.parse(data);
        let message_node = document.createElement('p');
        let message_text = document.createTextNode(response.data);
        message_node.appendChild(message_text);
        progress.parentNode.replaceChild(message_node, progress);
    })
    .catch( ( error ) => {
        let message_node = document.createElement('p');
        let message_text = document.createTextNode(error);
        message_node.appendChild(message_text);
        progress.parentNode.replaceChild(message_node, progress);
    } )

});

function addFormPhoto( event ){

    let div             =   document.querySelector('[data-prototype]');
    let prototype       =   div.attributes.getNamedItem('data-prototype').value ;
    let newPrototype    =   prototype.replace(/__name__/g, photosIndex.length);
    form.insertAdjacentHTML( 'beforeend', newPrototype );
    let photoInput      =   document.getElementById( div.id + '_' + ( photosIndex.length - 1 ) + '_photo' );

    photoInput.addEventListener( 'change', (event) => { resizeImage( event ) });

}

// We listen to the image resize so we can display it when it's done
document.addEventListener('imageResized', function(event){

    //We create an url to diplay image from a blob
    let image       = window.URL.createObjectURL( event.detail );

    // We check if a photo is already display
    let newPhoto    =   document.getElementById('newPhoto');
    if( newPhoto ) {
        newPhoto.src = image;
    } else {
        let img = document.createElement('img');
        img.src = image;
        img.id  = "newPhoto";
        // And insert it in the form
        form.insertAdjacentElement( 'beforeend', img );
    };

    formData = new FormData(form);
    formData.set('enterprise[enterprisePhotos][0][photo]', event.detail , 'photo_casse.jpg' );

});


function resizeImage( event ){

    let file            =   event.target.files[0];

    // Ensure it's an image
    if(file.type.match(/image.*/)) {
        console.log('An image has been loaded');

        // Load the image with the File API
        var reader = new FileReader();

        reader.onload = function (readerEvent) {
            var image = new Image();

            image.onload = function (imageEvent) {

                // Resize the image
                var canvas = document.createElement('canvas'),
                    max_size = 544,
                    width = image.width,
                    height = image.height;
                if (width > height) {
                    if (width > max_size) {
                        height *= max_size / width;
                        width = max_size;
                    }
                } else {
                    if (height > max_size) {
                        width *= max_size / height;
                        height = max_size;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                canvas.getContext('2d').drawImage(image, 0, 0, width, height);
                var dataUrl = canvas.toDataURL('image/jpeg' );
                var resizedImage = dataURLToBlob(dataUrl);

                // CustomEvent to trigger when the process is done, 'detail' is the only way to pass an object
                var evt = new CustomEvent('imageResized', {
                    bubbles: true,
                    'detail': resizedImage,
                });
                document.dispatchEvent(evt);
            };
            image.src = readerEvent.target.result;
        };
        reader.readAsDataURL(file);
    }

}

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
