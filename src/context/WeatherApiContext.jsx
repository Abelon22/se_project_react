import { useEffect, useMemo, useState } from "react";
import {
  API_KEY,
  latitude as DEFAULT_LAT,
  longitude as DEFAULT_LON,
} from "../utils/constants";
import { WeatherContext } from "./useWeatherApiContext";
import { classifyWeather } from "../utils/classifyWeather";
import { getWeatherImageUrl } from "../utils/weatherImagesGlob";
import { useLocationSettings } from "./useLocationContext";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export function WeatherProvider({ children }) {
  const { coords, mode } = useLocationSettings();

  const { lat, lon } = useMemo(() => {
    const safeLat = typeof coords.lat === "number" ? coords.lat : DEFAULT_LAT;
    const safeLon = typeof coords.lon === "number" ? coords.lon : DEFAULT_LON;
    return { lat: safeLat, lon: safeLon };
  }, [coords.lat, coords.lon]);

  const [weatherApiError, setWeatherApiError] = useState(null);
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState({
    farenheit: null,
    celsius: null,
  });

  const [weather, setWeather] = useState("");
  const [preciseWeather, setPreciseWeather] = useState({
    time: "",
    isDayTime: null,
    isNightTime: null,
    weatherType: "",
  });

  const [isWeatherLoading, setIsWeatherLoading] = useState(false);

  const convertToCelsius = (farenheit) => ((farenheit - 32) * 5) / 9;

  const getWeatherCondition = (t) => {
    if (t >= 86) return "hot";
    if (t >= 66 && t <= 85) return "warm";
    return "cold";
  };

  function getTemperatureFromUnit(unit) {
    return unit === "F"
      ? `${Math.round(temperature.farenheit)} F`
      : `${Math.round(temperature.celsius)} C`;
  }

  useEffect(() => {
    if (typeof lat !== "number" || typeof lon !== "number") return;

    const ac = new AbortController();

    async function fetchWeather() {
      setIsWeatherLoading(true);
      try {
        const url = `${BASE_URL}?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`;
        const res = await fetch(url, { signal: ac.signal });
        if (!res.ok) throw new Error("Failed to fetch weather data");

        const data = await res.json();

        const localTime = new Date((data.dt + data.timezone) * 1000);
        const formattedTime = localTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        const sunrise = new Date((data.sys.sunrise + data.timezone) * 1000);
        const sunset = new Date((data.sys.sunset + data.timezone) * 1000);
        const isDayTime = localTime >= sunrise && localTime < sunset;

        setCity(data.name);
        const f = data.main?.temp ?? null;
        setTemperature({
          farenheit: f,
          celsius: f == null ? null : convertToCelsius(f),
        });
        setWeather(getWeatherCondition(data.main?.temp ?? 0));
        setPreciseWeather({
          time: formattedTime,
          isDayTime,
          isNightTime: !isDayTime,
          weatherType: classifyWeather(data.weather),
        });
        setWeatherApiError(null);
      } catch (err) {
        if (err.name !== "AbortError") {
          setWeatherApiError(`Non API Response: ${err.message || String(err)}`);
        }
      } finally {
        if (!ac.signal.aborted) setIsWeatherLoading(false);
      }
    }

    fetchWeather();
    return () => ac.abort();
  }, [lat, lon]);

  const value = {
    city,
    temperature,
    weather,
    weatherApiError,
    isWeatherLoading,
    preciseWeather,
    getTemperatureFromUnit,
    getWeatherImageUrl,
    coords,
    mode,

    setWeatherApiError,
    setIsWeatherLoading,
  };

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
}
