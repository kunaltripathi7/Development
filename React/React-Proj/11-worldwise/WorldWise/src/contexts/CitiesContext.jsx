import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
/// move all the states and state management logic to context file
const BASE_URL = "http://localhost:8000/";
const CitiesContext = createContext();

const initialState = {
  cities: [],
  error: "",
  isLoading: false,
  currentCity: {},
};
// reducer is a pure func. so no async logic, o/w we need to include the logic in reducer as much as we can.
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded": // convention
      return { ...state, isLoading: false, cities: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    case "city/loaded":
      return { ...state, currentCity: action.payload, isLoading: false };
    case "error":
      return { ...state, error: action.payload };
    default:
      throw new Error("Action Unknown");
  }
}

function CitiesProvider({ children }) {
  const [{ isLoading, error, currentCity, cities }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({}); // global/local -> global -> context || no performance issues in small app thatswhy

  useEffect(function () {
    async function getCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        dispatch({
          type: "error",
          payload: "there was an error in loading cities",
        });
      }
    }
    getCities();
  }, []);

  // placed it here cuz all the func that related to updating the state of cities lives here
  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" }, // tells the content is in json
      });
      const data = await res.json(); // returns with id
      // setCities([...cities, data]); // syncing remote state with ui state || REAct query optimise
      dispatch({ type: "city/created", payload: data });
    } catch (err) {
      dispatch({
        type: "error",
        payload: "there was an error in creating city",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });

    try {
      await fetch(`${BASE_URL}cities/${id}`, {
        method: "DELETE",
      });
      // setCities((cities) => cities.filter((city) => city.id !== id));
      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      dispatch({
        type: "error",
        payload: "there was an error in deleting city",
      });
    }
  }

  // place these functions here for bettter gathering all the functionality at one place
  const getCity = useCallback(
    // why loop if if stmt takes care of it??????
    async function getCity(id) {
      if (Number(id.id) === currentCity.id) return; // no api call if city is same
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}cities/${id.id}/`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch (err) {
        dispatch({
          type: "error",
          payload: "there was an error in loading current city",
        });
      }
    },
    [currentCity.id]
  );

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        getCity,
        currentCity,
        createCity,
        deleteCity,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext used outside CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };

// 2 options with dispatch -> eithere pass dispatch+states and the async 1. func's in the compo -> compo not clean || don't pass dispatch, instead pass func's in which we have used dispatch
// 2. if not include async data -> pass dispatch better. (just for cleaner code) cuz if involved api call can't place in reducer (pure func.) -< will make messy
