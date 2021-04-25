import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios from "./axios.js";
import requests from "./Requests";
const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);

      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
    
  }, []);
  
  const truncate = (string, n) => {
    return string.length > n ? string.substring(0, n - 1) + " ..." : string;
  };
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My list</button>
        </div>
        <div className="banner__description">
          {truncate(`${movie?.overview}`, 200)}
        </div>
        
      </div>
      <div className="banner__fadeBottom" />
      
    </header>
  );
};

export default Banner;
