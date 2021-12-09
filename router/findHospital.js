// This example uses the autocomplete feature of the Google Places API. It
// allows the user to find all hotels in a given place, within a given country.
// It then displays markers for all the hotels returned, with on-click details
// for each hotel. This example requires the Places library. Include the
// libraries=places parameter when you first load the API. For example: <script
// src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
let map;
let places;
let infoWindow;
let markersVet = [];
let markersPhar = [];
let autocomplete;
const PHAR_MARKER_PATH = "/img/blue_Marker"
const VET_MARKER_PATH = "/img/red_Marker"
const hostnameRegexp = new RegExp("^https?://.+?/");

function initMap() {
    var seoul = {
        lat: 37.6331867,
        lng: 127.079462
    };
    map = new google
        .maps
        .Map(document.getElementById("map"), {
            center: seoul,
            zoom: 15,
            mapTypeId: "roadmap"
        });
    infoWindow = new google
        .maps
        .InfoWindow({content: document.getElementById("info-content")});
    // Create the autocomplete object and associate it with the UI input control.
    // Restrict the search to the default country, and to place type "cities".

    autocomplete = new google
        .maps
        .places
        .Autocomplete(document.getElementById("autocomplete"));
    places = new google
        .maps
        .places
        .PlacesService(map);
    autocomplete.addListener('keypress', onPlaceChanged);
    autocomplete.addListener("place_changed", onPlaceChanged);
    // Add a DOM event listener to react when the user selects a country.
    document.addEventListener("change", setAutocompleteCountry);
}

// When the user selects a city, get the place details for the city and zoom the
// map in on the city.
function onPlaceChanged() {
    const place = autocomplete.getPlace();

    if (place.geometry && place.geometry.location) {
        map.panTo(place.geometry.location);
        map.setZoom(15);
        search();
    }
}

// Search for hotels in the selected city, within the viewport of the map.
function search() {
    const searchVetCare = {
        bounds: map.getBounds(),
        types: ['veterinary_care']
    };
    const searchParmacy = {
        bounds: map.getBounds(),
        types: ['pharmacy']
    };

    places.nearbySearch(searchVetCare, (resultsVetCare, status, pagination) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && resultsVetCare) {
            clearResultsVetCare();
            clearMarkersVet();

            // Create a marker for each hotel found, and assign a letter of the alphabetic
            // to each marker icon.
            for (let i = 0; i < resultsVetCare.length; i++) {
                const markerLetter = String.fromCharCode("A".charCodeAt(0) + (i % 26));
                const markerIcon = VET_MARKER_PATH + markerLetter + ".png";

                // Use marker animation to drop the icons incrementally on the map.
                markersVet[i] = new google
                    .maps
                    .Marker(
                        {position: resultsVetCare[i].geometry.location, animation: google.maps.Animation.DROP, icon: markerIcon}
                    );
                // If the user clicks a hotel marker, show the details of that hotel in an info
                // window.
                markersVet[i].placeResult = resultsVetCare[i];
                google
                    .maps
                    .event
                    .addListener(markersVet[i], "click", showInfoWindow);
                setTimeout(dropMarkerVet(i), i * 100);
                addResultVetCare(resultsVetCare[i], i);
            }
        }
    });
    places.nearbySearch(searchParmacy, (resultsPharmacy, status, pagination) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && resultsPharmacy) {
            clearResultsPharmacy();
            clearMarkersPhar();

            // Create a marker for each hotel found, and assign a letter of the alphabetic
            // to each marker icon.
            for (let i = 0; i < resultsPharmacy.length; i++) {
                const markerLetter = String.fromCharCode("A".charCodeAt(0) + (i % 26));
                const markerIcon = PHAR_MARKER_PATH + markerLetter + ".png";

                // Use marker animation to drop the icons incrementally on the map.
                markersPhar[i] = new google
                    .maps
                    .Marker(
                        {position: resultsPharmacy[i].geometry.location, animation: google.maps.Animation.DROP, icon: markerIcon}
                    );
                // If the user clicks a hotel marker, show the details of that hotel in an info
                // window.
                markersPhar[i].placeResult = resultsPharmacy[i];
                google
                    .maps
                    .event
                    .addListener(markersPhar[i], "click", showInfoWindow);
                setTimeout(dropMarkerPhar(i), i * 100);
                addResultPharmacy(resultsPharmacy[i], i);
            }
        }
    });
}

function clearMarkersVet() {
    for (let i = 0; i < markersVet.length; i++) {
        if (markersVet[i]) {
            markersVet[i].setMap(null);
        }
    }

    markersVet = [];
}
function clearMarkersPhar() {
    for (let i = 0; i < markersPhar.length; i++) {
        if (markersPhar[i]) {
            markersPhar[i].setMap(null);
        }
    }

    markersPhar = [];
}
// Set the country restriction based on user input. Also center and zoom the map
// on the given country.
function setAutocompleteCountry() {
    autocomplete.setComponentRestrictions({country: []});
    map.setCenter({lat: 15, lng: 0});
    map.setZoom(2);

    clearResultsVetCare();
    clearResultsPharmacy();
    clearMarkersVet();
    clearMarkersPhar();
}

