import { useState } from "react";
import { TempContext } from "./useTempContext";

export const TempProvider = ({ children }) => {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleTemperatureUnit = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  return (
    <TempContext.Provider
      value={{
        currentTemperatureUnit,
        handleToggleTemperatureUnit,
      }}
    >
      {children}
    </TempContext.Provider>
  );
};
