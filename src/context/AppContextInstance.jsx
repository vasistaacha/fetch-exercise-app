import { createContext, useContext } from "react";

export const AppContext = createContext({
  user: null,
  dogs: [],
  breeds: [],
  filterBreeds: [],
  favorites: [],
  filters: { ageMin: "", ageMax: "", sort: "breed:asc" },
  cursorFrom: { prev: "", next: "", total: "" },
  matchedDog: null,
});

export const useAppContext = () => useContext(AppContext);
