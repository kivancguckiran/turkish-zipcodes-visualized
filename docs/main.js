let map;
let mapnik;
let markers;

const fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
const toProjection = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection

window.onload = () => {
	const position = new OpenLayers.LonLat(35.467987, 38.904802).transform(fromProjection, toProjection);
  const zoom = 6; 

	map = new OpenLayers.Map("map");
  mapnik = new OpenLayers.Layer.OSM();
  markers = new OpenLayers.Layer.Markers("Markers");

	map.addLayer(markers);
	map.addLayer(mapnik);
  map.setCenter(position, zoom);

  const input = document.getElementById('pk');
  input.addEventListener("change", (e) => {
    removeMarkers();
    addMarkers(e);
  });
};

const addMarker = (position) => markers.addMarker(new OpenLayers.Marker(position));

const addMarkers = (e) => {
  const pk = e.target.value;
  const matches = locations.filter(loc => loc.pk.startsWith(pk));

  matches.forEach(({ lat, lng }) => addMarker(new OpenLayers.LonLat(lng, lat).transform(fromProjection, toProjection)));
};

const removeMarkers = () => {
  markers.destroy();
  markers = new OpenLayers.Layer.Markers("Markers");
	map.addLayer(markers);
};
