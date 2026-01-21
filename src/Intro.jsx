import { useEffect, useState } from 'react';

export function Intro({ onComplete }) {
  const [showText, setShowText] = useState(false);
  const [animationPhase, setAnimationPhase] = useState('intro'); // 'intro', 'main', 'exit'

  useEffect(() => {
    // Show text after a brief delay
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 200);

    // Start exit animation after 3.5 seconds
    const exitTimer = setTimeout(() => {
      setAnimationPhase('exit');
    }, 3500);

    // Complete intro after exit animation (4.5 seconds total)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4500);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-main)',
        minHeight: '100vh',
        color: 'var(--text-main)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        opacity: animationPhase === 'exit' ? 0 : 1,
        transition: 'opacity 1s ease-out'
      }}
    >
      {/* Main Content */}
      <div
        style={{
          textAlign: 'center',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* Emoji */}
        <div
          style={{
            fontSize: '120px',
            marginBottom: '40px',
            opacity: showText ? 1 : 0,
            transform: showText ? 'scale(1) rotate(0deg)' : 'scale(0.3) rotate(-180deg)',
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
            animation: showText ? 'spin 2s ease-in-out infinite 1s' : 'none'
          }}
        >
          🎬
        </div>

        {/* Main Text - PookieFlix */}
        <h1
          style={{
            fontSize: '72px',
            fontWeight: 'bold',
            margin: '0 0 20px 0',
            background: 'linear-gradient(135deg, #66fcf1 0%, #00d4d4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-2px',
            opacity: showText ? 1 : 0,
            transform: showText ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.8)',
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
            textShadow: 'none'
          }}
        >
          POOKIEFLIX
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '20px',
            color: 'var(--text-muted)',
            margin: '0',
            letterSpacing: '2px',
            fontWeight: '500',
            opacity: showText ? 1 : 0,
            transform: showText ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transitionDelay: '0.2s'
          }}
        >
          STREAM ANYTIME
        </p>

        {/* Loading Dots */}
        <div
          style={{
            marginTop: '60px',
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            opacity: showText ? 1 : 0,
            transform: showText ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transitionDelay: '0.3s'
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #66fcf1 0%, #00d4d4 100%)',
                animation: `bounce 1.4s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
                opacity: showText ? 1 : 0
              }}
            />
          ))}
        </div>
      </div>

      {/* Animated Background Elements */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          border: '2px solid rgba(102, 252, 241, 0.2)',
          opacity: showText ? 1 : 0,
          animation: 'rotate 20s linear infinite',
          zIndex: 1
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          border: '2px solid rgba(102, 252, 241, 0.1)',
          opacity: showText ? 1 : 0,
          animation: 'rotate 30s linear reverse infinite',
          zIndex: 0
        }}
      />

      {/* Styles */}
      <style>{`
        @keyframes spin {
          0%, 100% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(1.1) rotate(10deg);
          }
        }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          40% {
            transform: scale(0.5);
            opacity: 0.3;
          }
        }

        @keyframes rotate {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
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
