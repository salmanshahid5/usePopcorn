import { useState } from "react";

function MovieList({ movies, onSelectMovie }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? '–' : '+'}
      </button>

      {isOpen && (
        <ul className="list">
          {movies.map((movie) => (
            <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
              <img src={movie.Poster} alt={movie.Title} />
              <h3>{movie.Title}</h3>
              <div>
                <p>
                  <span>🗓</span> <span>{movie.Year}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MovieList;
