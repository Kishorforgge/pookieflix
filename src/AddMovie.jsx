import { useState } from 'react';

export function AddMovie({ onBack, onMovieAdded }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [castData, setCastData] = useState([]);
  const [error, setError] = useState('');

  // TMDB API Key - You need to get one from https://www.themoviedb.org/settings/api
  const TMDB_API_KEY = 'f33ba1946dc02315fb766427e05ef896'; // Replace with your actual API key

  const searchMovies = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to search movies. Check your TMDB API key.');
      }

      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (err) {
      setError(err.message);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovieDetails = async (movieId) => {
    setLoading(true);
    try {
      // Fetch movie details
      const movieResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`
      );
      const movieData = await movieResponse.json();

      // Fetch cast
      const castResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${TMDB_API_KEY}`
      );
      const castDataResponse = await castResponse.json();

      const mainCast = (castDataResponse.cast || [])
        .slice(0, 5) // Get top 5 actors
        .map(actor => ({
          name: actor.name,
          image: actor.profile_path 
            ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
            : 'https://via.placeholder.com/200x300?text=No+Image'
        }));

      setSelectedMovie({
        title: movieData.title,
        genre: (movieData.genres || []).map(g => g.name).join(', ') || 'Unknown',
        rating: movieData.vote_average?.toFixed(1) || 'N/A',
        year: movieData.release_date?.split('-')[0] || 'Unknown',
        duration: `${movieData.runtime || 'N/A'} min`,
        summary: movieData.overview || 'No description available',
        thumbnail: movieData.poster_path 
          ? `https://image.tmdb.org/t/p/w400${movieData.poster_path}`
          : 'https://via.placeholder.com/300x450?text=No+Poster'
      });;
      setCastData(mainCast);
    } catch (err) {
      setError('Failed to fetch movie details');
    } finally {
      setLoading(false);
    }
  };

  const handleMovieSelect = (movie) => {
    fetchMovieDetails(movie.id);
  };

  const handleAddMovie = () => {
    if (!selectedMovie) {
      setError('Please select a movie first');
      return;
    }

    // Callback to parent with the new movie data
    onMovieAdded({
      ...selectedMovie,
      cast: castData,
      url: 'YOUR_FILE_ID_HERE' // User needs to add Google Drive file ID
    });
  };

  return (
    <div style={{
      backgroundColor: 'var(--bg-main)',
      minHeight: '100vh',
      color: 'var(--text-main)',
      padding: '30px',
      animation: 'slideInFromRight 0.5s ease-out',
      overflow: 'auto'
    }}>
      {/* Back Button */}
      <button
        onClick={onBack}
        style={{
          padding: '10px 20px',
          background: 'rgba(102, 252, 241, 0.15)',
          color: '#66fcf1',
          border: '1px solid #66fcf1',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          fontFamily: 'inherit',
          marginBottom: '30px'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#66fcf1';
          e.target.style.color = '#000000';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'rgba(102, 252, 241, 0.15)';
          e.target.style.color = '#66fcf1';
        }}
      >
        ← Back
      </button>

      <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '30px' }}>
        Add Movie
      </h1>

      {/* API Key Warning */}
      {TMDB_API_KEY === 'YOUR_TMDB_API_KEY_HERE' && (
        <div style={{
          backgroundColor: 'rgba(255, 100, 100, 0.1)',
          border: '1px solid rgba(255, 100, 100, 0.5)',
          borderRadius: '8px',
          padding: '15px',
          marginBottom: '20px',
          color: '#ff6464'
        }}>
          ⚠️ <strong>API Key Required:</strong> Please add your TMDB API key to use this feature.
          <br />Get one free at: <a href="https://www.themoviedb.org/settings/api" target="_blank" rel="noopener noreferrer" style={{ color: '#66fcf1' }}>themoviedb.org/settings/api</a>
        </div>
      )}

      {/* Search Box */}
      <div style={{ marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            searchMovies(e.target.value);
          }}
          style={{
            width: '100%',
            padding: '12px 16px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid rgba(102, 252, 241, 0.2)',
            borderRadius: '8px',
            color: 'var(--text-main)',
            fontSize: '14px',
            fontFamily: 'inherit',
            outline: 'none',
            transition: 'all 0.3s ease'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#66fcf1';
            e.target.style.boxShadow = '0 0 10px rgba(102, 252, 241, 0.2)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(102, 252, 241, 0.2)';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>

      {error && (
        <div style={{
          backgroundColor: 'rgba(255, 100, 100, 0.1)',
          border: '1px solid rgba(255, 100, 100, 0.5)',
          borderRadius: '8px',
          padding: '12px',
          marginBottom: '20px',
          color: '#ff6464',
          fontSize: '13px'
        }}>
          {error}
        </div>
      )}

      {loading && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#66fcf1'
        }}>
          Loading...
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && !selectedMovie && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: '15px',
          marginBottom: '30px'
        }}>
          {searchResults.map(movie => (
            <div
              key={movie.id}
              onClick={() => handleMovieSelect(movie)}
              style={{
                cursor: 'pointer',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '2px solid rgba(102, 252, 241, 0.2)',
                transition: 'all 0.3s ease',
                transform: 'scale(1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#66fcf1';
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 252, 241, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(102, 252, 241, 0.2)';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <img
                src={movie.poster_path 
                  ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                  : 'https://via.placeholder.com/150x225?text=No+Poster'
                }
                alt={movie.title}
                style={{
                  width: '100%',
                  height: '225px',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                padding: '12px',
                backgroundColor: 'var(--bg-card)',
                borderTop: '1px solid rgba(102, 252, 241, 0.1)'
              }}>
                <p style={{
                  margin: '0',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: 'var(--text-main)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {movie.title}
                </p>
                <p style={{
                  margin: '4px 0 0 0',
                  fontSize: '11px',
                  color: 'var(--text-muted)'
                }}>
                  {movie.release_date?.split('-')[0] || 'Unknown'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Selected Movie Details */}
      {selectedMovie && (
        <div style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: '12px',
          padding: '20px',
          border: '1px solid rgba(102, 252, 241, 0.2)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '150px 1fr',
            gap: '20px',
            marginBottom: '20px'
          }}>
            <img
              src={selectedMovie.thumbnail}
              alt={selectedMovie.title}
              style={{
                width: '150px',
                height: '225px',
                borderRadius: '8px',
                objectFit: 'cover',
                border: '1px solid rgba(102, 252, 241, 0.2)'
              }}
            />
            <div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '700',
                margin: '0 0 12px 0',
                color: '#66fcf1'
              }}>
                {selectedMovie.title}
              </h2>
              <p style={{ margin: '8px 0', color: 'var(--text-muted)', fontSize: '13px' }}>
                <strong>Year:</strong> {selectedMovie.year}
              </p>
              <p style={{ margin: '8px 0', color: 'var(--text-muted)', fontSize: '13px' }}>
                <strong>Rating:</strong> ⭐ {selectedMovie.rating}
              </p>
              <p style={{ margin: '8px 0', color: 'var(--text-muted)', fontSize: '13px' }}>
                <strong>Duration:</strong> {selectedMovie.duration}
              </p>
              <p style={{ margin: '8px 0', color: 'var(--text-muted)', fontSize: '13px' }}>
                <strong>Genre:</strong> {selectedMovie.genre}
              </p>
              <p style={{
                margin: '12px 0 0 0',
                color: 'var(--text-muted)',
                fontSize: '13px',
                lineHeight: '1.6'
              }}>
                {selectedMovie.summary.substring(0, 200)}...
              </p>
            </div>
          </div>

          {/* Cast */}
          {castData.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{
                color: 'var(--text-main)',
                fontSize: '14px',
                fontWeight: '600',
                margin: '0 0 12px 0',
                textTransform: 'uppercase'
              }}>
                Cast
              </h3>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '15px'
              }}>
                {castData.map((actor, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <img
                      src={actor.image}
                      alt={actor.name}
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid rgba(102, 252, 241, 0.3)'
                      }}
                    />
                    <p style={{
                      margin: '0',
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                      textAlign: 'center',
                      maxWidth: '100px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {actor.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px'
          }}>
            <button
              onClick={() => {
                setSelectedMovie(null);
                setCastData([]);
                setSearchQuery('');
                setSearchResults([]);
              }}
              style={{
                padding: '12px',
                background: 'rgba(102, 252, 241, 0.1)',
                color: '#66fcf1',
                border: '1px solid #66fcf1',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'inherit'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#66fcf1';
                e.target.style.color = '#000000';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgba(102, 252, 241, 0.1)';
                e.target.style.color = '#66fcf1';
              }}
            >
              Search Again
            </button>
            <button
              onClick={handleAddMovie}
              style={{
                padding: '12px',
                background: 'linear-gradient(135deg, #66fcf1, #00d4d4)',
                color: '#000000',
                border: 'none',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'inherit'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(102, 252, 241, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Add to Collection
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
