const btn = document.querySelector(".btn");


function maps(data) {
  let lat  = data.location.lat;
  let lng = data.location.lng; 
  const map = L.map("map").setView([lat ,lng], 13);
  L.tileLayer("https://api.mapbox.com/styles/v1/ipinn/ckizms9bb7ud719qkfeibd5tw/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaXBpbm4iLCJhIjoiY2tpem16azBwMmswNzJzbjRpYjV6amNmMiJ9.-kLfqnUk5UQk37MBNjXWlg", {
    zoom: 1
  }).addTo(map);
      
  L.marker([lat, lng]).addTo(map);
}


btn.addEventListener("click", function(event) {
  event.preventDefault()

  const input = document.querySelector(".input");
  return fetch(`https://geo.ipify.org/api/v1?apiKey=at_2J51hbyWtQkOvCX6PRzCxdiCbl1lK&ipAddress=8.8.8.8&domain=${input.value}`, {
    method: 'GET'
  })
    .then(responese => responese.json())
    .then(function(data) {
      if(input.value === '') {
        console.log('error')
      } 
        maps(data)
        result(data)
        input.value =  '';
    })
    .catch(err => err);
  }
)



    

function result(data) {
  document.querySelector('.address').innerHTML = data.ip; 
  document.querySelector(".location").innerHTML = `${data.location.city}, ${data.location.country}`;
  document.querySelector(".timezone").innerHTML = data.location.timezone;
  document.querySelector('.isp').innerHTML = data.isp; 

}



