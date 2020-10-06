import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

export const sortData = (data) => {
  const sortData = [...data];
  return sortData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

const casesTypeColors = {
  cases: {
    hex: "#c44423",
    rgb: "rgb(196, 68, 35)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 600,
  },
  recovered: {
    hex: "#00b300",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 800,
  },
  deaths: {
    hex: "#a80d2b",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 1000,
  },
};

export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            <sup>Total</sup> Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            <sup>Total</sup> Recovered:{" "}
            {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            <sup>Total</sup> Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));

export const plusAdd = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";
