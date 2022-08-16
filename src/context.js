import axios from "axios";
import React, { useContext, useState, useEffect, createContext } from "react";
export const API_ENDPOINT = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;
const AppContext = createContext();
const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: "" });
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("Batman");
  const fetchMovies = async (url) => {
    try {
      const response = await axios.get(url);
      if (response.data.Response === "True") {
        setMovies(response.data.Search);
        setError({ show: false, msg: "" });
      } else {
        setError({ show: true, msg: response.data.Error });
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error, "there has been an error");
    }
  };
  useEffect(() => {
    fetchMovies(`${API_ENDPOINT}&s=${query}`);
  }, [query]);

  return (
    <AppContext.Provider value={{ isLoading, error, movies, query, setQuery }}>
      {children}
    </AppContext.Provider>
  );
};
//make sure to use
export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
