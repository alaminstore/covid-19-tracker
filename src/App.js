import React, { useState, useEffect } from "react";
import "./App.css";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import InfoBox from "./component/InfoBox";
import Map from "./component/Map";

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

  const onCountryChange = (event) => {
    const countrycode = event.target.value;
    //console.log("Test.....", countrycode);
    setcountry(countrycode);
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h2>Covid-19 tracker</h2>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem key={country.name} value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__starts">
          <InfoBox title="Cororavieus Cases" cases={123} total={2000} />
          <InfoBox title="Recovered" cases={1234} total={4000} />
          <InfoBox title="Deaths" cases={12345} total={50000} />
        </div>

        <Map />
      </div>

      <div className="app__right">
        {/* Table */}
        {/* Graph */}
      </div>
    </div>
  );
}

export default App;
