import React, { useState } from "react";
import axios from "axios";
import "./SearchEngine.css";

export default function SearchEngine() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    searchCity();
  }
  function updateCity(event) {
    setCity(event.target.value);
  }
  function showTemperature(response) {
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,

      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }
  function searchCity() {
    let apiKey = "2d96d64425dca1d6eda00d942a281c0d";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Enter a City..."
        onChange={updateCity}
      />
      <input type="submit" name="search" value={"search"} />
    </form>
  );
  if (loaded) {
    return (
      <div>
        {form}
        <ul>
          <li>
            <strong>Temperture : {Math.round(weather.temperature)}°C</strong>
          </li>
          <li>
            <strong>Humidity : {weather.humidity}%</strong>
          </li>
          <li>
            <strong>Wind :{weather.wind}km/h</strong>
          </li>
          <li>
            <strong>Description : {weather.description}</strong>
          </li>
          <li>
            <img src={weather.icon} />
          </li>
        </ul>
        <p>
          <a
            href="https://github.com/shanellmusarurwa"
            target="_blank"
            rel="noreferrer"
          >
            Open source code
          </a>{" "}
          by Mitchelle M and it is hosted on
          <a
            href="https://app.netlify.com/teams/shanellmusarurwa6/overview"
            target="_blank"
            rel="noreferrer"
          >
            NETLIFY
          </a>
        </p>
      </div>
    );
  } else {
    return form;
  }
}
