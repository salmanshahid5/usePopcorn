import { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import MovieList from './components/MovieList/MovieList';
import WatchList from './components/WatchList/WatchList';
import Detail from './components/MovieDetail/MovieDetail';
import './App.css';

export default function App() {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [watchList, setWatchList] = useState([]);
  const [selectedId, setSelectedId] = useState(null); // Track selected movie

  function mySearch(val) {
    setSearch(val);
  }

  async function getMovieBySearch(search) {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=2a6626ef&s=${search}`
    );
    const data = await res.json();
    if (data.Response === 'True') {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  }

  useEffect(() => {
    if (search) {
      getMovieBySearch(search);
    }
  }, [search]);

  function addToWatchList(movie) {
    setWatchList((prev) => [...prev, movie]);
    setSelectedId(null);
  }

  function handleMovieSelect(id) {
    setSelectedId(id); 
  }

  return (
    <>
      <Navbar search={search} mySearch={mySearch} />
      <div className="main">
        <MovieList movies={movies} onSelectMovie={handleMovieSelect} />
        {selectedId ? (
          <Detail selectedId={selectedId} onAddToWatchlist={addToWatchList} />
        ) : (
          <WatchList watchList={watchList} />
        )}
      </div>
    </>
  );
}