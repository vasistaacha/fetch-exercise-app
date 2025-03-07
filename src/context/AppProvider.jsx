import React, { useReducer, useCallback, useEffect } from "react";
import axios from "axios";
import { AppContext } from "./AppContextInstance"; // Import the context from a separate file
import { useNavigate, useLocation } from "react-router-dom";

// Initial state
const initialState = {
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
    case "SET_LOADING":
      return { ...state, dataLoading: action.payload };
    case "SET_BREEDS":
      return {
        ...state,
        breeds: [...action.payload],
      };
    case "SET_FROM":
      return {
        ...state,
        cursorFrom: {
          prev: action.payload.prev,
          next: action.payload.next,
          total: action.payload.total,
          currentPage: action.payload.pageNo
            ? state.cursorFrom.currentPage + action.payload.pageNo
            : 1,
        },
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
    case "ADD_FAVORITE_DATA":
      return { ...state, favoritesData: [...action.payload] };
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
  const navigate = useNavigate(); // Hook for navigation
  const location = useLocation(); // Hook to access the current location
  useEffect(() => {
    if (!state.user && location.pathname != "/") {
      navigate("");
    }
  }, [state.user, navigate, location]);

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

  const fetchDogs = useCallback(
    async (cursor = 0, pageNo = undefined) => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const response = await axios.get(
          "https://frontend-take-home-service.fetch.com/dogs/search",
          {
            params: {
              ...state.filters,
              breeds: state.filterBreeds,
              size: 25,
              from: cursor,
            },
            withCredentials: true,
          }
        );
        dispatch({ type: "SET_LOADING", payload: false });
        dispatch({
          type: "SET_FROM",
          payload: {
            prev: response.data.prev?.split("from=")[1],
            next: response.data.next?.split("from=")[1],
            total: response.data.total,
            pageNo,
          },
        });
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
    },
    [state.filters, state.filterBreeds]
  );

  const fetchDogsWithID = useCallback(async (dogIds) => {
    try {
      const dogDetails = await axios.post(
        "https://frontend-take-home-service.fetch.com/dogs",
        dogIds,
        { withCredentials: true }
      );
      dispatch({ type: "ADD_FAVORITE_DATA", payload: dogDetails.data });
    } catch (error) {
      console.error("Failed to fetch dogs:", error);
    }
  }, []);

  const generateMatch = useCallback(async () => {
    try {
      const response = await axios.post(
        "https://frontend-take-home-service.fetch.com/dogs/match",
        state.favorites,
        { withCredentials: true }
      );
      const matchData = await axios.post(
        "https://frontend-take-home-service.fetch.com/dogs",
        [response.data.match],
        { withCredentials: true }
      );
      dispatch({ type: "SET_MATCHED_DOG", payload: matchData.data[0] });
    } catch (error) {
      console.error("Failed to generate match:", error);
    }
  }, [state.favorites]);

  useEffect(() => {
    state.user && fetchBreeds();
  }, [state.user]);

  useEffect(() => {
    state.user && fetchDogs();
  }, [state.user, fetchDogs]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        login,
        logout,
        dispatch,
        generateMatch,
        fetchDogs,
        fetchDogsWithID,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
