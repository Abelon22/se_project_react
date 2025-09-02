import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App.jsx";
import { TempProvider } from "./context/TempContext.jsx";
import { LocationProvider } from "./context/LocationContext.jsx";
import { WeatherProvider } from "./context/WeatherApiContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TempProvider>
      <LocationProvider>
        <WeatherProvider>
          <App />
        </WeatherProvider>
      </LocationProvider>
    </TempProvider>
  </React.StrictMode>
);
