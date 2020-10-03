import React, { useState } from "react";
import "./App.css";
import { MenuItem, FormControl, Select } from "@material-ui/core";

function App() {
  const [countries, setcountries] = useState([
    "USA",
    "UK",
    "INDIA",
    "BANGLADEESH",
  ]);
  //https://disease.sh/v3/covid-19/countries

  useEffect(() => {
 
  }, []);

  return (
    <div className="app">
      <div className="app__header">
        <h2>Covid-19 tracker</h2>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value="abc">
            {countries.map((country) => (
              <MenuItem value="{country}">{country}</MenuItem>
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
