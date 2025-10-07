import { createContext, useContext } from "react";

export const CurrentUserContext = createContext();

export const useCurrentUser = () => {
  const userContext = useContext(CurrentUserContext);

  if (!userContext) {
    throw new Error("Using Context outside Provider!");
  }

  return userContext;
};
