import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_ENDPOINT } from "./context";
import axios from "axios";
const url =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";
const SingleMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: "" });
  const fetchMovie = async (url) => {
    const response = await axios.get(url);
    console.log(response);
    const data = response.data;
    console.log(data);
    if (data.Response === "False") {
      setError({ show: true, msg: data.Error });
      setLoading(false);
    } else {
      setMovie(data);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMovie(`${API_ENDPOINT}&i=${id}`);
  }, [id]);
  if (isLoading) {
    return <div className="loading"></div>;
  }
  if (error.show) {
    return (
      <div className="page-error">
        <h1>{error.msg}</h1>
        <Link to="/" className="btn">
          Back to Movie
        </Link>
      </div>
    );
  }
  const {
    Poster: poster,
    Title: title,
    Plot: plot,
    Year: year,
    Country: country,
    Rated: rated,
    Released: released,
    Language: language
  } = movie;
  return (
    <section className="single-movie">
      <img src={poster === "N/A" ? url : poster} alt="" />
      <div className="single-movie-info">
        <h2>Title:{title}</h2>
        <p>Plot:{plot}</p>
        <h4>Year:{year}</h4>
        <h4>Language:{language}</h4>
        <h4>Metascore:{movie.Metascore}</h4>
        <h4>Rated:{rated}</h4>
        <h4>Country: {country}</h4>

        <h4>Released: {released}</h4>
        <Link to="/" className="btn">
          Back to Home
        </Link>
      </div>
    </section>
  );
};
export default SingleMovie;
