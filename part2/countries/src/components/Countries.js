import CountryDetails from "./CountryDetail";

const Countries = ({ countries, setFilteredCountries }) => {
  if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />;
  } else if (countries.length > 10) {
    return "Too many matches, specify another filter";
  } else {
    return (
      <div>
        {countries.map((country) => (
          <p key={country.name.official}>
            {country.name.common}
            <button
              onClick={() => {
                setFilteredCountries([country]);
              }}
            >
              show
            </button>
          </p>
        ))}
      </div>
    );
  }
};

export default Countries;
