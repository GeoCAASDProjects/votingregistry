import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent, useMapEvents, FeatureGroup, Polygon } from 'react-leaflet';
import classes from "./home.module.css";
import L, { latLng } from 'leaflet';
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from 'react';
import SearchBar from '../searchBar/SearchBar';
import { Check, Close } from '@mui/icons-material';
import Button from '../button/Button';
import {EditControl} from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css"
import { getAddress, searchAddress } from '@renderer/util/http/map_token';

type Position = [number, number];
export default function SimpleMap({ enclosures, sectors, actionState, onMarkerClick, currentEnclosure, openForm, openFormSector }): JSX.Element {

  const mapRef = useRef(null)

  const [address, setAddress] = useState<string | null>(null);
  const [position, setPosition] = useState<Position>([0, 0]);

  useEffect(() => {
    if (navigator.geolocation) {
      try {

        navigator.geolocation.getCurrentPosition((pos) => {
          const { latitude, longitude } = pos.coords;

          console.log(latitude, longitude);
          setPosition([latitude, longitude]);

        });
      } catch (error) {
        alert(error);
      }
    } else {
      alert("Geolocation is not supported by this browser.")
    }

  }, []);

  interface MarkerPosition {
    lat: number;
    lng: number;
  }

  const [marker, setMarker] = useState<MarkerPosition | null>(null);
  const MapClickHandler = () => {

    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        if (actionState == "location") {
          const newAddress = await getAddress({ lat, lng })
          setAddress(newAddress);
        }

        setMarker({ lat: lat, lng: lng });
      }
    });
    return null;
  }

  const ClickOnMarker = (data) => {
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

 // const [searchSelected, setSearchSelected] = useState<boolean>(false);
  /* const [searchValue, setSearchValue] = useState<string>('');
   const [searchList, setSearchList] = useState([]);
   useEffect(() => {
     setSearchValue(address ?? "")
   }, [address])
 
   const [searchTimeOut, setSearchTimeOut] = useState<NodeJS.Timeout | null>(null);
   const [searchSelected, setSearchSelected] = useState<boolean>(false);
   function inputHandler(e) {
     setSearchSelected(false);
     setSearchValue(e.target.value);
   }
 */

  const searchDataFunction = async (query): Promise<object[]> => {
    const searchData = await searchAddress(query);
    const searchFeatures = searchData?.features;
    if (searchFeatures) {
      const formattedData = searchFeatures.map(location => { return { name: location.place_name, geometry: [location.geometry.coordinates[0], location.geometry.coordinates[1]] } });
      return formattedData;

    } else {
      return [];

    }
  }

  /*
  useEffect(() => {
    if (actionState != "location") return;
    if (searchValue.length == 0) return;
    if (searchTimeOut !== null) {
      clearTimeout(searchTimeOut);
    }


    const timeoutId = setTimeout(async () => {
      const searchData = await searchAddress(searchValue);
      console.log(searchData);
      const searchFeatures = searchData?.features;
      if (searchFeatures) {
        const formattedData = searchFeatures.map(location => { return { name: location.place_name, geometry: [location.geometry.coordinates[0], location.geometry.coordinates[1]] } });


        setSearchList(formattedData)
      } else {
        setSearchList([])
      }


    }, 500)

    setSearchTimeOut(timeoutId);



    return () => clearTimeout(timeoutId);

  }, [searchValue])*/

  function selectSearch(data) {
    const geometry = data.geometry;
    const placeName = data.name;

    setMarker({ lng: geometry[0], lat: geometry[1] });
    setPosition([geometry[1], geometry[0]])
    setAddress(placeName);
 //   setSearchSelected(true);
  }

  const _created = (e)=>console.log(e);

  const featureGroupRef = useRef(null);

  function handleCreated(e){
    
    const layer = e.layer;
    console.log(e)
  }

  /*
  const startPolygonDraw()=> {
    if(editControlRef.current){
      editControlRef.current._toolbars.draw._modes.polygon.handler.enable();
    }
  }*/
    const startPolygonDraw = () => {
      if (featureGroupRef.current) {
        const map = featureGroupRef.current._map;
        const drawControl = new L.Draw.Polygon(map, {});
        drawControl.enable();
      }
    };

    function openEnclosureForm(){
      openForm({ ...marker, address: address })
    }

   const getAllPolygonCoordinates = ()=>{
    const layers = featureGroupRef?.current?.getLayers();
    const allCoordinates = layers.map((layer)=>{
      if(layer instanceof L.Polygon){
        return layer.getLatLngs()[0].map((latLng)=>[latLng.lat, latLng.lng])
      }
      return null
    }).filter(Boolean);
    
    openFormSector(allCoordinates);
   }
  
  return (
    <div style={{ width: '100%', height: '100%' }}>
      {<div style={{ position: "absolute", display: actionState == "location" ? "flex" : "none", justifyContent: "center", alignItems: "center", alignContent: "center", width: "100%", zIndex: 999, top: actionState == "location" ? 0 : -200, transition: ".4s ease-in-out" }}>
        <SearchBar searchDataFunction={searchDataFunction} selectSearch={selectSearch} style={{ margin: 0, width: "50%" }} />
      </div>
      }
      {<div style={{ position: "absolute", display: "flex", justifyContent: "center", alignItems: "center", alignContent: "center", width: "100%", zIndex: 999, bottom:  (actionState == "location" || actionState == "drawPolygon")  ? 30 : -30, opacity: (actionState == "location" || actionState == "drawPolygon") ? 1 : 0, transition: ".4s ease-in-out" }}>
        <Button onClick={actionState=="location" ? openEnclosureForm : actionState=="drawPolygon" ? getAllPolygonCoordinates : ()=>{return}} style={{ padding: 5, borderRadius: "50%", backgroundColor: "purple", color: "white" }}><Check /></Button>

      </div>
      }
 

      <MapContainer center={position} zoom={13} ref={mapRef} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
   <FeatureGroup  ref= {featureGroupRef}>
   {actionState=="drawPolygon" &&   <EditControl position="topright" 
        
          draw={{
          polyline: false,
          rectangle: false,
          circle: false,
          circlemarker: false, 
          marker: false,
          polygon: true
          }}/>}
        </FeatureGroup>
        <SetZoomControlPosition position="bottomright" />
        {position && <UpdateMapCenter position={position} />}
        <MapClickHandler />
        {marker && <Marker position={[marker.lat, marker.lng]}>
          <Popup>
            {`Longitud: ${marker.lng.toFixed(2)}, Latitud: ${marker.lat.toFixed(2)}`}
          </Popup>
        </Marker>}
        
   {/*     <Polygon positions={[[19.209212104327538,-71.38414396861069],[18.83543592841989,-69.67105023406485],[17.415988587482595,-71.86732425271336]]}/>*/}
        {position && (
          <Marker position={position}>
            <Popup>
              You are here: {`${position[0]}, ${position[1]}`}
            </Popup>
          </Marker>
        )}
        {
          !!enclosures && enclosures.data.map((enclosure) => { return (actionState=="" || enclosure.id == currentEnclosure) && <Marker key={enclosure.id} icon={currentEnclosure == enclosure.id ? purpleIcon : blueIcon} eventHandlers={{ click: () => ClickOnMarker(enclosure) }} position={[enclosure.latitude, enclosure.longitude]} /> }
          )
        }
        {
          !!sectors && sectors.data.map((sector)=>{return <Polygon positions={sector.nodes.map((node)=>[node.latitude, node.longitude])}/>})

          
        }
      </MapContainer>
    </div>
  )
}

interface UpdateMapCenterProps {
  position: Position;
}
function UpdateMapCenter(props: UpdateMapCenterProps) {

  const map = useMap();
  const { position } = props;
  useEffect(() => {

    if (position) {
      map.setView(position, map.getZoom());

    }
  }, [map, position]);

  return null;

}

const SetZoomControlPosition = ({ position }) => {
  const map = useMap();
  map.zoomControl.setPosition(position);
  return null;
}