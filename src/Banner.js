import React, { useState, useEffect } from 'react';
import axios from './axios';
import requests from './requests';
import "./Banner.css";



function Banner() {
    // we create a react state using react hooks
    //useState is a react hook(hooks are react functional codes)
    //we create an empty movie array
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        // [], run once when the row loads, and dont run again
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);           
            setMovie(
                request.data.results[ 
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            // you test the requests to see that the api is pulling in data
            // console.log(
            //     request.data.results[
            //         Math.floor(Math.random() * requests.data.results.length - 1)
            //     ]);            
            return request;     
        }
        fetchData();
        
    //useeffect will only run when fetchurl is called
    
    }, []);

    //console.log(movie);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }

    return (
        <header 
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                )`,
                backgroundPosition: "center center",
            }}
            >
            <div className="banner__contents">         
                <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>

                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>

                <h1 className="banner__description">
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>
            
            <div className="banner--fadeBottom"></div>
        </header>
    );
}

export default Banner
