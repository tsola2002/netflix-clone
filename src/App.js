import React from 'react';
import './App.css';
import Row from './Row';
import Banner from './Banner';
import requests from './requests';

function App() {
  return (
    <div className="app">
      {/* NAVBAR */}
      <Banner />
      <Row 
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        islargeRow />

      <Row title="Top Rated" fetchUrl={requests.fetchActionMovies} />
      <Row title="Action Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />

    </div>
  );
}

export default App;
