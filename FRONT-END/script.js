//##View
var map = L.map("map").setView([-6.41766, 106.804962], 11);

//##tileLayer
var tiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 14,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

//##marker
var marker = L.marker([-6.440859, 106.772175]).addTo(map);

//##circle
var circle = L.circle([-6.397872, 106.802044], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 399,
}); //.addTo(map);

//##polygon
var polygon = L.polygon([
  [-6.405634, 106.8117],
  [-8.374562, 115.125732],
  [51.51, -0.047],
]); //.addTo(map);

//##popup
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");

var popup = L.popup();

const onMapClick = (event) => {
  popup
    .setLatLng(event.latlng)
    .setContent("coordinates " + event.latlng.toString())
    .openOn(map);
};

map.on("click", onMapClick);
