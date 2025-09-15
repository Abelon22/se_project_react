import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App.jsx";
import { TempProvider } from "./context/TempContext.jsx";
import { LocationProvider } from "./context/LocationContext.jsx";
import { WeatherProvider } from "./context/WeatherApiContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Profile } from "./components/Profile/Profile.jsx";
import { ClothingItemsProvider } from "./context/ClothingItemsContext.jsx";
import { ModalProvider } from "./context/ModalContext.jsx";

let router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
  ],
  {
    basename: "/se_project_react/",
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClothingItemsProvider>
      <TempProvider>
        <LocationProvider>
          <WeatherProvider>
            <ModalProvider>
              <RouterProvider router={router} />
            </ModalProvider>
          </WeatherProvider>
        </LocationProvider>
      </TempProvider>
    </ClothingItemsProvider>
  </React.StrictMode>
);
