import React, { useState, useEffect } from 'react';
import Navbar from './Component/Navbar';
import MovieList from './Component/MovieList';
import Favorites from './Component/Favorites';
import Search from './Component/Search';
import { BrowserRouter as Router, Route, Routes, NavLink, useLocation } from "react-router-dom";


import './App.css';


const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("harry");
  const location = useLocation();

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?s=${search}&apikey=c1590847`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.Search);
        const moviesData = data.Search.sort(() => 0.5 - Math.random()).slice(0, 10).map((movie) => ({
          title: movie.Title,
          poster: movie.Poster,
          year: movie.Year,
          imdbID: movie.imdbID,
        }));
        setMovies(moviesData);
      })
      .catch((err) => console.log(err));
  }, [search]);

  const searchMovies = (query) => {
    setSearch(query);
  };

  return (
    <div className="app">
      <Navbar />
      <div className="main-content">
        <div className="left-panel">
          {/* route ile axtardigim elementi gorurem */}
          {location.pathname !== '/favorites' && <Search onSearch={searchMovies} />}
        </div>
      </div>

      <Routes>
        <Route path="/" element={<MovieList movies={movies} />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
};

export default App;
