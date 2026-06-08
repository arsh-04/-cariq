import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import CarImage from '../components/CarImage';
import SkeletonCard from '../components/SkeletonCard';

const API = 'http://localhost:8080/api/cars';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [fuel, setFuel] = useState('');
  const [transmission, setTransmission] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [condition, setCondition] = useState('');
  const [page, setPage] = useState(1);
  const carsPerPage = 12;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const q = searchParams.get('search');
    if (q) { setSearch(q); fetchSearch(q); }
    else { fetchAll(); }
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API);
      setAllCars(res.data);
      setCars(res.data);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const fetchSearch = async (keyword) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/search?keyword=${keyword}`);
      setAllCars(res.data);
      setCars(res.data);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const handleFilter = () => {
    setLoading(true);
    setPage(1);
    let filtered = [...allCars];

    if (search.trim()) {
      filtered = filtered.filter(c =>
        c.name?.toLowerCase().includes(search.toLowerCase()) ||
        c.brand?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (condition === 'new') {
      filtered = filtered.filter(c =>
        c.owner?.toLowerCase() === 'new' && c.kmDriven === 0
      );
    } else if (condition === 'First') {
      filtered = filtered.filter(c =>
        c.owner?.toLowerCase().includes('first')
      );
    } else if (condition === 'Second') {
      filtered = filtered.filter(c =>
        c.owner?.toLowerCase().includes('second')
      );
    }

    if (fuel) {
      filtered = filtered.filter(c =>
        c.fuel?.toLowerCase() === fuel.toLowerCase()
      );
    }

    if (transmission) {
      filtered = filtered.filter(c =>
        c.transmission?.toLowerCase() === transmission.toLowerCase()
      );
    }

    if (minPrice && maxPrice) {
      const min = parseFloat(minPrice) * 100000;
      const max = parseFloat(maxPrice) * 100000;
      filtered = filtered.filter(c =>
        c.sellingPrice >= min && c.sellingPrice <= max
      );
    } else if (minPrice) {
      filtered = filtered.filter(c =>
        c.sellingPrice >= parseFloat(minPrice) * 100000
      );
    } else if (maxPrice) {
      filtered = filtered.filter(c =>
        c.sellingPrice <= parseFloat(maxPrice) * 100000
      );
    }

    setCars(filtered);
    setLoading(false);
  };

  const handleReset = () => {
    setSearch(''); setFuel(''); setTransmission('');
    setMinPrice(''); setMaxPrice(''); setCondition('');
    setPage(1); setCars(allCars);
  };

  const formatPrice = (price) => {
    if (!price) return 'N/A';
    if (price >= 100000) return `₹${(price / 100000).toFixed(1)}L`;
    return `₹${price.toLocaleString()}`;
  };

  const totalPages = Math.ceil(cars.length / carsPerPage);
  const paginatedCars = cars.slice((page - 1) * carsPerPage, page * carsPerPage);

  const Label = ({ children }) => (
    <label style={{
      display: 'block', marginBottom: '6px',
      fontSize: '11px', letterSpacing: '1.5px',
      color: 'var(--text-secondary)', textTransform: 'uppercase'
    }}>{children}</label>
  );

  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{
        padding: '32px 40px 24px',
        borderBottom: '1px solid var(--border)'
      }}>
        <h1 style={{
          fontSize: '28px', fontWeight: '700',
          fontFamily: 'Syne, sans-serif', marginBottom: '4px'
        }}>Explore <span style={{ color: 'var(--red)' }}>Cars</span></h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
          {loading ? 'Loading...' : `${cars.length.toLocaleString()} cars found`}
        </p>
      </div>

      <div style={{ display: 'flex' }}>

        {/* Sidebar */}
        <div style={{
          width: '260px', minWidth: '260px',
          padding: '24px 20px',
          borderRight: '1px solid var(--border)',
          position: 'sticky', top: '70px',
          height: 'calc(100vh - 70px)', overflowY: 'auto'
        }}>
          <p style={{
            fontSize: '11px', letterSpacing: '2px',
            color: 'var(--text-secondary)', marginBottom: '20px',
            textTransform: 'uppercase'
          }}>Filters</p>

          <div style={{ marginBottom: '20px' }}>
            <Label>Search</Label>
            <input type="text" placeholder="Brand or model..."
              value={search} onChange={e => setSearch(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleFilter()} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <Label>Condition</Label>
            <select value={condition} onChange={e => setCondition(e.target.value)}>
              <option value="">All Cars</option>
              <option value="new">New / Showroom</option>
              <option value="First">First Owner</option>
              <option value="Second">Second Owner</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <Label>Fuel Type</Label>
            <select value={fuel} onChange={e => setFuel(e.target.value)}>
              <option value="">All Fuels</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="CNG">CNG</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <Label>Transmission</Label>
            <select value={transmission} onChange={e => setTransmission(e.target.value)}>
              <option value="">All</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>

          <div style={{ marginBottom: '28px' }}>
            <Label>Price Range (Lakhs)</Label>
            <input type="number" placeholder="Min (e.g. 3)"
              value={minPrice} onChange={e => setMinPrice(e.target.value)}
              style={{ marginBottom: '8px' }} />
            <input type="number" placeholder="Max (e.g. 15)"
              value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
          </div>

          <button onClick={handleFilter} style={{
            width: '100%', padding: '12px',
            background: 'var(--red)', color: 'white',
            borderRadius: '8px', fontSize: '13px',
            fontWeight: '600', marginBottom: '8px',
            letterSpacing: '0.5px'
          }}>Apply Filters</button>

          <button onClick={handleReset} style={{
            width: '100%', padding: '12px',
            background: 'transparent', color: 'var(--text-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '8px', fontSize: '13px'
          }}>Reset</button>
        </div>

        {/* Grid */}
        <div style={{ flex: 1, padding: '24px 32px' }}>
          {loading ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '16px'
            }}>
              {[...Array(12)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : cars.length === 0 ? (
            <div style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              height: '400px', gap: '12px'
            }}>
              <div style={{ fontSize: '40px' }}>🔍</div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '18px' }}>
                No cars found
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                Try different filters
              </p>
              <button onClick={handleReset} style={{
                padding: '10px 20px', background: 'var(--red)',
                color: 'white', borderRadius: '8px', fontSize: '13px'
              }}>Reset Filters</button>
            </div>
          ) : (
            <>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '16px'
              }}>
                {paginatedCars.map(car => (
                  <div key={car.id}
                    onClick={() => navigate(`/cars/${car.id}`)}
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderRadius: '14px', padding: '18px',
                      cursor: 'pointer', transition: 'all 0.25s',
                      position: 'relative'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'var(--red)';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.4)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--border)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {/* Badge */}
                    {car.owner === 'New' && (
                      <div style={{
                        position: 'absolute', top: '10px', right: '10px',
                        background: 'rgba(34,197,94,0.12)',
                        border: '1px solid rgba(34,197,94,0.3)',
                        borderRadius: '100px', padding: '2px 8px',
                        fontSize: '10px', color: 'var(--green)',
                        fontWeight: '600', letterSpacing: '0.5px'
                      }}>NEW</div>
                    )}
                    {car.owner?.toLowerCase().includes('first') && (
                      <div style={{
                        position: 'absolute', top: '10px', right: '10px',
                        background: 'rgba(59,130,246,0.12)',
                        border: '1px solid rgba(59,130,246,0.3)',
                        borderRadius: '100px', padding: '2px 8px',
                        fontSize: '10px', color: 'var(--blue)',
                        fontWeight: '600', letterSpacing: '0.5px'
                      }}>1ST OWNER</div>
                    )}

                    <CarImage brand={car.brand} fuel={car.fuel} height="110px" />

                    <div style={{
                      fontSize: '10px', color: 'var(--red)',
                      letterSpacing: '1.5px', marginBottom: '4px',
                      fontWeight: '600', textTransform: 'uppercase'
                    }}>{car.brand}</div>

                    <h3 style={{
                      fontSize: '14px', fontWeight: '600',
                      marginBottom: '12px', fontFamily: 'Syne, sans-serif',
                      lineHeight: '1.3', color: 'var(--text)'
                    }}>{car.name}</h3>

                    <div style={{
                      display: 'flex', gap: '6px',
                      flexWrap: 'wrap', marginBottom: '14px'
                    }}>
                      {[car.fuel, car.transmission, car.year]
                        .filter(Boolean).map((tag, i) => (
                        <span key={i} style={{
                          background: 'var(--bg-hover)',
                          border: '1px solid var(--border)',
                          borderRadius: '100px', padding: '3px 10px',
                          fontSize: '11px', color: 'var(--text-secondary)'
                        }}>{tag}</span>
                      ))}
                    </div>

                    <div style={{
                      display: 'flex', justifyContent: 'space-between',
                      alignItems: 'center', paddingTop: '12px',
                      borderTop: '1px solid var(--border)'
                    }}>
                      <div style={{
                        fontSize: '15px', fontWeight: '700',
                        color: 'var(--red)', fontFamily: 'Syne, sans-serif'
                      }}>{formatPrice(car.sellingPrice)}</div>
                      <div style={{
                        fontSize: '11px', color: 'var(--text-secondary)'
                      }}>
                        {car.kmDriven === 0 ? '0 km ✨' :
                          `${car.kmDriven?.toLocaleString()} km`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div style={{
                  display: 'flex', justifyContent: 'center',
                  gap: '6px', marginTop: '40px', flexWrap: 'wrap'
                }}>
                  <button
                    onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo(0, 0); }}
                    disabled={page === 1}
                    style={{
                      padding: '8px 16px',
                      background: page === 1 ? 'var(--bg-hover)' : 'var(--red)',
                      color: 'white', borderRadius: '8px', fontSize: '13px',
                      opacity: page === 1 ? 0.4 : 1,
                      cursor: page === 1 ? 'not-allowed' : 'pointer'
                    }}>← Prev</button>

                  {[...Array(Math.min(totalPages, 7))].map((_, i) => (
                    <button key={i}
                      onClick={() => { setPage(i + 1); window.scrollTo(0, 0); }}
                      style={{
                        padding: '8px 14px',
                        background: page === i + 1 ? 'var(--red)' : 'var(--bg-card)',
                        color: 'white',
                        border: page === i + 1 ? 'none' : '1px solid var(--border)',
                        borderRadius: '8px', fontSize: '13px', cursor: 'pointer'
                      }}>{i + 1}</button>
                  ))}

                  <button
                    onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo(0, 0); }}
                    disabled={page >= totalPages}
                    style={{
                      padding: '8px 16px',
                      background: page >= totalPages ? 'var(--bg-hover)' : 'var(--red)',
                      color: 'white', borderRadius: '8px', fontSize: '13px',
                      opacity: page >= totalPages ? 0.4 : 1,
                      cursor: page >= totalPages ? 'not-allowed' : 'pointer'
                    }}>Next →</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cars;