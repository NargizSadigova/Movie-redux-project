import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MovieList.css";


const MovieList = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [listName, setListName] = useState("");
  const navigate = useNavigate();

  const addToFavorites = (movie) => {
    if (!favorites.find((fav) => fav.imdbID === movie.imdbID)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFromFavorites = (imdbID) => {
    setFavorites(favorites.filter((fav) => fav.imdbID !== imdbID));
  };

  const handleSaveList = () => {
    if (!listName.trim()) {
      return; // inputa bosluq daxil etdikde
    }
    localStorage.setItem(
      "favoritesList",
      JSON.stringify({ name: listName.trim(), movies: favorites })
    );
    setListName(""); // save etdikden sonra sil
  };

  const handleViewFavorites = () => {
    navigate("/favorites"); // sent favorites-list
  };

  return (
    <div className="container">
      {/* Movies Section */}
      <div className="movies-list">
        <h2>Movies</h2>
        <ul>
          {props.movies.map((movie) => (
            <li key={movie.imdbID}>
              <img src={movie.poster} alt={movie.title} />
              <div>
                <h3>{movie.title}</h3>
                <p>{movie.year}</p>
                <button
                  onClick={() => addToFavorites(movie)}
                  className={`icon-button ${favorites.find((fav) => fav.imdbID === movie.imdbID) ? "active" : ""}`}
                >
                  {favorites.find((fav) => fav.imdbID === movie.imdbID) ? "❤️" : "🤍"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Favorites Section */}
      <div className="favorites-list">
        <h2>Favorites</h2>
        <ul>
          {favorites.map((fav) => (
            <li key={fav.imdbID} className="favorite-item">
              <span className="movie-title">
                {fav.title} ({fav.year})
              </span>
              <button
                onClick={() => removeFromFavorites(fav.imdbID)}
                className="delete-button"
              >
                ✖
              </button>
            </li>
          ))}
        </ul>

        {/* input, save, view list */}
        {favorites.length > 0 && (
          <div className="save-list-section">
            <input
              type="text"
              placeholder="Enter list name"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />
            <button onClick={handleSaveList} className="save-button">
              Save List
            </button>
            <button onClick={handleViewFavorites} className="view-favorites-button">
              View Favorites List
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieList;



{/* <button onClick={() => addToFavorites(movie)}>Add to Favorites</button> */ }
{/* <button
                  onClick={() => addToFavorites(movie)}
                  className={`heart-button ${favorites.find((fav) => fav.imdbID === movie.imdbID) ? 'active' : ''}`}
                >
                  ♥
                </button> */}