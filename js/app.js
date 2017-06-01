"use strict";

function init() {
  // Checks if google loaded, if it hasnt it throws an alert box error.
  if (typeof google !== 'undefined') {
    console.log("Google loaded successfully 😀, hopefully nothing else breaks.");
    initialize();
  }else {
    document.body.innerHTML = '<h1 class="error">Google has failed to load 😞,' +
                              ' try checking your internet connection!</h1>';
  }
}

// Setting globals.
var locations = ko.observableArray([
        {title: "Post Office", location: {lat: -34.1165049, lng: 18.830113},
        Address: "Fagan St, Strand, Cape Town, 7139", id: 0},
        {title: "Carolee Gallery", location: {lat: -34.1173679, lng: 18.8288536},
        Address: "Main Rd, Van Ryneveld, Cape Town, 7139", id: 1},
        {title: "San Francisco Spur", location: {lat: -34.11748496921975, lng: 18.82781982421875},
        Address: "86 Beach Rd, Strand, Cape Town, 7139", id: 2},
        {title: "Absa bank", location: {lat: -34.11817112315046, lng: 18.828342854976654},
        Address: "80 Beach Rd, Van Ryneveld, Strand, 7140", id: 3},
        {title: "Strand Pavillion", location: {lat: -34.1187029, lng: 18.8282496},
        Address: "Strand Pavilion, 14 Beach Rd, Strand, Cape Town, 7139", id: 4},
        {title: "KFC Strand", location: {lat: -34.1171262, lng: 18.8264007},
        Address: "Beach Rd, Strand, Cape Town, 7140", id: 5},
        {title: "The Belgian Waffle House", location: {lat: -34.1171183, lng: 18.8258977},
        Address: "97 Beach Rd, Strand, Cape Town, 7139", id: 6},
        {title: "Beach Road Cafe & Take-Aways", location: {lat: -34.11643, lng: 18.827384},
        Address: "5 Abegglen St, Strand, Cape Town, 7139, South Africa", id: 7},
        {title: "Fantazia Beads & Crafts", location: {lat: -34.117036412508234, lng: 18.828420639038086},
        Address: "30 Main Rd, Strand, Cape Town, 7140", id: 8},
        {title: "FNB ATM", location: {lat: -34.1172231, lng: 18.8264997},
        Address: "0B Beach Rd, Strand, Cape Town, 7139", id: 9}
      ]);

var fsqInfo;
var infowindow;
var markers = [];
var map;
var marker;
var styles = [
  {
      "featureType": "all",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "all",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "off"
          },
          {
              "saturation": "-100"
          }
      ]
  },
  {
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "saturation": 36
          },
          {
              "color": "#000000"
          },
          {
              "lightness": 40
          },
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers": [
          {
              "visibility": "off"
          },
          {
              "color": "#000000"
          },
          {
              "lightness": 16
          }
      ]
  },
  {
      "featureType": "all",
      "elementType": "labels.icon",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#000000"
          },
          {
              "lightness": 20
          }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#000000"
          },
          {
              "lightness": 17
          },
          {
              "weight": 1.2
          }
      ]
  },
  {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#000000"
          },
          {
              "lightness": 20
          }
      ]
  },
  {
      "featureType": "landscape",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#4d6059"
          }
      ]
  },
  {
      "featureType": "landscape",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#4d6059"
          }
      ]
  },
  {
      "featureType": "landscape.natural",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#4d6059"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
          {
              "lightness": 21
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#4d6059"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#4d6059"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "color": "#7f8d89"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#7f8d89"
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#7f8d89"
          },
          {
              "lightness": 17
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#7f8d89"
          },
          {
              "lightness": 29
          },
          {
              "weight": 0.2
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#000000"
          },
          {
              "lightness": 18
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#7f8d89"
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#7f8d89"
          }
      ]
  },
  {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#000000"
          },
          {
              "lightness": 16
          }
      ]
  },
  {
      "featureType": "road.local",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#7f8d89"
          }
      ]
  },
  {
      "featureType": "road.local",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#7f8d89"
          }
      ]
  },
  {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#000000"
          },
          {
              "lightness": 19
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
          {
              "color": "#2b3638"
          },
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#2b3638"
          },
          {
              "lightness": 17
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#24282b"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#24282b"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "labels.text",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "labels.icon",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  }
];

function initialize() {
  // Initialize google map
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 18,
    center: {lat: -34.1172625, lng: 18.827619},
    // Assassins creed map styling.
    styles: styles
  });

  initMarkers();
}

//Sets up markers with values, animations and icons.
function initMarkers() {
  for (var i = 0; i < locations().length; i++) {
    addMarkerWithAnimations(locations()[i],i * 100, i);

  }
}

