import { createContext, useContext } from "react";

export const ClothingItemsContext = createContext();

export const useClothingItems = () => {
  const context = useContext(ClothingItemsContext);
  if (!context) {
    throw new Error(
      "useClothingItems must be used within a ClothingItemsProvider"
    );
  }
  return context;
};
