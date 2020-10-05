import React from "react";
import numeral from "numeral";
import "./Table.css";

function Table({ countries }) {
  return (
    <div className="Table">
      {countries.map(({ country, cases }) => (
        <tr>
          <td>{country}</td>
          <td>
            {/* <b>{cases}</b> */}
            <b>{numeral(cases).format("0,0")}</b>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
