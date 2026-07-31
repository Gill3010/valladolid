import React, { useState } from 'react';
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

const getSubtitle = ({ id, rol, tipo, nivel }) => {
  const parts = [ROLE_LABELS[rol], TIPO_LABELS[tipo]];
  if (id === 'estudiante' && rol === 'ponente' && nivel) {
    parts.push(NIVEL_LABELS[nivel]);
  }
  parts.push('Afiliados RELATIC');
  return parts.join(' · ');
};

const plans = [
  {
    id: 'estudiante',
    icon: <BookOpen size={24} strokeWidth={1.5} style={{ color: '#22c55e' }} />,
    title: 'Estudiante',
    featured: false,
    cta: 'Registrarme',
    color: '#22c55e',
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
    featured: true,
    cta: '¡Registrarme ahora!',
    color: '#F4A800',
    roles: ['asistente', 'ponente'],
    defaultRol: 'asistente',
    defaultTipo: 'virtual',
  },
  {
    id: 'administrativo',
    icon: <Building2 size={24} strokeWidth={1.5} style={{ color: '#FF6200' }} />,
    title: 'Administrativo',
    featured: false,
    cta: 'Registrarme',
    color: '#FF6200',
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

const PlanCard = ({ plan }) => {
  const [rol, setRol] = useState(plan.defaultRol);
  const [tipo, setTipo] = useState(plan.defaultTipo);
  const [nivel, setNivel] = useState(plan.defaultNivel ?? 'licenciatura');

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
  const subtitle = getSubtitle({
    id: plan.id,
    rol,
    tipo: effectiveTipo,
    nivel: showNivel ? nivel : undefined,
  });
  const isFree = price === 0;

  const tipoOptions = [
    { value: 'virtual', label: TIPO_LABELS.virtual },
    { value: 'presencial', label: TIPO_LABELS.presencial },
  ];

  const handleRolChange = (e) => {
    const nextRol = e.target.value;
    setRol(nextRol);
    if (plan.id === 'invitado') {
      setTipo('presencial');
      return;
    }
    if (nextRol === 'ponente') {
      setTipo('presencial-virtual');
    } else if (tipo === 'presencial-virtual') {
      setTipo('virtual');
    }
  };

  return (
    <div
      className={`relative flex flex-col rounded-3xl overflow-hidden transition-all duration-300 ${
        plan.featured ? 'lg:-translate-y-4' : ''
      }`}
      style={{
        background: '#FFFFFF',
        border: plan.featured ? '2px solid #F4A800' : '1px solid #E5E7EB',
        boxShadow: plan.featured
          ? '0 20px 48px rgba(244,168,0,0.15), 0 4px 16px rgba(0,0,0,0.06)'
          : '0 2px 10px rgba(0,0,0,0.05)',
      }}
      onMouseEnter={(e) => {
        if (!plan.featured) {
          e.currentTarget.style.boxShadow = '0 10px 28px rgba(0,0,0,0.09)';
          e.currentTarget.style.transform = 'translateY(-4px)';
        }
      }}
      onMouseLeave={(e) => {
        if (!plan.featured) {
          e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      {plan.featured && (
        <div
          className="flex items-center justify-center gap-1.5 py-2 text-xs font-bold uppercase tracking-widest text-white"
          style={{ background: '#FF6200' }}
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
              background: plan.featured ? 'rgba(244,168,0,0.1)' : '#F8F9FA',
              border: '1px solid #E5E7EB',
            }}
          >
            {plan.icon}
          </div>
          <div>
            <h3
              className="text-xl font-black"
              style={{ color: plan.featured ? '#F4A800' : '#0A2A43' }}
            >
              {plan.title}
            </h3>
            <p className="text-sm leading-snug" style={{ color: '#4B5563' }}>
              {subtitle}
            </p>
          </div>
        </div>

        {/* Selectores */}
        <div className="mb-6 space-y-3">
          <SelectField
            id={`${plan.id}-rol`}
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
              id={`${plan.id}-tipo`}
              label="Tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              color={plan.color}
              options={tipoOptions}
            />
          )}

          {showNivel && (
            <SelectField
              id={`${plan.id}-nivel`}
              label="Nivel"
              value={nivel}
              onChange={(e) => setNivel(e.target.value)}
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
                style={{ color: plan.featured ? '#F4A800' : '#0A2A43' }}
              >
                Sin costo
              </span>
            ) : (
              <>
                <span
                  className="text-4xl font-black"
                  style={{ color: plan.featured ? '#F4A800' : '#0A2A43' }}
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
            style={{ background: `linear-gradient(90deg, ${plan.color}, transparent)` }}
          />
        </div>

        <ul className="space-y-3 flex-1 mb-8">
          {benefits.map((b) => (
            <li key={b} className="flex items-start gap-2.5">
              <div
                className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: plan.featured ? 'rgba(244,168,0,0.12)' : `${plan.color}12`,
                  border: `1px solid ${plan.color}40`,
                }}
              >
                <Check size={10} style={{ color: plan.color }} />
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
              background: '#FF6200',
              boxShadow: '0 6px 20px rgba(255,98,0,0.35)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#0002E9';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,2,233,0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#FF6200';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,98,0,0.35)';
            }}
          >
            {plan.cta}
          </a>
        ) : (
          <a
            href="#registro"
            className="block text-center w-full py-4 rounded-xl font-bold text-base transition-all duration-300 hover:text-white"
            style={{
              border: `1.5px solid ${plan.color}`,
              color: plan.color,
              background: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = plan.color;
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.boxShadow = `0 4px 14px ${plan.color}35`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = plan.color;
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
          Importante: Los asistentes que{' '}
          <strong style={{ color: '#FF6200' }}>no estén afiliados a RELATIC</strong> tendrán un
          incremento del 15% sobre los costos listados.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>

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
