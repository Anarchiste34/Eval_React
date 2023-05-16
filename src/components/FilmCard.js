import React from 'react';


export default function FilmCard({ film }) {
  return (
    <div>
      <h2>{film.Title}</h2>
      <p>Year: {film.Year}</p>
      <p>Runtime: {film.Runtime}</p>
      <p>Genre: {film.Genre}</p>
      <p>Actors: {film.Actors}</p>
      <p>Plot: {film.Plot}</p>
      <p>Rating: {film.imdbRating}/5</p>
      <p>Box Office: {film.BoxOffice}</p>
      <img src={film.Poster} alt={film.Title} />
    </div>
  );
}
