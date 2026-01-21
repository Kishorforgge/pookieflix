import { useState, useEffect } from 'react';
import { movies } from './movies.js';

function App() {
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
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
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

  return (
    <div style={{
      backgroundColor: '#f5f7fa',
      minHeight: '100vh',
      color: '#2d3748',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      {/* Header with PookieFlix Title */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '25px 40px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          color: '#ffffff',
          fontSize: '36px',
          fontWeight: '700',
          margin: 0,
          letterSpacing: '-0.5px'
        }}>
          🎬 PookieFlix
        </h1>
      </div>

      {/* Main Content Area */}
      <div style={{
        padding: '50px 20px',
        maxWidth: '1600px',
        margin: '0 auto'
      }}>
        {/* Section Title */}
        <h2 style={{
          color: '#1a202c',
          fontSize: '28px',
          fontWeight: '700',
          marginBottom: '25px',
          marginLeft: '20px'
        }}>
          Popular Movies
        </h2>

        {/* Horizontal Scrolling Movie Cards Row */}
        <div style={{
          display: 'flex',
          overflowX: 'auto',
          gap: '20px',
          padding: '20px',
          scrollbarWidth: 'thin',
          scrollbarColor: '#667eea #f5f7fa'
        }}>
          {/* Loop through movies and create cards */}
          {movies.map((movie) => {
            const fileId = getFileId(movie.url);
            const isSelected = selectedMovie?.id === movie.id;
            const thumbnailUrl = getThumbnailUrl(fileId);
            const hasValidThumbnail = isValidFileId(fileId);

            return (
              <div
                key={movie.id}
                onClick={() => {
                  // Only allow click if movie has valid file ID
                  if (hasValidThumbnail) {
                    setSelectedMovie(movie);
                  }
                }}
                style={{
                  minWidth: '220px',
                  cursor: hasValidThumbnail ? 'pointer' : 'not-allowed',
                  transition: 'transform 0.2s ease',
                  transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                  opacity: hasValidThumbnail ? 1 : 0.6
                }}
                onMouseEnter={(e) => {
                  if (!isSelected && hasValidThumbnail) {
                    e.currentTarget.style.transform = 'scale(1.05) translateY(-3px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'scale(1)';
                  }
                }}
              >
                {/* Movie Card */}
                <div style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: '#ffffff',
                  boxShadow: isSelected 
                    ? '0 8px 24px rgba(102, 126, 234, 0.4)'
                    : '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'box-shadow 0.2s ease',
                  border: isSelected ? '2px solid #667eea' : '1px solid #e2e8f0'
                }}>
                  {/* Thumbnail Image */}
                  {thumbnailUrl ? (
                    <img
                      src={thumbnailUrl}
                      alt={movie.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '320px',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                      onError={(e) => {
                        // Prevent flickering by setting a placeholder and not changing again
                        if (!e.target.dataset.errored) {
                          e.target.dataset.errored = 'true';
                          e.target.src = `https://via.placeholder.com/220x320/f5f7fa/667eea?text=${encodeURIComponent(movie.title)}`;
                        }
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '320px',
                      backgroundColor: '#e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#667eea',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}>
                      {movie.title}
                    </div>
                  )}
                  
                  {/* Movie Title Overlay */}
                  <div style={{
                    padding: '18px',
                    backgroundColor: '#ffffff'
                  }}>
                    <h3 style={{
                      color: '#2d3748',
                      fontSize: '17px',
                      fontWeight: '600',
                      margin: 0,
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden'
                    }}>
                      {movie.title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
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
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              border: '2px solid transparent',
              backgroundImage: 'linear-gradient(#ffffff, #ffffff), linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
                border: '2px solid #667eea',
                backgroundColor: '#ffffff',
                color: '#667eea',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
                zIndex: 10,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#667eea';
                e.target.style.color = '#ffffff';
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#ffffff';
                e.target.style.color = '#667eea';
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
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
                color: '#1a202c',
                fontSize: '36px',
                fontWeight: '700',
                margin: 0,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
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
                backgroundColor: '#f7fafc',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#4a5568',
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
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '17px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                maxWidth: '300px',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px) scale(1.02)';
                e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
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
          background: #f1f5f9;
          border-radius: 5px;
        }
        div::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 5px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
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
        
        /* Hide Google Drive popout button and other UI elements */
        iframe[src*="drive.google.com"] {
          pointer-events: auto;
        }
      `}</style>
    </div>
  );
}

export default App;
