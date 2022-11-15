import { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import Countries from "./components/Countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilter = (event) => {
    const input = event.target.value;
    setQuery(input);
    setFilteredCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  return (
    <div>
      <Filter handleFilter={handleFilter} query={query} />
      <Countries
        countries={filteredCountries}
        setFilteredCountries={setFilteredCountries}
      />
    </div>
  );
}

export default App;
