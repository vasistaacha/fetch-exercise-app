import React, { useReducer, useCallback, useEffect } from "react";
import axios from "axios";
import { AppContext } from "./AppContextInstance"; // Import the context from a separate file

// Initial state
const initialState = {
  user: null,
  dogs: [],
  breeds: [],
  filterBreeds: [],
  favorites: [],
  filters: { ageMin: "", ageMax: "", sort: "name:asc" },
  matchedDog: null,
};

// Reducer function
const reducer = (state, action) => {
  console.log(state);
  console.log(action);
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_DOGS":
      return { ...state, dogs: action.payload };
    case "SET_BREEDS":
      return {
        ...state,
        breeds: [...action.payload],
      };
    case "FILTER_BREEDS":
      return {
        ...state,
        filterBreeds: [...action.payload],
      };
    case "SET_FILTERS":
      return { ...state, filters: action.payload };
    case "ADD_FAVORITE":
      return { ...state, favorites: [...state.favorites, action.payload] };
    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter((id) => id !== action.payload),
      };
    case "SET_MATCHED_DOG":
      return { ...state, matchedDog: action.payload };
    default:
      return state;
  }
};

// Context provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (name, email) => {
    try {
      const response = await axios.post(
        "https://frontend-take-home-service.fetch.com/auth/login",
        { name, email },
        { withCredentials: true }
      );
      if (response.status === 200) {
        dispatch({ type: "SET_USER", payload: { name, email } });
        await fetchDogs();
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async (name, email) => {
    try {
      const response = await axios.post(
        "https://frontend-take-home-service.fetch.com/auth/logout",
        { name, email },
        { withCredentials: true }
      );
      if (response.status === 200) {
        dispatch({ type: "SET_USER", payload: null });
      }
    } catch (error) {
      console.error("logout failed:", error);
    }
  };

  const fetchBreeds = async () => {
    try {
      const response = await axios.get(
        "https://frontend-take-home-service.fetch.com/dogs/breeds",
        { withCredentials: true }
      );
      dispatch({
        type: "SET_BREEDS",
        payload: response.data,
      });
    } catch (error) {
      console.error("Failed to fetch breeds:", error);
    }
  };

  const fetchDogs = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://frontend-take-home-service.fetch.com/dogs/search",
        {
          params: { ...state.filters, breeds: state.filterBreeds, size: 25 },
          withCredentials: true,
        }
      );
      const dogIds = response.data.resultIds;
      const dogDetails = await axios.post(
        "https://frontend-take-home-service.fetch.com/dogs",
        dogIds,
        { withCredentials: true }
      );
      dispatch({ type: "SET_DOGS", payload: dogDetails.data });
    } catch (error) {
      console.error("Failed to fetch dogs:", error);
    }
  }, [state.filters, state.filterBreeds]);

  const generateMatch = async () => {
    try {
      const response = await axios.post(
        "https://frontend-take-home-service.fetch.com/dogs/match",
        state.favorites,
        { withCredentials: true }
      );
      dispatch({ type: "SET_MATCHED_DOG", payload: response.data.match });
    } catch (error) {
      console.error("Failed to generate match:", error);
    }
  };

  useEffect(() => {
    state.user && fetchBreeds();
  }, [state.user]);

  useEffect(() => {
    fetchDogs();
  }, [fetchDogs]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        login,
        logout,
        dispatch,
        generateMatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
