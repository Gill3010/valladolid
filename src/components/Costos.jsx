import React from 'react';
import { Check, Star, Globe } from 'lucide-react';

// Datos de los planes de costo
const plans = [
  {
    id: 'estudiante',
    icon: '🎓',
    title: 'Estudiante',
    subtitle: 'Licenciatura o posgrado',
    price: '$800',
    currency: 'MXN',
    usd: '~$45 USD',
    featured: false,
    cta: 'Registrarme',
    benefits: [
      'Acceso a todas las conferencias magistrales',
      'Material digital del congreso',
      'Constancia de participación',
      'Talleres incluidos (cupo limitado)',
      'Recesos y coffee breaks',
      'Acceso a sala de networking',
    ],
    color: '#007AFF',
    accentBorder: '#007AFF',
  },
  {
    id: 'profesional',
    icon: '💼',
    title: 'Profesional',
    subtitle: 'Investigadores y docentes',
    price: '$1,500',
    currency: 'MXN',
    usd: '~$85 USD',
    featured: true,
    cta: '¡Registrarme ahora!',
    benefits: [
      'Todo lo incluido en Estudiante',
      'Publicación en memorias del congreso',
      'Presentación de ponencia',
      'Certificado de ponente Valladolid',
      'Acceso a sesiones especiales',
      'Comida del día incluida',
      'Reconocimiento en el programa oficial',
    ],
    color: '#F4A800',
    accentBorder: '#F4A800',
  },
  {
    id: 'internacional',
    icon: '🌎',
    title: 'Internacional',
    subtitle: 'Participantes extranjeros',
    price: '$120',
    currency: 'USD',
    usd: '',
    featured: false,
    cta: 'Registrarme',
    benefits: [
      'Todo lo incluido en Profesional',
      'Apoyo en gestión de carta de invitación',
      'Acceso a tour cultural — Ek Balam',
      'Sesión de networking internacional',
      'Traducción simultánea (ES/EN)',
      'Apoyo logístico de llegada',
    ],
    color: '#FF6200',
    accentBorder: '#FF6200',
  },
];

const PlanCard = ({ plan }) => (
  <div
    className={`relative flex flex-col rounded-3xl overflow-hidden transition-all duration-300 ${
      plan.featured ? 'lg:-translate-y-4' : ''
    }`}
    style={{
      background: '#FFFFFF',
      border: plan.featured ? `2px solid #F4A800` : '1px solid #E5E7EB',
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
        e.currentTarget.style.transform = plan.featured ? '' : 'translateY(0)';
      }
    }}
  >
    {/* Badge "Más popular" */}
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
      {/* Ícono + Título */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
          style={{ background: plan.featured ? 'rgba(244,168,0,0.1)' : '#F8F9FA', border: '1px solid #E5E7EB' }}
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
          <p className="text-xs" style={{ color: '#6B7280' }}>{plan.subtitle}</p>
        </div>
      </div>

      {/* Precio */}
      <div className="mb-8">
        <div className="flex items-baseline gap-1">
          <span
            className="text-5xl font-black"
            style={{ color: plan.featured ? '#F4A800' : '#0A2A43' }}
          >
            {plan.price}
          </span>
          <span className="text-lg font-semibold" style={{ color: '#6B7280' }}>{plan.currency}</span>
        </div>
        {plan.usd && (
          <p className="text-sm mt-1" style={{ color: '#9CA3AF' }}>{plan.usd}</p>
        )}
        <div
          className="mt-3 h-px"
          style={{ background: `linear-gradient(90deg, ${plan.color}, transparent)` }}
        />
      </div>

      {/* Lista de beneficios */}
      <ul className="space-y-3 flex-1 mb-8">
        {plan.benefits.map((b, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <div
              className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: plan.featured ? 'rgba(244,168,0,0.12)' : `${plan.color}12`,
                border: `1px solid ${plan.color}40`,
              }}
            >
              <Check size={10} style={{ color: plan.color }} />
            </div>
            <span className="text-sm leading-snug" style={{ color: '#374151' }}>{b}</span>
          </li>
        ))}
      </ul>

      {/* Botón CTA */}
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

// Componente Costos
const Costos = () => (
  <section
    id="costos"
    className="py-20 sm:py-28 relative overflow-hidden"
    style={{ background: '#F8F9FA' }}
  >
    {/* Decoraciones sutiles */}
    <div
      className="absolute top-10 right-10 w-80 h-80 rounded-full opacity-[0.03] blur-3xl pointer-events-none"
      style={{ background: '#F4A800' }}
    />
    <div
      className="absolute bottom-10 left-10 w-80 h-80 rounded-full opacity-[0.03] blur-3xl pointer-events-none"
      style={{ background: '#007AFF' }}
    />

    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Encabezado */}
      <div className="text-center mb-14">
        <span
          className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
          style={{ background: 'rgba(244,168,0,0.1)', color: '#F4A800', border: '1px solid rgba(244,168,0,0.3)' }}
        >
          Inscripción
        </span>
        <h2 className="text-3xl sm:text-4xl font-black section-underline" style={{ color: '#0A2A43' }}>
          Costos de Registro
        </h2>
        <p className="mt-6 max-w-xl mx-auto" style={{ color: '#6B7280' }}>
          Inversión accesible para participar en uno de los congresos académicos más importantes de la red Valladolid.
        </p>
      </div>

      {/* Grid de pricing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start lg:items-stretch">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>

      {/* Nota al pie */}
      <div
        className="mt-12 p-5 rounded-2xl text-center flex flex-col sm:flex-row items-center justify-center gap-3"
        style={{
          background: '#FFFFFF',
          border: '1px solid #E5E7EB',
        }}
      >
        <Globe size={18} style={{ color: '#007AFF', flexShrink: 0 }} />
        <p className="text-sm" style={{ color: '#6B7280' }}>
          Los costos incluyen IVA. Para pagos en USD, aplica tipo de cambio del día.
          Para grupos de más de 5 personas, contáctanos para tarifas especiales.
        </p>
      </div>
    </div>
  </section>
);

export default Costos;
