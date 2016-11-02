"use strict";

function initMap() {
    // Create a map object and specify the DOM element for display.
    var myLatLng = {lat: 48.8894284, lng: 2.3026027};

    var map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        scrollwheel: false,
        zoom: 14,
        disableDefaultUI: true,
        /*zoomControl: false,
        //                mapTypeControl: boolean,
        scaleControl: false,
        //                streetViewControl: boolean,
        //                rotateControl: boolean
        */
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Ambassade de Maurice'
    });
}
