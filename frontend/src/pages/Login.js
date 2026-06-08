import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', {
        email, password
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      padding: '20px', background: 'var(--bg-dark)'
    }}>
      <div style={{
        width: '100%', maxWidth: '420px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '20px', padding: '48px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '56px', height: '56px',
            background: 'var(--primary)', borderRadius: '14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '24px', fontWeight: '900',
            fontFamily: 'Rajdhani, sans-serif',
            color: 'white', margin: '0 auto 16px'
          }}>C</div>
          <h1 style={{
            fontSize: '32px', fontFamily: 'Rajdhani, sans-serif',
            fontWeight: '700', color: 'white'
          }}>WELCOME BACK</h1>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '14px', marginTop: '8px'
          }}>Sign in to your CarIQ account</p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(230,57,70,0.1)',
            border: '1px solid rgba(230,57,70,0.3)',
            borderRadius: '8px', padding: '12px 16px',
            marginBottom: '24px', color: 'var(--primary)',
            fontSize: '14px', textAlign: 'center'
          }}>{error}</div>
        )}

        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block', marginBottom: '8px',
            fontSize: '12px', letterSpacing: '2px',
            color: 'var(--text-secondary)',
            fontFamily: 'Rajdhani, sans-serif'
          }}>EMAIL</label>
          <input type="email" placeholder="Enter your email"
            value={email} onChange={e => setEmail(e.target.value)}
            style={{
              width: '100%', padding: '14px 16px',
              background: 'var(--bg-hover)',
              border: '1px solid var(--border)',
              borderRadius: '10px', color: 'white',
              fontSize: '15px', outline: 'none',
              boxSizing: 'border-box'
            }} />
        </div>

        <div style={{ marginBottom: '32px' }}>
          <label style={{
            display: 'block', marginBottom: '8px',
            fontSize: '12px', letterSpacing: '2px',
            color: 'var(--text-secondary)',
            fontFamily: 'Rajdhani, sans-serif'
          }}>PASSWORD</label>
          <input type="password" placeholder="Enter your password"
            value={password} onChange={e => setPassword(e.target.value)}
            style={{
              width: '100%', padding: '14px 16px',
              background: 'var(--bg-hover)',
              border: '1px solid var(--border)',
              borderRadius: '10px', color: 'white',
              fontSize: '15px', outline: 'none',
              boxSizing: 'border-box'
            }} />
        </div>

        <button onClick={handleLogin} disabled={loading} style={{
          width: '100%', padding: '16px',
          background: loading ? '#888' : 'var(--primary)',
          color: 'white', border: 'none',
          borderRadius: '10px', fontSize: '18px',
          fontWeight: '700', letterSpacing: '2px',
          marginBottom: '24px',
          fontFamily: 'Rajdhani, sans-serif',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}>
          {loading ? 'SIGNING IN...' : 'SIGN IN'}
        </button>

        <p style={{
          textAlign: 'center', color: 'var(--text-secondary)',
          fontSize: '14px'
        }}>
          Don't have an account?{' '}
          <Link to="/register" style={{
            color: 'var(--primary)', textDecoration: 'none',
            fontWeight: '600'
          }}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;