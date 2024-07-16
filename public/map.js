mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map", // container ID
  center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 9, // starting zoom
});

// Create a default Marker and add it to the map.
const marker1 = new mapboxgl.Marker().setLngLat(coordinates).addTo(map);

marker1.getElement().addEventListener("click", function () {
  map.flyTo({
    center: coordinates, // Center of the map [lng, lat]
    zoom: 15, // Zoom level
    essential: true, // This animation is considered essential with respect to prefers-reduced-motion
  });
});
