var x = document.getElementById("geo_demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPositionWithMap);
    } else {
        x.innerHTML = "Geolocation не підтримується";
    }
}

function showPositionWithMap(position) {
    x.innerHTML = "Широта: " + position.coords.latitude +
        "<br>Довгота: " + position.coords.longitude;
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // initialize map
    map = L.map('map_div').setView([latitude, longitude], 13);
    // set map tiles source
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18,
    }).addTo(map);
    // add marker to the map
    marker = L.marker([latitude, longitude]).addTo(map);
    // add popup to the marker
    marker.bindPopup("<b>Ваше розташування.</b>").openPopup();
}