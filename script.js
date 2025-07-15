/************ Crea mapa ****************/
var map = L.map('map').setView([40.408072, -3.676729], 5);

/*************** Añadir estilo al mapa *************/
var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
}).addTo(map);

/***************** Agregar marcador y popup de prueba ***************/
const marker = L.marker([40.41, -3.6838])
.bindPopup('Flores')
.addTo(map);

const popup = L.popup()
    .setLatLng([40.415, -3.6837])
    .setContent("El parque mas bonito")
    .openOn(map);

/***************** Ejercicio terremotos mapa 1 **************/
async function getData(){
    try{
        const res= await fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson");

        const data = await res.json();
        return data.features;
    }
    catch (error) {
    console.error('Hubo un problema con la solicitud:', error.message);
    }
}
/************* Funcion para color por magnitud ***************/
  function pintarColores(num) {
        if(num < -0){
            return 'cadetblue';
        } else if(num >= 0 && num < 1){
            return 'blue';
        } else if(num >= 1 && num < 2){
            return 'green';
        } else if(num >= 2 && num < 3){
            return 'darkgreen'
        } else if(num >= 3 && num < 4){
            return 'orange';
        } else if(num >= 4 && num < 5){
            return 'red';
        } else if(num >= 5 && num < 6){
            return 'darkred';
        } else if(num >= 6 && num < 7){
            return 'purple';
        } else {
            return 'darkpurple';
        }
    }
/****************** Pintar mapa 1 ****************/
getData().then(data => {
    
    console.log(data);
    //Agregar marcador

    data.map(pin => {
        //Tratamiento de datos
        // [lat,lon]
        const coordinates_pin = [pin.geometry.coordinates[1],pin.geometry.coordinates[0]];
        console.log(coordinates_pin);
        const fechaTerremoto = new Date(pin.properties.time);

        // Representación de datos
        var colorMarker = L.AwesomeMarkers.icon({
            markerColor: pintarColores(pin.properties.mag)
        });

        const marker = L.marker(coordinates_pin, {icon: colorMarker})
        .bindPopup(`Titulo:${pin.properties.title}<br>
            Fecha:${fechaTerremoto}<br>
            Ubicación:${pin.properties.place}<br>
            Código:${pin.properties.code}
            Magnitud:${pin.properties.mag}`)
        .addTo(map);
    })
});
/******************** Validacion filtro ******************/
/***************** Terremotos mapa 2 ****************/
// async function getFilteredData(){
//     try{
//         const res= await fetch("");

//         const data = await res.json();
//         return data.features;
//     }
//     catch (error) {
//     console.error('Hubo un problema con la solicitud:', error.message);
//     }
// }
/***************** Pintar mapa 2 *****************/
// Borrar marcadores: clearLayers()