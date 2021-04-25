import React from 'react'
import "./InfoScreen.css"

import Youtube from "react-youtube";
const InfoScreen = ({movie,display,trailerUrl,opts}) => {
    
const baseImgUrl = "https://image.tmdb.org/t/p/original";
    return (
        <div className={display?"infoscreen":"none"}>
           <img src={`${baseImgUrl}${movie.poster_path}`} alt=""></img>    
            <div className="infoscreen__main">
            {movie.name?<h2>{movie.name}</h2>:<h2>{movie.title}</h2>}
            <p><span className="infoscreen__title">Description:</span> {movie.overview}</p>
            <p><span className="infoscreen__title">Release Date:</span> {movie.release_date?movie.release_date:movie.first_air_date}</p>
            <p><span className="infoscreen__title">Original Language:</span> {movie.original_language}</p>
            {movie.origin_country?<p><span className="infoscreen__title">Original Country:</span> {movie.origin_country[0]}</p>:null}
            <p><span className="infoscreen__title">Rating:</span> {movie.vote_average}/10 ({movie.vote_count} Reviews)</p>
             <div className="infoscreen__trailer">
           {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
           </div>
           </div>
        </div>
    )
}

export default InfoScreen
