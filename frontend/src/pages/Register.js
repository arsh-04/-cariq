import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:8080/api/auth/register', {
        name, email, password
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Email may already exist.');
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
          }}>JOIN CARIQ</h1>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '14px', marginTop: '8px'
          }}>Create your free account</p>
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
          }}>FULL NAME</label>
          <input type="text" placeholder="Enter your full name"
            value={name} onChange={e => setName(e.target.value)}
            style={{
              width: '100%', padding: '14px 16px',
              background: 'var(--bg-hover)',
              border: '1px solid var(--border)',
              borderRadius: '10px', color: 'white',
              fontSize: '15px', outline: 'none',
              boxSizing: 'border-box'
            }} />
        </div>

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

        <button onClick={handleRegister} disabled={loading} style={{
          width: '100%', padding: '16px',
          background: loading ? '#888' : 'var(--primary)',
          color: 'white', border: 'none',
          borderRadius: '10px', fontSize: '18px',
          fontWeight: '700', letterSpacing: '2px',
          marginBottom: '24px',
          fontFamily: 'Rajdhani, sans-serif',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}>
          {loading ? 'CREATING...' : 'CREATE ACCOUNT'}
        </button>

        <p style={{
          textAlign: 'center', color: 'var(--text-secondary)',
          fontSize: '14px'
        }}>
          Already have an account?{' '}
          <Link to="/login" style={{
            color: 'var(--primary)', textDecoration: 'none',
            fontWeight: '600'
          }}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;