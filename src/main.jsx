import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App.jsx";
import { BrowserRouter } from "react-router-dom";

import { TempProvider } from "./context/TempContext.jsx";
import { LocationProvider } from "./context/LocationContext.jsx";
import { WeatherProvider } from "./context/WeatherApiContext.jsx";
import { ClothingItemsProvider } from "./context/ClothingItemsContext.jsx";
import { ModalProvider } from "./context/ModalContext.jsx";
import CurrentUserProvider from "./context/CurrentUserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CurrentUserProvider>
      <ClothingItemsProvider>
        <TempProvider>
          <LocationProvider>
            <WeatherProvider>
              <ModalProvider>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </ModalProvider>
            </WeatherProvider>
          </LocationProvider>
        </TempProvider>
      </ClothingItemsProvider>
    </CurrentUserProvider>
  </React.StrictMode>
);
