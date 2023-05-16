import './components/extra.css';
import React, { useState } from 'react';
import SearchBar from './components/searchBar';
import FilmCard from './components/FilmCard';

export default function App() {
  const [movies, setMovies] = useState([]);

  const handleSearch = async (searchInput) => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?s=${searchInput}&apikey=cbee5e28`
      );
      const data = await response.json();
      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <h1>Search To Movie</h1>
      <SearchBar handleSearch={handleSearch} />
      <div>
        {movies.map((movie) => (
          <FilmCard key={movie.imdbID} film={movie} />
        ))}
      </div>
    </div>
  );
}
