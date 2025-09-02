import { useContext, createContext } from "react";

export const WeatherContext = createContext(null);

export function useWeatherContext() {
  const ctx = useContext(WeatherContext);
  if (!ctx) {
    throw new Error("useWeatherContext must be used within a WeatherProvider");
  }
  return ctx;
}
