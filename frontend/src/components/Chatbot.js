import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: '👋 Hi! I am CarIQ AI. Ask me anything about cars — budget, specs, EMI, EV vs petrol, best deals! Login required to chat.'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessages(prev => [...prev, {
        role: 'ai',
        text: '🔐 Please login to use CarIQ AI Chatbot!'
      }]);
      setTimeout(() => navigate('/login'), 1500);
      return;
    }
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:8080/api/chat', {
        message: userMsg
      });
      setMessages(prev => [...prev, { role: 'ai', text: res.data.reply }]);
    } catch (e) {
      setMessages(prev => [...prev, {
        role: 'ai',
        text: 'Sorry, something went wrong. Please try again!'
      }]);
    }
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const suggestions = [
    'Best car under ₹5 lakh?',
    'EV vs Petrol which is better?',
    'Best SUV for family?',
    'Best resale value car?'
  ];

  return (
    <>
      <button onClick={() => setOpen(!open)} style={{
        position: 'fixed', bottom: '32px', right: '32px',
        width: '60px', height: '60px',
        background: 'var(--primary)', border: 'none',
        borderRadius: '50%', fontSize: '24px',
        cursor: 'pointer', zIndex: 9999,
        boxShadow: '0 4px 24px rgba(230,57,70,0.4)',
        transition: 'all 0.3s'
      }}
        onMouseEnter={e => e.target.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.target.style.transform = 'scale(1)'}
      >
        {open ? '✕' : '🤖'}
      </button>

      {open && (
        <div style={{
          position: 'fixed', bottom: '104px', right: '32px',
          width: '380px', height: '520px',
          background: '#111', border: '1px solid #222',
          borderRadius: '20px', zIndex: 9998,
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 8px 48px rgba(0,0,0,0.6)',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            padding: '16px 20px',
            background: 'var(--primary)',
            display: 'flex', alignItems: 'center', gap: '12px'
          }}>
            <div style={{ fontSize: '24px' }}>🤖</div>
            <div>
              <div style={{
                fontFamily: 'Rajdhani, sans-serif',
                fontWeight: '700', fontSize: '16px',
                letterSpacing: '1px', color: 'white'
              }}>CARIQ AI</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>
                Your personal car advisor
              </div>
            </div>
            <div style={{
              marginLeft: 'auto', width: '8px', height: '8px',
              background: '#2ecc71', borderRadius: '50%'
            }} />
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '16px',
            display: 'flex', flexDirection: 'column', gap: '12px'
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
              }}>
                <div style={{
                  maxWidth: '80%', padding: '10px 14px',
                  borderRadius: msg.role === 'user'
                    ? '16px 16px 4px 16px'
                    : '16px 16px 16px 4px',
                  background: msg.role === 'user'
                    ? 'var(--primary)' : '#1a1a1a',
                  border: msg.role === 'ai' ? '1px solid #222' : 'none',
                  color: 'white', fontSize: '14px', lineHeight: '1.5'
                }}>{msg.text}</div>
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '10px 14px', background: '#1a1a1a',
                  border: '1px solid #222',
                  borderRadius: '16px 16px 16px 4px',
                  color: 'var(--text-secondary)', fontSize: '14px'
                }}>⏳ Thinking...</div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          {messages.length === 1 && (
            <div style={{
              padding: '0 16px 8px',
              display: 'flex', flexWrap: 'wrap', gap: '6px'
            }}>
              {suggestions.map((s, i) => (
                <button key={i} onClick={() => {
                  setInput(s);
                  setTimeout(() => sendMessage(), 100);
                }} style={{
                  background: 'rgba(230,57,70,0.1)',
                  border: '1px solid rgba(230,57,70,0.3)',
                  borderRadius: '100px', padding: '4px 12px',
                  fontSize: '11px', color: 'var(--primary)',
                  cursor: 'pointer',
                  fontFamily: 'Rajdhani, sans-serif'
                }}>{s}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            padding: '12px 16px', borderTop: '1px solid #222',
            display: 'flex', gap: '8px'
          }}>
            <input type="text"
              placeholder="Ask about any car..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              style={{
                flex: 1, padding: '10px 14px',
                background: '#1a1a1a', border: '1px solid #333',
                borderRadius: '10px', color: 'white',
                fontSize: '14px', outline: 'none'
              }} />
            <button onClick={sendMessage} disabled={loading} style={{
              padding: '10px 16px', background: 'var(--primary)',
              border: 'none', borderRadius: '10px',
              color: 'white', fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}>➤</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;