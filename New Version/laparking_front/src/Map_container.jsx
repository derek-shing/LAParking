import React ,{Component} from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
//const https =require('https');


import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

function Map_container(){
  const position = [34.057219, -118.268751]
const map = (
  <Map center={position} zoom={13}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    />
    <Marker position={position}>
      <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
    </Marker>
  </Map>
)
  const endpoint='http://localhost:4000';
  var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  // https.get(endpoint,function(response){
  //   response.on('data' function(data){
  //     var status = data.JSON.parse(data);
  //     alert(status.)
  //   })
  // });

  async function run(){
    const test = await fetch(endpoint);
    const data = JSON.parse(JSON.stringify(test));
    console.log(data);
  }
  run();


  return(
    <div className='map_container'>
      <h1>Los Angeles Parking Meter's Occupancy State</h1>
      {map}

    </div>
  )
}

export default Map_container;
