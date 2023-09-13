import React from "react";

export default function BeerList({ breweries }) {
  return (
    <div>
      <h2>List of Breweries</h2>
      <ul>
        {breweries.map((brewery, index) => (
          <li key={index}>
            {brewery.name} - {brewery.brewery_type}
          </li>
        ))}
      </ul>
    </div>
  );
}
