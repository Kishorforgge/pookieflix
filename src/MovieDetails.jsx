import { useState, useEffect, useRef } from 'react';

export function MovieDetails({ movie, onBack }) {
  const [movieInfo, setMovieInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const playerContainerRef = useRef(null);

  useEffect(() => {
    // Simulate AI model loading movie information
    const loadMovieInfo = async () => {
      try {
        setLoading(true);
        
        // Simulate API call delay (like fetching from AI model)
        await new Promise(resolve => setTimeout(resolve, 800));

        // Use the pre-defined movie info from movies.js
        setMovieInfo({
          title: movie.title,
          genre: movie.genre,
          rating: movie.rating,
          year: movie.year,
          cast: movie.cast,
          duration: movie.duration,
          summary: movie.summary
        });
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load movie information');
        setLoading(false);
      }
    };

    loadMovieInfo();
  }, [movie]);

  const getFileId = (url) => {
    if (url.includes('id=')) {
      const idPart = url.split('id=')[1];
      return idPart.split('&')[0].trim();
    }
    if (url.includes('/d/')) {
      return url.split('/d/')[1].split('/')[0].trim();
    }
    return url.trim();
  };

  const isValidFileId = (fileId) => {
    return fileId && 
           !fileId.includes('YOUR_FILE_ID') && 
           !fileId.includes('YOUR_VIDEO_ID') &&
           fileId.length > 10;
  };

  const getVideoUrl = (fileId) => {
    return `https://drive.google.com/file/d/${fileId}/preview?usp=embed_website`;
  };

  const handleFullscreenClick = () => {
    if (playerContainerRef.current) {
      if (!document.fullscreenElement) {
        playerContainerRef.current.requestFullscreen().catch(err => {
          console.log(`Error attempting to enable fullscreen: ${err.message}`);
          // Fallback: open in new window for fullscreen experience
          const videoUrl = getVideoUrl(getFileId(movie.url));
          window.open(videoUrl, '_blank', 'width=1280,height=720,fullscreen=yes');
        });
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Initialize Plyr when player is shown
  useEffect(() => {
    if (showPlayer && playerContainerRef.current) {
      // Request fullscreen after a small delay
      setTimeout(() => {
        if (playerContainerRef.current?.requestFullscreen) {
          playerContainerRef.current.requestFullscreen().catch(err => {
            console.log('Fullscreen request failed:', err.message);
          });
        }
      }, 100);
    }
  }, [showPlayer]);

  const fileId = getFileId(movie.url);
  const isValid = isValidFileId(fileId);

  return (
    <div style={{
      backgroundColor: 'var(--bg-main)',
      minHeight: '100vh',
      color: 'var(--text-main)',
      paddingBottom: '40px',
      animation: 'slideInFromRight 0.5s ease-out',
      overflow: 'auto',
      overscrollBehavior: 'auto'
    }}>
      {/* Back Button */}
      <button
        onClick={onBack}
        style={{
          position: 'fixed',
          top: '80px',
          left: '30px',
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
          zIndex: 50,
          backdropFilter: 'blur(4px)'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#66fcf1';
          e.target.style.color = '#000000';
          e.target.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'rgba(102, 252, 241, 0.15)';
          e.target.style.color = '#66fcf1';
          e.target.style.transform = 'scale(1)';
        }}
      >
        ← Back
      </button>

      {/* Main Content */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '30px 15px',
        overflow: 'visible'
      }}>
        {showPlayer ? (
          <>
            {/* Player View */}
            <button
              onClick={() => setShowPlayer(false)}
              style={{
                padding: '10px 20px',
                background: 'rgba(102, 252, 241, 0.1)',
                color: '#66fcf1',
                border: '1px solid #66fcf1',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'inherit',
                marginBottom: '20px',
                display: isFullscreen ? 'none' : 'block'
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
              ← Back to Details
            </button>

            {/* Player Section with Custom Styling */}
            <div style={{
              position: isFullscreen ? 'fixed' : 'relative',
              top: isFullscreen ? 0 : 'auto',
              left: isFullscreen ? 0 : 'auto',
              margin: 0,
              padding: 0,
              borderRadius: 0,
              overflow: 'hidden',
              backgroundColor: '#000000',
              boxShadow: 'none',
              animation: isFullscreen ? 'none' : 'slideUp 0.6s ease-out',
              width: '100%',
              height: isFullscreen ? '100vh' : '600px',
              zIndex: isFullscreen ? 1000 : 'auto'
            }}
            ref={playerContainerRef}
            >
              {isValid ? (
                <iframe
                  src={getVideoUrl(fileId)}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen={true}
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    display: 'block',
                    backgroundColor: '#000000'
                  }}
                  title={movie.title}
                />
              ) : (
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-muted)',
                  fontSize: '18px',
                  fontWeight: '500'
                }}>
                  ⚠️ Video URL not available. Please add a valid Google Drive file ID.
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Movie Information Section */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '40px',
              alignItems: 'start'
            }}>
              {/* Left Column - Thumbnail & Quick Info */}
              <div style={{
                animation: 'slideUp 0.7s ease-out'
              }}>
                <div style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  marginBottom: '20px',
                  boxShadow: '0 12px 40px rgba(102, 252, 241, 0.25)',
                  height: '400px'
                }}>
                  <img
                    src={movie.thumbnail}
                    alt={movie.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>

                {/* Watch Now Button */}
                <button
                  onClick={() => setShowPlayer(true)}
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: 'linear-gradient(135deg, #66fcf1 0%, #00d4d4 100%)',
                    color: '#000000',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit',
                    letterSpacing: '0.5px',
                    marginBottom: '20px',
                    boxShadow: '0 6px 20px rgba(102, 252, 241, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(102, 252, 241, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 6px 20px rgba(102, 252, 241, 0.3)';
                  }}
                >
                  ▶ Watch Now
                </button>

                {/* Quick Stats */}
                {movieInfo && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '12px'
                  }}>
                    <div style={{
                      backgroundColor: 'var(--bg-card)',
                      padding: '12px',
                      borderRadius: '12px',
                      border: '1px solid rgba(102, 252, 241, 0.2)',
                      textAlign: 'center'
                    }}>
                      <p style={{
                        color: 'var(--text-muted)',
                        fontSize: '11px',
                        fontWeight: '600',
                        margin: '0 0 6px 0',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase'
                      }}>
                        Rating
                      </p>
                      <p style={{
                        color: '#66fcf1',
                        fontSize: '18px',
                        fontWeight: '700',
                        margin: 0
                      }}>
                        ⭐ {movieInfo.rating}
                      </p>
                    </div>
                    <div style={{
                      backgroundColor: 'var(--bg-card)',
                      padding: '12px',
                      borderRadius: '12px',
                      border: '1px solid rgba(102, 252, 241, 0.2)',
                      textAlign: 'center'
                    }}>
                      <p style={{
                        color: 'var(--text-muted)',
                        fontSize: '11px',
                        fontWeight: '600',
                        margin: '0 0 6px 0',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase'
                      }}>
                        Year
                      </p>
                      <p style={{
                        color: '#66fcf1',
                        fontSize: '18px',
                        fontWeight: '700',
                        margin: 0
                      }}>
                        {movieInfo.year}
                      </p>
                    </div>
                    <div style={{
                      backgroundColor: 'var(--bg-card)',
                      padding: '12px',
                      borderRadius: '12px',
                      border: '1px solid rgba(102, 252, 241, 0.2)',
                      textAlign: 'center',
                      gridColumn: '1 / -1'
                    }}>
                      <p style={{
                        color: 'var(--text-muted)',
                        fontSize: '11px',
                        fontWeight: '600',
                        margin: '0 0 6px 0',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase'
                      }}>
                        Duration
                      </p>
                      <p style={{
                        color: '#66fcf1',
                        fontSize: '16px',
                        fontWeight: '700',
                        margin: 0
                      }}>
                        {movieInfo.duration}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Details */}
              <div style={{
                animation: 'slideUp 0.8s ease-out'
              }}>
                {loading ? (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginTop: '50px'
                  }}>
                    <div style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: '#66fcf1',
                      animation: 'pulse 1.5s ease-in-out infinite'
                    }} />
                    <span style={{ color: 'var(--text-muted)' }}>Loading movie info...</span>
                  </div>
                ) : movieInfo ? (
                  <>
                    <h1 style={{
                      color: 'var(--text-main)',
                      fontSize: '32px',
                      fontWeight: '700',
                      margin: '0 0 16px 0',
                      letterSpacing: '-0.5px'
                    }}>
                      {movieInfo.title}
                    </h1>

                    <p style={{
                      color: '#66fcf1',
                      fontSize: '14px',
                      fontWeight: '600',
                      margin: '0 0 20px 0',
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase'
                    }}>
                      {movieInfo.genre}
                    </p>

                    {/* Cast */}
                    <div style={{ marginBottom: '30px' }}>
                      <h3 style={{
                        color: 'var(--text-main)',
                        fontSize: '14px',
                        fontWeight: '600',
                        margin: '0 0 16px 0',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase'
                      }}>
                        Cast
                      </h3>
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '20px'
                      }}>
                        {movieInfo.cast && movieInfo.cast.map((actor, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              gap: '8px'
                            }}
                          >
                            <img
                              src={actor.image}
                              alt={actor.name}
                              style={{
                                width: '110px',
                                height: '110px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: '2px solid rgba(102, 252, 241, 0.3)',
                                transition: 'all 0.3s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.borderColor = '#66fcf1';
                                e.target.style.transform = 'scale(1.08)';
                                e.target.style.boxShadow = '0 4px 12px rgba(102, 252, 241, 0.3)';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.borderColor = 'rgba(102, 252, 241, 0.3)';
                                e.target.style.transform = 'scale(1)';
                                e.target.style.boxShadow = 'none';
                              }}
                            />
                            <span
                              style={{
                                color: 'var(--text-muted)',
                                fontSize: '12px',
                                fontWeight: '500',
                                textAlign: 'center',
                                maxWidth: '100px'
                              }}
                            >
                              {actor.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Summary */}
                    <div>
                      <h3 style={{
                        color: 'var(--text-main)',
                        fontSize: '14px',
                        fontWeight: '600',
                        margin: '0 0 12px 0',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase'
                      }}>
                        Story
                      </h3>
                      <p style={{
                        color: 'var(--text-muted)',
                        fontSize: '15px',
                        lineHeight: '1.8',
                        margin: 0,
                        letterSpacing: '0.3px'
                      }}>
                        {movieInfo.summary}
                      </p>
                    </div>
                  </>
                ) : (
                  error && (
                    <div style={{
                      color: '#ff6b6b',
                      fontSize: '16px',
                      fontWeight: '500'
                    }}>
                      {error}
                    </div>
                  )
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <style>{`
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

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
