import { Calendar, MapPin, ArrowRight } from 'lucide-react';

/**
 * Banda de identidad institucional del congreso.
 * Se inserta entre el Countdown y el Hero: navbar y countdown
 * permanecen intactos. Paleta sólida (sin degradados).
 */
const EventIdentity = () => {
  return (
    <section
      id="inicio"
      aria-label="Información del IV Congreso Internacional RELATIC 2026"
      className="relative overflow-hidden"
      style={{ background: '#F8F9FA' }}
    >
      {/* Barra de acento superior — puente visual desde el countdown oscuro */}
      <div className="h-1 w-full" style={{ background: '#FF6200' }} aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 lg:pt-14 pb-14 sm:pb-16 lg:pb-20">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-16">

          {/* ── Columna izquierda: nombre + lema ── */}
          <div className="relative max-w-2xl pl-4 sm:pl-5">
            {/* Barra vertical de acento editorial */}
            <div
              className="absolute left-0 top-1 bottom-1 w-1"
              style={{ background: '#FF6200' }}
              aria-hidden="true"
            />

            <p
              className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] mb-3"
              style={{ color: '#4B5563' }}
            >
              Red Latinoamericana de Investigaciones Cualitativas· RELATIC
            </p>

            <h1
              className="font-black leading-[1.05] mb-4"
              style={{
                color: '#0A2A43',
                fontSize: 'clamp(1.75rem, 4.5vw, 3.25rem)',
                letterSpacing: '-0.025em',
              }}
            >
              IV Congreso Internacional
              <span className="block" style={{ color: '#FF6200' }}>
                RELATIC 2026
              </span>
            </h1>

            <p
              className="text-base sm:text-lg font-light italic leading-relaxed max-w-xl"
              style={{ color: '#1F2937' }}
            >
              Conectando el conocimiento de Latinoamérica
            </p>
          </div>

          {/* ── Columna derecha: meta-datos + CTA ── */}
          <div className="flex flex-col gap-5 w-full lg:w-auto lg:min-w-[340px]">
            {/* Tarjetas meta */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
              {/* Fechas */}
              <div
                className="flex items-center gap-3.5 px-4 py-3.5"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderLeft: '3px solid #F4A800',
                }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(244,168,0,0.1)' }}
                  aria-hidden="true"
                >
                  <Calendar size={18} style={{ color: '#F4A800' }} />
                </div>
                <div className="min-w-0">
                  <p
                    className="text-[11px] font-bold uppercase tracking-[0.12em] mb-0.5"
                    style={{ color: '#4B5563' }}
                  >
                    Fechas
                  </p>
                  <p
                    className="text-sm sm:text-base font-bold leading-tight"
                    style={{ color: '#0A2A43', fontVariantNumeric: 'tabular-nums' }}
                  >
                    7–9 Octubre 2026
                  </p>
                </div>
              </div>

              {/* Modalidad híbrida — badge partido */}
              <div
                className="flex items-stretch overflow-hidden"
                style={{ border: '1px solid #E5E7EB' }}
                role="group"
                aria-label="Modalidad híbrida: presencial y virtual"
              >
                <div
                  className="flex-1 flex flex-col items-center justify-center px-3 py-3.5"
                  style={{ background: '#FF6200' }}
                >
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.1em] mb-0.5"
                    style={{ color: 'rgba(255,255,255,0.80)' }}
                  >
                    Modalidad
                  </span>
                  <span className="text-sm sm:text-base font-bold text-white leading-none">
                    Presencial
                  </span>
                </div>
                <div
                  className="w-px shrink-0"
                  style={{ background: 'rgba(255,255,255,0.35)' }}
                  aria-hidden="true"
                />
                <div
                  className="flex-1 flex flex-col items-center justify-center px-3 py-3.5"
                  style={{ background: '#007AFF' }}
                >
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.1em] mb-0.5"
                    style={{ color: 'rgba(255,255,255,0.80)' }}
                  >
                    Híbrida
                  </span>
                  <span className="text-sm sm:text-base font-bold text-white leading-none">
                    Virtual
                  </span>
                </div>
              </div>

              {/* Sede */}
              <div
                className="flex items-center gap-3.5 px-4 py-3.5"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderLeft: '3px solid #007AFF',
                }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(0,122,255,0.1)' }}
                  aria-hidden="true"
                >
                  <MapPin size={18} style={{ color: '#007AFF' }} />
                </div>
                <div className="min-w-0">
                  <p
                    className="text-[11px] font-bold uppercase tracking-[0.12em] mb-0.5"
                    style={{ color: '#4B5563' }}
                  >
                    Sede
                  </p>
                  <p className="text-sm sm:text-base font-bold leading-tight" style={{ color: '#0A2A43' }}>
                    ITSVA, Valladolid, Yucatán
                  </p>
                </div>
              </div>
            </div>

            {/* CTA — coherente con el navbar */}
            <a
              href="https://eventonexus.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm sm:text-base font-bold transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
              style={{
                background: '#FF6200',
                color: '#FFFFFF',
                boxShadow: '0 4px 14px rgba(255,98,0,0.25)',
              }}
            >
              Regístrate ahora
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Transición geométrica hacia el Hero oscuro — sin degradado */}
      <div
        className="w-full h-6 sm:h-8"
        style={{
          background: '#0A2A43',
          clipPath: 'polygon(0 40%, 100% 0, 100% 100%, 0 100%)',
        }}
        aria-hidden="true"
      />
    </section>
  );
};

export default EventIdentity;
