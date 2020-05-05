import React ,{useState, useEffect} from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
//const https =require('https');


import L,{Icon} from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')

});





function Map_container(){
  const [meter,setMeter] = useState([]);
  const position = [34.057219, -118.268751];
  const [fetchData,setFetchData]=useState(0);
  var greenIcon = new Icon({
      iconUrl: require('./newGreen.png'),
    //  shadowUrl: require('green.jpeg'),

       iconSize:     [5, 5], // size of the icon
      // shadowSize:   [50, 64], // size of the shadow
      // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      // shadowAnchor: [4, 62],  // the same for the shadow
      // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });
  var redIcon = new Icon({
      iconUrl: require('./red.png'),
    //  shadowUrl: require('green.jpeg'),

       iconSize:     [5, 5], // size of the icon
      // shadowSize:   [50, 64], // size of the shadow
      // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      // shadowAnchor: [4, 62],  // the same for the shadow
      // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

const map = (
  <Map center={position} zoom={13}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    />
    <Marker position={position} icon={greenIcon}>
      <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
    </Marker>

    {meter.map((m)=>(
    <Marker position={meter.length?[m.LAT,m.LNG]:position} icon={m.OCCUPANCYSTATE=="VACANT"?greenIcon:redIcon}>
      <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
    </Marker>)
  )}
  </Map>
)


  //L.marker(position, {icon: greenIcon}).addTo(map);

  const endpoint='http://localhost:5000';
  var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  // https.get(endpoint,function(response){
  //   response.on('data' function(data){
  //     var status = data.JSON.parse(data);
  //     alert(status.)
  //   })
  // });



  useEffect(()=>{
    async function run(){
      let test = await fetch(endpoint);
      const data =await test.json();//.then((r)=>{
      setMeter(data);
      console.log(meter);
      console.log(data);
      setFetchData(1);
      console.log(fetchData);


    }
    run();
  },[]);

  console.log("hello");

  function rerender(){
    setFetchData(3);
    console.log(meter);
    console.log(fetchData);
  }


  return(
    <div className='map_container'>
      <h1>Los Angeles Parking Meter's Occupancy State</h1>
      {map}
      <button onClick={rerender}>Click to re-renter</button>

    </div>


  )
}

export default Map_container;
