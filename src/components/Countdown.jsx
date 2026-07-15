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
    { value: timeLeft.days, label: 'Días' },
    { value: timeLeft.hours, label: 'Hrs' },
    { value: timeLeft.minutes, label: 'Min' },
    { value: timeLeft.seconds, label: 'Seg' },
  ];

  return (
    <div style={{ background: '#0A2A43', width: '100%', position: 'relative', overflow: 'hidden', height: '56px' }}>
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          display: flex;
          width: max-content;
          /* Velocidad moderada para poder leer el countdown y los textos */
          animation: ticker 40s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Máscaras de gradiente laterales para un efecto elegante de entrada/salida */}
      <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #0A2A43, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #0A2A43, transparent)' }} />

      <div className="flex h-full items-center">
        <div className="animate-ticker">
          {/* Renderizamos 6 iteraciones. La animación se desplaza -50% del total, es decir, 3 iteraciones exactas.
              Esto garantiza que el loop sea matemáticamente perfecto y no existan cortes ni saltos. */}
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex items-center gap-10 sm:gap-16 px-5 sm:px-8 shrink-0">

              {/* ── 1. Componente del Countdown ── */}
              <div className="flex items-center gap-3">
                <Clock size={14} style={{ color: '#F4A800' }} />
                <span
                  style={{
                    color: 'rgba(255,255,255,0.55)',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                  className="hidden sm:inline-block"
                >
                  Cuenta regresiva
                </span>

                {expired ? (
                  <div className="text-sm font-bold ml-2" style={{ color: '#F4A800' }}>
                    🎉 ¡El Congreso Valladolid 2026 ha comenzado!
                  </div>
                ) : (
                  <div className="flex items-center gap-2 sm:gap-4 ml-1">
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
                          <span style={{ color: '#FF6200', fontWeight: 900, fontSize: '1rem' }}>
                            :
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>

              {/* ── 2. Información Adicional ── */}
              <span className="text-xs sm:text-sm font-bold tracking-wider flex items-center gap-2.5" style={{ color: 'rgba(255,255,255,0.7)' }}>
                <span style={{ color: '#FF6200' }}>•</span>
                7–9 Octubre 2026
              </span>
              <span className="text-xs sm:text-sm font-bold tracking-wider flex items-center gap-2.5" style={{ color: 'rgba(255,255,255,0.7)' }}>
                <span style={{ color: '#F4A800' }}>•</span>
                ITSVA, Valladolid, Yucatán
              </span>
              <span className="text-xs sm:text-sm font-bold tracking-wider flex items-center gap-2.5" style={{ color: 'rgba(255,255,255,0.7)' }}>
                <span style={{ color: '#007AFF' }}>•</span>
                Presencial & Virtual
              </span>

              {/* Separador para conectar con el inicio de la siguiente iteración */}
              <span style={{ color: 'rgba(255,255,255,0.2)' }} className="ml-2 sm:ml-4 flex items-center">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Countdown;
