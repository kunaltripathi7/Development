import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const navigate = useNavigate(); // returns a func.

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h3>
        {lat},{lng}
      </h3>
      <button onClick={() => setSearchParams({ lat: 30, lng: 40 })}>
        Change
      </button>
    </div>
  );
}

export default Map;
