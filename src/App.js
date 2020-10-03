import React, { useState, useEffect } from "react";
import "./App.css";
import { MenuItem, FormControl, Select } from "@material-ui/core";

function App() {
  const [countries, setcountries] = useState([]);
  const [country, setcountry] = useState("worldwide");

  // useEffect = run a pice of code
  // based on condition
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, //United States
            value: country.countryInfo.iso2, //US
          }));
          setcountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countrycode = event.target.value;
    //console.log("Test.....", countrycode);
    setcountry(countrycode);
  };

  return (
    <div className="app">
      <div className="app__header">
        <h2>Covid-19 tracker</h2>
        <FormControl className="app__dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem key={country.name} value={country.value}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* header */}
      {/* title+select input dropdown field*/}

      {/* InfoBoxs*/}
      {/* InfoBoxs*/}
      {/* InfoBoxs*/}

      {/* Table->list of all country wise */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
