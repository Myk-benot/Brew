/* eslint-disable jsx-a11y/invalid-dom-property */

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Pagination from "./components/Pagination";
import Tag from "./components/Tag";

function App() {
  const [breweryData, setBreweryData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const { register, handleSubmit, reset } = useForm();

  const [addedBreweries, setAddedBreweries] = useState(() => {
    const savedBreweries = localStorage.getItem("addedBreweries");
    return savedBreweries ? JSON.parse(savedBreweries) : [];
  });

  useEffect(() => {
    localStorage.setItem("addedBreweries", JSON.stringify(addedBreweries));
  }, [addedBreweries]);

  const handleAddBrewery = (addedBrewery) => {
    setAddedBreweries([...addedBreweries, addedBrewery]);
  };

  const handleClearAllBreweries = () => {
    setAddedBreweries([]);
    localStorage.removeItem("addedBreweries");
  };

  const fetchData = async (searchQuery) => {
    try {
      const response = await fetch(
        `https://api.openbrewerydb.org/v1/breweries/search?query=${searchQuery}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.length === 0) {
        setError("No breweries found for the search query.");
      } else {
        setBreweryData(data);
        setError(null);
      }
    } catch (error) {
      setError("Error fetching data: " + error.message);
    }
  };

  const onSubmit = (formData) => {
    const searchQuery = formData.text;
    fetchData(searchQuery);
    reset({ text: "" });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const nextPage = () => {
    if (currentPage < Math.ceil(breweryData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div class="flex flex-col items-center text-red-950 min-h-screen bg-[url('./images/beer.jpg')] bg-cover">
      <div class="mt-4 mb-4 flex flex-col items-center">
        <h3 class="text-2xl font-bold">Search For Beers by Keyword!</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          class=" bg-amber-100 mx-auto flex flex-col items-center mt-4 shadow-2xl w-72 gap-2 p-2 opacity-60 rounded-md"
        >
          <label htmlFor="text" className="text-lg font-bold">
            Search for Breweries:{" "}
          </label>
          <input
            type="text"
            id="text"
            {...register("text")}
            class="bg-gray-200"
          />
          <input
            type="submit"
            value="Search"
            class="bg-amber-950 text-white p-2 rounded-md"
          />
        </form>
      </div>

      {error && <p class="error mt-12">{error}</p>}

      <div class=" flex flex-col gap-16 md:flex-row opacity-60">
        <div class="flex flex-col text-left mt-4 bg-amber-100 p-6 shadow-xl h-128 overflow-auto rounded-md">
          <h2 class="text-2xl font-bold">Search Results:</h2>
          {breweryData.slice(startIndex, endIndex).map((brewery) => (
            <Tag
              key={brewery.id}
              brewery={brewery}
              onAddBrewery={handleAddBrewery}
            />
          ))}
          {breweryData && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(breweryData.length / itemsPerPage)}
              onNextPage={nextPage}
              onPrevPage={prevPage}
            />
          )}
        </div>
        <div class="mt-4 mb-4 bg-amber-100 p-6 shadow-xl rounded-md overflow-auto h-128 ">
          <h2 class="text-2xl font-bold">Added Breweries:</h2>
          <button onClick={handleClearAllBreweries}>Clear All Breweries</button>
          <ul>
            {addedBreweries.map((brewery, index) => (
              <li key={index}>{brewery.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
