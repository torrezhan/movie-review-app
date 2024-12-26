import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie, onClick }) => {
  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder-image.jpg';

  return (
    <div className="movie-card" onClick={() => onClick(movie.id)}>
      <img
        src={imageUrl}
        alt={movie.title}
        onError={(e) => e.target.src = '/placeholder-image.jpg'}
      />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <div className="rating">
          <span>★</span>
          <span>{movie.vote_average.toFixed(1)}</span>
        </div>
        <p className="release-date">{movie.release_date}</p>
      </div>
    </div>
  );
};

export default MovieCard;