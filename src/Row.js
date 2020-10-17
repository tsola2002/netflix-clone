/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from './axios';
import "./Row.css"
import requests from './requests'; 

const base_url = "https://image.tmdb.org/t/p/original/";
//const base_url = "https://api.themoviedb.org/3/movie";

function Row({ title, fetchUrl}) {
    // we create a react state using react hooks
    //useState is a react hook(hooks are react functional codes)
    //we create an empty movie array
    const [movies, setMovies] = useState();

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

    let moviesToRender;
    if(movies) {
        moviesToRender = movies.map(movie => {
            return <img 
            key={movie.id}
            className="row__poster"
            src={`${base_url}${movie.poster_path}`}
            alt={movie.name} />;
        })
    }
    
    // you test to see dat setmovies function is working well
    console.log(movies);
    //console.table(movies);
   

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row__posters">
                {moviesToRender}
            </div>    
        </div>
    )
}

export default Row
