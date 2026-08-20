import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  ExternalLink,
  Library,
  Unlock,
  GraduationCap,
  Users,
  Lightbulb,
  Compass,
  Globe2,
  Sparkles,
  FlaskConical,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from 'lucide-react';

// ── Importación de imágenes de revistas ──
import imgDialogosEducativos from '../assets/revistas/dialogoseducativos.png';
import imgIcuali from '../assets/revistas/icuali.png';
import imgMundoSostenible from '../assets/revistas/mundosostenible.png';
import imgEducaf5 from '../assets/revistas/educaf5.png';
import imgEducacionCiencia from '../assets/revistas/educacioncienciaycambio.png';
import imgPraxisTransformacion from '../assets/revistas/praxisytransformacion.png';
import imgScientiaIter from '../assets/revistas/scientia.jpeg';

const AUTOPLAY_MS = 5000;

/**
 * Espacios de publicación de productos científicos del congreso.
 * Estructura data-driven: agregar un portal o una revista solo requiere
 * extender `espaciosPublicacion` — el JSX no cambia.
 */
const espaciosPublicacion = [
  {
    id: 'relatic-panama',
    titulo: 'RELATIC Panamá',
    labelCorto: 'Panamá',
    descripcion:
      'Portales editoriales de la Red Latinoamericana de Investigaciones Cualitativas donde se publicarán productos científicos del congreso.',
    accent: '#007AFF',
    accentBg: 'rgba(0,122,255,0.08)',
    accentBorder: 'rgba(0,122,255,0.25)',
    icon: Library,
    revistas: [
      {
        id: 'dialogos-educativos',
        titulo: 'Diálogos Educativos',
        tagline: 'Transforma la práctica docente con investigación de impacto',
        descripcion: 'Investigación y reflexión sobre prácticas educativas y procesos formativos en Latinoamérica.',
        url: 'https://relaticpanama.org/_journals/index.php/dialogoseducativos',
        icon: GraduationCap,
        imagen: imgDialogosEducativos,
      },
      {
        id: 'icuali',
        titulo: 'ICUALI',
        tagline: 'Profundiza en la realidad social desde la investigación cualitativa',
        descripcion: 'Investigación cualitativa aplicada a contextos sociales, educativos y culturales.',
        url: 'https://relaticpanama.org/_journals/index.php/icuali',
        icon: Users,
        imagen: imgIcuali,
      },
      {
        id: 'mundo-sostenible',
        titulo: 'Mundo Sostenible',
        tagline: 'Conecta tu investigación con los desafíos ambientales y sociales',
        descripcion: 'Desarrollo sostenible, medio ambiente y responsabilidad social desde una mirada interdisciplinaria.',
        url: 'https://relaticpanama.org/_journals/index.php/mundosostenible',
        icon: Globe2,
        imagen: imgMundoSostenible,
      },
      {
        id: 'educaf5-berit',
        titulo: 'EDUCAF5-BERIT',
        tagline: 'Impulsa la innovación en formación y transferencia de conocimiento',
        descripcion: 'Educación, formación y transferencia de conocimiento en entornos académicos y profesionales.',
        url: 'https://relaticpanama.org/_journals/index.php/educaf5-berit',
        icon: Lightbulb,
        imagen: imgEducaf5,
      },
      {
        id: 'scientia-iter',
        titulo: 'Scientia Iter',
        tagline: 'Traza nuevas rutas para la ciencia y la innovación regional',
        descripcion: 'Trayectorias científicas, innovación y producción de conocimiento en la región.',
        url: 'https://relaticpanama.org/_journals/index.php/scientiaiter',
        icon: Compass,
        imagen: imgScientiaIter,
      },
    ],
  },
  {
    id: 'ecuador',
    titulo: 'Ecuador',
    labelCorto: 'Ecuador',
    descripcion:
      'Espacios editoriales de Editorial Ecuador vinculados a la difusión de resultados académicos del congreso.',
    accent: '#FF6200',
    accentBg: 'rgba(255,98,0,0.08)',
    accentBorder: 'rgba(255,98,0,0.25)',
    icon: BookOpen,
    revistas: [
      {
        id: 'educacion-ciencia-cambio-social',
        titulo: 'Educación, Ciencia y Cambio Social',
        tagline: 'Articula educación y ciencia como motor de transformación',
        descripcion: 'Articulación entre educación, ciencia y transformaciones sociales en el contexto latinoamericano.',
        url: 'https://revistas.editorialecuador.org/index.php/educacioncienciaycambiosocial',
        icon: Sparkles,
        imagen: imgEducacionCiencia,
      },
      {
        id: 'praxis-transformacion',
        titulo: 'Praxis y Transformación Educativa',
        tagline: 'Reinventa las prácticas pedagógicas con evidencia científica',
        descripcion: 'Prácticas pedagógicas, innovación educativa y transformación de los sistemas formativos.',
        url: 'https://revistas.editorialecuador.org/index.php/praxisytransformacioneduativa',
        icon: FlaskConical,
        imagen: imgPraxisTransformacion,
      },
    ],
  },
];

