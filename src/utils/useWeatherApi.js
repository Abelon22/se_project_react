import { API_KEY, latitude, longitude } from "./constants";
import { useState, useEffect } from "react";

const weatherApiConfig = {
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
  latitude,
  longitude,
  apiKey: API_KEY,
};

export const useWeatherApi = () => {
  const { baseUrl, latitude, longitude, apiKey } = weatherApiConfig;

  const [error, setError] = useState(null);

  const [city, setCity] = useState("");

  const [temperature, setTemperature] = useState(null);

  const [weather, setWeather] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const getWeatherCondition = (temperature) => {
    switch (temperature) {
      case temperature >= 86:
        return "hot";
      case temperature >= 66 && temperature <= 85:
        return "warm";
      default:
        return "cold";
    }
  };

  useEffect(() => {
    async function fetchWeather(lat, lon) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${baseUrl}?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
        );
        if (!response.ok) {
          setError("Failed to fetch weather data");
          throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();

        setCity(data.name);
        setTemperature(data.main.temp);
        setWeather(getWeatherCondition(data.main.temp));
        setError(null);

        console.log(data);
      } catch (error) {
        setError(`Non API Response: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWeather(latitude, longitude);
  }, [baseUrl, latitude, longitude, apiKey]);

  return { city, temperature, weather, error, isLoading };
};
