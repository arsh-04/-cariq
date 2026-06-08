import React from 'react';

const SkeletonCard = () => (
  <div style={{
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '16px', padding: '20px'
  }}>
    <div style={{
      width: '100%', height: '130px', borderRadius: '12px',
      background: `linear-gradient(90deg, #111 25%, #1c1c1c 50%, #111 75%)`,
      backgroundSize: '400px 100%',
      animation: 'shimmer 1.4s ease infinite',
      marginBottom: '16px'
    }} />
    <style>{`@keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}`}</style>
    {['60px','80%','50%'].map((w,i) => (
      <div key={i} style={{
        width: w, height: i === 0 ? '10px' : i === 1 ? '16px' : '12px',
        borderRadius: '6px', background: '#1c1c1c',
        marginBottom: '10px'
      }} />
    ))}
    <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
      {[56,70,48].map((w,i) => (
        <div key={i} style={{
          width: `${w}px`, height: '22px',
          borderRadius: '100px', background: '#1c1c1c'
        }} />
      ))}
    </div>
    <div style={{
      paddingTop: '14px', borderTop: '1px solid var(--border)',
      display: 'flex', justifyContent: 'space-between'
    }}>
      <div style={{ width:'72px', height:'20px', borderRadius:'6px', background:'#1c1c1c' }} />
      <div style={{ width:'56px', height:'20px', borderRadius:'6px', background:'#1c1c1c' }} />
    </div>
  </div>
);

export default SkeletonCard;