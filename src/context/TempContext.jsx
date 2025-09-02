import { createContext, useContext, useState } from "react";

const TempContext = createContext();

export const useTempContext = () => {
  const context = useContext(TempContext);
  if (!context) {
    throw new Error("useTempContext must be used within a TempProvider");
  }
  return context;
};

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
