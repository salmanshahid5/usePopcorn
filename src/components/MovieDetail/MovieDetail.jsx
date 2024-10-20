import { useEffect, useState } from 'react';

function Detail({ selectedId, onAddToWatchlist }) {
  const [movie, setMovie] = useState(null);
  const [hoveredStar, setHoveredStar] = useState(0); // Track hovered star for preview
  const [selectedRating, setSelectedRating] = useState(0); // Store final rating

  useEffect(() => {
    async function getMovieDetails() {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=2a6626ef&i=${selectedId}`
      );
      const data = await res.json();
      setMovie(data);
    }

    if (selectedId) {
      getMovieDetails();
    }
  }, [selectedId]);

  if (!movie) return <p>Loading movie details...</p>;

  const handleRatingClick = (rating) => {
    setSelectedRating(rating); 
  };

  const handleAddToWatchlist = () => {
    const updatedMovie = { ...movie, userRating: selectedRating }; 
    onAddToWatchlist(updatedMovie);
  };

  return (
    <div className="details">
      <header>
        <img src={movie.Poster} alt={movie.Title} className="detail-poster" />
        <div className="details-overview">
          <h2>{movie.Title}</h2>
          <p>{movie.Genre}</p>
          <p>
            <span>⭐</span> {movie.imdbRating} IMDb rating
          </p>
          <p>
            <span>🗓</span> {movie.Year}
          </p>
        </div>
      </header>

      <section>
        <div className="rating">
          <div className="stars">
            {Array.from({ length: 10 }).map((_, index) => {
              const starValue = index + 1;
              return (
                <span style={{marginLeft:'10px',fontSize:'15px'}}
                  key={starValue}
                  className={`star ${starValue <= (hoveredStar || selectedRating) ? 'filled' : ''}`}
                  onMouseEnter={() => setHoveredStar(starValue)}
                  onMouseLeave={() => setHoveredStar(0)}
                  onClick={() => handleRatingClick(starValue)}
                >
                  ★
                </span>
              );
            })}
            <span className="rating-number">
              {hoveredStar || selectedRating}
            </span>
          </div>
          <button className="btn-add" onClick={handleAddToWatchlist}>
            + Add to Watchlist
          </button>
        </div>
        <p>Starring: {movie.Actors}</p>
        <p>Directed by: {movie.Director}</p>
      </section>
    </div>
  );
}

export default Detail;