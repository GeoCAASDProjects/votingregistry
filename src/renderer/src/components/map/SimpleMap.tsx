import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent, useMapEvents, FeatureGroup, Polygon, LayersControl } from 'react-leaflet';
import classes from "./simpleMap.module.css";
import L, { DivOverlay, latLng } from 'leaflet';
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from 'react';
import SearchBar from '../searchBar/SearchBar';
import { Check, Close } from '@mui/icons-material';
import Button from '../button/Button';
import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css"
import { getAddress, searchAddress } from '@renderer/util/http/map_token';

type Position = [number, number];
export default function SimpleMap({ enclosures, sectors, actionState, onMarkerClick, currentEnclosure, currentSector, openForm, openFormSector, onPolygonClick, area, edit }): JSX.Element {

  const { BaseLayer, Overlay } = LayersControl;
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

  const _created = (e) => console.log(e);

  const featureGroupRef = useRef(null);

  function handleCreated(e) {

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

  function openEnclosureForm() {
    openForm({ ...marker, address: address })
  }

  const getAllPolygonCoordinates = () => {
    const layers = featureGroupRef?.current?.getLayers();
    const allCoordinates = layers.map((layer) => {
      if (layer instanceof L.Polygon) {
        return layer.getLatLngs()[0].map((latLng) => [latLng.lat, latLng.lng])
      }
      return null
    }).filter(Boolean);

    openFormSector(allCoordinates);
  }

 
 
    let polygon= area ?? [];
/*
    useEffect(()=>{
      setPolygon(area);
     alert("Area change")
    },[area])*/
    const _onCreated = (e) => {
      const { layerType, layer } = e;
      if (layerType === 'polygon') {
        // Do something with the polygon layer
       polygon = layer.getLatLngs()[0];
      }
    };
  
    const _onEdited = (e) => {
      alert("Editing")
      const { layers } = e;
      layers.eachLayer((layer) => {
        // Do something with the edited layer
        polygon = layer.getLatLngs()[0];
      });
    };
 
    const _onEditVertex = (e) => {
     console.log(e)
    
        //polygon = layer.getLatLngs()[0];
      
    };

    
    const handleEditMove = (e) => {
      console.log('Layer moved:', e.layer);
      // Handle the moved layer
    };
 
  
  return (
    <div className={classes["map"]}>
      {<div className={`${classes["searchbar"]} ${actionState == "location" && classes["active"]}`}>
        <SearchBar searchDataFunction={searchDataFunction} selectSearch={selectSearch} style={{ margin: 0, width: "50%" }} />
      </div>
      }
      {<div className={`${classes["confirm-button"]} ${(actionState == "location" || actionState == "drawPolygon") && classes["confirm-active"]}`} >
        <Button onClick={actionState == "location" ? openEnclosureForm : actionState == "drawPolygon" ? getAllPolygonCoordinates : () => { return }} className={classes["button-styling"]}><Check /></Button>

      </div>
      }


      <MapContainer center={position} zoom={13} ref={mapRef} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {(actionState == "sectorCreateForm" || actionState == "sectorEditForm" || actionState == "drawPolygon") && 
        <FeatureGroup ref={featureGroupRef}>
          {actionState == "drawPolygon" && <EditControl position="topright"
       
           onCreated={_onCreated}
           onEdited={_onEdited}
           onEditVertex={_onEditVertex}
            draw={{
              polyline: false,
              rectangle: false,
              circle: false,
              circlemarker: false,
              marker: false,
              polygon: true
            }} />}
 {polygon.length>0 && currentSector &&   <Polygon positions={polygon} />}
        </FeatureGroup>}
        <SetZoomControlPosition position="bottomright" />
        {position && <UpdateMapCenter position={position} />}
        <MapClickHandler />
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
        {(actionState !== "drawPolygon" && actionState !== "location") && <LayersControl position="topright">
          <Overlay checked name="Recintos">
            <FeatureGroup>
              {
                !!enclosures && enclosures.data.map(
                  (enclosure) => {
                    return (actionState == "" || enclosure.id == currentEnclosure) && <Marker
                      key={enclosure.id}
                      icon={currentEnclosure == enclosure.id ? purpleIcon : blueIcon}
                      eventHandlers={{ click: () => ClickOnMarker(enclosure) }}
                      position={[enclosure.latitude, enclosure.longitude]}
                    />
                  }
                )
              }
            </FeatureGroup>

          </Overlay>

          <Overlay checked name="Sectores">
            <FeatureGroup>

              {
                !!sectors && sectors.data.map((sector) => {
                  return (actionState == "" || sector.id == currentSector) && <Polygon
                    pathOptions={
                      {
                        color: (sector.id == currentSector) ? "purple" : "blue"
                      }
                    }
                    key={sector.id}
                    eventHandlers={{ click: () => onPolygonClick(sector?.id) }}
                    positions={sector.nodes.map((node) => [node.latitude, node.longitude])}
                  />
                })


              }
            </FeatureGroup>

          </Overlay>

        </LayersControl>
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