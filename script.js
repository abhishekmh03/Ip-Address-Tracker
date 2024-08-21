let BASE_URL = "https://geo.ipify.org/api/v2/country,city?apiKey="your api key"&ipAddress="";
let input = document.querySelector(".input");
let btn = document.querySelector(".button");
let ip_o = document.querySelector(".ip-address h4");
let location_o = document.querySelector(".ip-location h4");
let timezone_o = document.querySelector(".ip-timezone h4");
let isp_o = document.querySelector(".ip-isp h4");


var map1 = L.map('map', {
    center: [40.7128, -74.0060], 
    zoom: 13 
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map1);

let marker;

btn.addEventListener("click", async() =>{
    let ip = input.value;
   if(!ip){
    alert("Please enter valid ip.");
    return;
   }
   const url = `${BASE_URL}${ip}`;
   try{
    let response = await fetch(url);
    if(!response.ok){
        throw new console.error(`Ip not found: ${response.statusText}`);     
    }
    let data = await response.json();
    update_data(data);

   }catch(error){
    console.log("ip not found", error);
    alert("Please enter valid ip.")
    
   }
 
});

function update_data(data){
   
    let o_ip = data.ip;
    let o_region = data.location.region;
    let o_city = data.location.city;
    let o_timezone = data.location.timezone;
    let o_isp = data.isp;

    if(o_ip === ""){
        alert("Please enter valid ip")
    }
    else{
        
    ip_o.innerText = `${o_ip}`;
    location_o.innerText = `${o_city},${o_region}`;
    timezone_o.innerText = `${o_timezone}`;
    isp_o.innerText = `${o_isp}`;

    }

    update_map(data);
}

function update_map(data){
    console.log(data);
    let lat = data.location.lat;
    let lng = data.location.lng;
    let o_region = data.location.region;
    let o_city = data.location.city;


    map1.setView([lat,lng], 15);

    if (marker) {
        map1.removeLayer(marker);
    }
   
     marker = L.marker([lat,lng]).addTo(map1);
    
    marker.bindPopup(`<b>${o_city}</b><br>${o_region}`).openPopup();
   
};



