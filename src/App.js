import React, { useState, useEffect, useCallback } from 'react';
import MovieCard from './components/MovieCard/MovieCard';
import SearchBar from './components/SearchBar/SearchBar';
import ReviewForm from './components/ReviewForm/ReviewForm';
import './styles/App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  const fetchMovies = useCallback(async (searchTerm = '') => {
    try {
      setLoading(true);
      const baseUrl = 'https://api.themoviedb.org/3';
      const endpoint = searchTerm 
        ? `/search/movie?api_key=${API_KEY}&query=${searchTerm}`
        : `/movie/popular?api_key=${API_KEY}`;
      
      const response = await fetch(`${baseUrl}${endpoint}`);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  }, [API_KEY]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleMovieClick = async (movieId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
      );
      const data = await response.json();
      setSelectedMovie(data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const handleReviewSubmit = (review) => {
    const reviews = JSON.parse(localStorage.getItem(`reviews_${review.movieId}`) || '[]');
    reviews.push(review);
    localStorage.setItem(`reviews_${review.movieId}`, JSON.stringify(reviews));
    alert('Review submitted successfully!');
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <h1>MovieReview Hub</h1>
          <SearchBar onSearch={fetchMovies} />
        </div>
      </header>

      <main className="app-main container">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="movie-grid">
            {movies.map(movie => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                onClick={handleMovieClick}
              />
            ))}
          </div>
        )}

        {selectedMovie && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>{selectedMovie.title}</h2>
              <img 
                src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                alt={selectedMovie.title}
              />
              <p>{selectedMovie.overview}</p>
              <ReviewForm 
                movieId={selectedMovie.id} 
                onSubmit={handleReviewSubmit}
              />
              <button 
                onClick={() => setSelectedMovie(null)}
                className="close-button"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>© 2024 Movie Review Hub</p>
        </div>
      </footer>
    </div>
  );
};

export default App;