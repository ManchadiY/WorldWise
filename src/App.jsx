import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Homepage from "./pages/Homepage";
import Product from "./pages/product";
import AppLayout from "./pages/AppLayout";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import CityList from "./component/CityList";
import { useEffect, useState } from "react";
import CountryList from "./component/CountryList";
import City from "./component/City";

function App() {
  const [cities, setCities] = useState([]);
  const [isloading, setIsloading] = useState(false);

  const BASE_URL = `http://localhost:8000`;

  useEffect(
    function () {
      async function fetchcities() {
        try {
          setIsloading(true);
          const res = await fetch(`${BASE_URL}/cities`);
          const data = await res.json();
          setCities(data);
          console.log(data);
        } catch (error) {
          alert(`there was an error loading data`);
        } finally {
          setIsloading(false);
        }
      }
      fetchcities();
    },
    [BASE_URL]
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="app" element={<AppLayout />}>
          <Route
            path="cities"
            element={<CityList cities={cities} loading={isloading} />}
          />
          <Route path="cities/:id" element={<City />} />
          <Route
            path="countries"
            element={<CountryList cities={cities} loading={isloading} />}
          />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
