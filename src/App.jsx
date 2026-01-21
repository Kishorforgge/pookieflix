import { useState, useEffect } from 'react';
import { movies } from './movies.js';
import { Intro } from './Intro.jsx';
import { Login } from './Login.jsx';
import { Home } from './Home.jsx';
import { MovieDetails } from './MovieDetails.jsx';

function App() {
  // Show intro animation first
  const [showIntro, setShowIntro] = useState(true);
  
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  
  // Navigation state
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'movies' or 'series'
  const [showAddMovie, setShowAddMovie] = useState(false);
  
  // State to track which movie is currently selected for playback
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedMovie) {
        setSelectedMovie(null);
      }
    };

    if (selectedMovie) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [selectedMovie]);

  // Helper function to extract file ID from Google Drive URL
  const getFileId = (url) => {
    // If URL contains 'id=', extract the ID
    if (url.includes('id=')) {
      const idPart = url.split('id=')[1];
      // Remove any extra query parameters after the ID (like &)
      return idPart.split('&')[0].trim();
    }
    // If URL is already just an ID or uses /d/ format
    if (url.includes('/d/')) {
      return url.split('/d/')[1].split('/')[0].trim();
    }
    // If it's already just an ID, return it directly
    return url.trim();
  };

  // Check if file ID is valid (not a placeholder)
  const isValidFileId = (fileId) => {
    // Check if it's a placeholder or invalid ID
    return fileId && 
           !fileId.includes('YOUR_FILE_ID') && 
           !fileId.includes('YOUR_VIDEO_ID') &&
           fileId.length > 10;
  };

  // Get thumbnail URL from Google Drive
  const getThumbnailUrl = (fileId) => {
    if (!isValidFileId(fileId)) {
      // Return placeholder instead of trying Google Drive URL
      return null;
    }
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`;
  };

  // Get video preview URL - use embed format for better subtitle support
  // The overlay div will block access to the popout button
  const getVideoUrl = (fileId) => {
    // Use embed format which provides better embedding experience
    return `https://drive.google.com/file/d/${fileId}/preview?usp=embed_website`;
  };

  // Handle modal close when clicking outside
  const handleModalClose = (e) => {
    // Close if clicking on backdrop
    if (e.target === e.currentTarget) {
      setSelectedMovie(null);
    }
  };

  const handleLogin = (email) => {
    const userName = email.split('@')[0];
    setUserName(userName);
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setCurrentPage('home');
    setSelectedMovie(null);
  };

  const handleSelectCategory = (category) => {
    setCurrentPage(category);
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  // If showing add movie page
  if (showAddMovie) {
    return <AddMovie 
      onBack={() => setShowAddMovie(false)}
      onMovieAdded={(newMovie) => {
        console.log('New movie added:', newMovie);
        // In a real app, you would save this to your database
        // For now, just close the dialog and show a success message
        setShowAddMovie(false);
        alert('Movie data fetched successfully! You can now add the Google Drive video ID manually to movies.js');
      }}
    />;
  }

  // If showing a movie/series, display details page
  if (selectedMovie) {
    return <MovieDetails 
      movie={selectedMovie} 
      onBack={() => setSelectedMovie(null)} 
    />;
  }

  // If not logged in, show login page
  if (!isLoggedIn) {
    if (showIntro) {
      return <Intro onComplete={() => setShowIntro(false)} />;
    }
    return <Login onLogin={handleLogin} />;
  }

  // If on home page, show home page
  if (currentPage === 'home') {
    return <Home 
      isLoggedIn={isLoggedIn} 
      userName={userName} 
      onLogout={handleLogout}
      onSelectCategory={handleSelectCategory}
    />;
  }

  // Otherwise show content page (movies or series)
  const pageTitle = currentPage === 'movies' ? 'Movies' : 'TV Series';

  return (
    <div style={{
      backgroundColor: 'var(--bg-main)',
      minHeight: '100vh',
      color: 'var(--text-main)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      {/* Header with PookieFlix Title */}
      <div style={{
        background: 'linear-gradient(135deg, #0f1729 0%, #0a0e27 100%)',
        padding: '25px 40px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 4px 20px rgba(102, 252, 241, 0.15)',
        borderBottom: '1px solid rgba(102, 252, 241, 0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '30px'
        }}>
          <h1 
            onClick={handleBackToHome}
            style={{
              color: '#ffffff',
              fontSize: '32px',
              fontWeight: '700',
              margin: 0,
              letterSpacing: '-0.5px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#66fcf1';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#ffffff';
              e.target.style.transform = 'scale(1)';
            }}
          >
            🎬 PookieFlix
          </h1>
          
          <button
            onClick={handleBackToHome}
            style={{
              padding: '10px 24px',
              background: 'rgba(102, 252, 241, 0.1)',
              color: '#66fcf1',
              border: '1px solid #66fcf1',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: 'inherit'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#66fcf1';
              e.target.style.color = '#000000';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'rgba(102, 252, 241, 0.1)';
              e.target.style.color = '#66fcf1';
              e.target.style.transform = 'scale(1)';
            }}
          >
            ← Home
          </button>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}>
          <span style={{
            color: 'var(--text-muted)',
            fontSize: '14px'
          }}>
            {pageTitle}
          </span>
          <button
            onClick={() => setShowAddMovie(true)}
            style={{
              padding: '10px 24px',
              background: 'rgba(102, 252, 241, 0.1)',
              color: '#66fcf1',
              border: '1px solid #66fcf1',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: 'inherit'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#66fcf1';
              e.target.style.color = '#000000';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'rgba(102, 252, 241, 0.1)';
              e.target.style.color = '#66fcf1';
              e.target.style.transform = 'scale(1)';
            }}
          >
            + Add Movie
          </button>
          <button
            onClick={handleLogout}
            style={{
              padding: '10px 24px',
              background: 'rgba(102, 252, 241, 0.1)',
              color: '#66fcf1',
              border: '1px solid #66fcf1',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: 'inherit'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#66fcf1';
              e.target.style.color = '#000000';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'rgba(102, 252, 241, 0.1)';
              e.target.style.color = '#66fcf1';
              e.target.style.transform = 'scale(1)';
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{
        padding: '30px 15px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Section Title */}
        <h2 style={{
          color: 'var(--text-main)',
          fontSize: '24px',
          fontWeight: '700',
          marginBottom: '15px',
          marginLeft: '10px',
          letterSpacing: '-0.5px',
          transition: 'var(--transition-base)'
        }}>
          {pageTitle}
        </h2>

        {/* Movie Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '20px',
          padding: '10px'
        }}>
          {/* Loop through movies and create cards */}
          {movies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => setSelectedMovie(movie)}
              style={{
                cursor: 'pointer',
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
                opacity: 1,
                animation: 'slideUp 0.5s ease-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.08) translateY(-8px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {/* Movie Card */}
              <div style={{
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: 'var(--bg-card)',
                boxShadow: '0 8px 24px rgba(102, 252, 241, 0.2)',
                transition: 'box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), border 0.3s ease',
                border: '1px solid rgba(102, 252, 241, 0.2)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(102, 252, 241, 0.4)';
                e.currentTarget.style.borderColor = '#66fcf1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(102, 252, 241, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(102, 252, 241, 0.2)';
              }}
              >
                {/* Thumbnail Image */}
                <div style={{
                  width: '100%',
                  height: '300px',
                  overflow: 'hidden',
                  position: 'relative',
                  backgroundColor: 'var(--bg-hover)'
                }}>
                  <img
                    src={movie.thumbnail}
                    alt={movie.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                    }}
                  />
                  
                  {/* Overlay with rating */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '13px',
                    fontWeight: '600'
                  }}>
                    <span>⭐</span>
                    <span style={{ color: '#66fcf1' }}>{movie.rating}</span>
                  </div>
                </div>
                
                {/* Movie Info */}
                <div style={{
                  padding: '16px',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <h3 style={{
                    color: 'var(--text-main)',
                    fontSize: '16px',
                    fontWeight: '600',
                    margin: '0 0 8px 0',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    transition: 'color 0.3s ease'
                  }}>
                    {movie.title}
                  </h3>
                  
                  <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '12px',
                    fontWeight: '500',
                    margin: '0 0 8px 0',
                    letterSpacing: '0.3px',
                    textTransform: 'uppercase'
                  }}>
                    {movie.genre}
                  </p>

                  <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '12px',
                    margin: '0 0 auto 0',
                    lineHeight: '1.4',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {movie.year}
                  </p>
                </div>

                {/* Play Button Overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  zIndex: 10
                }}
                onMouseEnter={(e) => {
                  e.parentElement.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.parentElement.style.opacity = '0';
                }}
                >
                  <button style={{
                    padding: '10px 20px',
                    background: 'linear-gradient(135deg, #66fcf1 0%, #00d4d4 100%)',
                    color: '#000000',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                  >
                    ▶ Watch Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Overlay - Video Player appears on top */}
      {selectedMovie && (
        <div
          onClick={handleModalClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)', // Dark semi-transparent backdrop
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            overflowY: 'auto',
            animation: 'fadeIn 0.3s ease-in'
          }}
        >
          {/* Video Player Modal */}
          <div
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            style={{
              width: '100%',
              maxWidth: '1400px',
              backgroundColor: 'var(--bg-card)',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              border: '2px solid transparent',
              backgroundImage: 'linear-gradient(var(--bg-card), var(--bg-card)), linear-gradient(135deg, #66fcf1 0%, #00d4d4 100%)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
              position: 'relative',
              animation: 'slideUp 0.4s ease-out'
            }}
          >
            {/* Close Button - Top Right (Large & Prominent) */}
            <button
              onClick={() => setSelectedMovie(null)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                padding: '12px 20px',
                borderRadius: '10px',
                border: '2px solid #66fcf1',
                backgroundColor: 'var(--bg-card)',
                color: '#66fcf1',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: 10,
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#66fcf1';
                e.target.style.color = '#000000';
                e.target.style.transform = 'scale(1.08)';
                e.target.style.boxShadow = '0 6px 16px rgba(102, 252, 241, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'var(--bg-card)';
                e.target.style.color = '#66fcf1';
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
              }}
            >
              <span style={{ fontSize: '20px' }}>✕</span>
              <span>Close</span>
            </button>

            {/* Movie Title with Icon */}
            <div style={{
              marginBottom: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              paddingRight: '140px' // Space for close button
            }}>
              <span style={{ fontSize: '32px' }}>🎥</span>
              <h2 style={{
                color: 'var(--text-main)',
                fontSize: '36px',
                fontWeight: '700',
                margin: 0,
                background: 'linear-gradient(135deg, #66fcf1 0%, #00d4d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.5px',
                transition: 'all 0.4s ease'
              }}>
                {selectedMovie.title}
              </h2>
            </div>

            {/* Video Player with Stylish Frame */}
            <div style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 12px 40px rgba(102, 126, 234, 0.25)',
              backgroundColor: '#000000',
              padding: '8px',
              background: 'linear-gradient(135deg, #667eea20 0%, #764ba220 100%)'
            }}>
              {/* Inner video container */}
              <div style={{
                position: 'relative',
                paddingBottom: '56.25%', // 16:9 aspect ratio
                height: 0,
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: '#000000'
              }}>
                <iframe
                  src={getVideoUrl(getFileId(selectedMovie.url))}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    display: 'block'
                  }}
                  title={selectedMovie.title}
                />
                {/* Overlay to block popout button area (top-right corner) - prevents access to Google Drive file */}
                <div 
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '120px',
                    height: '80px',
                    zIndex: 10,
                    cursor: 'default',
                    pointerEvents: 'auto',
                    backgroundColor: 'transparent'
                  }} 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                />
              </div>
              
              {/* Subtitles info note */}
              <div style={{
                marginTop: '15px',
                padding: '12px',
                backgroundColor: 'var(--bg-hover)',
                borderRadius: '8px',
                fontSize: '14px',
                color: 'var(--text-muted)',
                textAlign: 'left'
              }}>
                <strong>💡 Tip:</strong> If your video has embedded subtitles, they should appear automatically. 
                Use the video controls to enable/disable them.
              </div>
            </div>

            {/* Bottom Close Button - Easier to Access */}
            <button
              onClick={() => setSelectedMovie(null)}
              style={{
                marginTop: '30px',
                padding: '16px 45px',
                background: 'linear-gradient(135deg, #66fcf1 0%, #00d4d4 100%)',
                color: '#000000',
                border: 'none',
                borderRadius: '12px',
                fontSize: '17px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 6px 20px rgba(102, 252, 241, 0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                maxWidth: '300px',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-4px) scale(1.03)';
                e.target.style.boxShadow = '0 8px 25px rgba(102, 252, 241, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 6px 20px rgba(102, 252, 241, 0.4)';
              }}
            >
              <span style={{ fontSize: '20px' }}>✕</span>
              <span>Close Player (ESC)</span>
            </button>
          </div>
        </div>
      )}

      {/* Custom Scrollbar Styling for Webkit browsers (Chrome, Safari) */}
      <style>{`
        div::-webkit-scrollbar {
          height: 10px;
        }
        div::-webkit-scrollbar-track {
          background: var(--bg-main);
          border-radius: 5px;
        }
        div::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #66fcf1 0%, #00d4d4 100%);
          border-radius: 5px;
          transition: background 0.3s ease;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #00d4d4 0%, #66fcf1 100%);
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 6px 20px rgba(102, 252, 241, 0.3);
          }
          50% {
            box-shadow: 0 6px 20px rgba(102, 252, 241, 0.6);
          }
        }
        
        /* Hide Google Drive popout button and other UI elements */
        iframe[src*="drive.google.com"] {
          pointer-events: auto;
        }
      `}</style>
    </div>
  );
}

export default App;
