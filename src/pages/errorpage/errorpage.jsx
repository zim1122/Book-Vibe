import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    let animId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 120, 255, ${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  const styles = {
    wrapper: {
      minHeight: '100vh',
      background: '#0a0a0f',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Georgia', serif",
      position: 'relative',
      overflow: 'hidden',
    },
    canvas: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
    },
    glow: {
      position: 'absolute',
      width: 520,
      height: 520,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(120,60,220,0.18) 0%, transparent 70%)',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -60%)',
      pointerEvents: 'none',
    },
    card: {
      position: 'relative',
      zIndex: 2,
      textAlign: 'center',
      padding: '3.5rem 3rem 3rem',
      maxWidth: 480,
      width: '90%',
      border: '0.5px solid rgba(160, 100, 255, 0.25)',
      borderRadius: 20,
      background: 'rgba(255,255,255,0.03)',
      backdropFilter: 'blur(12px)',
    },
    codeRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 14,
      marginBottom: '1.5rem',
    },
    divider: {
      width: 1,
      height: 40,
      background: 'rgba(160,100,255,0.35)',
    },
    code: {
      fontSize: 52,
      fontWeight: 700,
      color: '#c084fc',
      letterSpacing: '-2px',
      lineHeight: 1,
      fontFamily: "'Georgia', serif",
    },
    label: {
      fontSize: 13,
      color: 'rgba(200,180,255,0.5)',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      fontFamily: "'Helvetica Neue', sans-serif",
      lineHeight: 1.4,
      textAlign: 'left',
    },
    title: {
      fontSize: 22,
      fontWeight: 500,
      color: '#f0e8ff',
      marginBottom: '0.75rem',
      letterSpacing: '-0.3px',
    },
    desc: {
      fontSize: 15,
      color: 'rgba(220,200,255,0.5)',
      lineHeight: 1.7,
      fontFamily: "'Helvetica Neue', sans-serif",
      marginBottom: '2.5rem',
    },
    btnRow: {
      display: 'flex',
      gap: 12,
      justifyContent: 'center',
    },
    btnPrimary: {
      padding: '10px 24px',
      borderRadius: 10,
      border: 'none',
      background: '#7c3aed',
      color: '#fff',
      fontSize: 14,
      fontFamily: "'Helvetica Neue', sans-serif",
      cursor: 'pointer',
      letterSpacing: '0.01em',
      transition: 'background 0.2s',
    },
    btnSecondary: {
      padding: '10px 24px',
      borderRadius: 10,
      border: '0.5px solid rgba(160,100,255,0.35)',
      background: 'transparent',
      color: 'rgba(200,180,255,0.7)',
      fontSize: 14,
      fontFamily: "'Helvetica Neue', sans-serif",
      cursor: 'pointer',
      letterSpacing: '0.01em',
    },
    footer: {
      marginTop: '2.5rem',
      fontSize: 12,
      color: 'rgba(200,180,255,0.25)',
      fontFamily: "'Helvetica Neue', sans-serif",
      letterSpacing: '0.05em',
    },
  };

  return (
    <div style={styles.wrapper}>
      <canvas ref={canvasRef} style={styles.canvas} />
      <div style={styles.glow} />
      <div style={styles.card}>
        <div style={styles.codeRow}>
          <span style={styles.code}>404</span>
          <div style={styles.divider} />
          <div style={styles.label}>
            Page<br />Not Found
          </div>
        </div>

        <h1 style={styles.title}>You've wandered off the map</h1>
        <p style={styles.desc}>
          The page you're looking for doesn't exist or has been moved.
          Let's get you back somewhere familiar.
        </p>

        <div style={styles.btnRow}>
          <button
            style={styles.btnPrimary}
            onClick={() => window.history.back()}
            onMouseEnter={e => (e.target.style.background = '#6d28d9')}
            onMouseLeave={e => (e.target.style.background = '#7c3aed')}
          >
            Go Back
          </button>
          <button
            style={styles.btnSecondary}
            onClick={() => (window.location.href = '/')}
          >
            Home
          </button>
        </div>

        <p style={styles.footer}>error · ref #404 · null</p>
      </div>
    </div>
  );
};

export default ErrorPage;
