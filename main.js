const btn = document.querySelector(".btn");
let map

function getMaps() {
  return fetch(`https://geo.ipify.org/api/v1?apiKey=at_2J51hbyWtQkOvCX6PRzCxdiCbl1lK`, {
      method: 'GET'
  }) 
    .then(res => res.json())
    .then(function(data) {

      const {
        lat, 
        lng
      } = data.location;
    
      map = L.map("map").setView([lat,lng], 13);
      
      L.marker([lat, lng]).addTo(map);

      L.tileLayer("https://api.mapbox.com/styles/v1/ipinn/ckizms9bb7ud719qkfeibd5tw/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaXBpbm4iLCJhIjoiY2tpem16azBwMmswNzJzbjRpYjV6amNmMiJ9.-kLfqnUk5UQk37MBNjXWlg&ipAddress=8.8.8.8", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        tileSize: 256,
      }).addTo(map);

      result(data)
    })
}


getMaps()
function result(data) {
  document.querySelector('.address').innerHTML = data.ip; 
  document.querySelector(".location").innerHTML = `${data.location.city}, ${data.location.country}`;
  document.querySelector(".timezone").innerHTML = data.location.timezone;
  document.querySelector('.isp').innerHTML = data.isp; 
}



btn.addEventListener("click", function(e) {
  e.preventDefault()

  const input = document.querySelector(".input");
  const inputData = input.value;
  getAddress(inputData);
  input.value = '';
  }
)

function getAddress(ip) {
  const apiUrl = "https://geo.ipify.org/api/v1?"
  const apiKey = "apiKey=at_2J51hbyWtQkOvCX6PRzCxdiCbl1lK";
  return fetch(`${apiUrl}${apiKey}&domain=${ip}`,{
    method: "GET"
  })
    .then(res => {
      if(res.status != 200) {
        alert("domain yang anda masukkan salah")
      } else {
        return res.json();
      }
    })
    .then (data => {
      const{
        lat,
        lng
      } = data.location

      L.marker([lat, lng]).addTo(map);

      map.panTo(new L.LatLng(lat, lng))
      result(data)
    })
    .catch(error => console.log(error))
}

    
