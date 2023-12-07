var lat = 51.505;
var lng = -0.09;
const api_url = "https://geo.ipify.org/api/v2/country,city?apiKey=at_4JHUxLMonVkVdEPSqiNDVUsMjGTKg&ipAddress=";
var map = L.map('map')
var marker = null;

locationMaker(lat , lng);

document.getElementById('ipform').addEventListener('submit', function(e) {
    e.preventDefault();

    let ipAdress = document.getElementById('ipInput').value;

    fetch(api_url+ipAdress).then(Response => Response.json()).then(data => {
        // console.log(data);
        lat = data.location.lat;
        lng = data.location.lng;
        // console.log(lat, lng);
        result(data, ipAdress);
        locationMaker(lat , lng);
    })
})

function locationMaker(lat , lng){
    map.setView([ lat, lng ], 15);

    if(marker){
        map.removeLayer(marker);
    }

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var Icon = L.icon({
        iconUrl: 'images/icon-location.svg',
        // iconSize:     [38, 95], // size of the icon
        iconAnchor:   [19, 95], // point of the icon which will correspond to marker's location
        popupAnchor:  [0, -90]  // point from which the popup should open relative to the iconAnchor
    });

    marker = L.marker([ lat, lng ], { icon: Icon }).addTo(map);
}

function result(data, ipAdd) {
    let isp = data.isp;
    let timeZone = data.location.timezone;
    let city = data.location.city;
    let country = data.location.country;
    let postalcode = data.location.postalCode;

    
    document.getElementById('ipAddress').innerHTML = ipAdd;
    document.getElementById('time').innerHTML = "UTC " + timeZone;
    document.getElementById('location').innerHTML = city + "," + country + " " + postalcode;
    document.getElementById('isp').innerHTML = isp;
}