function addMarkerWithAnimations(marker, timeout, i) {
  // Set marker with a timeout that delays the drop animation for each marker.
  window.setTimeout(function() {
    markers[i] = new google.maps.Marker({
    position: marker.location,
    map: map,
    title: marker.title,
    animation: google.maps.Animation.DROP,
    icon: makeMarkerIcon("defaultIcon"),
    flag: marker.flag
  });

  // Sets marker icon on mouseover.
  iconImage(i);
  // Set a bounce animation when marker is clicked.
  bounceIcon(i);
  // Add info windows
  addMarkerInfoWindows(i);
  //If screen is small map gets zoomed further out.
  screenMapSize();

  }, timeout);
}

// Adds marker mouse over event to change icon image.
function iconImage(i){
  var highlightedIcon = makeMarkerIcon("highlightedIcon");
  var defaultIcon = makeMarkerIcon("defaultIcon");

  markers[i].addListener("mouseover", function() {
          this.setIcon(highlightedIcon);
        });
  markers[i].addListener("mouseout", function() {
    this.setIcon(defaultIcon);
  });

}

// Sets marker icon
function makeMarkerIcon(image) {
  var highlightedIcon = "https://rocketdock.com/images/screenshots/assassinscreed2.png";
  var defaultIcon = "http://orig06.deviantart.net/19d8/f/2010/093/4/d/assassins_creed_by_miniant.png";
  var imageSet;

  if (image == "highlightedIcon") {
    imageSet = highlightedIcon;
  } else {
    imageSet = defaultIcon;
  }

  var markerImage = new google.maps.MarkerImage(
    imageSet,
    new google.maps.Size(34, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(34,34));
  return markerImage;
}
// Not sure how to get the "i" into the bounce operator so I just nested it.
function bounceIcon(i){
  markers[i].addListener("click", bounce);

  // Sets up bounce animation on marker.
  function bounce() {
    if (markers[i].getAnimation() !== null) {
      markers[i].setAnimation(null);
    } else {
      markers[i].setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function(){ markers[i].setAnimation(null);
      }, 750);
    }
  }
}

function addMarkerInfoWindows(i) {

  infowindow = new google.maps.InfoWindow({
    content: "<div id='fsqData' class='fsqData'></div><div id='pano' class='pano'>Google streetview is loading.</div>"
  });

  // On click opens infowindow and executes getstreetView and Fsquare data
  markers[i].addListener("click", function() {
    if(infowindow)infowindow.close();
    infowindow.open(map, markers[i]);
     googleStreetViewContent(i);
     getFsquare(i);
  });
  // Make sure the marker property is cleared if the infowindow is closed.
  infowindow.addListener("closeclick",function(){
    if(infowindow)infowindow.close();
  });
  google.maps.event.addListener(map, "click", function() {
    infowindow.close();
  });
}
// Open an infoWindo when list item is clicked.
function openInfoM(c, event){
// Retrieve the id of the element that fired the event.
  var element = event.target;
  var click_id = element.id;

  if(infowindow)infowindow.close();
    infowindow.open(map, markers[click_id]);
     googleStreetViewContent(click_id);
     getFsquare(click_id);
     map.setCenter(markers[click_id].getPosition());
}

// Google Streetview
function googleStreetViewContent(i) {
  // Google streetview
  var panorama;
  var sv = new google.maps.StreetViewService();
  panorama = new google.maps.StreetViewPanorama(document.getElementById("pano"));

  // Set street view camera
  var location1 = markers[i].getPosition();
  sv.getPanoramaByLocation(location1, 50, processSVData);


  function processSVData(data, status) {

    if (status === google.maps.StreetViewStatus.OK) {
      // Console.log("creating panorama");
      // Sets Heading towards the marker.
      var heading = google.maps.geometry.spherical.computeHeading(data.location.latLng, location1);

      panorama.setPano(data.location.pano);
      panorama.setPov(({
        heading: heading,
        pitch: 0
      }));
      panorama.setEnableCloseButton(false);
      panorama.setVisible(true);
    } else {
      console.error("Street View data not found for this location.");
      document.body.innerHTML = '<h1 class="error">Google streetview is having problems 😞,' +
                              ' try checking your internet connection!</h1>';
      alert("Street View data not found for this location.");
    }
  }
}


