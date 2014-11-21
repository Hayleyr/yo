var map = L.map('map')
	.setView([40.7109417, -74.0061738], 11);


//set up basemap tiles from mapbox
L.tileLayer('http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png', {
    maxZoom: 18
}).addTo(map);








//load external geoJSON
$.getJSON('heat.geojson',function(data){
			console.log(data);
			window.data = data;
	var geojsonLayer = L.geoJson(data.features, {

    //onEachFeature: makeMarkers,
    pointToLayer: function (feature, latlng) {
				return L.circleMarker(latlng, {
					radius: 4,
				
					color: "#000",
					weight: 1,
					opacity: 1,
					fillOpacity: 0.8,
					fillColor: getColor(feature.properties["Days Open"])
				});
			}
  }).addTo(map);

	function getColor(d) {			return d > 40 ? '#08306b' :
			       d > 30  ? '#3182bd' :
			       d > 20 ? '#6baed6' :
			       d > 10  ? '#bdd7e7' :
			       d > 1   ? '#eff3ff' :
			       	                  '#eff3ff';
		

			   
		
		}

		var legend = L.control({position: 'topleft'});

		legend.onAdd = function (map) {

			var div = L.DomUtil.create('div', 'info legend'),
				grades = [0, 10, 20, 30, 40],
				 labels = ['<strong> Days Without Heat </strong>'],
				from, to;

			for (var i = 0; i < grades.length; i++) {
				from = grades[i];
				to = grades[i + 1];

				labels.push(
					'<i style="background:' + getColor(from + 1) + '"></i> ' +
					from + (to ? '&ndash;' + to : '+'));
			}

			div.innerHTML = labels.join('<br>');
			return div;
		};

		legend.addTo(map);








});
