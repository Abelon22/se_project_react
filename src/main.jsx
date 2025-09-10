import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App.jsx";
import { TempProvider } from "./context/TempContext.jsx";
import { LocationProvider } from "./context/LocationContext.jsx";
import { WeatherProvider } from "./context/WeatherApiContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

let router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
    },
  ],
  {
    basename: "/se_project_react",
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TempProvider>
      <LocationProvider>
        <WeatherProvider>
          <RouterProvider router={router} />
        </WeatherProvider>
      </LocationProvider>
    </TempProvider>
  </React.StrictMode>
);
