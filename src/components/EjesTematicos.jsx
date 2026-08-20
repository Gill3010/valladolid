import  { useState, useEffect, useRef } from 'react';
import {
  Leaf,
  Cpu,
  Landmark,
  GraduationCap,
  BarChart3,
  MapPin,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MonitorSmartphone,
  Lightbulb,
} from 'lucide-react';

// ── Importación de imágenes de ejes temáticos ──
import imgEje1 from '../assets/ejestematicos/eje1.png';
import imgEje2 from '../assets/ejestematicos/eje2.png';
import imgEje3 from '../assets/ejestematicos/eje3.png';
import imgEje4 from '../assets/ejestematicos/eje4.png';
import imgEje5 from '../assets/ejestematicos/eje5.png';
import imgEje6 from '../assets/ejestematicos/eje6.png';
import imgEje7 from '../assets/ejestematicos/eje7.png';
import imgEje8 from '../assets/ejestematicos/eje8.png';

const AUTOPLAY_MS = 5000;

// Ejes temáticos del congreso
const ejes = [
  {
    icon: Leaf,
    title: 'Educación e investigación para el desarrollo sostenible',
    description:
      'Articulación entre procesos formativos y producción de conocimiento para enfrentar los desafíos del desarrollo sostenible. Abarca innovación educativa, prácticas pedagógicas, equidad, políticas públicas y ciencias sociales.',
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.07)',
    border: 'rgba(34,197,94,0.2)',
    hoverBorder: '#22c55e',
    imagen: imgEje1,
    subtemas: [
      'Innovación educativa',
      'Prácticas pedagógicas',
      'Equidad y acceso',
      'Políticas públicas en educación',
      'Ciencias sociales y humanidades',
      'Investigación para la sostenibilidad',
    ],
  },
  {
    icon: Cpu,
    title: 'Ciencias administrativas e investigación para la gestión sostenible',
    description:
      'Vinculación de ciencias económicas, administración y tecnología con la investigación aplicada. Incluye gestión estratégica, tecnologías emergentes, ciencia de datos, economía circular y emprendimiento social.',
    color: '#007AFF',
    bg: 'rgba(0,122,255,0.07)',
    border: 'rgba(0,122,255,0.2)',
    hoverBorder: '#007AFF',
    imagen: imgEje2,
    subtemas: [
      'Gestión estratégica',
      'Economía circular',
      'Emprendimiento social',
      'Tecnologías emergentes',
      'Ciencias económicas',
      'Administración sostenible',
    ],
  },
  {
    icon: Landmark,
    title: 'Patrimonio y Cultura',
    description:
      'Preservación del patrimonio cultural maya y latinoamericano a través de la tecnología, el arte y la investigación interdisciplinaria.',
    color: '#F4A800',
    bg: 'rgba(244,168,0,0.07)',
    border: 'rgba(244,168,0,0.2)',
    hoverBorder: '#F4A800',
    imagen: imgEje3,
    subtemas: [
      'Patrimonio cultural maya',
      'Patrimonio latinoamericano',
      'Arte e identidad',
      'Digitalización del patrimonio',
      'Investigación interdisciplinaria',
      'Turismo cultural sostenible',
    ],
  },
  {
    icon: GraduationCap,
    title: 'Educación Superior',
    description:
      'Innovación pedagógica, educación a distancia, competencias del siglo XXI y modelos educativos centrados en el estudiante en la era digital.',
    color: '#2C0055',
    bg: 'rgba(44,0,85,0.06)',
    border: 'rgba(44,0,85,0.15)',
    hoverBorder: '#2C0055',
    imagen: imgEje4,
    subtemas: [
      'Innovación pedagógica',
      'Educación a distancia',
      'Competencias del siglo XXI',
      'Modelos centrados en el estudiante',
      'Evaluación del aprendizaje',
      'Internacionalización universitaria',
    ],
  },
  {
    icon: BarChart3,
    title: 'Ciencia de Datos',
    description:
      'Big data, machine learning, analítica avanzada y visualización de datos aplicados a problemas sociales, económicos y científicos de la región.',
    color: '#FF6200',
    bg: 'rgba(255,98,0,0.07)',
    border: 'rgba(255,98,0,0.2)',
    hoverBorder: '#FF6200',
    imagen: imgEje5,
    subtemas: [
      'Big Data',
      'Machine Learning',
      'Analítica avanzada',
      'Visualización de datos',
      'Minería de datos',
      'Aplicaciones científicas y sociales',
    ],
  },
  {
    icon: MapPin,
    title: 'Desarrollo Regional',
    description:
      'Políticas públicas, emprendimiento, economía social y modelos de desarrollo que fortalezcan las capacidades locales y la cohesión territorial.',
    color: '#0002E9',
    bg: 'rgba(0,2,233,0.06)',
    border: 'rgba(0,2,233,0.15)',
    hoverBorder: '#0002E9',
    imagen: imgEje6,
    subtemas: [
      'Políticas públicas',
      'Emprendimiento local',
      'Economía social',
      'Cohesión territorial',
      'Desarrollo comunitario',
      'Ordenamiento territorial',
    ],
  },
  {
    icon: MonitorSmartphone,
    title: 'Sistemas Computacionales',
    description:
      'Exploración de las ciencias de la computación y las tecnologías digitales aplicadas a contextos educativos, industriales y de comunicación, incluyendo inteligencia artificial, redes y sistemas inteligentes.',
    color: '#9B59B6',
    bg: 'rgba(155,89,182,0.07)',
    border: 'rgba(155,89,182,0.2)',
    hoverBorder: '#9B59B6',
    imagen: imgEje7,
    subtemas: [
      'Ciencias de la computación',
      'Ciencias y tecnología de alimentos y productos naturales',
      'Ingeniería de Software',
      'Desarrollo de Software',
      'Tecnologías aplicadas a la educación',
      'Tecnologías de la información y Comunicación',
      'Redes',
      'Inteligencia Artificial',
      'Internet de las Cosas y/o Domótica',
    ],
  },
  {
    icon: Lightbulb,
    title: 'Innovación',
    description:
      'Generación y aplicación de nuevas ideas en productos, servicios y procesos que impulsen el desarrollo tecnológico sustentable, con impacto real en organizaciones y comunidades.',
    color: '#E05E00',
    bg: 'rgba(224,94,0,0.07)',
    border: 'rgba(224,94,0,0.2)',
    hoverBorder: '#E05E00',
    imagen: imgEje8,
    subtemas: [
      'Productos',
      'Servicios',
      'Procesos',
      'Innovación y desarrollo tecnológico sustentable',
    ],
  },
];

