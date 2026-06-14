import API_URL from '../config';
import React, { useState } from 'react';
import axios from 'axios';

const questions = [
  { id: 'budget', question: '💰 What is your total budget?', options: ['Under ₹3 Lakh', '₹3-5 Lakh', '₹5-8 Lakh', '₹8-12 Lakh', '₹12-20 Lakh', 'Above ₹20 Lakh'] },
  { id: 'purpose', question: '🎯 What is your purpose?', options: ['Daily city commute', 'Highway travel', 'Family use', 'Adventure/offroad', 'Business/luxury'] },
  { id: 'familySize', question: '👨‍👩‍👧 Family size?', options: ['1-2 people', '3-4 people', '5-6 people', '7+ people'] },
  { id: 'fuel', question: '⛽ Fuel preference?', options: ['Petrol', 'Diesel', 'Electric', 'CNG', 'No preference'] },
  { id: 'transmission', question: '⚙️ Transmission?', options: ['Manual', 'Automatic', 'No preference'] },
  { id: 'ownership', question: '🔑 New or second-hand?', options: ['First owner preferred', 'Second owner is fine', 'Any'] },
  { id: 'mileage', question: '📍 Daily km driven?', options: ['Less than 20km', '20-50km', '50-100km', 'More than 100km'] },
  { id: 'condition', question: '🚗 Car condition priority?', options: ['Low km driven', 'Recent year (2020+)', 'Lowest price', 'Best overall value'] },
];

const budgetToPrice = {
  'Under ₹3 Lakh': { min: 0, max: 300000 },
  '₹3-5 Lakh': { min: 300000, max: 500000 },
  '₹5-8 Lakh': { min: 500000, max: 800000 },
  '₹8-12 Lakh': { min: 800000, max: 1200000 },
  '₹12-20 Lakh': { min: 1200000, max: 2000000 },
  'Above ₹20 Lakh': { min: 2000000, max: 99999999 },
};

