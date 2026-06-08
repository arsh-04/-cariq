import API_URL from '../config';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CarImage from '../components/CarImage';

const fmt = (p) => {
  if (!p) return 'N/A';
  if (p >= 100000) return `₹${(p/100000).toFixed(1)}L`;
  return `₹${p.toLocaleString()}`;
};

export default function Home() {
  const [q, setQ] = useState('');
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('${API_URL}/api/cars/new')
      .then(r => setCars(r.data.slice(0,3)))
      .catch(()=>{});
  },[]);

  const search = e => {
    e.preventDefault();
    if (q.trim()) navigate(`/cars?search=${q}`);
  };

  return (
    <div>
      {/* ── HERO ── */}
      <section style={{
        minHeight:'100vh', display:'flex',
        flexDirection:'column', alignItems:'center',
        justifyContent:'center', padding:'120px 24px 80px',
        position:'relative', overflow:'hidden', textAlign:'center'
      }}>
        {/* grid */}
        <div style={{
          position:'absolute', inset:0, opacity:0.2,
          backgroundImage:`linear-gradient(var(--border) 1px,transparent 1px),
            linear-gradient(90deg,var(--border) 1px,transparent 1px)`,
          backgroundSize:'48px 48px', pointerEvents:'none'
        }}/>
        {/* glow */}
        <div style={{
          position:'absolute', top:'50%', left:'50%',
          transform:'translate(-50%,-60%)',
          width:'700px', height:'700px',
          background:'radial-gradient(circle,rgba(232,58,58,0.07) 0%,transparent 65%)',
          pointerEvents:'none'
        }}/>

        <div className="animate" style={{
          display:'inline-flex', alignItems:'center', gap:'8px',
          background:'var(--bg-card)', border:'1px solid var(--border-2)',
          borderRadius:'100px', padding:'6px 18px',
          marginBottom:'36px', fontSize:'13px',
          color:'var(--text-2)', fontFamily:'DM Sans,sans-serif'
        }}>
          <span style={{
            width:'7px', height:'7px', background:'var(--green)',
            borderRadius:'50%', display:'inline-block'
          }}/>
          8,000+ real cars · Groq AI · Built for India
        </div>

        <h1 className="animate animate-1" style={{
          fontSize:'clamp(48px,9vw,96px)',
          fontWeight:'800', letterSpacing:'-3px',
          marginBottom:'12px'
        }}>
          Stop guessing.
        </h1>
        <h1 className="animate animate-2" style={{
          fontSize:'clamp(48px,9vw,96px)',
          fontWeight:'800', letterSpacing:'-3px',
          marginBottom:'32px',
          color:'transparent',
          WebkitTextStroke:'2px var(--red)'
        }}>
          Start driving.
        </h1>

        <p className="animate animate-3" style={{
          color:'var(--text-2)', fontSize:'17px',
          maxWidth:'500px', lineHeight:'1.8',
          marginBottom:'48px', fontWeight:'300'
        }}>
          CarIQ uses AI to match you with cars that actually fit your life —
          your budget, your family, your city. No dealer. No bias.
        </p>

        <form onSubmit={search} className="animate animate-4" style={{
          display:'flex', gap:'10px', width:'100%',
          maxWidth:'580px', marginBottom:'20px'
        }}>
          <input
            value={q} onChange={e=>setQ(e.target.value)}
            placeholder="Search Swift, Creta, Nexon..."
            style={{ flex:1, padding:'15px 22px', fontSize:'15px', borderRadius:'12px' }}
          />
          <button type="submit" style={{
            padding:'15px 28px', background:'var(--red)', color:'#fff',
            borderRadius:'12px', fontSize:'15px', whiteSpace:'nowrap'
          }}>Search →</button>
        </form>

        <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', justifyContent:'center', marginBottom:'72px' }}>
          {['Swift','Creta','Thar','Nexon','Innova','City'].map(s=>(
            <button key={s} onClick={()=>navigate(`/cars?search=${s}`)} style={{
              padding:'5px 14px', background:'transparent',
              border:'1px solid var(--border)', borderRadius:'100px',
              color:'var(--text-2)', fontSize:'13px'
            }}
              onMouseEnter={e=>{e.target.style.color='var(--red)';e.target.style.borderColor='var(--red-border)';}}
              onMouseLeave={e=>{e.target.style.color='var(--text-2)';e.target.style.borderColor='var(--border)';}}
            >{s}</button>
          ))}
        </div>

        {/* Stats bar */}
        <div style={{
          display:'flex', border:'1px solid var(--border-2)',
          borderRadius:'14px', overflow:'hidden', background:'var(--bg-card)'
        }}>
          {[['8,000+','Cars listed'],['32+','Brands'],['AI','Powered'],['Free','Always']].map(([n,l],i)=>(
            <div key={i} style={{
              padding:'16px 28px', textAlign:'center',
              borderRight: i<3 ? '1px solid var(--border)' : 'none'
            }}>
              <div style={{ fontSize:'22px', fontWeight:'800', fontFamily:'Syne,sans-serif', color:'var(--red)' }}>{n}</div>
              <div style={{ fontSize:'11px', color:'var(--text-2)', textTransform:'uppercase', letterSpacing:'1px', marginTop:'4px' }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding:'100px 40px', borderTop:'1px solid var(--border)', maxWidth:'1200px', margin:'0 auto' }}>
        <p style={{ color:'var(--red)', fontSize:'11px', letterSpacing:'3px', marginBottom:'16px', fontFamily:'Syne,sans-serif', fontWeight:'600' }}>WHAT CARIQ DOES</p>
        <h2 style={{ fontSize:'clamp(28px,4vw,48px)', marginBottom:'56px', maxWidth:'520px' }}>Everything you need to buy smarter.</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))', gap:'16px' }}>
          {[
            ['🔍','Smart Search','8,000+ real Indian cars searchable by brand, model, price, fuel'],
            ['🤖','AI Advisor','8 questions — get cars that fit your lifestyle, not just your budget'],
            ['💬','AI Chatbot','Ask anything. Our Groq-powered AI knows every Indian car inside out'],
            ['💰','EMI Calculator','Every car shows EMI estimates at 9% for 5 years automatically'],
          ].map(([icon,title,desc],i)=>(
            <div key={i} style={{
              background:'var(--bg-card)', border:'1px solid var(--border)',
              borderRadius:'16px', padding:'28px', transition:'all 0.25s'
            }}
              onMouseEnter={e=>{
                e.currentTarget.style.borderColor='var(--red)';
                e.currentTarget.style.transform='translateY(-5px)';
                e.currentTarget.style.boxShadow='0 16px 40px rgba(232,58,58,0.08)';
              }}
              onMouseLeave={e=>{
                e.currentTarget.style.borderColor='var(--border)';
                e.currentTarget.style.transform='translateY(0)';
                e.currentTarget.style.boxShadow='none';
              }}
            >
              <div style={{ fontSize:'32px', marginBottom:'18px', width:'52px', height:'52px', background:'var(--bg-2)', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center' }}>{icon}</div>
              <h3 style={{ fontSize:'18px', marginBottom:'8px' }}>{title}</h3>
              <p style={{ color:'var(--text-2)', fontSize:'14px', lineHeight:'1.7' }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── NEW CARS ── */}
      {cars.length > 0 && (
        <section style={{ padding:'100px 40px', borderTop:'1px solid var(--border)', maxWidth:'1200px', margin:'0 auto' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'48px' }}>
            <div>
              <p style={{ color:'var(--red)', fontSize:'11px', letterSpacing:'3px', marginBottom:'12px', fontFamily:'Syne,sans-serif', fontWeight:'600' }}>JUST IN</p>
              <h2 style={{ fontSize:'36px' }}>Fresh from the showroom</h2>
            </div>
            <button onClick={()=>navigate('/cars')} style={{
              padding:'10px 22px', background:'transparent', color:'var(--red)',
              border:'1px solid var(--red-border)', borderRadius:'10px',
              fontFamily:'Syne,sans-serif', fontSize:'14px'
            }}>View all →</button>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:'20px' }}>
            {cars.map(car=>(
              <div key={car.id} onClick={()=>navigate(`/cars/${car.id}`)} style={{
                background:'var(--bg-card)', border:'1px solid var(--border)',
                borderRadius:'18px', padding:'22px', cursor:'pointer', transition:'all 0.25s'
              }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--red)';e.currentTarget.style.transform='translateY(-5px)';}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.transform='translateY(0)';}}
              >
                <CarImage brand={car.brand} fuel={car.fuel} height="130px"/>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'10px' }}>
                  <div>
                    <div style={{ fontSize:'10px', color:'var(--red)', fontFamily:'Syne,sans-serif', letterSpacing:'2px', marginBottom:'4px', fontWeight:'700' }}>{car.brand?.toUpperCase()}</div>
                    <h3 style={{ fontSize:'17px' }}>{car.name}</h3>
                  </div>
                  <span style={{ background:'rgba(34,197,94,0.1)', border:'1px solid rgba(34,197,94,0.25)', borderRadius:'100px', padding:'3px 10px', fontSize:'11px', color:'var(--green)', fontWeight:'600', whiteSpace:'nowrap' }}>NEW</span>
                </div>
                <div style={{ fontSize:'24px', fontWeight:'800', fontFamily:'Syne,sans-serif', color:'var(--red)' }}>{fmt(car.sellingPrice)}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding:'100px 40px', borderTop:'1px solid var(--border)', background:'var(--bg-card)' }}>
        <div style={{ maxWidth:'960px', margin:'0 auto', textAlign:'center' }}>
          <p style={{ color:'var(--red)', fontSize:'11px', letterSpacing:'3px', marginBottom:'16px', fontFamily:'Syne,sans-serif', fontWeight:'600' }}>HOW IT WORKS</p>
          <h2 style={{ fontSize:'36px', marginBottom:'64px' }}>Three steps to your perfect car</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:'48px' }}>
            {[
              ['01','💬','Tell us about yourself','Budget, family size, daily usage — answer honestly and AI listens carefully'],
              ['02','🤖','AI finds your match','We filter 8000+ real cars down to ones that actually suit your life'],
              ['03','🚗','Drive with confidence','Compare options, see EMIs, decide. No regrets, no overpaying'],
            ].map(([n,icon,t,d])=>(
              <div key={n}>
                <div style={{ width:'40px', height:'40px', border:'1px solid var(--border-2)', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', color:'var(--red)', fontFamily:'Syne,sans-serif', fontWeight:'700', margin:'0 auto 20px', letterSpacing:'1px' }}>{n}</div>
                <div style={{ fontSize:'36px', marginBottom:'16px' }}>{icon}</div>
                <h3 style={{ fontSize:'18px', marginBottom:'10px' }}>{t}</h3>
                <p style={{ color:'var(--text-2)', fontSize:'14px', lineHeight:'1.7' }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding:'120px 40px', textAlign:'center', borderTop:'1px solid var(--border)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center,rgba(232,58,58,0.04) 0%,transparent 65%)', pointerEvents:'none' }}/>
        <h2 style={{ fontSize:'clamp(32px,5vw,60px)', letterSpacing:'-2px', marginBottom:'20px' }}>Ready to find your car?</h2>
        <p style={{ color:'var(--text-2)', marginBottom:'48px', fontSize:'17px', maxWidth:'440px', margin:'0 auto 48px', lineHeight:'1.75' }}>
          Stop spending weekends on showrooms. Let AI do the heavy lifting.
        </p>
        <div style={{ display:'flex', gap:'14px', justifyContent:'center', flexWrap:'wrap' }}>
          <button onClick={()=>navigate('/register')} style={{ padding:'14px 36px', background:'var(--red)', color:'#fff', borderRadius:'12px', fontSize:'15px', fontFamily:'Syne,sans-serif' }}>Get started free →</button>
          <button onClick={()=>navigate('/cars')} style={{ padding:'14px 36px', background:'transparent', color:'var(--text-2)', border:'1px solid var(--border)', borderRadius:'12px', fontSize:'15px', fontFamily:'Syne,sans-serif' }}>Browse cars</button>
        </div>
      </section>
    </div>
  );
}