import React, { useState, useEffect, useRef } from 'react';
import {
  Check,
  Star,
  Globe,
  Info,
  Briefcase,
  BookOpen,
  Building2,
  Microscope,
  Award,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const NON_AFFILIATE_FACTOR = 1.15;

const formatMoney = (amount) =>
  `$${amount.toFixed(2)}`;

const withSurcharge = (amount) =>
  Math.round(amount * NON_AFFILIATE_FACTOR * 100) / 100;

/** Precios según tabla de referencia (USD, afiliados RELATIC) */
const PRICE_TABLE = {
  estudiante: {
    asistente: { virtual: 30, presencial: 35 },
    ponente: {
      'presencial-virtual': { licenciatura: 40, postgrado: 45 },
    },
  },
  investigador: {
    asistente: { virtual: 70, presencial: 140 },
    ponente: { 'presencial-virtual': 180 },
  },
  profesor: {
    asistente: { virtual: 60, presencial: 120 },
    ponente: { 'presencial-virtual': 160 },
  },
  administrativo: {
    asistente: { virtual: 50, presencial: 100 },
    ponente: { 'presencial-virtual': 130 },
  },
  invitado: {
    conferencista: { presencial: 0 },
    'becados-itsva': { presencial: 0 },
  },
};

const ROLE_LABELS = {
  asistente: 'Asistente',
  ponente: 'Ponente',
  conferencista: 'Conferencista',
  'becados-itsva': 'Becados ITSVA',
};

const TIPO_LABELS = {
  virtual: 'Virtual',
  presencial: 'Presencial',
  'presencial-virtual': 'Presencial / Virtual',
};

const NIVEL_LABELS = {
  licenciatura: 'Licenciatura',
  postgrado: 'Postgrado',
};

const getPrice = ({ id, rol, tipo, nivel }) => {
  const category = PRICE_TABLE[id];
  if (!category) return 0;

  if (id === 'invitado') {
    return category[rol]?.[tipo] ?? 0;
  }

  if (rol === 'ponente') {
    const byTipo = category.ponente?.[tipo];
    if (id === 'estudiante') {
      return byTipo?.[nivel] ?? 0;
    }
    return typeof byTipo === 'number' ? byTipo : 0;
  }

  return category.asistente?.[tipo] ?? 0;
};

const getBenefits = (id, rol) => {
  const sharedAccess = [
    'Acceso a conferencias magistrales',
    'Material digital del congreso',
  ];

  if (id === 'invitado') {
    if (rol === 'conferencista') {
      return [
        'Participación como conferencista invitado',
        'Acceso completo al programa académico',
        'Reconocimiento institucional',
        'Material digital del congreso',
      ];
    }
    return [
      'Acceso completo al programa con beca ITSVA',
      'Material digital del congreso',
      'Constancia de participación',
      'Actividades académicas del congreso',
    ];
  }

  if (rol === 'ponente') {
    const base = [
      'Presentación de ponencia',
      'Publicación en memorias',
      'Certificado de ponente',
      ...sharedAccess,
    ];
    if (id === 'investigador') {
      return [...base, 'Acceso a sesiones especiales de investigación'];
    }
    if (id === 'profesor') {
      return [...base, 'Acceso a sesiones especiales'];
    }
    return base;
  }

  // Asistente
  if (id === 'estudiante') {
    return [
      ...sharedAccess,
      'Constancia de asistencia',
      'Networking con la comunidad académica',
    ];
  }
  if (id === 'investigador') {
    return [
      'Acceso a todas las conferencias',
      'Sesiones especiales de investigación',
      'Material digital del congreso',
      'Constancia de participación',
      'Networking científico',
    ];
  }
  if (id === 'profesor') {
    return [
      'Acceso a todas las conferencias',
      'Material digital del congreso',
      'Constancia de participación',
      'Acceso a sesiones especiales',
      'Networking académico',
    ];
  }
  return [
    'Acceso al evento',
    'Material digital del congreso',
    'Constancia de participación',
    'Actividades del programa general',
  ];
};

const CARD_SUBTITLE = 'Selecciona una modalidad.';

const plans = [
  {
    id: 'estudiante',
    icon: <BookOpen size={24} strokeWidth={1.5} style={{ color: '#FF6200' }} />,
    title: 'Estudiante',
    featured: true,
    cta: '¡Registrarme ahora!',
    color: '#FF6200',
    roles: ['asistente', 'ponente'],
    defaultRol: 'asistente',
    defaultTipo: 'virtual',
    defaultNivel: 'licenciatura',
  },
  {
    id: 'investigador',
    icon: <Microscope size={24} strokeWidth={1.5} style={{ color: '#007AFF' }} />,
    title: 'Investigador',
    featured: false,
    cta: 'Registrarme',
    color: '#007AFF',
    roles: ['asistente', 'ponente'],
    defaultRol: 'asistente',
    defaultTipo: 'virtual',
  },
  {
    id: 'profesor',
    icon: <Briefcase size={24} strokeWidth={1.5} style={{ color: '#F4A800' }} />,
    title: 'Profesor',
    featured: false,
    cta: 'Registrarme',
    color: '#F4A800',
    roles: ['asistente', 'ponente'],
    defaultRol: 'asistente',
    defaultTipo: 'virtual',
  },
  {
    id: 'administrativo',
    icon: <Building2 size={24} strokeWidth={1.5} style={{ color: '#22c55e' }} />,
    title: 'Administrativo',
    featured: false,
    cta: 'Registrarme',
    color: '#22c55e',
    roles: ['asistente', 'ponente'],
    defaultRol: 'asistente',
    defaultTipo: 'virtual',
  },
  {
    id: 'invitado',
    icon: <Award size={24} strokeWidth={1.5} style={{ color: '#0A2A43' }} />,
    title: 'Invitado',
    featured: false,
    cta: 'Ir al registro',
    color: '#0A2A43',
    roles: ['conferencista', 'becados-itsva'],
    defaultRol: 'conferencista',
    defaultTipo: 'presencial',
  },
];

const selectClassName =
  'w-full appearance-none rounded-xl px-3 py-2.5 text-sm font-medium outline-none transition-shadow';

const SelectField = ({ id, label, value, onChange, options, color }) => (
  <div>
    <label
      htmlFor={id}
      className="mb-1.5 block text-xs font-bold uppercase tracking-wider"
      style={{ color: '#6B7280' }}
    >
      {label}
    </label>
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={selectClassName}
        style={{
          background: '#F8F9FA',
          border: '1px solid #E5E7EB',
          color: '#0A2A43',
          paddingRight: '2.25rem',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = color;
          e.currentTarget.style.boxShadow = `0 0 0 3px ${color}22`;
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = '#E5E7EB';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 opacity-50"
        style={{ color: '#0A2A43' }}
        aria-hidden
      />
    </div>
  </div>
);

const StaticField = ({ label, value }) => (
  <div>
    <p
      className="mb-1.5 text-xs font-bold uppercase tracking-wider"
      style={{ color: '#6B7280' }}
    >
      {label}
    </p>
    <p
      className="rounded-xl px-3 py-2.5 text-sm font-medium"
      style={{
        background: '#F8F9FA',
        border: '1px solid #E5E7EB',
        color: '#0A2A43',
      }}
    >
      {value}
    </p>
  </div>
);

const PlanCard = ({ plan, selection, onSelectionChange, fieldSuffix = '' }) => {
  const { rol, tipo, nivel } = selection;

  const isInvitado = plan.id === 'invitado';
  const isPonente = rol === 'ponente';
  const showNivel = plan.id === 'estudiante' && isPonente;
  const tipoIsFixed = isInvitado || isPonente;

  const effectiveTipo = isInvitado
    ? 'presencial'
    : isPonente
      ? 'presencial-virtual'
      : tipo;

  const price = getPrice({
    id: plan.id,
    rol,
    tipo: effectiveTipo,
    nivel,
  });
  const benefits = getBenefits(plan.id, rol);
  const isFree = price === 0;

  const tipoOptions = [
    { value: 'virtual', label: TIPO_LABELS.virtual },
    { value: 'presencial', label: TIPO_LABELS.presencial },
  ];

  const handleRolChange = (e) => {
    const nextRol = e.target.value;
    if (plan.id === 'invitado') {
      onSelectionChange({ rol: nextRol, tipo: 'presencial', nivel });
      return;
    }
    if (nextRol === 'ponente') {
      onSelectionChange({ rol: nextRol, tipo: 'presencial-virtual', nivel });
    } else if (tipo === 'presencial-virtual') {
      onSelectionChange({ rol: nextRol, tipo: 'virtual', nivel });
    } else {
      onSelectionChange({ rol: nextRol, tipo, nivel });
    }
  };

  const accent = plan.color;
  const cardShadow = plan.featured
    ? `0 20px 48px ${accent}26, 0 4px 16px rgba(0,0,0,0.06)`
    : '0 2px 10px rgba(0,0,0,0.05)';

  return (
    <div
      className="relative flex flex-col h-full rounded-3xl overflow-hidden transition-all duration-300"
      style={{
        background: '#FFFFFF',
        border: plan.featured ? `2px solid ${accent}` : `2px solid ${accent}CC`,
        boxShadow: cardShadow,
      }}
      onMouseEnter={(e) => {
        if (!plan.featured) {
          e.currentTarget.style.boxShadow = `0 10px 28px ${accent}22, 0 4px 12px rgba(0,0,0,0.06)`;
          e.currentTarget.style.borderColor = accent;
          e.currentTarget.style.transform = 'translateY(-4px)';
        }
      }}
      onMouseLeave={(e) => {
        if (!plan.featured) {
          e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
          e.currentTarget.style.borderColor = `${accent}CC`;
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      {plan.featured && (
        <div
          className="flex items-center justify-center gap-1.5 py-2 text-xs font-bold uppercase tracking-widest text-white"
          style={{ background: accent }}
        >
          <Star size={12} fill="white" />
          Más Popular
          <Star size={12} fill="white" />
        </div>
      )}

      <div className={`flex flex-col flex-1 p-7 sm:p-8 ${plan.featured ? 'pt-6' : ''}`}>
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
            style={{
              background: plan.featured ? `${accent}1A` : '#F8F9FA',
              border: `1px solid ${accent}33`,
            }}
          >
            {plan.icon}
          </div>
          <div>
            <h3
              className="text-xl font-black"
              style={{ color: plan.featured ? accent : '#0A2A43' }}
            >
              {plan.title}
            </h3>
            <p className="text-sm leading-snug" style={{ color: '#4B5563' }}>
              {CARD_SUBTITLE}
            </p>
          </div>
        </div>

        {/* Selectores */}
        <div className="mb-6 space-y-3">
          <SelectField
            id={`${plan.id}-rol${fieldSuffix}`}
            label="Rol"
            value={rol}
            onChange={handleRolChange}
            color={plan.color}
            options={plan.roles.map((r) => ({
              value: r,
              label: ROLE_LABELS[r],
            }))}
          />

          {tipoIsFixed ? (
            <StaticField label="Tipo" value={TIPO_LABELS[effectiveTipo]} />
          ) : (
            <SelectField
              id={`${plan.id}-tipo${fieldSuffix}`}
              label="Tipo"
              value={tipo}
              onChange={(e) => onSelectionChange({ rol, tipo: e.target.value, nivel })}
              color={plan.color}
              options={tipoOptions}
            />
          )}

          {showNivel && (
            <SelectField
              id={`${plan.id}-nivel${fieldSuffix}`}
              label="Nivel"
              value={nivel}
              onChange={(e) => onSelectionChange({ rol, tipo, nivel: e.target.value })}
              color={plan.color}
              options={[
                { value: 'licenciatura', label: NIVEL_LABELS.licenciatura },
                { value: 'postgrado', label: NIVEL_LABELS.postgrado },
              ]}
            />
          )}
        </div>

        {/* Precio */}
        <div className="mb-8">
          <div className="flex items-baseline gap-1">
            {isFree ? (
              <span
                className="text-3xl font-black"
                style={{ color: plan.featured ? accent : '#0A2A43' }}
              >
                Sin costo
              </span>
            ) : (
              <>
                <span
                  className="text-4xl font-black"
                  style={{ color: plan.featured ? accent : '#0A2A43' }}
                >
                  {formatMoney(price)}
                </span>
                <span className="text-base font-semibold" style={{ color: '#4B5563' }}>
                  USD
                </span>
              </>
            )}
          </div>
          {!isFree && (
            <p className="text-sm mt-1" style={{ color: '#6B7280' }}>
              No afiliados RELATIC: {formatMoney(withSurcharge(price))} USD
            </p>
          )}
          <div
            className="mt-3 h-px"
            style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
          />
        </div>

        <ul className="space-y-3 flex-1 mb-8">
          {benefits.map((b) => (
            <li key={b} className="flex items-start gap-2.5">
              <div
                className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: `${accent}14`,
                  border: `1px solid ${accent}40`,
                }}
              >
                <Check size={10} style={{ color: accent }} />
              </div>
              <span className="text-sm leading-snug" style={{ color: '#1F2937' }}>
                {b}
              </span>
            </li>
          ))}
        </ul>

        {plan.featured ? (
          <a
            href="#registro"
            className="block text-center w-full py-4 rounded-xl font-bold text-base text-white transition-all duration-300 hover:scale-105"
            style={{
              background: accent,
              boxShadow: `0 6px 20px ${accent}59`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = 'brightness(1.08)';
              e.currentTarget.style.boxShadow = `0 8px 24px ${accent}66`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = 'none';
              e.currentTarget.style.boxShadow = `0 6px 20px ${accent}59`;
            }}
          >
            {plan.cta}
          </a>
        ) : (
          <a
            href="#registro"
            className="block text-center w-full py-4 rounded-xl font-bold text-base transition-all duration-300 hover:text-white"
            style={{
              border: `1.5px solid ${accent}`,
              color: accent,
              background: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = accent;
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.boxShadow = `0 4px 14px ${accent}35`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = accent;
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {plan.cta}
          </a>
        )}
      </div>
    </div>
  );
};

/** Misma escala del grid original: 1 / 2 / 3 (md / xl) */
function useCostosVisibleCount() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1280) setCount(3);
      else if (w >= 768) setCount(2);
      else setCount(1);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return count;
}

const AUTOPLAY_MS = 5000;

const buildDefaultSelections = (items) =>
  Object.fromEntries(
    items.map((plan) => [
      plan.id,
      {
        rol: plan.defaultRol,
        tipo: plan.defaultTipo,
        nivel: plan.defaultNivel ?? 'licenciatura',
      },
    ])
  );

const CostosCarousel = ({ items }) => {
  const total = items.length;
  const visibleCount = useCostosVisibleCount();
  const gapPx = 24; // gap-6 del grid original
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [selections, setSelections] = useState(() => buildDefaultSelections(items));

  const pointerStartX = useRef(null);
  const dragDelta = useRef(0);
  const wrapping = useRef(false);
  const resumeTimer = useRef(null);

  const slides = [...items, ...items.slice(0, visibleCount)];
  const slideWidth = `calc((100% - ${(visibleCount - 1) * gapPx}px) / ${visibleCount})`;
  const xOffset = `calc(-${index} * (${slideWidth} + ${gapPx}px))`;

  const updateSelection = (planId, next) => {
    setSelections((prev) => ({ ...prev, [planId]: next }));
  };

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

  const isInteractiveTarget = (target) =>
    Boolean(target?.closest?.('select, button, a, input, label, option'));

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
      {/* Flechas a los lados, centradas verticalmente con las tarjetas */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          aria-label="Plan anterior"
          onClick={() => {
            pauseTemporarily();
            prev();
          }}
          className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
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
            {slides.map((plan, i) => (
              <div
                key={`${plan.id}-${i}`}
                className="shrink-0"
                style={{
                  width: slideWidth,
                  paddingBottom: 6,
                  paddingTop: 4,
                }}
              >
                <PlanCard
                  plan={plan}
                  selection={selections[plan.id]}
                  onSelectionChange={(next) => updateSelection(plan.id, next)}
                  fieldSuffix={`-${i}`}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          aria-label="Plan siguiente"
          onClick={() => {
            pauseTemporarily();
            next();
          }}
          className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
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

      {/* Indicadores debajo */}
      <div
        className="mt-8 flex items-center justify-center gap-2"
        role="tablist"
        aria-label="Planes de registro"
      >
        {items.map((plan, i) => (
          <button
            key={plan.id}
            type="button"
            role="tab"
            aria-selected={activeDot === i}
            aria-label={`Ir a ${plan.title}`}
            onClick={() => {
              pauseTemporarily();
              goTo(i);
            }}
            className="rounded-full transition-all duration-300"
            style={{
              width: activeDot === i ? 22 : 8,
              height: 8,
              background: activeDot === i ? plan.color : `${plan.color}40`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

const Costos = () => (
  <section
    id="costos"
    className="py-20 sm:py-28 relative overflow-hidden"
    style={{ background: '#F8F9FA' }}
  >
    <div
      className="absolute top-10 right-10 w-80 h-80 rounded-full opacity-[0.03] blur-3xl pointer-events-none"
      style={{ background: '#F4A800' }}
    />
    <div
      className="absolute bottom-10 left-10 w-80 h-80 rounded-full opacity-[0.03] blur-3xl pointer-events-none"
      style={{ background: '#007AFF' }}
    />

    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <span
          className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
          style={{
            background: 'rgba(244,168,0,0.1)',
            color: '#F4A800',
            border: '1px solid rgba(244,168,0,0.3)',
          }}
        >
          Inversión
        </span>
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-black section-underline"
          style={{ color: '#0A2A43' }}
        >
          Costos de Registro
        </h2>
        <p
          className="mt-6 text-base sm:text-lg leading-relaxed max-w-xl mx-auto"
          style={{ color: '#4B5563' }}
        >
          Elige tu perfil, modalidad y rol para ver el costo de inscripción correspondiente.
        </p>
      </div>

      <div
        className="mb-8 p-4 rounded-xl flex items-start sm:items-center justify-center gap-3 max-w-3xl mx-auto transition-transform duration-300 hover:-translate-y-1"
        style={{
          background: 'rgba(255, 98, 0, 0.08)',
          border: '1px solid rgba(255, 98, 0, 0.3)',
          boxShadow: '0 4px 14px rgba(255, 98, 0, 0.05)',
        }}
      >
        <Info
          size={20}
          style={{ color: '#FF6200', flexShrink: 0, marginTop: '2px' }}
          className="sm:mt-0"
        />
        <p className="text-sm sm:text-base font-medium" style={{ color: '#0A2A43' }}>
          Beneficio para afiliados: Los participantes afiliados a{' '}
          <strong style={{ color: '#FF6200' }}>RELATIC Panamá</strong> disfrutan de un{' '}
          <strong style={{ color: '#FF6200' }}>15% de descuento</strong> sobre las tarifas de
          inscripción.
        </p>
      </div>

      <CostosCarousel items={plans} />

      <div
        className="mt-12 p-5 rounded-2xl text-center flex flex-col sm:flex-row items-center justify-center gap-3"
        style={{
          background: '#FFFFFF',
          border: '1px solid #E5E7EB',
        }}
      >
        <Globe size={18} style={{ color: '#007AFF', flexShrink: 0 }} />
        <p className="text-sm" style={{ color: '#4B5563' }}>
          Los costos se cobrarán en el equivalente a la moneda local de tu país al momento de
          realizar el pago. Montos expresados en USD para afiliados RELATIC.
        </p>
      </div>
    </div>
  </section>
);

export default Costos;
