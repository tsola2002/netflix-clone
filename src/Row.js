/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from './axios';
import "./Row.css" 
import requests from './requests'; 
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";
//const base_url = "https://api.themoviedb.org/3/movie";

function Row({ title, fetchUrl, isLargeRow}) {
    // we create a react state using react hooks
    //useState is a react hook(hooks are react functional codes)
    //we create an empty movie array
    const [movies, setMovies] = useState();
    //state to get the trailer url when the thumbnail is clicked
    const [trailerUrl, setTrailerUrl] = useState("");
    

    

    // A snippet of code which runs based on a specific condition
    useEffect(() => {
        // [], run once when the row loads, and dont run again
        async function fetchData() {
            const request = await axios.get(fetchUrl);           
            // you test the requests to see that the api is pulling in data
            //console.log(request);
            setMovies(request.data.results);
            
            return request;
            
        }
        fetchData();
        
    //useeffect will only run when fetchurl is called
    // fetchurl needs to be called because it coming from outside the block    
    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

        const handleClick = (movie) => {
        if (trailerUrl) {
            // set trailerUrl to empty string in case a video is playing already
            // the video will be closed
            setTrailerUrl("");
        } else {
             movieTrailer(movie?.name || "")
                 .then(url => {
                     const urlParams = new URLSearchParams(new URL(url).search);
                     setTrailerUrl(urlParams.get("v"));
                     console.log(urlParams);
                 })
                 .catch((error) => console.log(error));
        }
    };

    let moviesToRender;
    if(movies) {
        moviesToRender = movies.map(movie => {
            return <img 
            key={movie.id}
            onClick={() => handleClick(movie)}     
            className="row__poster"
            src={`${base_url}${movie.backdrop_path}`}
            alt={movie.name} />;
        })
    }
    
    // you test to see dat setmovies function is working well
    // console.log(movies);
    //console.table(movies);

    



    
   

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row__posters">
                {moviesToRender}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}               
        </div>
        
        
    )
}

export default Row
