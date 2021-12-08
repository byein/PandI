// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
let map;
let places;
let placesForDetail;
let infoWindow;
let markers = [];
let autocomplete;
const countryRestrict = { country: "us" };
const MARKER_PATH =
  "https://developers.google.com/maps/documentation/javascript/images/marker_green";
const hostnameRegexp = new RegExp("^https?://.+?/");

function initMap() {
    var seoul = {lat:37.6331867, lng: 127.079462};
   const map = new google.maps.Map(document.getElementById("map"), {
     center: seoul,
     zoom: 15,
     mapTypeId: "roadmap",
   });
   infoWindow = new google.maps.InfoWindow({
    content: document.getElementById("info-content"),
  });
    // Create the search box and link it to the UI element.
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
  
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });
    
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {

      const places = searchBox.getPlaces();
      placesForDetail = new google.maps.places.PlacesService(map);
      if (places.length == 0) {
        return;
      }
  
      // Clear out the old markers.
      markers.forEach((marker) => {
        marker.setMap(null);
      });

      markers = [];
      clearResults();
      clearMarkers();
      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();

      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }
  
        const icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };   

        // Create a marker for each place.
        markers.push(
          new google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,
            animation: google.maps.Animation.DROP,
            placeResult: place,
            //icon: markerIcon,
          })
        );
        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      for (let i = 0;i<markers.length;i++){
        markers[i].placeResult = places[i];
        google.maps.event.addListener(markers[i], "click", showInfoWindow);
        addResult(places[i], i);
      }
      map.fitBounds(bounds);
    });
    for (let i = 0;i<markers.length;i++){
        markers[i].placeResult = places[i];
        google.maps.event.addListener(markers[i], "click", showInfoWindow);
        setTimeout(dropMarker(i), i * 100);
        addResult(places[i], i);
      }
  }
// Search for hotels in the selected city, within the viewport of the map.
function search() {
    const search = {
      bounds: map.getBounds(),
    };
  
    places.nearbySearch(search, (results, status, pagination) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        clearResults();
        clearMarkers();
  
        // Create a marker for each hotel found, and
        // assign a letter of the alphabetic to each marker icon.
        for (let i = 0; i < results.length; i++) {
          const markerLetter = String.fromCharCode("A".charCodeAt(0) + (i % 26));
          const markerIcon = MARKER_PATH + markerLetter + ".png";
  
          // Use marker animation to drop the icons incrementally on the map.
          markers[i] = new google.maps.Marker({
            position: results[i].geometry.location,
            animation: google.maps.Animation.DROP,
            icon: markerIcon,
          });
          // If the user clicks a hotel marker, show the details of that hotel
          // in an info window.
          markers[i].placeResult = results[i];
          google.maps.event.addListener(markers[i], "click", showInfoWindow);
          setTimeout(dropMarker(i), i * 100);
          addResult(results[i], i);
        }
      }
    });
  }
  
  function clearMarkers() {
    for (let i = 0; i < markers.length; i++) {
      if (markers[i]) {
        markers[i].setMap(null);
      }
    }
  
    markers = [];
  }
  
  // Set the country restriction based on user input.
  // Also center and zoom the map on the given country.
  function setAutocompleteCountry() {
    const country = document.getElementById("country").value;
  
    if (country == "all") {
      autocomplete.setComponentRestrictions({ country: [] });
      map.setCenter({ lat: 15, lng: 0 });
      map.setZoom(2);
    } else {
      autocomplete.setComponentRestrictions({ country: country });
      map.setCenter(countries[country].center);
      map.setZoom(countries[country].zoom);
    }
  
    clearResults();
    clearMarkers();
  }
  
  function dropMarker(i) {
    return function () {
      markers[i].setMap(map);
    };
  }
  
  function addResult(result, i) {
    const results = document.getElementById("results");
    const markerLetter = String.fromCharCode("A".charCodeAt(0) + (i % 26));
    const markerIcon = MARKER_PATH + markerLetter + ".png";
    const tr = document.createElement("tr");
  
    tr.style.backgroundColor = i % 2 === 0 ? "#F0F0F0" : "#FFFFFF";
    tr.onclick = function () {
      google.maps.event.trigger(markers[i], "click");
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
  
  function clearResults() {
    const results = document.getElementById("results");
  
    while (results.childNodes[0]) {
      results.removeChild(results.childNodes[0]);
    }
  }
  
  // Get the place details for a hotel. Show the information in an info window,
  // anchored on the marker for the hotel that the user selected.
  function showInfoWindow() {
    const marker = this;
    placesForDetail.getDetails(
        { placeId: marker.placeResult.place_id },
        (place, status) => {
          if (status !== google.maps.places.PlacesServiceStatus.OK) {
            return;
          }
    
          infoWindow.open(map, marker);
          buildIWContent(place);
        }
      );

  }
  
  // Load the place information into the HTML elements used by the info window.
  function buildIWContent(place) {
    document.getElementById("iw-icon").innerHTML =
      '<img class="hotelIcon" ' + 'src="' + place.icon + '"/>';
    document.getElementById("iw-url").innerHTML =
      '<b><a href="' + place.url + '">' + place.name + "</a></b>";
    document.getElementById("iw-address").textContent = place.vicinity;
    if (place.formatted_phone_number) {
      document.getElementById("iw-phone-row").style.display = "";
      document.getElementById("iw-phone").textContent =
        place.formatted_phone_number;
    } else {
      document.getElementById("iw-phone-row").style.display = "none";
    }
  
    // Assign a five-star rating to the hotel, using a black star ('&#10029;')
    // to indicate the rating the hotel has earned, and a white star ('&#10025;')
    // for the rating points not achieved.
    if (place.rating) {
      let ratingHtml = "";
  
      for (let i = 0; i < 5; i++) {
        if (place.rating < i + 0.5) {
          ratingHtml += "&#10025;";
        } else {
          ratingHtml += "&#10029;";
        }
  
        document.getElementById("iw-rating-row").style.display = "";
        document.getElementById("iw-rating").innerHTML = ratingHtml;
      }
    } else {
      document.getElementById("iw-rating-row").style.display = "none";
    }
  
    // The regexp isolates the first part of the URL (domain plus subdomain)
    // to give a short URL for displaying in the info window.
    if (place.website) {
      let fullUrl = place.website;
      let website = String(hostnameRegexp.exec(place.website));
  
      if (!website) {
        website = "http://" + place.website + "/";
        fullUrl = website;
      }
  
      document.getElementById("iw-website-row").style.display = "";
      document.getElementById("iw-website").textContent = website;
    } else {
      document.getElementById("iw-website-row").style.display = "none";
    }
  }