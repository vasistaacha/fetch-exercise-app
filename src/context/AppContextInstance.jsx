import { createContext, useContext } from "react";

export const AppContext = createContext({
  user: null,
  dogs: [],
  breeds: [],
  filterBreeds: [],
  favorites: [],
  favoritesData: [],
  dataLoading: false,
  filters: { ageMin: "", ageMax: "", sort: "breed:asc" },
  cursorFrom: { prev: "", next: "", total: "", currentPage: 1 },
  matchedDog: null,
});

export const useAppContext = () => useContext(AppContext);
