import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import InfoScreen from "./screens/InfoScreen";

const baseImgUrl = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [theMovie,setTheMovie] = useState({})
  const [show,setshow] = useState(false)
  // Options for react-youtube
  const opts = {
    height: "300",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = async (movie) => {
    setTheMovie(movie)
    setshow(!show)
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      let trailerurl = await axios.get(
        `/movie/${movie.id}/videos?api_key=fb34530271b349314af0de263d16ab5a`
      );
      setTrailerUrl(trailerurl.data.results[0]?.key);
    }
  };
  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map(
          (movie) =>
            movie.backdrop_path !== null && (
              
              <img
                
                className={`row__poster ${isLargeRow && "row__posterlarge"}`}
                src={`${baseImgUrl}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
                key={movie.id}
                onClick={() => handleClick(movie)}
              />
            )
            
      
        )}
        
      </div>
      <InfoScreen movie={theMovie} display={show} trailerUrl={trailerUrl} opts={opts}/>
    </div>
  );
}

export default Row;
