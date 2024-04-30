import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (cities.length === 0)
    // handle every data in compo
    return <Message message="Start by adding new cities" />;
  const countries = [];
  cities.forEach((city) => {
    if (countries.find((country) => country.country === city.country)) return;
    else countries.push({ emoji: city.emoji, country: city.country });
  });

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} /> // key prop on compo instead of li
      ))}
    </ul>
  );
}

export default CountryList;
