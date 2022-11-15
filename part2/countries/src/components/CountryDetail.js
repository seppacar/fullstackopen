import WeatherData from "./WeatherData";

const CountryDetails = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h2>languages</h2>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.name.common} />
      <h2>Weather in {country.name.common}</h2>
      <WeatherData capitalName={country.capital} />
    </div>
  );
};

export default CountryDetails;
