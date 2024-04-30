import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import styles from "./Map.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/geolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
  const { cities } = useCities();
  const [position, setPosition] = useState([40, 0]);
  const [mapLat, mapLng] = useUrlPosition();
  const {
    isLoading: isLoadingPosition,
    getPosition,
    position: geolocationPosition,
  } = useGeolocation();
  useEffect(
    // its a synchronization mech. connecting url state and local state
    function () {
      if (mapLat && mapLng) setPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    // discourged more effects instead could have use SetPosition directly to update but not cuz of custom hook
    function () {
      if (geolocationPosition)
        setPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your Position"}
        </Button>
      )}
      <MapContainer // a func named MapContainer is written in leaflet which accepts these args.
        center={position}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            {/* {position={position}>expects a state} */}
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={position} />
        <DetectClick />
      </MapContainer>
      {/* <h3>
        {lat},{lng}
      </h3>
      <button onClick={() => setSearchParams({ lat: 30, lng: 40 })}>
        Change
  </button>*/}
    </div>
  );
}

// for adding any functionality in the map we need to use compos which are func's run on every render.
function ChangeCenter({ position }) {
  const map = useMap(); // hook provided by leaflet
  map.setView(position);
  return null;
}

function DetectClick() {
  // need lat lng of click -> global state -> url store(state selection)
  const navigate = useNavigate(); // returns a func.
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;

// check the height of element if its not working -> here map height =0,
