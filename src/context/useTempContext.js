import { createContext, useContext } from "react";

export const TempContext = createContext();

export const useTempContext = () => {
  const context = useContext(TempContext);
  if (!context) {
    throw new Error("useTempContext must be used within a TempProvider");
  }
  return context;
};