const Advisor = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleAnswer = (value) => {
    const updated = { ...answers, [questions[step].id]: value };
    setAnswers(updated);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      fetchRecommendations(updated);
    }
  };

  const fetchRecommendations = async (data) => {
    setLoading(true);
    setDone(true);
    try {
      const price = budgetToPrice[data.budget] || { min: 0, max: 9999999 };

      const allRes = await axios.get('${API_URL}/api/cars');
      let results = allRes.data;

      // Filter by price
      results = results.filter(c =>
        c.sellingPrice >= price.min && c.sellingPrice <= price.max
      );

      // Filter by fuel
      if (data.fuel && data.fuel !== 'No preference') {
        const filtered = results.filter(c =>
          c.fuel?.toLowerCase() === data.fuel.toLowerCase()
        );
        if (filtered.length > 5) results = filtered;
      }

      // Filter by transmission
      if (data.transmission && data.transmission !== 'No preference') {
        const filtered = results.filter(c =>
          c.transmission?.toLowerCase() === data.transmission.toLowerCase()
        );
        if (filtered.length > 5) results = filtered;
      }

      // Filter by family size → seats
      if (data.familySize === '7+ people') {
        const filtered = results.filter(c => c.seats >= 7);
        if (filtered.length > 3) results = filtered;
      } else if (data.familySize === '5-6 people') {
        const filtered = results.filter(c => c.seats >= 5);
        if (filtered.length > 3) results = filtered;
      }

      // Filter by ownership
      if (data.ownership === 'First owner preferred') {
        const filtered = results.filter(c =>
          c.owner?.toLowerCase().includes('first')
        );
        if (filtered.length > 5) results = filtered;
      }

      // Sort by condition priority
      if (data.condition === 'Low km driven') {
        results.sort((a, b) => (a.kmDriven || 0) - (b.kmDriven || 0));
      } else if (data.condition === 'Recent year (2020+)') {
        results = results.filter(c => c.year >= 2020);
        results.sort((a, b) => (b.year || 0) - (a.year || 0));
      } else if (data.condition === 'Lowest price') {
        results.sort((a, b) => (a.sellingPrice || 0) - (b.sellingPrice || 0));
      } else {
        // Best overall value — balance price + km
        results.sort((a, b) => {
          const scoreA = (a.sellingPrice || 0) + (a.kmDriven || 0) * 2;
          const scoreB = (b.sellingPrice || 0) + (b.kmDriven || 0) * 2;
          return scoreA - scoreB;
        });
      }

      setCars(results.slice(0, 12));
    } catch (e) {
      console.error(e);
      setCars([]);
    }
    setLoading(false);
  };

  const formatPrice = (price) => {
    if (!price) return 'N/A';
    if (price >= 100000) return `₹${(price / 100000).toFixed(1)}L`;
    return `₹${price?.toLocaleString()}`;
  };

  const calcEMI = (price) => {
    if (!price) return 'N/A';
    const rate = 0.09 / 12;
    const months = 60;
    const emi = (price * rate * Math.pow(1 + rate, months)) /
      (Math.pow(1 + rate, months) - 1);
    return `₹${Math.round(emi / 1000)}K/mo`;
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setCars([]);
    setDone(false);
  };

  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh', padding: '100px 40px 60px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(230,57,70,0.1)',
            border: '1px solid rgba(230,57,70,0.3)',
            borderRadius: '100px', padding: '6px 20px',
            marginBottom: '20px', fontSize: '13px',
            color: 'var(--primary)', fontFamily: 'Rajdhani, sans-serif',
            letterSpacing: '2px', fontWeight: '600'
          }}>🤖 AI CAR ADVISOR</div>
          <h1 style={{
            fontSize: '56px', fontWeight: '700',
            fontFamily: 'Rajdhani, sans-serif', marginBottom: '16px'
          }}>FIND YOUR
            <span style={{ color: 'var(--primary)' }}> PERFECT CAR</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
            Answer {questions.length} quick questions — our AI recommends the best cars for you
          </p>
        </div>

        {/* Question Flow */}
        {!done && (
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '24px', padding: '48px',
            textAlign: 'center'
          }}>
            {/* Progress Bar */}
            <div style={{
              display: 'flex', gap: '8px',
              justifyContent: 'center', marginBottom: '48px'
            }}>
              {questions.map((_, i) => (
                <div key={i} style={{
                  height: '4px', flex: 1, maxWidth: '60px',
                  borderRadius: '2px',
                  background: i <= step ? 'var(--primary)' : 'var(--border)',
                  transition: 'background 0.3s'
                }} />
              ))}
            </div>

            <div style={{
              fontSize: '13px', color: 'var(--text-secondary)',
              letterSpacing: '2px', marginBottom: '16px',
              fontFamily: 'Rajdhani, sans-serif'
            }}>QUESTION {step + 1} OF {questions.length}</div>

            <h2 style={{
              fontSize: '32px', fontWeight: '700',
              fontFamily: 'Rajdhani, sans-serif', marginBottom: '40px'
            }}>{questions[step].question}</h2>

            <div style={{
              display: 'flex', flexWrap: 'wrap',
              gap: '12px', justifyContent: 'center'
            }}>
              {questions[step].options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(opt)}
                  style={{
                    padding: '14px 24px',
                    background: 'var(--bg-hover)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px', color: 'white',
                    fontSize: '15px',
                    fontFamily: 'Rajdhani, sans-serif',
                    fontWeight: '600', letterSpacing: '0.5px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => {
                    e.target.style.borderColor = 'var(--primary)';
                    e.target.style.background = 'rgba(230,57,70,0.1)';
                    e.target.style.color = 'var(--primary)';
                  }}
                  onMouseLeave={e => {
                    e.target.style.borderColor = 'var(--border)';
                    e.target.style.background = 'var(--bg-hover)';
                    e.target.style.color = 'white';
                  }}
                >{opt}</button>
              ))}
            </div>

            {step > 0 && (
              <button onClick={() => setStep(step - 1)} style={{
                marginTop: '32px', background: 'transparent',
                border: 'none', color: 'var(--text-secondary)',
                fontSize: '14px', fontFamily: 'Rajdhani, sans-serif',
                letterSpacing: '1px', cursor: 'pointer'
              }}>← BACK</button>
            )}
          </div>
        )}

        {/* Loading */}
        {done && loading && (
          <div style={{
            textAlign: 'center', padding: '80px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '24px'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>🤖</div>
            <h2 style={{
              fontSize: '32px', fontFamily: 'Rajdhani, sans-serif',
              marginBottom: '12px'
            }}>AI IS ANALYZING...</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Finding the best cars for your needs
            </p>
          </div>
        )}

        {/* Results */}
        {done && !loading && (
          <div>
            {/* Summary Bar */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--primary)',
              borderRadius: '16px', padding: '24px',
              marginBottom: '32px',
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', flexWrap: 'wrap', gap: '16px'
            }}>
              <div>
                <h3 style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: '24px', marginBottom: '4px'
                }}>🎯 {cars.length} CARS FOUND FOR YOU</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                  Budget: {answers.budget} · Fuel: {answers.fuel} · {answers.transmission}
                </p>
              </div>
              <button onClick={reset} style={{
                padding: '12px 24px',
                background: 'var(--primary)', color: 'white',
                border: 'none', borderRadius: '8px',
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: '14px', letterSpacing: '1px',
                cursor: 'pointer'
              }}>START OVER</button>
            </div>

            {/* No Results */}
            {cars.length === 0 && (
              <div style={{
                textAlign: 'center', padding: '60px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '16px'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>😔</div>
                <h3 style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: '24px', marginBottom: '8px'
                }}>NO CARS FOUND</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  Try adjusting your budget or preferences
                </p>
                <button onClick={reset} style={{
                  padding: '12px 24px',
                  background: 'var(--primary)', color: 'white',
                  border: 'none', borderRadius: '8px',
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: '14px', cursor: 'pointer'
                }}>TRY AGAIN</button>
              </div>
            )}

            {/* Car Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px'
            }}>
              {(Array.isArray(cars) ? cars : []).map((car, index) => (
                <div key={car.id} style={{
                  background: 'var(--bg-card)',
                  border: index === 0 ? '1px solid var(--primary)' : '1px solid var(--border)',
                  borderRadius: '16px', padding: '24px',
                  position: 'relative', transition: 'all 0.3s'
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = 'var(--primary)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = index === 0 ? 'var(--primary)' : 'var(--border)';
                  }}
                >
                  {/* Best Match Badge */}
                  {index === 0 && (
                    <div style={{
                      position: 'absolute', top: '-12px', left: '20px',
                      background: 'var(--primary)', color: 'white',
                      padding: '4px 14px', borderRadius: '100px',
                      fontSize: '11px', fontFamily: 'Rajdhani, sans-serif',
                      letterSpacing: '1px', fontWeight: '700'
                    }}>⭐ BEST MATCH</div>
                  )}

                  {/* Car Icon */}
                  <div style={{
                    width: '100%', height: '100px',
                    background: 'linear-gradient(135deg, #1a1a1a, #222)',
                    borderRadius: '12px', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontSize: '56px', marginBottom: '16px'
                  }}>
                    {car.fuel === 'Electric' ? '⚡' :
                      car.fuel === 'Diesel' ? '🚙' :
                        car.fuel === 'CNG' ? '🟢' : '🚗'}
                  </div>

                  {/* Brand */}
                  <div style={{
                    fontSize: '11px', color: 'var(--primary)',
                    fontFamily: 'Rajdhani, sans-serif',
                    letterSpacing: '2px', marginBottom: '4px'
                  }}>{car.brand?.toUpperCase()}</div>

                  {/* Name */}
                  <h3 style={{
                    fontSize: '17px', fontWeight: '600',
                    fontFamily: 'Rajdhani, sans-serif',
                    marginBottom: '12px', lineHeight: '1.2'
                  }}>{car.name}</h3>

                  {/* Tags */}
                  <div style={{
                    display: 'flex', gap: '6px',
                    flexWrap: 'wrap', marginBottom: '16px'
                  }}>
                    {[car.fuel, car.transmission, `${car.year}`].map((tag, i) => (
                      <span key={i} style={{
                        background: 'var(--bg-hover)',
                        border: '1px solid var(--border)',
                        borderRadius: '100px', padding: '3px 10px',
                        fontSize: '11px', color: 'var(--text-secondary)'
                      }}>{tag}</span>
                    ))}
                    {car.owner?.toLowerCase().includes('first') && (
                      <span style={{
                        background: 'rgba(46,204,113,0.1)',
                        border: '1px solid rgba(46,204,113,0.3)',
                        borderRadius: '100px', padding: '3px 10px',
                        fontSize: '11px', color: 'var(--green)'
                      }}>✅ 1st Owner</span>
                    )}
                  </div>

                  {/* Price + EMI */}
                  <div style={{
                    paddingTop: '16px',
                    borderTop: '1px solid var(--border)'
                  }}>
                    <div style={{
                      display: 'flex', justifyContent: 'space-between',
                      alignItems: 'center', marginBottom: '4px'
                    }}>
                      <div style={{
                        fontSize: '24px', fontWeight: '700',
                        fontFamily: 'Rajdhani, sans-serif',
                        color: 'var(--primary)'
                      }}>{formatPrice(car.sellingPrice)}</div>
                      <div style={{
                        fontSize: '12px', color: 'var(--text-secondary)'
                      }}>EMI ~{calcEMI(car.sellingPrice)}</div>
                    </div>
                    <div style={{
                      fontSize: '12px', color: 'var(--text-secondary)'
                    }}>{car.kmDriven?.toLocaleString()} km · {car.engine}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Advisor;