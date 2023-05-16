import React, { useState } from 'react';
import FilmCard from './FilmCard';

export default function SearchBar() {
  // State pour le champ de recherche
  const [searchInput, setSearchInput] = useState('');

  // State pour stocker les films trouvés
  const [movies, setMovies] = useState([]);

  // Gestionnaire de changement pour le champ de recherche
  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Attends toutes les requêtes pour obtenir les données de chaque film
      const searchResponse = await fetch(
        `http://www.omdbapi.com/?s=${searchInput}&apikey=2e0f35f5`
      );
      const searchData = await searchResponse.json();

      if (searchData.Response === 'False') {
        console.log('Aucun résultat trouvé');
        return;
      }

      // Récupérer les ID des films trouvés
      const movieIDs = searchData.Search.map((movie) => movie.imdbID);

      // Effectuer les requêtes pour obtenir les données de chaque film
      const movieDataPromises = movieIDs.map(async (imdbID) => {
        const movieResponse = await fetch(
          `http://www.omdbapi.com/?i=${imdbID}&apikey=2e0f35f5`
        );
        const movieData = await movieResponse.json();
        return movieData;
      });

      // Attendre que toutes les requêtes se terminent et stocker les données des films
      const moviesData = await Promise.all(movieDataPromises);
      setMovies(moviesData);
    } catch (error) {
      console.log(error);
    }
  };

  // Fonction pour générer le rating en étoiles
  const generateStarRating = (rating) => {
    const filledStars = Math.floor(rating / 2); // Nombre d'étoiles pleines
    const halfStar = rating % 2 !== 0; // Indique s'il y a une demi-étoile

    const stars = [];

    // Ajout des étoiles pleines
    for (let i = 0; i < filledStars; i++) {
      stars.push(<span key={i}>&#9733;</span>);
    }

    // Ajout étoile à moitié
    if (halfStar) {
      stars.push(<span key={filledStars}>&#9734;</span>);
    }

    // Ajout des étoiles vides
    const remainingStars = 5 - filledStars - (halfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<span key={filledStars + i + (halfStar ? 1 : 0)}>&#9734;</span>);
    }

    return stars;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Search by movie name"
          onChange={handleChange}
          value={searchInput}
        />
        <button type="submit">Search</button>
      </form>
      {movies.map((movie) => (
        <FilmCard
          key={movie.imdbID}
          film={{
            ...movie,
            imdbRating: generateStarRating(parseFloat(movie.imdbRating)),
          }}
        />
      ))}
    </div>
  );
}
