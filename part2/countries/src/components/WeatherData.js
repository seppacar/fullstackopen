import axios from "axios";
import { useState, useEffect } from "react";

const WeatherData = ({ capitalName }) => {
  const [weatherData, setWeatherData] = useState([]);
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capitalName}&units=metric&appid=${API_KEY}`
      )
      .then((response) => {
        setWeatherData(response.data);
      });
      // eslint-disable-next-line
  }, []);

  const temp = weatherData?.main?.temp;
  const wind = weatherData?.wind?.speed;
  const icon = weatherData?.weather?.[0].icon;

  return (
    <div>
      <p>temperature {temp}</p>
      <img
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="weather icon"
      />
      <p>wind {wind} m/s</p>
    </div>
  );
};

export default WeatherData;
