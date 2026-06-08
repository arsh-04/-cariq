import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const timeline = [
    {
      year: '2025',
      title: 'The Problem',
      desc: 'I was helping my family buy a car. We spent weeks browsing CarWale, watching YouTube reviews, visiting dealers — and still felt confused. Nobody was giving unbiased advice. That frustration became CarIQ.'
    },
    {
      year: '2025',
      title: 'The Idea',
      desc: 'What if there was a platform that asked you the right questions — your salary, your city, your family size — and then recommended the mathematically best car for you? No ads. No dealer bias. Just data and AI.'
    },
    {
      year: '2026',
      title: 'The Build',
      desc: 'I built CarIQ using Java Spring Boot for the backend, React for the frontend, and integrated Groq\'s LLaMA AI model for intelligent recommendations. The database has 8000+ real Indian car listings.'
    },
    {
      year: '2026',
      title: 'The Result',
      desc: 'CarIQ now helps buyers search 8000+ cars, get AI-powered recommendations through an 8-question advisor, and chat with an AI that knows everything about Indian cars.'
    },
  ];

  const techStack = [
    { name: 'Java Spring Boot', desc: 'REST API + Security', color: '#e74c3c' },
    { name: 'PostgreSQL', desc: '8000+ car database', color: '#3498db' },
    { name: 'React.js', desc: 'Frontend UI', color: '#2ecc71' },
    { name: 'Groq LLaMA', desc: 'AI chatbot engine', color: '#9b59b6' },
    { name: 'JWT Auth', desc: 'Secure authentication', color: '#f39c12' },
    { name: 'Spring Security', desc: 'Protected routes', color: '#e67e22' },
  ];

  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{
        padding: '80px 40px',
        borderBottom: '1px solid var(--border)',
        maxWidth: '900px', margin: '0 auto'
      }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(230,57,70,0.1)',
          border: '1px solid rgba(230,57,70,0.3)',
          borderRadius: '100px', padding: '6px 20px',
          marginBottom: '24px', fontSize: '13px',
          color: 'var(--primary)',
          fontFamily: 'Rajdhani, sans-serif',
          letterSpacing: '2px', fontWeight: '600'
        }}>THE STORY BEHIND CARIQ</div>

        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 64px)',
          fontWeight: '700',
          fontFamily: 'Rajdhani, sans-serif',
          marginBottom: '24px', lineHeight: '1.1'
        }}>
          Built out of frustration.
          <br />
          <span style={{ color: 'var(--primary)' }}>
            Driven by passion for cars.
          </span>
        </h1>

        <p style={{
          color: 'var(--text-secondary)', fontSize: '18px',
          lineHeight: '1.8', maxWidth: '700px'
        }}>
          I am Arsh Aditey — a software engineer who loves cars.
          CarIQ started as a personal problem and became a real product.
          Here's the honest story.
        </p>
      </div>

      {/* Timeline */}
      <div style={{
        padding: '80px 40px',
        maxWidth: '900px', margin: '0 auto',
        borderBottom: '1px solid var(--border)'
      }}>
        <h2 style={{
          fontSize: '40px', fontWeight: '700',
          fontFamily: 'Rajdhani, sans-serif',
          marginBottom: '60px'
        }}>THE JOURNEY</h2>

        <div style={{ position: 'relative' }}>
          {/* Timeline line */}
          <div style={{
            position: 'absolute', left: '16px',
            top: '0', bottom: '0', width: '2px',
            background: 'var(--border)'
          }} />

          {timeline.map((item, i) => (
            <div key={i} style={{
              display: 'flex', gap: '40px',
              marginBottom: '48px', position: 'relative'
            }}>
              {/* Dot */}
              <div style={{
                width: '34px', minWidth: '34px', height: '34px',
                background: 'var(--primary)', borderRadius: '50%',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', zIndex: 1,
                fontSize: '12px', fontWeight: '700',
                fontFamily: 'Rajdhani, sans-serif'
              }}>{i + 1}</div>

              <div>
                <div style={{
                  fontSize: '12px', color: 'var(--primary)',
                  letterSpacing: '2px', marginBottom: '8px',
                  fontFamily: 'Rajdhani, sans-serif', fontWeight: '600'
                }}>{item.year}</div>
                <h3 style={{
                  fontSize: '24px', fontWeight: '700',
                  fontFamily: 'Rajdhani, sans-serif',
                  marginBottom: '12px'
                }}>{item.title}</h3>
                <p style={{
                  color: 'var(--text-secondary)',
                  lineHeight: '1.7', fontSize: '15px'
                }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div style={{
        padding: '80px 40px',
        maxWidth: '900px', margin: '0 auto',
        borderBottom: '1px solid var(--border)'
      }}>
        <h2 style={{
          fontSize: '40px', fontWeight: '700',
          fontFamily: 'Rajdhani, sans-serif',
          marginBottom: '12px'
        }}>WHAT I BUILT WITH</h2>
        <p style={{
          color: 'var(--text-secondary)', marginBottom: '48px'
        }}>Every technology was chosen for a reason</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '20px'
        }}>
          {techStack.map((tech, i) => (
            <div key={i} style={{
              background: 'var(--bg-card)',
              border: `1px solid ${tech.color}33`,
              borderRadius: '16px', padding: '24px',
              transition: 'all 0.3s'
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = tech.color;
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = `${tech.color}33`;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                fontSize: '22px', fontWeight: '700',
                fontFamily: 'Rajdhani, sans-serif',
                color: tech.color, marginBottom: '8px'
              }}>{tech.name}</div>
              <div style={{
                color: 'var(--text-secondary)', fontSize: '14px'
              }}>{tech.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Builder */}
      <div style={{
        padding: '80px 40px', textAlign: 'center',
        maxWidth: '900px', margin: '0 auto'
      }}>
        <div style={{
          width: '80px', height: '80px',
          background: 'var(--primary)', borderRadius: '50%',
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '32px',
          margin: '0 auto 24px', fontWeight: '900',
          fontFamily: 'Rajdhani, sans-serif'
        }}>A</div>

        <h2 style={{
          fontSize: '36px', fontWeight: '700',
          fontFamily: 'Rajdhani, sans-serif', marginBottom: '16px'
        }}>Arsh Aditey</h2>

        <p style={{
          color: 'var(--text-secondary)', fontSize: '16px',
          lineHeight: '1.7', maxWidth: '600px',
          margin: '0 auto 32px'
        }}>
          Software Engineer passionate about building products
          that solve real problems. CarIQ is my attempt to bring
          AI-powered intelligence to India's massive car market.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <a href="https://github.com/arsh-04" target="_blank"
            rel="noreferrer" style={{
              padding: '12px 28px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '8px', color: 'white',
              textDecoration: 'none',
              fontFamily: 'Rajdhani, sans-serif',
              fontWeight: '600', fontSize: '14px',
              letterSpacing: '1px'
            }}>GITHUB ↗</a>
          <button onClick={() => navigate('/cars')} style={{
            padding: '12px 28px',
            background: 'var(--primary)', color: 'white',
            border: 'none', borderRadius: '8px',
            fontFamily: 'Rajdhani, sans-serif',
            fontWeight: '600', fontSize: '14px',
            letterSpacing: '1px', cursor: 'pointer'
          }}>EXPLORE CARIQ →</button>
        </div>
      </div>
    </div>
  );
};

export default About;