function dropMarkerVet(i) {
    return function () {
        markersVet[i].setMap(map);
    };
}
function dropMarkerPhar(i) {
    return function () {
        markersPhar[i].setMap(map);
    };
}

function addResultVetCare(result, i) {
    const results = document.getElementById("resultsVet");
    const markerLetter = String.fromCharCode("A".charCodeAt(0) + (i % 26));
    const markerIcon = VET_MARKER_PATH + markerLetter + ".png";
    const tr = document.createElement("tr");

    tr.style.backgroundColor = i % 2 === 0
        ? "#F0F0F0"
        : "#FFFFFF";
    tr.onclick = function () {
        google
            .maps
            .event
            .trigger(markersVet[i], "click");
    };

    const iconTd = document.createElement("th");
    const nameTd = document.createElement("th");
    const icon = document.createElement("img");

    icon.src = markerIcon;
    icon.setAttribute("class", "placeIcon");
    icon.setAttribute("className", "placeIcon");

    const name = document.createTextNode(result.name);

    iconTd.appendChild(icon);
    nameTd.appendChild(name);
    tr.appendChild(iconTd);
    tr.appendChild(nameTd);
    results.appendChild(tr);
}

function clearResultsVetCare() {
    const results = document.getElementById("resultsVet");

    while (results.childNodes[0]) {
        results.removeChild(results.childNodes[0]);
    }
}

function addResultPharmacy(result, i) {
    const results = document.getElementById("resultsPhar");
    const markerLetter = String.fromCharCode("A".charCodeAt(0) + (i % 26));
    const markerIcon = PHAR_MARKER_PATH + markerLetter + ".png";
    const tr = document.createElement("tr");

    tr.style.backgroundColor = i % 2 === 0
        ? "#F0F0F0"
        : "#FFFFFF";
    tr.onclick = function () {
        google
            .maps
            .event
            .trigger(markersPhar[i], "click");
    };

    const iconTd = document.createElement("th");
    const nameTd = document.createElement("th");
    const icon = document.createElement("img");

    icon.src = markerIcon;
    icon.setAttribute("class", "placeIcon");
    icon.setAttribute("className", "placeIcon");

    const name = document.createTextNode(result.name);

    iconTd.appendChild(icon);
    nameTd.appendChild(name);
    tr.appendChild(iconTd);
    tr.appendChild(nameTd);
    results.appendChild(tr);
}

function clearResultsPharmacy() {
    const results = document.getElementById("resultsPhar");

    while (results.childNodes[0]) {
        results.removeChild(results.childNodes[0]);
    }
}

// Get the place details for a hotel. Show the information in an info window,
// anchored on the marker for the hotel that the user selected.
function showInfoWindow() {
    const marker = this;

    places.getDetails({
        placeId: marker.placeResult.place_id
    }, (place, status) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
            return;
        }

        infoWindow.open(map, marker);
        buildIWContent(place);
    });
}

// Load the place information into the HTML elements used by the info window.
function buildIWContent(place) {
    document
        .getElementById("iw-icon")
        .innerHTML = '<img class="hotelIcon" src="' + place.icon + '"/>';
    document
        .getElementById("iw-url")
        .innerHTML = '<b><a href="' + place.url + '">' + place.name + "</a></b>";
    document
        .getElementById("iw-address")
        .textContent = place.vicinity;
    if (place.formatted_phone_number) {
        document
            .getElementById("iw-phone-row")
            .style
            .display = "";
        document
            .getElementById("iw-phone")
            .textContent = place.formatted_phone_number;
    } else {
        document
            .getElementById("iw-phone-row")
            .style
            .display = "none";
    }

    // Assign a five-star rating to the hotel, using a black star ('&#10029;') to
    // indicate the rating the hotel has earned, and a white star ('&#10025;') for
    // the rating points not achieved.
    if (place.rating) {
        let ratingHtml = "";

        for (let i = 0; i < 5; i++) {
            if (place.rating < i + 0.5) {
                ratingHtml += "&#10025;";
            } else {
                ratingHtml += "&#10029;";
            }

            document
                .getElementById("iw-rating-row")
                .style
                .display = "";
            document
                .getElementById("iw-rating")
                .innerHTML = ratingHtml;
        }
    } else {
        document
            .getElementById("iw-rating-row")
            .style
            .display = "none";
    }

    // The regexp isolates the first part of the URL (domain plus subdomain) to give
    // a short URL for displaying in the info window.
    if (place.website) {
        let fullUrl = place.website;
        let website = String(hostnameRegexp.exec(place.website));

        if (!website) {
            website = "http://" + place.website + "/";
            fullUrl = website;
        }

        document
            .getElementById("iw-website-row")
            .style
            .display = "";
        document
            .getElementById("iw-website")
            .textContent = website;
    } else {
        document
            .getElementById("iw-website-row")
            .style
            .display = "none";
    }
}
