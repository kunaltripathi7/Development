import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react"; // just for convention seperate imports for 3rd party libs

import Homepage from "./pages/Homepage.jsx";
import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing.jsx";
import Login from "./pages/Login.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import CityList from "./components/CityList.jsx";
import CountryList from "./components/CountryList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";

const BASE_URL = "http://localhost:8000/";

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function getCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}cities`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    getCities();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="app" element={<AppLayout />}>
          {/* default route if no subroute || declarative way , useNavigate imperative way \\ works just like forwarding, Specifying replace: true will cause the navigation to replace the current entry in the history stack instead of adding a new one (starts a fresh one)*/}
          <Route index element={<Navigate replace to="cities" />} />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          {/* id is the params name which will get in the obj */}
          <Route path="cities/:id" element={<City />} />
          <Route
            path="countries"
            element={<CountryList isLoading={isLoading} cities={cities} />}
          />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// entry point

// npm install eslint vite-plugin-eslint eslint-config-react-app --save-dev
// .eslintrc.json -> {extends : "react-app"}
// add to vite.config.js

// problem -> show different compo and page structure on clicking some link || Solution : React router -> declarative way, url sync with ui, makes it ezpz than conditional rendering
// its basically conditional rendering || * for not found

// if gotta show something in all pages include it in the app compo at first

// navlink provides class='active' to style diff in css || link instead of anchor

// css modules : adds an id to last to avoid clashes with same classnames

// .global(.test) to make a global class. Why it doesn't apply to others? cuz of the id attached during export

// .nav :global(.active) class styling use otherwise id is attached.

//assets folder -> bundling webpack, imported into js || public for static assets
