import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

// Fecha objetivo: 7 de octubre de 2026, 08:00 AM UTC-6 (Yucatán)
const TARGET_DATE = new Date('2026-10-07T08:00:00-06:00');

const pad = (n) => String(n).padStart(2, '0');

// Countdown rediseñado como cintillo horizontal angosto
const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const calculate = () => {
      const now = new Date();
      const diff = TARGET_DATE - now;
      if (diff <= 0) {
        setExpired(true);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { value: timeLeft.days,    label: 'Días' },
    { value: timeLeft.hours,   label: 'Hrs'  },
    { value: timeLeft.minutes, label: 'Min'  },
    { value: timeLeft.seconds, label: 'Seg'  },
  ];

  return (
    <div style={{ background: '#0A2A43', width: '100%' }}>
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center"
        style={{ height: '56px', justifyContent: 'space-between' }}
      >
        {/* Etiqueta izquierda — oculta en móvil */}
        <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
          <Clock size={14} style={{ color: '#F4A800' }} />
          <span
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '0.7rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Cuenta regresiva
          </span>
        </div>

        {/* Números — centrados en móvil, a la derecha del label en desktop */}
        {expired ? (
          <div
            className="flex-1 text-center text-sm font-bold"
            style={{ color: '#F4A800' }}
          >
            🎉 ¡El Congreso Valladolid 2026 ha comenzado!
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-4 mx-auto sm:mx-0">
            {units.map((unit, i) => (
              <React.Fragment key={unit.label}>
                <div className="flex items-baseline gap-0.5 sm:gap-1">
                  <span
                    style={{
                      color: '#F4A800',
                      fontSize: '1.25rem',
                      fontWeight: 900,
                      fontVariantNumeric: 'tabular-nums',
                      lineHeight: 1,
                    }}
                  >
                    {pad(unit.value)}
                  </span>
                  <span
                    style={{
                      color: 'rgba(255,255,255,0.45)',
                      fontSize: '0.6rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {unit.label}
                  </span>
                </div>
                {i < units.length - 1 && (
                  <span
                    style={{
                      color: '#FF6200',
                      fontWeight: 900,
                      fontSize: '1rem',
                    }}
                  >
                    :
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Fecha derecha — oculta en móvil */}
        <span
          className="hidden sm:block flex-shrink-0 text-xs"
          style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.03em' }}
        >
          7 Oct 2026
        </span>
      </div>
    </div>
  );
};

export default Countdown;
