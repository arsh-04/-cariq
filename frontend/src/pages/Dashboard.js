import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [recentCars, setRecentCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) { navigate('/login'); return; }
    setUser(JSON.parse(stored));
    axios.get('http://localhost:8080/api/cars/new')
      .then(res => setRecentCars(res.data.slice(0, 6)));
  }, []);

  const formatPrice = (price) => {
    if (!price) return 'N/A';
    if (price >= 100000) return `₹${(price / 100000).toFixed(1)}L`;
    return `₹${price.toLocaleString()}`;
  };

  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh', padding: '100px 40px 60px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Welcome */}
        <div style={{
          background: 'linear-gradient(135deg, var(--primary), #c1121f)',
          borderRadius: '20px', padding: '40px',
          marginBottom: '40px', position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute', right: '40px', top: '50%',
            transform: 'translateY(-50%)', fontSize: '80px', opacity: 0.3
          }}>🚗</div>
          <h1 style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: '40px', fontWeight: '700',
            marginBottom: '8px'
          }}>Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px' }}>
            Find your perfect car today with CarIQ AI
          </p>
          <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
            <button onClick={() => navigate('/advisor')} style={{
              padding: '12px 24px', background: 'white',
              color: 'var(--primary)', border: 'none',
              borderRadius: '8px', fontFamily: 'Rajdhani, sans-serif',
              fontWeight: '700', fontSize: '14px', letterSpacing: '1px',
              cursor: 'pointer'
            }}>🤖 AI ADVISOR</button>
            <button onClick={() => navigate('/cars')} style={{
              padding: '12px 24px', background: 'transparent',
              color: 'white', border: '2px solid white',
              borderRadius: '8px', fontFamily: 'Rajdhani, sans-serif',
              fontWeight: '700', fontSize: '14px', letterSpacing: '1px',
              cursor: 'pointer'
            }}>🔍 EXPLORE CARS</button>
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px', marginBottom: '40px'
        }}>
          {[
            { icon: '🚗', label: 'Total Cars', value: '2000+' },
            { icon: '🏪', label: 'New Cars', value: '150+' },
            { icon: '🤖', label: 'AI Powered', value: 'Yes' },
            { icon: '💰', label: 'Free to Use', value: '100%' },
          ].map((stat, i) => (
            <div key={i} style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '16px', padding: '24px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{stat.icon}</div>
              <div style={{
                fontSize: '28px', fontWeight: '700',
                fontFamily: 'Rajdhani, sans-serif',
                color: 'var(--primary)', marginBottom: '4px'
              }}>{stat.value}</div>
              <div style={{
                fontSize: '13px', color: 'var(--text-secondary)',
                letterSpacing: '1px', fontFamily: 'Rajdhani, sans-serif'
              }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* New Cars Section */}
        <h2 style={{
          fontFamily: 'Rajdhani, sans-serif', fontSize: '32px',
          marginBottom: '24px'
        }}>🏪 NEW SHOWROOM CARS</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px', marginBottom: '40px'
        }}>
          {(Array.isArray(recentCars) ? recentCars : []).map(car => (
            <div key={car.id}
              onClick={() => navigate(`/cars/${car.id}`)}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '16px', padding: '24px',
                cursor: 'pointer', transition: 'all 0.3s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                width: '100%', height: '100px',
                background: 'linear-gradient(135deg, #1a1a1a, #222)',
                borderRadius: '12px', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: '48px', marginBottom: '16px'
              }}>
                {car.fuel === 'Electric' ? '⚡' : '🚗'}
              </div>
              <div style={{
                fontSize: '11px', color: 'var(--primary)',
                fontFamily: 'Rajdhani, sans-serif',
                letterSpacing: '2px', marginBottom: '4px'
              }}>{car.brand?.toUpperCase()}</div>
              <h3 style={{
                fontSize: '16px', fontWeight: '600',
                fontFamily: 'Rajdhani, sans-serif', marginBottom: '12px'
              }}>{car.name}</h3>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', paddingTop: '12px',
                borderTop: '1px solid var(--border)'
              }}>
                <div style={{
                  fontSize: '20px', fontWeight: '700',
                  fontFamily: 'Rajdhani, sans-serif',
                  color: 'var(--primary)'
                }}>{formatPrice(car.sellingPrice)}</div>
                <span style={{
                  background: 'rgba(46,204,113,0.1)',
                  border: '1px solid rgba(46,204,113,0.3)',
                  borderRadius: '100px', padding: '3px 10px',
                  fontSize: '11px', color: '#2ecc71'
                }}>🏪 NEW</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <h2 style={{
          fontFamily: 'Rajdhani, sans-serif', fontSize: '32px',
          marginBottom: '24px'
        }}>⚡ QUICK ACTIONS</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {[
            { icon: '🤖', title: 'AI Car Advisor', desc: 'Answer 8 questions get perfect recommendations', path: '/advisor', color: '#E63946' },
            { icon: '🔍', title: 'Explore All Cars', desc: 'Browse 2000+ cars with smart filters', path: '/cars', color: '#3498db' },
            { icon: '💬', title: 'AI Chatbot', desc: 'Ask anything about cars instantly', path: '/', color: '#2ecc71' },
          ].map((action, i) => (
            <div key={i}
              onClick={() => navigate(action.path)}
              style={{
                background: 'var(--bg-card)',
                border: `1px solid ${action.color}33`,
                borderRadius: '16px', padding: '28px',
                cursor: 'pointer', transition: 'all 0.3s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = action.color;
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = `${action.color}33`;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>{action.icon}</div>
              <h3 style={{
                fontFamily: 'Rajdhani, sans-serif', fontSize: '20px',
                marginBottom: '8px', color: action.color
              }}>{action.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                {action.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
