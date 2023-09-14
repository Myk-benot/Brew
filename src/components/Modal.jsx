import React from "react";

export default function Modal({ onClose, brewery, onAddBrewery }) {
  const breweryAddress =
    brewery.address_1 +
    ", " +
    brewery.city +
    ", " +
    brewery.state +
    " " +
    brewery.postal_code;

  const mapUrl = `http://maps.google.com/?q=${encodeURIComponent(
    breweryAddress
  )}`;

  const formattedAddress = `${brewery.address_1} ${brewery.city} ${brewery.state} ${brewery.postal_code}`;

  const addBrewery = () => {
    alert(brewery.name + " has been added to your brewery list");
    onAddBrewery(brewery);
    onClose();
  };

  return (
    <div
      id="modal "
      class="flex items-center justify-center absolute z-10 left-0 top-0 right-0 bottom-0 w-full h-full bg-amber-100"
    >
      <div
        id="modal-content"
        class="text-white bg-amber-900 rounded-md p-12 opacity-100"
      >
        <h2 class="text-2xl">{brewery.name}</h2>
        <p class="text-lg">{brewery.brewery_type}</p>
        <p class="text-lg">{brewery.country}</p>
        <p class="text-lg">{brewery.phone}</p>
        <a
          href={mapUrl}
          rel="noopener noreferrer"
          target="_blank"
          aria-label="Brewery address"
          class="hover:text-orange-500"
        >
          {formattedAddress}
        </a>
        <br />
        <a href={brewery.website_url} target="_blank">
          {brewery.website_url}
        </a>
        <br />
        <div class="flex justify-around">
          <button
            onClick={onClose}
            class="bg-white text-black p-2 rounded-md font-bold hover:bg-amber-200"
          >
            Close
          </button>
          <button
            onClick={addBrewery}
            class="bg-white text-black p-2 rounded-md font-bold hover:bg-amber-200"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
