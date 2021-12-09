// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms. This example
// requires the Places library. Include the libraries=places parameter when you
// first load the API. For example: <script
// src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
let map;
let places;
let placesForDetail;
let infoWindow;
let markers = [];
let markersCafe = [];
let markersLodging = [];
let markersShop = [];
let markersFuneral = [];
let markersETC = [];
let markersAll = [];

let autocomplete;
let cafes = [];
let lodging = [];
let pet_store = [];
let beauty_salon = [];
let funeral_home = [];
let etc = [];
const resultsType = {
    iconCafe: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",
    iconShop: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    iconLodging: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    iconGrave: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cemetery_grave-71." +
            "png",
    iconEtc: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-7" +
            "1.png"
};
const countryRestrict = {
    country: "us"
};
const CAFE_MARKER_PATH = "/img/brown_Marker"
const SALON_MARKER_PATH = "/img/pink_Marker"
const PETSHOP_MARKER_PATH = "/img/purple_Marker"
const FUNURAL_MARKER_PATH = "/img/paleblue_Marker"
const ETC_MARKER_PATH = "/img/green_Marker"
const LODGING_MARKER_PATH = "/img/yellow_Marker"

const MARKER_PATH = "https://developers.google.com/maps/documentation/javascript/images/marker_gree" +
        "n";
const hostnameRegexp = new RegExp("^https?://.+?/");

function initMap() {
    var seoul = {
        lat: 37.6331867,
        lng: 127.079462
    };
    const map = new google
        .maps
        .Map(document.getElementById("map"), {
            center: seoul,
            zoom: 15,
            mapTypeId: "roadmap"
        });
    infoWindow = new google
        .maps
        .InfoWindow({content: document.getElementById("info-content")});
    // Create the search box and link it to the UI element.
    const input = document.getElementById("pac-input");
    const searchBox = new google
        .maps
        .places
        .SearchBox(input);

    // map.controls[google.maps.ControlPosition.TOP_CENTER].push(input); Bias the
    // SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
    });

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {

        const places = searchBox.getPlaces();
        placesForDetail = new google
            .maps
            .places
            .PlacesService(map);
        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach((marker) => {
            marker.setMap(null);
        });

        markers = [];
        clearResults();
        clearResultsCafe();
        clearResultsLodging();
        clearResultsShop();
        clearResultsFuneral();
        clearResultsETC();

        clearMarkers();
        clearMarkersCafe();
        clearMarkersLodging();
        clearMarkersShop();
        clearMarkersFuneral();
        clearMarkersETC();

        // For each place, get the icon, name and location.
        const bounds = new google
            .maps
            .LatLngBounds();

        places.forEach((place) => {
            if (!place.geometry || !place.geometry.location) {
                console.log("Returned place contains no geometry");
                return;
            }

            const icon = {
                url: place.icon,
                size: new google
                    .maps
                    .Size(71, 71),
                origin: new google
                    .maps
                    .Point(0, 0),
                anchor: new google
                    .maps
                    .Point(17, 34),
                scaledSize: new google
                    .maps
                    .Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map,
                icon,
                title: place.name,
                position: place.geometry.location,
                animation: google.maps.Animation.DROP,
                placeResult: place,
                //icon: markerIcon,
            }));
            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);

            } else {
                bounds.extend(place.geometry.location);
            }
        });
        for (let i = 0; i < markers.length; i++) {
            markers[i].placeResult = places[i];
            google
                .maps
                .event
                .addListener(markers[i], "click", showInfoWindow);
            addResult(places[i], i);
            if (places[i].icon == resultsType.iconCafe) {
                addResultCafe(places[i], i);
            } else if (places[i].icon == resultsType.iconLodging) {
                addResultLodging(places[i], i);
            } else if (places[i].icon == resultsType.iconShop) {
                addResultShop(places[i], i);
            } else if (places[i].icon == resultsType.iconGrave) {
                addResultFuneral(places[i], i);
            } else if (places[i].icon == resultsType.iconEtc) {
                addResultETC(places[i], i);
            }

        }
        map.fitBounds(bounds);
    });

    for (let i = 0; i < markers.length; i++) {

        markers[i].placeResult = places[i];
        google
            .maps
            .event
            .addListener(markers[i], "click", showInfoWindow);
        setTimeout(dropMarker(i), i * 100);
        addResult(places[i], i);
        if (places[i].icon == resultsType.iconCafe) {
            addResultCafe(places[i], i);
        } else if (places[i].icon == resultsType.iconLodging) {
            addResultLodging(places[i], i);
        } else if (places[i].icon == resultsType.iconShop) {
            addResultShop(places[i], i);
        } else if (places[i].icon == resultsType.iconGrave) {
            addResultFuneral(places[i], i);
        } else if (places[i].icon == resultsType.iconEtc) {
            addResultETC(places[i], i);
        }
    }
}

function clearResults() {
    const results = document.getElementById("results");

    while (results.childNodes[0]) {
        results.removeChild(results.childNodes[0]);
    }
}
function clearResultsCafe() {
    const results = document.getElementById("resultsCafe");

    while (results.childNodes[0]) {
        results.removeChild(results.childNodes[0]);
    }
}
function clearResultsLodging() {
    const results = document.getElementById("resultsLodging");

    while (results.childNodes[0]) {
        results.removeChild(results.childNodes[0]);
    }
}
function clearResultsShop() {
    const results = document.getElementById("resultsShop");

    while (results.childNodes[0]) {
        results.removeChild(results.childNodes[0]);
    }
}
function clearResultsFuneral() {
    const results = document.getElementById("resultsFuneral");

    while (results.childNodes[0]) {
        results.removeChild(results.childNodes[0]);
    }
}
function clearResultsETC() {
    const results = document.getElementById("resultsETC");

    while (results.childNodes[0]) {
        results.removeChild(results.childNodes[0]);
    }
}

