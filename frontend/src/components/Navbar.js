import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    const u = localStorage.getItem('user');
    if (u) setUser(JSON.parse(u));
    return () => window.removeEventListener('scroll', onScroll);
  }, [location]);

  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate('/');
  };

  const active = (p) => location.pathname === p;

  const links = [
    { path: '/', label: 'Home' },
    { path: '/cars', label: 'Explore' },
    { path: '/advisor', label: 'AI Advisor' },
    { path: '/about', label: 'About' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
      height: '64px', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '0 32px',
      background: scrolled ? 'rgba(7,7,7,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(24px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      transition: 'all 0.3s ease'
    }}>
      {/* Logo */}
      <Link to="/" style={{
        textDecoration: 'none', display: 'flex',
        alignItems: 'center', gap: '10px'
      }}>
        <div style={{
          width: '32px', height: '32px', background: 'var(--red)',
          borderRadius: '8px', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Syne, sans-serif', fontWeight: '800',
          fontSize: '16px', color: '#fff'
        }}>C</div>
        <span style={{
          fontFamily: 'Syne, sans-serif', fontWeight: '800',
          fontSize: '20px', color: '#fff', letterSpacing: '-0.5px'
        }}>CarIQ</span>
      </Link>

      {/* Links */}
      <div style={{ display: 'flex', gap: '4px' }}>
        {(Array.isArray(links) ? links : []).map(({ path, label }) => (
          <Link key={path} to={path} style={{
            textDecoration: 'none', padding: '6px 14px',
            borderRadius: '8px', fontSize: '14px',
            fontFamily: 'DM Sans, sans-serif', fontWeight: '500',
            color: active(path) ? '#fff' : 'var(--text-2)',
            background: active(path) ? 'var(--bg-2)' : 'transparent',
            transition: 'all 0.15s'
          }}
            onMouseEnter={e => !active(path) && (e.target.style.color = '#fff')}
            onMouseLeave={e => !active(path) && (e.target.style.color = 'var(--text-2)')}
          >{label}</Link>
        ))}
      </div>

      {/* Auth */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        {user ? (
          <>
            <span
              onClick={() => navigate('/dashboard')}
              style={{
                fontSize: '14px', color: 'var(--text-2)',
                cursor: 'pointer', fontFamily: 'DM Sans, sans-serif'
              }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = 'var(--text-2)'}
            >Hi, {user.name?.split(' ')[0]} →</span>
            <button onClick={logout} style={{
              padding: '7px 18px', background: 'transparent',
              color: 'var(--red)', border: '1px solid var(--red-border)',
              borderRadius: '8px', fontSize: '13px',
              fontFamily: 'Syne, sans-serif', fontWeight: '600'
            }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{
              textDecoration: 'none', padding: '7px 18px',
              color: 'var(--text-2)', fontSize: '14px',
              fontFamily: 'DM Sans, sans-serif', fontWeight: '500',
              border: '1px solid var(--border)', borderRadius: '8px',
              transition: 'all 0.15s'
            }}>Login</Link>
            <Link to="/register" style={{
              textDecoration: 'none', padding: '7px 18px',
              background: 'var(--red)', color: '#fff',
              fontSize: '14px', borderRadius: '8px',
              fontFamily: 'Syne, sans-serif', fontWeight: '600'
            }}>Get started</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;