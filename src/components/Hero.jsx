import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Calendar, MapPin, GraduationCap } from 'lucide-react';

// Datos de los slides
const slides = [
  {
    id: 1,
    title: 'Innovando hacia un futuro sostenible',
    subtitle:
      'Ciencia, tecnología y naturaleza convergen en el corazón de Yucatán para construir el mañana que el planeta necesita.',
    tag: 'Sostenibilidad',
    image: 'https://picsum.photos/seed/nature-sustainability/1600/900',
    cta: 'Conoce más',
    accent: '#007AFF',
  },
  {
    id: 2,
    title: 'Raíces que inspiran el conocimiento',
    subtitle:
      'El patrimonio maya y la identidad yucateca como fuente de sabiduría e inspiración para la investigación académica latinoamericana.',
    tag: 'Cultura & Patrimonio',
    image: 'https://picsum.photos/seed/mayan-culture-yucatan/1600/900',
    cta: 'Conoce más',
    accent: '#F4A800',
  },
  {
    id: 3,
    title: 'Conectando el conocimiento de Latinoamérica',
    subtitle:
      'Una red de investigadores, académicos e innovadores que transforma la ciencia en puente para el desarrollo regional.',
    tag: 'Tecnología & Redes',
    image: 'https://picsum.photos/seed/technology-network-science/1600/900',
    cta: 'Conoce más',
    accent: '#FF6200',
  },
];

// Datos del evento — usados en el banner prominente
const eventData = [
  { icon: Calendar,      label: '7–9 Octubre 2026'          },
  { icon: MapPin,        label: 'ITSVA, Valladolid, Yucatán' },
  { icon: GraduationCap, label: 'Presencial & Virtual'        },
];

// Componente Hero con slider automático
const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState('next');

  const goToSlide = useCallback(
    (index, dir = 'next') => {
      if (animating) return;
      setAnimating(true);
      setDirection(dir);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 400);
    },
    [animating]
  );

  const nextSlide = useCallback(() => {
    goToSlide((current + 1) % slides.length, 'next');
  }, [current, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((current - 1 + slides.length) % slides.length, 'prev');
  }, [current, goToSlide]);

  // Auto-advance cada 5 segundos
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = slides[current];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Imagen de fondo con transición */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url(${slide.image})`,
          opacity: animating ? 0 : 1,
          transform: animating
            ? direction === 'next'
              ? 'scale(1.05) translateX(2%)'
              : 'scale(1.05) translateX(-2%)'
            : 'scale(1) translateX(0)',
        }}
      />

      {/* Overlay blanco semitransparente — aclara la imagen sin apagarla */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.78) 0%, rgba(240,244,255,0.62) 50%, rgba(255,255,255,0.52) 100%)',
          opacity: animating ? 0 : 1,
        }}
      />

      {/* Decoraciones geométricas suaves */}
      <div
        className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-[0.06] blur-3xl"
        style={{ background: slide.accent }}
      />
      <div
        className="absolute bottom-20 left-10 w-80 h-80 rounded-full opacity-[0.05] blur-3xl"
        style={{ background: '#F4A800' }}
      />

      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        <div
          className="max-w-3xl"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating ? 'translateY(20px)' : 'translateY(0)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          {/* Tag / Badge */}
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
            style={{
              background: 'rgba(255,255,255,0.85)',
              border: `1px solid ${slide.accent}`,
              color: slide.accent,
            }}
          >
            {slide.tag}
          </span>

          {/* Etiqueta de congreso */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-12" style={{ background: slide.accent }} />
            <span
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: '#374151' }}
            >
              IV Congreso Internacional Valladolid
            </span>
          </div>

          {/* Título principal */}
          <h1
            className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight mb-5"
            style={{ color: '#0A2A43' }}
          >
            {slide.title}
          </h1>

          {/* ─── BANNER PROMINENTE DE DATOS DEL EVENTO ─── */}
          <div
            className="flex flex-wrap mb-7 overflow-hidden w-fit rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: '1px solid rgba(255,255,255,0.95)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
            }}
          >
            {eventData.map((item, i) => {
              const Icon = item.icon;
              return (
                <React.Fragment key={item.label}>
                  {i > 0 && (
                    <div
                      className="self-stretch w-px"
                      style={{ background: 'rgba(10,42,67,0.1)' }}
                    />
                  )}
                  <div className="flex items-center gap-2.5 px-5 py-3.5">
                    <Icon size={18} style={{ color: '#FF6200', flexShrink: 0 }} />
                    <span
                      className="text-sm whitespace-nowrap"
                      style={{ color: '#0A2A43', fontWeight: 700 }}
                    >
                      {item.label}
                    </span>
                  </div>
                </React.Fragment>
              );
            })}
          </div>

          {/* Subtítulo */}
          <p
            className="text-base sm:text-lg leading-relaxed mb-10 max-w-2xl"
            style={{ color: '#374151' }}
          >
            {slide.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#registro"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-base transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
              style={{
                background: '#FF6200',
                boxShadow: '0 6px 24px rgba(255,98,0,0.35)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#0002E9';
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,2,233,0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FF6200';
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(255,98,0,0.35)';
              }}
            >
              {slide.cta}
              <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#cronograma"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all duration-300"
              style={{
                border: '1.5px solid rgba(10,42,67,0.35)',
                color: '#0A2A43',
                background: 'rgba(255,255,255,0.6)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(10,42,67,0.07)';
                e.currentTarget.style.borderColor = 'rgba(10,42,67,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.6)';
                e.currentTarget.style.borderColor = 'rgba(10,42,67,0.35)';
              }}
            >
              Ver programa
            </a>
          </div>
        </div>
      </div>

      {/* Controles del slider */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full transition-all duration-200 hover:scale-110"
        style={{
          background: 'rgba(255,255,255,0.85)',
          border: '1px solid #E5E7EB',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
        aria-label="Slide anterior"
      >
        <ChevronLeft size={22} style={{ color: '#0A2A43' }} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full transition-all duration-200 hover:scale-110"
        style={{
          background: 'rgba(255,255,255,0.85)',
          border: '1px solid #E5E7EB',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
        aria-label="Slide siguiente"
      >
        <ChevronRight size={22} style={{ color: '#0A2A43' }} />
      </button>

      {/* Dots de navegación */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goToSlide(i, i > current ? 'next' : 'prev')}
            className="transition-all duration-300"
            aria-label={`Ir al slide ${i + 1}`}
          >
            <div
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? '28px' : '8px',
                height: '8px',
                background: i === current ? '#FF6200' : 'rgba(10,42,67,0.3)',
              }}
            />
          </button>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-20 hidden sm:flex flex-col items-center gap-2">
        <span
          className="text-xs uppercase tracking-widest rotate-90 origin-center mb-6"
          style={{ color: '#6B7280' }}
        >
          Scroll
        </span>
        <div
          className="w-px h-12"
          style={{ background: 'linear-gradient(to bottom, rgba(10,42,67,0.4), transparent)' }}
        />
      </div>
    </section>
  );
};

export default Hero;
