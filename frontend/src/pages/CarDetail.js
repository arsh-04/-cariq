import API_URL from '../config';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/cars/${id}`)
      .then(res => { setCar(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div style={{
      paddingTop: '70px', minHeight: '100vh',
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', fontSize: '18px',
      color: 'var(--text-secondary)'
    }}>Loading...</div>
  );

  if (!car) return (
    <div style={{
      paddingTop: '70px', minHeight: '100vh',
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', fontSize: '18px',
      color: 'var(--text-secondary)'
    }}>Car not found</div>
  );

  const specs = [
    { label: 'BRAND', value: car.brand },
    { label: 'YEAR', value: car.year },
    { label: 'FUEL', value: car.fuel },
    { label: 'TRANSMISSION', value: car.transmission },
    { label: 'KM DRIVEN', value: `${car.kmDriven?.toLocaleString()} km` },
    { label: 'ENGINE', value: car.engine },
    { label: 'MAX POWER', value: car.maxPower },
    { label: 'SEATS', value: car.seats },
    { label: 'OWNER', value: car.owner },
    { label: 'SELLER', value: car.sellerType },
  ];

  const formatPrice = (price) => {
    if (!price) return 'N/A';
    if (price >= 100000) return `₹${(price / 100000).toFixed(2)} Lakh`;
    return `₹${price?.toLocaleString()}`;
  };

  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh', padding: '100px 40px 60px' }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          background: 'transparent',
          border: '1px solid var(--border)',
          color: 'var(--text-secondary)',
          padding: '10px 20px',
          borderRadius: '8px',
          marginBottom: '40px',
          fontSize: '14px',
          letterSpacing: '1px'
        }}>← BACK</button>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '48px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Left */}
        <div>
          <div style={{
            width: '100%',
            height: '320px',
            background: 'linear-gradient(135deg, #111, #1a1a1a)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '120px',
            marginBottom: '32px',
            border: '1px solid var(--border)'
          }}>
            {car.fuel === 'Electric' ? '⚡' : '🚗'}
          </div>

          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--primary)',
            borderRadius: '16px',
            padding: '32px',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '14px',
              color: 'var(--text-secondary)',
              letterSpacing: '2px',
              marginBottom: '8px',
              fontFamily: 'Rajdhani, sans-serif'
            }}>ASKING PRICE</div>
            <div style={{
              fontSize: '48px',
              fontWeight: '700',
              color: 'var(--primary)',
              fontFamily: 'Rajdhani, sans-serif'
            }}>{formatPrice(car.sellingPrice)}</div>
          </div>
        </div>

        {/* Right */}
        <div>
          <div style={{
            fontSize: '14px',
            color: 'var(--primary)',
            letterSpacing: '3px',
            marginBottom: '8px',
            fontFamily: 'Rajdhani, sans-serif'
          }}>{car.brand?.toUpperCase()}</div>

          <h1 style={{
            fontSize: '48px',
            fontWeight: '700',
            fontFamily: 'Rajdhani, sans-serif',
            marginBottom: '32px',
            lineHeight: '1.1'
          }}>{car.name}</h1>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px'
          }}>
            {(Array.isArray(specs) ? specs : []).map((spec, i) => (
              <div key={i} style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '16px 20px'
              }}>
                <div style={{
                  fontSize: '11px',
                  color: 'var(--text-secondary)',
                  letterSpacing: '2px',
                  marginBottom: '6px',
                  fontFamily: 'Rajdhani, sans-serif'
                }}>{spec.label}</div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  fontFamily: 'Rajdhani, sans-serif'
                }}>{spec.value || 'N/A'}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;