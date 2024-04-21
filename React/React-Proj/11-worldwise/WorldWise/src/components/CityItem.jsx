import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function CityItem({ city }) {
  const { cityName, emoji, date, id, position } = city;
  return (
    <li>
      {/* placing a slash will start it from the base url, simple var will just add global state -> accessed from each compo works with out param also*/}
      <Link
        className={styles.cityItem}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        {/* html time element */}
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deletBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
