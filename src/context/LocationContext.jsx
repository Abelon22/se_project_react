import { useState, useEffect } from "react";
import {
  latitude as DEFAULT_LAT,
  longitude as DEFAULT_LON,
} from "../utils/constants";
import { LocationContext } from "./useLocationContext";

export function LocationProvider({ children }) {
  const [mode, setMode] = useState("default");
  const [coords, setCoords] = useState({ lat: DEFAULT_LAT, lon: DEFAULT_LON });

  useEffect(() => {
    if (mode !== "user") {
      setCoords({ lat: DEFAULT_LAT, lon: DEFAULT_LON });
      return;
    }

    if (!navigator.geolocation) {
      console.warn("Geolocation not supported, falling back to defaults");
      setCoords({ lat: DEFAULT_LAT, lon: DEFAULT_LON });
      return;
    }

    let cancelled = false;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (!cancelled) {
          setCoords({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        if (!cancelled) {
          setCoords({ lat: DEFAULT_LAT, lon: DEFAULT_LON });
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );

    return () => {
      cancelled = true;
    };
  }, [mode]);

  return (
    <LocationContext.Provider value={{ mode, coords, setMode }}>
      {children}
    </LocationContext.Provider>
  );
}
