import { useState } from 'react';

export function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      if (email && password) {
        onLogin(email);
      }
      setIsLoading(false);
    }, 600);
  };

  return (
    <div style={{
      backgroundColor: 'var(--bg-main)',
      minHeight: '100vh',
      color: 'var(--text-main)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        animation: 'slideUp 0.5s ease-out'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '50px'
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '10px',
            background: 'linear-gradient(135deg, #66fcf1 0%, #00d4d4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.5px'
          }}>
            🎬 PookieFlix
          </h1>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '16px',
            margin: 0
          }}>
            Stream movies & series anytime
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 8px 32px rgba(102, 252, 241, 0.15)',
          border: '1px solid rgba(102, 252, 241, 0.1)',
          animation: 'fadeIn 0.6s ease-out'
        }}>
          {/* Email Input */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              color: 'var(--text-main)',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px',
              letterSpacing: '0.5px'
            }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid rgba(102, 252, 241, 0.2)',
                borderRadius: '10px',
                backgroundColor: 'rgba(102, 252, 241, 0.05)',
                color: 'var(--text-main)',
                fontSize: '16px',
                transition: 'all 0.3s ease',
                outline: 'none',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#66fcf1';
                e.target.style.backgroundColor = 'rgba(102, 252, 241, 0.1)';
                e.target.style.boxShadow = '0 0 0 3px rgba(102, 252, 241, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(102, 252, 241, 0.2)';
                e.target.style.backgroundColor = 'rgba(102, 252, 241, 0.05)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Password Input */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{
              display: 'block',
              color: 'var(--text-main)',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px',
              letterSpacing: '0.5px'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid rgba(102, 252, 241, 0.2)',
                borderRadius: '10px',
                backgroundColor: 'rgba(102, 252, 241, 0.05)',
                color: 'var(--text-main)',
                fontSize: '16px',
                transition: 'all 0.3s ease',
                outline: 'none',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#66fcf1';
                e.target.style.backgroundColor = 'rgba(102, 252, 241, 0.1)';
                e.target.style.boxShadow = '0 0 0 3px rgba(102, 252, 241, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(102, 252, 241, 0.2)';
                e.target.style.backgroundColor = 'rgba(102, 252, 241, 0.05)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(135deg, #66fcf1 0%, #00d4d4 100%)',
              color: '#000000',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 4px 15px rgba(102, 252, 241, 0.3)',
              opacity: isLoading ? 0.8 : 1,
              transform: isLoading ? 'scale(0.98)' : 'scale(1)'
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.target.style.transform = 'translateY(-2px) scale(1.01)';
                e.target.style.boxShadow = '0 6px 20px rgba(102, 252, 241, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 4px 15px rgba(102, 252, 241, 0.3)';
              }
            }}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          {/* Demo Text */}
          <p style={{
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontSize: '13px',
            marginTop: '20px',
            lineHeight: '1.5'
          }}>
            Demo login: use any email & password
          </p>
        </form>

        {/* Footer */}
        <p style={{
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '14px',
          marginTop: '30px'
        }}>
          © 2026 PookieFlix. All rights reserved.
        </p>
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
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
