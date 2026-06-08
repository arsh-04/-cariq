import React, { useState } from 'react';

const LOGOS = {
  maruti: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Maruti_Suzuki_Logo.svg/120px-Maruti_Suzuki_Logo.svg.png',
  hyundai: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Hyundai_Motor_Company_logo.svg/120px-Hyundai_Motor_Company_logo.svg.png',
  tata: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tata_logo.svg/120px-Tata_logo.svg.png',
  mahindra: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Mahindra_Logo.svg/120px-Mahindra_Logo.svg.png',
  honda: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Honda.svg/120px-Honda.svg.png',
  toyota: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/120px-Toyota_carlogo.svg.png',
  kia: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Kia-logo.svg/120px-Kia-logo.svg.png',
  ford: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ford_logo_flat.svg/120px-Ford_logo_flat.svg.png',
  volkswagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/120px-Volkswagen_logo_2019.svg.png',
  skoda: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Skoda_Auto_2011_logo.svg/120px-Skoda_Auto_2011_logo.svg.png',
  renault: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Renault_2009_logo.svg/120px-Renault_2009_logo.svg.png',
  nissan: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Nissan_2020_logo.svg/120px-Nissan_2020_logo.svg.png',
  bmw: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/120px-BMW.svg.png',
  mercedes: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/120px-Mercedes-Logo.svg.png',
  audi: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/120px-Audi-Logo_2016.svg.png',
  jeep: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Jeep_logo.svg/120px-Jeep_logo.svg.png',
  mg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/MG_Cars_logo.svg/120px-MG_Cars_logo.svg.png',
  volvo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Volvo_Cars_logo.svg/120px-Volvo_Cars_logo.svg.png',
  jaguar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Jaguar_logo.svg/120px-Jaguar_logo.svg.png',
  chevrolet: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Chevrolet_logo.svg/120px-Chevrolet_logo.svg.png',
  mitsubishi: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Mitsubishi_logo.svg/120px-Mitsubishi_logo.svg.png',
  fiat: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Fiat_Logo.svg/120px-Fiat_Logo.svg.png',
  datsun: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Datsun_logo.svg/120px-Datsun_logo.svg.png',
};

const COLORS = {
  maruti: '#1b3d6e', hyundai: '#002c5f', tata: '#00438e',
  mahindra: '#c41230', honda: '#cc0000', toyota: '#eb0a1e',
  kia: '#05141f', ford: '#003478', volkswagen: '#001e50',
  skoda: '#4ba82e', renault: '#efdf00', nissan: '#c3002f',
  bmw: '#0066b2', mercedes: '#222', audi: '#bb0a14',
  jeep: '#1f3867', mg: '#ae0000', volvo: '#003057',
  jaguar: '#222', chevrolet: '#c8a84b', mitsubishi: '#cc0000',
  fiat: '#9b1c1c', datsun: '#c41230',
};

const FUEL_ICON = {
  Electric: '⚡', Diesel: '🛢️', CNG: '🌿',
  Petrol: '🔥', LPG: '🟡',
};

const CarImage = ({ brand, fuel, height = '130px' }) => {
  const [err, setErr] = useState(false);
  const key = brand?.toLowerCase().split(' ')[0];
  const logo = LOGOS[key];
  const bg = COLORS[key] || '#181818';

  return (
    <div style={{
      width: '100%', height,
      background: `linear-gradient(145deg, ${bg}55 0%, #111 100%)`,
      borderRadius: '12px', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      marginBottom: '16px', overflow: 'hidden',
      position: 'relative',
      border: '1px solid var(--border)',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '2px', background: bg !== '#181818' ? bg : 'var(--red)',
        opacity: 0.7
      }} />
      {logo && !err ? (
        <img src={logo} alt={brand}
          onError={() => setErr(true)}
          style={{
            width: '64px', height: '64px',
            objectFit: 'contain',
            filter: 'brightness(0) invert(1)',
            opacity: 0.85
          }}
        />
      ) : (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '36px', marginBottom: '6px' }}>
            {FUEL_ICON[fuel] || '🚗'}
          </div>
          <div style={{
            fontSize: '10px', color: 'var(--text-2)',
            fontFamily: 'Syne, sans-serif',
            letterSpacing: '2px', fontWeight: '600'
          }}>{brand?.toUpperCase()}</div>
        </div>
      )}
    </div>
  );
};

export default CarImage;