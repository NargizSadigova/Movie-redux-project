import './Favorites.css';
import { useState, useEffect } from "react";

const Favorites = () => {
  const [favoritesData, setFavoritesData] = useState(null);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favoritesList"));
    if (savedFavorites) {
      setFavoritesData(savedFavorites);
    }
  }, []);

  if (!favoritesData) {
    return <h2>No Favorites List Found</h2>;
  }

  return (
    <div className="favorites-page">
      <h2 className="favorite-movie-name">
        {favoritesData.name}
      </h2>
      <ul className="favorite-movie">
        {favoritesData.movies.map((movie) => (
          <li key={movie.imdbID} className="favorite-item">
            <div className="movie-info">
              <span>
                {movie.title} ({movie.year})
              </span>
            </div>
            <button
              className="imdb-button"
              onClick={() => window.open(`https://www.imdb.com/title/${movie.imdbID}`, "_blank")}
            >
              View on IMDB
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