const EjeCard = ({ eje, index }) => {
  const Icon = eje.icon;
  return (
    <div
      className="group relative rounded-2xl overflow-hidden flex flex-col h-full cursor-default transition-all duration-300"
      style={{
        background: '#FFFFFF',
        border: `1px solid #E5E7EB`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = eje.hoverBorder;
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = `0 16px 36px rgba(0,0,0,0.10), 0 0 0 1px ${eje.hoverBorder}30`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#E5E7EB';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
      }}
    >
      {/* Barra de color superior */}
      <div
        className="h-1 w-full transition-all duration-300"
        style={{ background: `linear-gradient(90deg, ${eje.color}, ${eje.color}50)` }}
        aria-hidden="true"
      />

      <div className="p-6 sm:p-7 flex flex-col gap-5 flex-1">
        {/* ── Imagen del eje temático ── */}
        <figure className="flex flex-col items-center">
          <div
            className="w-36 h-36 sm:w-40 sm:h-40 rounded-2xl overflow-hidden flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
            style={{
              background: '#F9FAFB',
              border: `1.5px solid ${eje.border}`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            {eje.imagen ? (
              <img
                src={eje.imagen}
                alt={eje.title}
                className="w-full h-full object-contain p-1"
                loading="lazy"
                draggable={false}
              />
            ) : (
              /* Placeholder mientras la imagen no esté disponible */
              <div
                className="w-full h-full flex flex-col items-center justify-center gap-2"
                style={{ background: eje.bg }}
                aria-label={`Imagen pendiente para ${eje.title}`}
              >
                <Icon size={36} style={{ color: eje.color, opacity: 0.4 }} aria-hidden="true" />
                <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: eje.color, opacity: 0.5 }}>Imagen próximamente</span>
              </div>
            )}
          </div>
          <figcaption className="sr-only">{eje.title}</figcaption>
        </figure>

        {/* Header: número */}
        <div className="flex items-center justify-between">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: eje.bg,
              border: `1.5px solid ${eje.border}`,
            }}
          >
            <Icon size={20} style={{ color: eje.color }} />
          </div>
          {/* Número de eje */}
          <span
            className="text-4xl sm:text-5xl font-black leading-none select-none transition-opacity duration-300 group-hover:opacity-20"
            style={{ color: eje.color, opacity: 0.1 }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Línea de acento animada */}
        <div
          className="h-0.5 w-10 rounded-full transition-all duration-400 group-hover:w-full"
          style={{ background: `linear-gradient(90deg, ${eje.color}, ${eje.color}30)` }}
        />

        {/* Título — más grande y prominente */}
        <h3
          className="text-lg sm:text-xl font-bold leading-snug"
          style={{ color: '#0A2A43' }}
        >
          {eje.title}
        </h3>

        {/* Descripción — mayor tamaño y mejor contraste */}
        <p
          className="text-sm sm:text-base leading-relaxed text-justify"
          style={{ color: '#374151', hyphens: 'auto', wordBreak: 'break-word' }}
        >
          {eje.description}
        </p>

        {/* Subtemas — solo se muestran si el eje los define */}
        {eje.subtemas && eje.subtemas.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {eje.subtemas.map((subtema) => (
              <span
                key={subtema}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-full leading-none"
                style={{
                  background: eje.bg,
                  color: eje.color,
                  border: `1px solid ${eje.border}`,
                }}
              >
                {subtema}
              </span>
            ))}
          </div>
        )}

        {/* CTA — siempre visible (hover lo enfatiza en desktop) */}
        <a
          href="https://eventonexus.com/login"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-semibold mt-auto transition-all duration-300 opacity-100 translate-y-0 sm:opacity-80 sm:group-hover:opacity-100"
          style={{ color: eje.color, textDecoration: 'none', cursor: 'pointer' }}
          aria-label={`Enviar ponencia al eje: ${eje.title}`}
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <span>Enviar ponencia</span>
          <ArrowRight size={14} />
          <div className="h-px flex-1" style={{ background: `${eje.color}40` }} />
        </a>
      </div>
    </div>
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

