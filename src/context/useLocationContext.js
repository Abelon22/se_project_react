import { useContext, createContext } from "react";

export const LocationContext = createContext();

export const useLocationSettings = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error(
      "useLocationSettings must be used within a LocationProvider"
    );
  }
  return context;
};
