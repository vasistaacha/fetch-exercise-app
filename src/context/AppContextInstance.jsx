import { createContext, useContext } from "react";

export const AppContext = createContext({
  user: null,
  dogs: [],
  breeds: [],
  favorites: [],
  filters: { breed: "", ageMin: "", ageMax: "" },
  matchedDog: null,
});

export const useAppContext = () => useContext(AppContext);