function useGapPx() {
  const [gap, setGap] = useState(24);

  useEffect(() => {
    const update = () => setGap(window.innerWidth >= 640 ? 28 : 24);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return gap;
}

const EjesCarousel = ({ items }) => {
  const total = items.length;
  const visibleCount = useVisibleCount();
  const gapPx = useGapPx();
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const pointerStartX = useRef(null);
  const dragDelta = useRef(0);
  const resumeTimer = useRef(null);
  const wrapping = useRef(false);
  const [layoutVisibleCount, setLayoutVisibleCount] = useState(visibleCount);
  const [animateRestoreToken, setAnimateRestoreToken] = useState(0);

  // Si cambia el nº visible, ajusta el índice en render (evita setState en effect)
  if (layoutVisibleCount !== visibleCount) {
    setLayoutVisibleCount(visibleCount);
    setAnimate(false);
    setIndex((i) => i % total);
    setAnimateRestoreToken((t) => t + 1);
  }

  // Clones al final para el loop infinito (mismo gap / ancho que el original)
  const slides = [...items, ...items.slice(0, visibleCount)];

  const slideWidth = `calc((100% - ${(visibleCount - 1) * gapPx}px) / ${visibleCount})`;
  const xOffset = `calc(-${index} * (${slideWidth} + ${gapPx}px))`;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Reactiva la transición tras un cambio de layout (solo en callback, no sync)
  useEffect(() => {
    if (animateRestoreToken === 0) return undefined;
    const id = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(id);
  }, [animateRestoreToken]);

  const pauseTemporarily = () => {
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), AUTOPLAY_MS * 1.5);
  };

  const next = () => {
    if (wrapping.current) return;
    if (reduceMotion) {
      setIndex((i) => (i + 1) % total);
      return;
    }
    setAnimate(true);
    setIndex((i) => (i >= total ? i : i + 1));
  };

  const prev = () => {
    if (wrapping.current) return;
    if (reduceMotion) {
      setIndex((i) => (i - 1 + total) % total);
      return;
    }
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
    if (paused) return undefined;
    const id = setInterval(() => {
      if (wrapping.current) return;
      if (reduceMotion) {
        setIndex((i) => (i + 1) % total);
        return;
      }
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
    // No capturar el pointer sobre el CTA: si no, el clic no abre EventoNexus
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

  const activeDot = index % total;

  const navBtnStyle = {
    background: '#FFFFFF',
    border: '1px solid #E5E7EB',
    color: '#0A2A43',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
  };

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
      {/* Viewport — mismo ancho que el grid anterior para conservar el tamaño de cards */}
      <div
        className="overflow-hidden py-2 -my-2"
        style={{ touchAction: 'pan-y' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="flex will-change-transform"
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
          {slides.map((eje, i) => {
            const realIndex = i % total;
            return (
              <div
                key={`${realIndex}-${i}`}
                className="shrink-0"
                style={{
                  width: slideWidth,
                  // Espacio para el hover lift (-6px) sin recortar sombra
                  paddingBottom: 8,
                  paddingTop: 4,
                }}
              >
                <EjeCard eje={eje} index={realIndex} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Controles: flechas + indicadores */}
      <div className="mt-8 flex items-center justify-center gap-4 sm:gap-5">
        <button
          type="button"
          aria-label="Eje anterior"
          onClick={() => {
            pauseTemporarily();
            prev();
          }}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
          style={navBtnStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#FF6200';
            e.currentTarget.style.color = '#FF6200';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#E5E7EB';
            e.currentTarget.style.color = '#0A2A43';
          }}
        >
          <ChevronLeft size={20} strokeWidth={2} />
        </button>

        <div
          className="flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Ejes temáticos"
        >
          {items.map((eje, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={activeDot === i}
              aria-label={`Ir al eje ${i + 1}: ${eje.title}`}
              onClick={() => {
                pauseTemporarily();
                goTo(i);
              }}
              className="rounded-full transition-all duration-300"
              style={{
                width: activeDot === i ? 22 : 8,
                height: 8,
                background: activeDot === i ? eje.color : `${eje.color}40`,
              }}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Eje siguiente"
          onClick={() => {
            pauseTemporarily();
            next();
          }}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
          style={navBtnStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#FF6200';
            e.currentTarget.style.color = '#FF6200';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#E5E7EB';
            e.currentTarget.style.color = '#0A2A43';
          }}
        >
          <ChevronRight size={20} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

// Componente EjesTematicos
const EjesTematicos = () => (
  <section
    id="ejes"
    className="py-20 sm:py-28 relative overflow-hidden"
    style={{ background: '#FFFFFF' }}
  >
    {/* Decoración sutil central */}
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full opacity-[0.025] blur-3xl pointer-events-none"
      style={{ background: 'radial-gradient(circle, #007AFF, #0002E9)' }}
    />

    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Encabezado — más impactante */}
      <div className="text-center mb-16">
        <span
          className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
          style={{ background: 'rgba(255,98,0,0.08)', color: '#FF6200', border: '1px solid rgba(255,98,0,0.25)' }}
        >
          Convocatoria
        </span>
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-black section-underline"
          style={{ color: '#0A2A43' }}
        >
          Ejes Temáticos
        </h2>
        <p className="mt-6 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: '#4B5563' }}>
          Enfoque integral que articula educación, investigación y gestión para el desarrollo sostenible de nuestra región.
        </p>

        {/* Contador de ejes */}
        <div className="mt-8 inline-flex items-center gap-3">
          {ejes.map((eje, i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: eje.color }}
              title={eje.title}
            />
          ))}
          <span className="text-sm font-semibold ml-1" style={{ color: '#4B5563' }}>
            {ejes.length} líneas de investigación
          </span>
        </div>
      </div>

      {/* Carrusel horizontal de ejes */}
      <EjesCarousel items={ejes} />

      {/* CTA inferior */}
      <div className="mt-16 text-center">
        <p className="text-sm sm:text-base mb-5" style={{ color: '#4B5563' }}>
          ¿Tu investigación no encaja en estos ejes? Contáctanos para más información.
        </p>
        <a
          href="https://eventonexus.com/login"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-all duration-300 hover:scale-105"
          style={{
            background: '#FF6200',
            boxShadow: '0 6px 24px rgba(255,98,0,0.3)',
          }}
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#0002E9';
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,2,233,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#FF6200';
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(255,98,0,0.3)';
          }}
        >
          Enviar mi ponencia
          <ArrowRight size={16} />
        </a>
      </div>
    </div>
  </section>
);

export default EjesTematicos;