function clearMarkers() {
    for (let i = 0; i < markers.length; i++) {
        if (markers[i]) {
            markers[i].setMap(null);
        }
    }

    markers = [];
}
function clearMarkersCafe() {
    for (let i = 0; i < markersCafe.length; i++) {
        if (markersCafe[i]) {
            markersCafe[i].setMap(null);
        }
    }

    markersCafe = [];
}

function clearMarkersLodging() {
    for (let i = 0; i < markersLodging.length; i++) {
        if (markersLodging[i]) {
            markersLodging[i].setMap(null);
        }
    }

    markersLodging = [];
}
function clearMarkersShop() {
    for (let i = 0; i < markersShop.length; i++) {
        if (markersShop[i]) {
            markersShop[i].setMap(null);
        }
    }

    markersShop = [];
}
function clearMarkersFuneral() {
    for (let i = 0; i < markersFuneral.length; i++) {
        if (markersFuneral[i]) {
            markersFuneral[i].setMap(null);
        }
    }

    markersFuneral = [];
}
function clearMarkersETC() {
    for (let i = 0; i < markersETC.length; i++) {
        if (markersETC[i]) {
            markersETC[i].setMap(null);
        }
    }

    markersETC = [];
}

// Set the country restriction based on user input. Also center and zoom the map
// on the given country.

function dropMarker(i) {
    return function () {
        markers[i].setMap(map);
    };
}
function dropMarkerCafe(i) {
    return function () {
        markersCafe[i].setMap(map);
    };
}
function dropMarkerLodging(i) {
    return function () {
        markersLodging[i].setMap(map);
    };
}
function dropMarkerShop(i) {
    return function () {
        markersShop[i].setMap(map);
    };
}
function dropMarkerFuneral(i) {
    return function () {
        markersFuneral[i].setMap(map);
    };
}
function dropMarkerETC(i) {
    return function () {
        markersETC[i].setMap(map);
    };
}

function addResult(result, i) {
    const results = document.getElementById("results");

    const markerLetter = String.fromCharCode("A".charCodeAt(0) + (i % 26));
    const markerIcon = MARKER_PATH + markerLetter + ".png";
    const tr = document.createElement("tr");

    tr.style.backgroundColor = i % 2 === 0
        ? "#F0F0F0"
        : "#FFFFFF";
    tr.onclick = function () {
        google
            .maps
            .event
            .trigger(markers[i], "click");
    };

    const iconTd = document.createElement("td");
    const nameTd = document.createElement("td");
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
function addResultCafe(result, i) {

    const results = document.getElementById("resultsCafe");

    const markerLetter = String.fromCharCode("A".charCodeAt(0) + (i % 26));
    const markerIcon = MARKER_PATH + markerLetter + ".png";
    const tr = document.createElement("tr");

    tr.style.backgroundColor = i % 2 === 0
        ? "#F0F0F0"
        : "#FFFFFF";
    tr.onclick = function () {
        google
            .maps
            .event
            .trigger(markers[i], "click");
    };

    const iconTd = document.createElement("td");
    const nameTd = document.createElement("td");
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
function addResultLodging(result, i) {

    const results = document.getElementById("resultsLodging");

    const markerLetter = String.fromCharCode("A".charCodeAt(0) + (i % 26));
    const markerIcon = MARKER_PATH + markerLetter + ".png";
    const tr = document.createElement("tr");

    tr.style.backgroundColor = i % 2 === 0
        ? "#F0F0F0"
        : "#FFFFFF";
    tr.onclick = function () {
        google
            .maps
            .event
            .trigger(markers[i], "click");
    };

    const iconTd = document.createElement("td");
    const nameTd = document.createElement("td");
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
function addResultShop(result, i) {

    const results = document.getElementById("resultsShop");

    const markerLetter = String.fromCharCode("A".charCodeAt(0) + (i % 26));
    const markerIcon = MARKER_PATH + markerLetter + ".png";
    const tr = document.createElement("tr");

    tr.style.backgroundColor = i % 2 === 0
        ? "#F0F0F0"
        : "#FFFFFF";
    tr.onclick = function () {
        google
            .maps
            .event
            .trigger(markers[i], "click");
    };

    const iconTd = document.createElement("td");
    const nameTd = document.createElement("td");
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
function addResultFuneral(result, i) {

    const results = document.getElementById("resultsFuneral");

    const markerLetter = String.fromCharCode("A".charCodeAt(0) + (i % 26));
    const markerIcon = MARKER_PATH + markerLetter + ".png";
    const tr = document.createElement("tr");

    tr.style.backgroundColor = i % 2 === 0
        ? "#F0F0F0"
        : "#FFFFFF";
    tr.onclick = function () {
        google
            .maps
            .event
            .trigger(markers[i], "click");
    };

    const iconTd = document.createElement("td");
    const nameTd = document.createElement("td");
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
function addResultETC(result, i) {

    const results = document.getElementById("resultsETC");

    const markerLetter = String.fromCharCode("A".charCodeAt(0) + (i % 26));
    const markerIcon = MARKER_PATH + markerLetter + ".png";
    const tr = document.createElement("tr");

    tr.style.backgroundColor = i % 2 === 0
        ? "#F0F0F0"
        : "#FFFFFF";
    tr.onclick = function () {
        google
            .maps
            .event
            .trigger(markers[i], "click");
    };

    const iconTd = document.createElement("td");
    const nameTd = document.createElement("td");
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

// Get the place details for a hotel. Show the information in an info window,
// anchored on the marker for the hotel that the user selected.
function showInfoWindow() {
    const marker = this;
    placesForDetail.getDetails({
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