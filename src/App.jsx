import React, { useState } from "react";
import { useForm } from "react-hook-form";
import BeerList from "./components/BeerList";
import Pagination from "./components/Pagination";
import Tag from "./components/Tag";

function App() {
  const [breweryData, setBreweryData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const { register, handleSubmit, reset } = useForm();
  const [showBeerList, setShowBeerList] = useState(false);

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
      <div class="mt-4 flex flex-col items-center">
        <h3 class="text-2xl font-bold">Search For Beers by Keyword!</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          class="mx-auto flex flex-col items-center mt-4 shadow-2xl w-72 gap-2 p-2"
        >
          <label htmlFor="text" class="text-lg font-bold">
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

      {error && (
        <p className="error" class="mt-12">
          {error}
        </p>
      )}

      <a
        onClick={() => setShowBeerList((prevShowBeerList) => !prevShowBeerList)}
      >
        {showBeerList ? "Back to Search Results" : "Show Beer List"}
      </a>

      {showBeerList && <BeerList breweries={breweryData} />}

      <h2 class="text-2xl font-bold mb-4 mt-4">Search Results:</h2>
      {!showBeerList && breweryData.length > 0 && (
        <div class="flex flex-col text-left mt-4 bg-amber-100 p-6 shadow-xl gap-2 h-128 overflow-auto rounded-md">
          {breweryData.slice(startIndex, endIndex).map((brewery) => (
            <Tag key={brewery.id} brewery={brewery} />
          ))}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(breweryData.length / itemsPerPage)}
            onNextPage={nextPage}
            onPrevPage={prevPage}
          />
        </div>
      )}
    </div>
  );
}

export default App;