/** Lista plana para el carrusel, conservando metadatos del portal */
const revistasCarrusel = espaciosPublicacion.flatMap((portal) =>
  portal.revistas.map((revista) => ({
    ...revista,
    portalId: portal.id,
    portalTitulo: portal.titulo,
    portalLabel: portal.labelCorto,
    accent: portal.accent,
    accentBg: portal.accentBg,
    accentBorder: portal.accentBorder,
    portalIcon: portal.icon,
  }))
);

const totalRevistas = revistasCarrusel.length;

const portalStartIndex = Object.fromEntries(
  espaciosPublicacion.map((portal) => [
    portal.id,
    revistasCarrusel.findIndex((r) => r.portalId === portal.id),
  ])
);

const RevistaCard = ({ revista }) => {
  const Icon = revista.icon;
  const accent = revista.accent;

  return (
    <a
      href={revista.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative z-10 flex flex-col rounded-2xl transition-all duration-300 h-full overflow-hidden"
      style={{
        background: '#FFFFFF',
        border: `1.5px solid ${accent}55`,
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      }}
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accent;
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.09)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${accent}55`;
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)';
      }}
      aria-label={`Abrir ${revista.titulo} (${revista.portalTitulo}) en una nueva pestaña`}
    >
      <div
        className="h-1 w-full transition-all duration-300"
        style={{ background: `linear-gradient(90deg, ${accent}, ${accent}60)` }}
        aria-hidden="true"
      />

      <div className="p-5 sm:p-6 flex flex-col flex-1">
        {/* Origen editorial */}
        <div className="flex justify-center mb-4">
          <span
            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{
              background: revista.accentBg,
              color: accent,
              border: `1px solid ${revista.accentBorder}`,
            }}
          >
            <MapPin size={10} aria-hidden="true" />
            {revista.portalTitulo}
          </span>
        </div>

        <figure className="flex flex-col items-center mb-5">
          {revista.imagen ? (
            <div
              className="w-36 h-36 sm:w-40 sm:h-40 rounded-2xl overflow-hidden flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
              style={{
                background: '#F9FAFB',
                border: '1px solid #E5E7EB',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              <img
                src={revista.imagen}
                alt={`Logo de ${revista.titulo}`}
                className="w-full h-full object-contain p-2"
                loading="lazy"
                draggable={false}
              />
            </div>
          ) : (
            <div
              className="w-36 h-36 sm:w-40 sm:h-40 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
              style={{
                background: `${accent}08`,
                border: `2px dashed ${accent}40`,
              }}
            >
              <Icon size={48} style={{ color: accent, opacity: 0.6 }} />
            </div>
          )}
          <figcaption
            className="text-sm font-semibold text-center mt-3 leading-tight"
            style={{ color: '#0A2A43' }}
          >
            {revista.titulo}
          </figcaption>
        </figure>

        <div className="flex items-center justify-center mb-4">
          <span
            className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
            style={{
              background: 'rgba(34,197,94,0.08)',
              color: '#22c55e',
              border: '1px solid rgba(34,197,94,0.2)',
            }}
          >
            <Unlock size={10} />
            Acceso Abierto
          </span>
        </div>

        <p
          className="text-sm font-medium leading-snug mb-3 text-center"
          style={{ color: accent }}
        >
          {revista.tagline}
        </p>

        <p className="text-sm leading-relaxed flex-1 mb-5 text-justify" style={{ color: '#4B5563', hyphens: 'auto', wordBreak: 'break-word' }}>
          {revista.descripcion}
        </p>

        <span
          className="inline-flex items-center justify-center gap-2 text-sm font-semibold mt-auto transition-all duration-200 group-hover:gap-3"
          style={{ color: accent }}
        >
          Visitar portal
          <ExternalLink size={14} aria-hidden="true" />
        </span>
      </div>
    </a>
  );
};

function useVisibleCount() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1024) setCount(3);
      else if (w >= 640) setCount(2);
      else setCount(1);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return count;
}

const PublicacionesCarousel = ({ items }) => {
  const total = items.length;
  const visibleCount = useVisibleCount();
  const gapPx = 24;
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const pointerStartX = useRef(null);
  const dragDelta = useRef(0);
  const wrapping = useRef(false);
  const resumeTimer = useRef(null);

  const slides = [...items, ...items.slice(0, visibleCount)];
  const slideWidth = `calc((100% - ${(visibleCount - 1) * gapPx}px) / ${visibleCount})`;
  const xOffset = `calc(-${index} * (${slideWidth} + ${gapPx}px))`;
  const activeDot = index % total;
  const activeItem = items[activeDot];
  const activePortal = espaciosPublicacion.find((p) => p.id === activeItem.portalId);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    setAnimate(false);
    setIndex((i) => i % total);
    const id = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(id);
  }, [visibleCount, total]);

  const pauseTemporarily = () => {
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), AUTOPLAY_MS * 1.5);
  };

  const next = () => {
    if (wrapping.current) return;
    setAnimate(true);
    setIndex((i) => (i >= total ? i : i + 1));
  };

  const prev = () => {
    if (wrapping.current) return;
    if (index === 0) {
      wrapping.current = true;
      setAnimate(false);
      setIndex(total);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true);
          setIndex(total - 1);
          wrapping.current = false;
        });
      });
      return;
    }
    if (index >= total) return;
    setAnimate(true);
    setIndex((i) => i - 1);
  };

  const goTo = (target) => {
    if (wrapping.current) return;
    setAnimate(true);
    setIndex(((target % total) + total) % total);
  };

  const snapLoop = () => {
    if (index < total) return;
    wrapping.current = true;
    setAnimate(false);
    setIndex(index % total);
    requestAnimationFrame(() => {
      wrapping.current = false;
      requestAnimationFrame(() => setAnimate(true));
    });
  };

  const handleTransitionEnd = (e) => {
    if (e.target !== e.currentTarget) return;
    if (e.propertyName !== 'transform') return;
    snapLoop();
  };

  useEffect(() => {
    if (!reduceMotion) return undefined;
    if (index < total) return undefined;
    snapLoop();
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, total, reduceMotion]);

  useEffect(() => {
    if (paused || reduceMotion) return undefined;
    const id = setInterval(() => {
      if (wrapping.current) return;
      setAnimate(true);
      setIndex((i) => (i >= total ? i : i + 1));
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, reduceMotion, total]);

  useEffect(
    () => () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    },
    []
  );

  const isInteractiveTarget = (target) => {
    const el = target?.nodeType === 3 ? target.parentElement : target;
    return Boolean(el?.closest?.('a, button, select, input, label, [role="link"]'));
  };

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (isInteractiveTarget(e.target)) return;
    pointerStartX.current = e.clientX;
    dragDelta.current = 0;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (pointerStartX.current == null) return;
    dragDelta.current = e.clientX - pointerStartX.current;
  };

  const onPointerUp = () => {
    if (pointerStartX.current == null) return;
    const delta = dragDelta.current;
    pointerStartX.current = null;
    if (Math.abs(delta) > 50) {
      pauseTemporarily();
      if (delta < 0) next();
      else prev();
    }
  };

  const navBtnStyle = {
    background: '#FFFFFF',
    border: '1px solid #E5E7EB',
    color: '#0A2A43',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
  };

  const ActivePortalIcon = activePortal?.icon ?? Library;

  return (
    <div
      style={{ overflowAnchor: 'none' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
    >
      {/* Selector de categoría + contexto activo */}
      <div className="mb-8 flex flex-col items-center gap-4">
        <div
          className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl"
          style={{
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
          }}
          role="tablist"
          aria-label="Filtrar por portal editorial"
        >
          {espaciosPublicacion.map((portal) => {
            const selected = activeItem.portalId === portal.id;
            const PortalIcon = portal.icon;
            return (
              <button
                key={portal.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => {
                  pauseTemporarily();
                  goTo(portalStartIndex[portal.id]);
                }}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  background: selected ? portal.accentBg : 'transparent',
                  color: selected ? portal.accent : '#4B5563',
                  border: selected ? `1px solid ${portal.accentBorder}` : '1px solid transparent',
                }}
              >
                <PortalIcon size={15} aria-hidden="true" />
                {portal.titulo}
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{
                    background: selected ? `${portal.accent}18` : '#F3F4F6',
                    color: selected ? portal.accent : '#6B7280',
                  }}
                >
                  {portal.revistas.length}
                </span>
              </button>
            );
          })}
        </div>

        <div
          className="flex items-center gap-2 text-sm"
          style={{ color: '#4B5563' }}
          aria-live="polite"
        >
          <ActivePortalIcon size={16} style={{ color: activePortal.accent }} aria-hidden="true" />
          <span>
            Explorando{' '}
            <strong style={{ color: activePortal.accent }}>{activePortal.titulo}</strong>
            {' · '}
            {activeItem.titulo}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          aria-label="Revista anterior"
          onClick={() => {
            pauseTemporarily();
            prev();
          }}
          className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
          style={navBtnStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = activePortal.accent;
            e.currentTarget.style.color = activePortal.accent;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#E5E7EB';
            e.currentTarget.style.color = '#0A2A43';
          }}
        >
          <ChevronLeft size={20} strokeWidth={2} />
        </button>

        <div
          className="overflow-hidden flex-1 min-w-0 py-3 -my-1"
          style={{ touchAction: 'pan-y' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div
            className="flex items-stretch will-change-transform"
            style={{
              gap: gapPx,
              transform: `translate3d(${xOffset}, 0, 0)`,
              transition:
                animate && !reduceMotion
                  ? 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)'
                  : 'none',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {slides.map((revista, i) => (
              <div
                key={`${revista.id}-${i}`}
                className="shrink-0"
                style={{
                  width: slideWidth,
                  paddingBottom: 6,
                  paddingTop: 4,
                }}
              >
                <RevistaCard revista={revista} />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          aria-label="Revista siguiente"
          onClick={() => {
            pauseTemporarily();
            next();
          }}
          className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
          style={navBtnStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = activePortal.accent;
            e.currentTarget.style.color = activePortal.accent;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#E5E7EB';
            e.currentTarget.style.color = '#0A2A43';
          }}
        >
          <ChevronRight size={20} strokeWidth={2} />
        </button>
      </div>

      {/* Indicadores — color por portal */}
      <div
        className="mt-8 flex items-center justify-center gap-2"
        role="tablist"
        aria-label="Revistas"
      >
        {items.map((revista, i) => (
          <button
            key={revista.id}
            type="button"
            role="tab"
            aria-selected={activeDot === i}
            aria-label={`${revista.titulo} · ${revista.portalTitulo}`}
            onClick={() => {
              pauseTemporarily();
              goTo(i);
            }}
            className="rounded-full transition-all duration-300"
            style={{
              width: activeDot === i ? 22 : 8,
              height: 8,
              background: activeDot === i ? revista.accent : `${revista.accent}40`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

const Publicaciones = () => (
  <section
    id="publicaciones"
    className="py-20 sm:py-28 relative overflow-hidden"
    style={{
      background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFF 50%, #FFFFFF 100%)',
    }}
    aria-labelledby="publicaciones-heading"
  >
    <div
      className="absolute top-16 right-0 w-72 h-72 rounded-full opacity-[0.04] blur-3xl pointer-events-none"
      style={{ background: '#007AFF' }}
      aria-hidden="true"
    />
    <div
      className="absolute bottom-10 left-0 w-72 h-72 rounded-full opacity-[0.04] blur-3xl pointer-events-none"
      style={{ background: '#FF6200' }}
      aria-hidden="true"
    />

    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <span
          className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
          style={{
            background: 'rgba(0,122,255,0.08)',
            color: '#007AFF',
            border: '1px solid rgba(0,122,255,0.25)',
          }}
        >
          Productos científicos
        </span>
        <h2
          id="publicaciones-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-black section-underline"
          style={{ color: '#0A2A43' }}
        >
          Espacios de Publicación
        </h2>
        <p className="mt-6 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: '#4B5563' }}>
          Publica tu investigación en revistas de acceso abierto con alcance internacional, vinculadas al IV Congreso RELATIC 2026.
        </p>
      </div>

      <div
        className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-12 py-5 px-6 rounded-2xl mx-auto max-w-2xl"
        style={{
          background: '#FFFFFF',
          border: '1px solid #E5E7EB',
          boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
        }}
      >
        {[
          { value: totalRevistas, label: 'Revistas' },
          { value: espaciosPublicacion.length, label: 'Portales editoriales' },
          { value: '100%', label: 'Acceso abierto' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p
              className="text-2xl sm:text-3xl font-black leading-none"
              style={{
                background: 'linear-gradient(135deg, #007AFF, #FF6200)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {stat.value}
            </p>
            <p className="text-xs sm:text-sm font-medium mt-1" style={{ color: '#4B5563' }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <PublicacionesCarousel items={revistasCarrusel} />
    </div>
  </section>
);

export default Publicaciones;
