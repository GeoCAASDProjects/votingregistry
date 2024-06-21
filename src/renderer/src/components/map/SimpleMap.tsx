import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent, useMapEvents } from 'react-leaflet';
import classes from "./home.module.css";
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from 'react';
import SearchBar from '../searchBar/SearchBar';
import { Check, Close } from '@mui/icons-material';
import Button from '../button/Button';

type Position = [number, number];
export default function SimpleMap({enclosures, actionState, onMarkerClick, currentEnclosure}): JSX.Element{
   
    const mapRef = useRef(null)

   
    const [position, setPosition] = useState<Position>([0, 0]);

    useEffect(() => {
      if (navigator.geolocation) {
      try{
    
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
       
        console.log(latitude, longitude);
        setPosition([latitude, longitude]);
       
      });
    } catch(error){
      alert(error);
    } 
  } else{
    alert("Geolocation is not supported by this browser.")
    }
    
    }, []);

    interface MarkerPosition {
      lat: number;
      lng: number;
  }
  
    const [marker, setMarker] = useState<MarkerPosition | null>(null);
    const MapClickHandler = ()=>{
      
      useMapEvents({
        click: (e) => {
          const {lat, lng} = e.latlng;
          setMarker({lat:lat, lng: lng});
        }
      });
      return null;
    }
 
    const ClickOnMarker =(data)=>{
      onMarkerClick(data.id);
      setPosition([data.latitude, data.longitude])
    }
    const purpleIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    
    const blueIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    return ( 
      <div style={{ width: '100%', height: '100%' }}>
      {<div  style={{position: "absolute", display:"flex", justifyContent:"center", alignItems:"center", alignContent:"center", width: "100%", zIndex: 999, top: actionState=="location" ? 0 :-30, opacity: actionState=="location" ? 1:0, transition:".4s ease-in-out"}}>
        <SearchBar style={{margin:0, width: "50%"}}/>
        </div>
        }
             {<div  style={{position: "absolute", display:"flex", justifyContent:"center", alignItems:"center", alignContent:"center", width: "100%", zIndex: 999, bottom: actionState=="location" ? 30 :-30, opacity: actionState=="location" ? 1:0, transition:".4s ease-in-out"}}>
       <Button  style={{padding: 5, borderRadius: "50%", backgroundColor:"purple", color:"white"}}><Check/></Button>
    
        </div>
        }
       
        <MapContainer center={position} zoom={13} ref={mapRef} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SetZoomControlPosition position="bottomright"/>
        {position && <UpdateMapCenter position={position}/>}
        <MapClickHandler/>
        {marker && <Marker position={[marker.lat, marker.lng]}>
        <Popup>
             {`Longitud: ${marker.lng.toFixed(2)}, Latitud: ${marker.lat.toFixed(2)}`}
            </Popup>
          </Marker>}
        {position && (
          <Marker position={position}>
            <Popup>
              You are here: {`${position[0]}, ${position[1]}`}
            </Popup>
          </Marker>
        )}
        {
          !!enclosures && enclosures.data.map((enclosure)=>
        { return !actionState && <Marker key={enclosure.id} icon={currentEnclosure==enclosure.id ? purpleIcon : blueIcon} eventHandlers={{click:()=>ClickOnMarker(enclosure)}} position={[enclosure.latitude, enclosure.longitude]}/>}
        )
        }
      </MapContainer>
      </div>
    )
}

interface UpdateMapCenterProps{
  position: Position;
}
 function UpdateMapCenter(props:UpdateMapCenterProps){

  const map = useMap();
  const {position} = props;
  useEffect(()=>{
   
    if(position){
      map.setView(position, map.getZoom());
      
    }
  }, [map, position]);

  return null;

}

const SetZoomControlPosition= ({position})=>{
  const map = useMap();
  map.zoomControl.setPosition(position);
  return null;
}