function getFsquare(i) {


  var url ="https://api.foursquare.com/v2/venues/search?client_id=" +
        "0S31I3U3UEVGLMZQGWKHQFRYQK3LQE5QFS3JST0CYH21JHNI" +
        "&client_secret=4FHP5OA4OKC03WV3EJYEGNNISZQIEXJRJC5EWMDN14N3H2YV" +
        "&v=20130815" + "&ll=" + locations()[i].location.lat + "," +
        locations()[i].location.lng + "&query=\"" + locations()[i].title + "\"&limit=1";

  // Gets foursquare data and adds it to fsqInfo variable that gets inserted into the infowindow
  $.getJSON(url)
    .done(function(response){
      fsqInfo = "<p>Foursquare info:<br>";
      var venue = response.response.venues[0];
       console.log(response);
      /*console.log("venue name =" + venue.name + "<br>venu ID = "
       + venue.id + "<br>venu address = " + venue.location.formattedAddress +
       " veneu website " + venue.url + "venu tips" + venue.stats.tipCount);*/
      var venueID = venue.id;

      /* Check if foursquare values are available and if they are add them to the fsqInfo variable
      that gets sent to the active infoWindow.*/
      var venueName = venue.name;
      if (venueName !== null && venueName !== undefined){
          fsqInfo = fsqInfo + "Name: " +
              venueName + "<br>";
      }
      // Phone number
      var phoneNum = venue.contact.formattedPhone;
      if (phoneNum !== null && phoneNum !== undefined){
          fsqInfo = fsqInfo + "Phone: " +
              phoneNum + "<br>";
      }
      // Address
      var address = venue.location.formattedAddress;
      if (address !== null && address !== undefined){
          fsqInfo = fsqInfo + "Address: " +
              address + "<br>";
      }
      // CanonicalUrl
      fsqInfo = fsqInfo + "Link to Foursquare site: " +
              "<a href ='https://foursquare.com/venue/" + venueID + "'>Foursquare Site</a><br>";
      // Url
      if (venue.url !== null && venue.url !== undefined){
          fsqInfo = fsqInfo + "website: <a href='" +
              venue.url + "'>" + venue.url + "</a><br>";
      } else {
        fsqInfo = fsqInfo + "Website: No website.";
      }
      // Get tipcount and if there are tips get tips info.
      var tipCount = venue.stats.tipCount;
      if (tipCount > 0) {
          getFsqTips(venueID, tipCount, i);
          document.getElementById("fsqData").innerHTML = fsqInfo;
          // Reopen to auto adjust info window size to all content.
          infowindow.open(map, markers[i]);

      } else {
         fsqInfo = fsqInfo + "<br><hr>There are no tips to display.<hr>";
         document.getElementById("fsqData").innerHTML = fsqInfo;
        // Reopen to auto adjust info window size to all content.
         infowindow.open(map, markers[i]);
      }
    })
    .fail(function(){
      console.log("Fouresquare failed to load.");
      document.body.innerHTML = '<h1 class="error">Foursquare is having problems 😞,' +
                              ' try checking your internet connection!</h1>';
      alert("Fouresquare request failed to load, try checking your internet connection.");
    });
}

function getFsqTips(venueID, tipCount, i){

  var url ="https://api.foursquare.com/v2/venues/" + venueID + "/tips" +
        "?client_id=0S31I3U3UEVGLMZQGWKHQFRYQK3LQE5QFS3JST0CYH21JHNI" +
        "&client_secret=4FHP5OA4OKC03WV3EJYEGNNISZQIEXJRJC5EWMDN14N3H2YV" +
        "&v=20130815";

  $.getJSON(url)
    .done(function(response){
      fsqInfo = fsqInfo + "<hr><br>Tips: <ul>";
      for(var d=0;d<tipCount;d++){
          fsqInfo = fsqInfo + "<li>" +
              response.response.tips.items[d].text + "</li>";
      }

      fsqInfo = fsqInfo + "</ul></p>";
      document.getElementById("fsqData").innerHTML = fsqInfo;
      // Reopen to auto adjust info window size to all content.
      infowindow.open(map, markers[i]);
    })
    .fail(function(){
      document.body.innerHTML = '<h1 class="error">Foursquare is having problems 😞,' +
                              ' try checking your internet connection!</h1>';
      alert("Fouresquare tips failed to load.");
    });
}


function screenMapSize(){
if ($(window).height() < 730) {
     map.setZoom(16);
  }
  if ($(window).width() < 930) {
     map.setZoom(16);
  }
}
$(window).resize(function() {
  if ($(window).height() < 730) {
     map.setZoom(16);
  }
  if ($(window).width() < 930) {
     map.setZoom(16);
  }
});

var viewModel = {
  query: ko.observable(""),
};

// Gets an array with the search results
var searchResults = ko.computed(function() {
    var q = viewModel.query().toLowerCase();

    return locations().filter(function(i) {
      return i.title.toLowerCase().indexOf(q) >= 0;
    });

});

// Hide and show markers if they are on the search list.
function search() {

  // By setting "setMap" to null you remove all markers from the map.
  for(var e=0;e<markers.length;e++){
    markers[e].setMap(null);
  }
  /* Set search results markers "setMap" function to "map" and the markers in the search
   appear on the map */
  for(var i=0;i<searchResults().length;i++){
    var temp = locations().indexOf(searchResults()[i]);
    /* The arrays are similarly loaded in position so I can use locations to run the search and
     then use markers array to set the "setMap" function */
    markers[temp].setMap(map);
    // Sets the center of the map according to search results
    if(viewModel.query() === ""){
      infowindow.close();
      map.setCenter({lat: -34.1172625, lng: 18.827619});
      /* I was not sure if this function would lose me points so I left it in comments
        it resets the map center on the searched item but if you are still typing it can
        jump to only one option and thus it can lead you to the option that you are not
        searching for.*/
     /*} else {
       map.setCenter(markers[temp].getPosition());
     };*/
    }
  }
}

ko.applyBindings(viewModel);




