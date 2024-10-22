import { useState } from "react";

function WatchList({ watchList = [] }) {
  const [isOpen, setIsOpen] = useState(true);

  // Calculate average IMDb rating
  const averageIMDbRating =
    watchList.length > 0
      ? (
          watchList.reduce((acc, movie) => acc + (movie.imdbRating || 0), 0) /
          watchList.length
        ).toFixed(1)
      : 0;

  // Calculate average User rating
  const averageUserRating =
    watchList.length > 0
      ? (
          watchList.reduce((acc, movie) => acc + (movie.userRating || 0), 0) /
          watchList.length
        ).toFixed(1)
      : 0;

  // Calculate total runtime (parse Runtime safely)
  const totalRuntime = watchList
    .reduce((acc, movie) => acc + (parseInt(movie.Runtime) || 0), 0)
    .toFixed(1);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>

      {isOpen && (
        <>
          <div className="summary">
            <h2>Movies you watched</h2>
            <div>
              <p>
                <span>#️⃣</span> <span>{watchList.length} movies</span>
              </p>
              <p>
                <span>⭐️</span> <span>{averageIMDbRating}</span>
              </p>
              <p>
                <span>🌟 </span> <span>{averageUserRating}</span>
              </p>
              <p>
                <span>⏳</span> <span>{totalRuntime} min</span>
              </p>
            </div>
          </div>

          <ul className="list">
            {watchList.map((movie) => (
              <li key={movie.imdbID}>
                <img src={movie.Poster} alt={movie.Title} />
                <h3>{movie.Title}</h3>
                <div>
                  <p>
                    <span>⭐️</span> <span>{movie.imdbRating || "N/A"}</span>
                  </p>
                  <p>
                    <span>🌟</span>{" "}
                    <span>{movie.userRating || "N/A"}</span>
                  </p>
                  <p>
                    <span>⏳</span>{" "}
                    <span>{movie.Runtime || "N/A"} </span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default WatchList;