// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import { useEffect, useState } from "react";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { DatePicker } from "react-date-picker"; // use compo's u need from npm
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL1 = "https://api.bigdatacloud.net/data/reverse-geocode-client?";

function Form() {
  const [cityName, setCityName] = useState("");
  const { createCity, isLoading } = useCities();
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false); // cuz global have the isLoading state
  const [errorGeocoding, setErrorGeocoding] = useState("");
  const [emoji, setEmoji] = useState();
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    if (!date || !cityName) return;
    // id is created by json server

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    await createCity(newCity); // returns promise
    navigate("/app/cities");
  }

  useEffect(
    function () {
      if (!lat && !lng) return; // if (on url there's no lat lang) -> Think about all data possibilities
      async function getCityData() {
        try {
          setErrorGeocoding("");
          setIsLoadingGeocoding(true);
          const res = await fetch(
            `${BASE_URL1}latitude=${lat}&longitude=${lng}`
          );

          const data = await res.json();
          if (!data.countryCode)
            throw new Error(
              "That doesn't seem to be a country. Click somewhere else"
            );
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setErrorGeocoding(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      getCityData();
    },
    [lat, lng]
  ); // won't go into the context cuz not required

  // if it throws error what should it render
  if (errorGeocoding) return <Message message={errorGeocoding} />;

  if (isLoadingGeocoding) return <Spinner />;

  if (!lat && !lng) return <Message message="Start by Clicking Somewhere" />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={onSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          value={date}
          dateFormat="dd/mm/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
