import React, { useState, useEffect } from "react";
import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./component/InfoBox";
import Map from "./component/Map";
import Table from "./component/Table";
import LineGraph from "./component/LineGraph";
import { sortData } from "./component/utilities.js";
import { plusAdd } from "./component/utilities.js";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setcountries] = useState([]);
  const [country, setcountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: 23.684994,
    lng: 90.356331,
  });
  const [mapZoom, setMapZoom] = useState(5);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("deaths");

  // useEffect = run a pice of code
  // based on condition

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, //United States
            value: country.countryInfo.iso2, //US
          }));
          let sortedData = sortData(data);
          setTableData(sortedData);
          setcountries(countries);
          setMapCountries(data);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setcountry(countryCode);
        // All of the data from the country response
        setCountryInfo(data);
        countryCode !== "worldwide"
          ? setMapCenter([data.countryInfo.lat, data.countryInfo.long])
          : setMapCenter(mapCenter);
        setMapZoom(4);
      });
  };

  console.log("Country Info", countryInfo);

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1 className="display-4 ">
            <i class="fas fa-virus text-danger"></i>{" "}
            <b>
              Covid -
              <span className="text-danger">
                <i class="fas fa-lungs-virus"></i>-19
              </span>
            </b>
          </h1>

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
          <InfoBox
            isRed
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            title="CoviD Cases"
            cases={plusAdd(countryInfo.todayCases)}
            total={plusAdd(countryInfo.cases)}
          />
          <InfoBox
            isRed
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={plusAdd(countryInfo.todayDeaths)}
            total={plusAdd(countryInfo.deaths)}
          />
          <InfoBox
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={plusAdd(countryInfo.todayRecovered)}
            total={plusAdd(countryInfo.recovered)}
          />
        </div>

        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>

      <Card className="app__right">
        <CardContent>
          <h6 className="text-center bg-light text-dark">
            Total Cases By Country
          </h6>
          <Table countries={tableData} />
          <h6 className="text-center bg-light text-dark my-4">
            Last 120 Days' new {casesType}
          </h6>
          <LineGraph className="app__graph" casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
