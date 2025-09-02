import { API_KEY, latitude, longitude } from "./constants.js";

const weatherApiConfig = {
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
  latitude,
  longitude,
  apiKey: API_KEY,
};

const fetchWeather = async () => {
  try {
    const response = await fetch(
      `${weatherApiConfig.baseUrl}?lat=${weatherApiConfig.latitude}&lon=${weatherApiConfig.longitude}&units=imperial&appid=${weatherApiConfig.apiKey}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
};

fetchWeather();
