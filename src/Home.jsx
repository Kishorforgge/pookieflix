import { useState } from 'react';

export function Home({ isLoggedIn, userName, onLogout, onSelectCategory, onSelectMovie }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  const categoryCards = [
    {
      id: 'movies',
      title: 'Movies',
      emoji: '🎬',
      description: 'Blockbusters & Classics',
      color: 'linear-gradient(135deg, #66fcf1 0%, #00d4d4 100%)',
      shadowColor: 'rgba(102, 252, 241, 0.4)'
    },
    {
      id: 'series',
      title: 'TV Series',
      emoji: '📺',
      description: 'Binge-worthy Shows',
      color: 'linear-gradient(135deg, #00d4d4 0%, #66fcf1 100%)',
      shadowColor: 'rgba(102, 252, 241, 0.3)'
    }
  ];

  if (selectedCategory) {
    return null; // Parent component will handle showing the content
  }

  return (
    <div style={{
      backgroundColor: 'var(--bg-main)',
      minHeight: '100vh',
      color: 'var(--text-main)',
      paddingBottom: '40px'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0f1729 0%, #0a0e27 100%)',
        padding: '30px 40px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 4px 20px rgba(102, 252, 241, 0.15)',
        borderBottom: '1px solid rgba(102, 252, 241, 0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{
          color: '#ffffff',
          fontSize: '32px',
          fontWeight: '700',
          margin: 0,
          letterSpacing: '-0.5px'
        }}>
          🎬 PookieFlix
        </h1>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}>
          <span style={{
            color: 'var(--text-muted)',
            fontSize: '14px'
          }}>
            Welcome, {userName || 'Guest'}
          </span>
          <button
            onClick={onLogout}
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

      {/* Main Content */}
      <div style={{
        padding: '60px 40px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Welcome Section */}
        <div style={{
          marginBottom: '80px',
          textAlign: 'center',
          animation: 'fadeIn 0.6s ease-out'
        }}>
          <h2 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '16px',
            letterSpacing: '-0.5px',
            background: 'linear-gradient(135deg, #66fcf1 0%, #00d4d4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            What are you in the mood for?
          </h2>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '18px',
            margin: 0,
            letterSpacing: '0.3px'
          }}>
            Choose your entertainment type and start watching
          </p>
        </div>

        {/* Category Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          marginBottom: '60px'
        }}>
          {categoryCards.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              style={{
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                animation: 'slideUp 0.6s ease-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}
            >
              <div style={{
                background: category.color,
                borderRadius: '16px',
                padding: '60px 40px',
                textAlign: 'center',
                boxShadow: `0 8px 32px ${category.shadowColor}`,
                transition: 'all 0.3s ease',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                minHeight: '280px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  fontSize: '72px',
                  marginBottom: '20px',
                  animation: 'bounce 2s ease-in-out infinite'
                }}>
                  {category.emoji}
                </div>
                <h3 style={{
                  color: '#000000',
                  fontSize: '32px',
                  fontWeight: 'bold',
                  margin: '0 0 12px 0',
                  letterSpacing: '-0.3px'
                }}>
                  {category.title}
                </h3>
                <p style={{
                  color: 'rgba(0, 0, 0, 0.7)',
                  fontSize: '16px',
                  margin: 0,
                  fontWeight: '500'
                }}>
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: '16px',
          padding: '40px',
          border: '1px solid rgba(102, 252, 241, 0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{
            color: 'var(--text-main)',
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '12px',
            margin: 0
          }}>
            📍 Over 1000+ Titles
          </h3>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '16px',
            margin: '12px 0 0 0',
            letterSpacing: '0.2px'
          }}>
            Stream movies and series anytime, anywhere. No ads, no interruptions.
          </p>
        </div>
      </div>

      <style>{`
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

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}
