import API_URL from '../config';
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import CarImage from '../components/CarImage';
import SkeletonCard from '../components/SkeletonCard';

const fmt = (p) => {
  if (!p) return 'N/A';
  if (p >= 100000) return `₹${(p/100000).toFixed(1)}L`;
  return `₹${p.toLocaleString()}`;
};

export default function Cars() {
  const [allCars, setAllCars] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [condition, setCondition] = useState('all');
  const [fuel, setFuel] = useState('all');
  const [transmission, setTransmission] = useState('all');
  const [maxPrice, setMaxPrice] = useState('');
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    axios.get(`${API_URL}/api/cars/${id}`)
      .then(r => {
        const data = Array.isArray(r.data) ? r.data : [];
        setAllCars(data);
        setCars(data);
      })
      .catch(() => { setAllCars([]); setCars([]); })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const q = searchParams.get('search') || '';
    setSearch(q);
  }, [searchParams]);

  useEffect(() => {
    let result = [...allCars];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(c =>
        c.name?.toLowerCase().includes(q) ||
        c.brand?.toLowerCase().includes(q) ||
        c.fuel?.toLowerCase().includes(q)
      );
    }
    if (condition !== 'all') {
      if (condition === 'new') result = result.filter(c => c.owner === 'New');
      else result = result.filter(c => c.owner !== 'New');
    }
    if (fuel !== 'all') result = result.filter(c => c.fuel?.toLowerCase().includes(fuel.toLowerCase()));
    if (transmission !== 'all') result = result.filter(c => c.transmission?.toLowerCase() === transmission.toLowerCase());
    if (maxPrice) result = result.filter(c => c.sellingPrice <= Number(maxPrice));
    setCars(result);
    setPage(1);
  }, [search, condition, fuel, transmission, maxPrice, allCars]);

  const paginated = cars.slice((page-1)*PER_PAGE, page*PER_PAGE);
  const totalPages = Math.ceil(cars.length / PER_PAGE);

  const selStyle = {
    padding:'9px 14px', background:'var(--bg-card)',
    border:'1px solid var(--border)', borderRadius:'10px',
    color:'var(--text)', fontSize:'13px', cursor:'pointer'
  };

  return (
    <div style={{ paddingTop:'80px', minHeight:'100vh', padding:'100px 40px 60px', maxWidth:'1400px', margin:'0 auto' }}>
      <div style={{ marginBottom:'48px' }}>
        <p style={{ color:'var(--red)', fontSize:'11px', letterSpacing:'3px', marginBottom:'12px', fontFamily:'Syne,sans-serif', fontWeight:'600' }}>BROWSE</p>
        <h1 style={{ fontSize:'clamp(28px,4vw,48px)', marginBottom:'8px' }}>Find your car</h1>
        <p style={{ color:'var(--text-2)', fontSize:'15px' }}>{cars.length.toLocaleString()} cars match your filters</p>
      </div>

      {/* Filters */}
      <div style={{ display:'flex', gap:'10px', flexWrap:'wrap', marginBottom:'36px' }}>
        <input
          value={search} onChange={e=>setSearch(e.target.value)}
          placeholder="Search brand, model..."
          style={{ ...selStyle, flex:1, minWidth:'200px' }}
        />
        <select value={condition} onChange={e=>setCondition(e.target.value)} style={selStyle}>
          <option value="all">All conditions</option>
          <option value="new">New</option>
          <option value="used">Used</option>
        </select>
        <select value={fuel} onChange={e=>setFuel(e.target.value)} style={selStyle}>
          <option value="all">All fuels</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
          <option value="CNG">CNG</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        <select value={transmission} onChange={e=>setTransmission(e.target.value)} style={selStyle}>
          <option value="all">All transmissions</option>
          <option value="Manual">Manual</option>
          <option value="Automatic">Automatic</option>
        </select>
        <input
          type="number" value={maxPrice} onChange={e=>setMaxPrice(e.target.value)}
          placeholder="Max price (₹)"
          style={{ ...selStyle, width:'160px' }}
        />
        {(search||condition!=='all'||fuel!=='all'||transmission!=='all'||maxPrice) &&
          <button onClick={()=>{setSearch('');setCondition('all');setFuel('all');setTransmission('all');setMaxPrice('');}} style={{ ...selStyle, color:'var(--red)', borderColor:'var(--red-border)' }}>Clear ×</button>
        }
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'20px' }}>
          {Array(6).fill(0).map((_,i)=><SkeletonCard key={i}/>)}
        </div>
      ) : paginated.length === 0 ? (
        <div style={{ textAlign:'center', padding:'80px 0', color:'var(--text-2)' }}>
          <div style={{ fontSize:'48px', marginBottom:'16px' }}>🔍</div>
          <p style={{ fontSize:'18px' }}>No cars found</p>
          <p style={{ fontSize:'14px', marginTop:'8px' }}>Try adjusting your filters</p>
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'20px' }}>
          {paginated.map(car => (
            <div key={car.id} onClick={()=>navigate(`/cars/${car.id}`)} style={{
              background:'var(--bg-card)', border:'1px solid var(--border)',
              borderRadius:'18px', padding:'22px', cursor:'pointer', transition:'all 0.25s'
            }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--red)';e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 12px 32px rgba(232,58,58,0.08)';}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none';}}
            >
              <CarImage brand={car.brand} fuel={car.fuel} height="130px"/>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'8px' }}>
                <div>
                  <div style={{ fontSize:'10px', color:'var(--red)', fontFamily:'Syne,sans-serif', letterSpacing:'2px', marginBottom:'4px', fontWeight:'700' }}>{car.brand?.toUpperCase()}</div>
                  <h3 style={{ fontSize:'16px', lineHeight:'1.3' }}>{car.name}</h3>
                </div>
                {car.owner === 'New'
                  ? <span style={{ background:'rgba(34,197,94,0.1)', border:'1px solid rgba(34,197,94,0.25)', borderRadius:'100px', padding:'3px 10px', fontSize:'11px', color:'var(--green)', fontWeight:'600', whiteSpace:'nowrap' }}>NEW</span>
                  : <span style={{ background:'rgba(255,255,255,0.05)', border:'1px solid var(--border)', borderRadius:'100px', padding:'3px 10px', fontSize:'11px', color:'var(--text-2)', whiteSpace:'nowrap' }}>USED</span>
                }
              </div>
              <div style={{ fontSize:'22px', fontWeight:'800', fontFamily:'Syne,sans-serif', color:'var(--red)', marginBottom:'12px' }}>{fmt(car.sellingPrice)}</div>
              <div style={{ display:'flex', gap:'6px', flexWrap:'wrap' }}>
                {[car.fuel, car.transmission, car.year].filter(Boolean).map((tag,i)=>(
                  <span key={i} style={{ fontSize:'11px', padding:'3px 10px', background:'var(--bg-2)', border:'1px solid var(--border)', borderRadius:'100px', color:'var(--text-2)' }}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'8px', marginTop:'48px' }}>
          <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1} style={{ ...selStyle, opacity:page===1?0.4:1 }}>← Prev</button>
          <span style={{ color:'var(--text-2)', fontSize:'14px', padding:'0 16px' }}>Page {page} of {totalPages}</span>
          <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages} style={{ ...selStyle, opacity:page===totalPages?0.4:1 }}>Next →</button>
        </div>
      )}
    </div>
  );
}