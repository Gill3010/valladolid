import React from 'react';
import {
  Leaf,
  Cpu,
  Landmark,
  GraduationCap,
  BarChart3,
  MapPin,
} from 'lucide-react';

// Ejes temáticos del congreso
const ejes = [
  {
    icon: Leaf,
    title: 'Sostenibilidad Ambiental',
    description:
      'Estrategias y políticas para el desarrollo sostenible, gestión de recursos naturales, cambio climático y transición energética en Latinoamérica.',
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.07)',
    border: 'rgba(34,197,94,0.2)',
    hoverBorder: '#22c55e',
  },
  {
    icon: Cpu,
    title: 'Innovación Tecnológica',
    description:
      'Inteligencia artificial, Internet de las Cosas, robótica y transformación digital como motores del progreso científico e industrial regional.',
    color: '#007AFF',
    bg: 'rgba(0,122,255,0.07)',
    border: 'rgba(0,122,255,0.2)',
    hoverBorder: '#007AFF',
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
  },
];

const EjeCard = ({ eje, index }) => {
  const Icon = eje.icon;
  return (
    <div
      className="group relative rounded-2xl p-6 flex flex-col gap-4 cursor-default transition-all duration-300"
      style={{
        background: '#FFFFFF',
        border: `1px solid #E5E7EB`,
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderTopColor = eje.hoverBorder;
        e.currentTarget.style.borderTopWidth = '3px';
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.09)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderTopColor = '#E5E7EB';
        e.currentTarget.style.borderTopWidth = '1px';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)';
      }}
    >
      {/* Número de eje */}
      <div
        className="absolute top-4 right-4 text-5xl font-black"
        style={{ color: eje.color, opacity: 0.07 }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Ícono */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
        style={{ background: eje.bg, border: `1px solid ${eje.border}` }}
      >
        <Icon size={24} style={{ color: eje.color }} />
      </div>

      {/* Línea de acento */}
      <div
        className="h-0.5 w-8 rounded-full transition-all duration-300 group-hover:w-full"
        style={{ background: `linear-gradient(90deg, ${eje.color}, transparent)` }}
      />

      {/* Contenido */}
      <div>
        <h3 className="text-lg font-bold mb-2 leading-tight" style={{ color: '#0A2A43' }}>{eje.title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>{eje.description}</p>
      </div>

      {/* Flecha CTA en hover */}
      <div
        className="flex items-center gap-2 text-xs font-semibold mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ color: eje.color }}
      >
        <span>Enviar ponencia</span>
        <div className="h-px flex-1" style={{ background: eje.color }} />
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
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.025] blur-3xl pointer-events-none"
      style={{ background: 'radial-gradient(circle, #007AFF, #0002E9)' }}
    />

    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Encabezado */}
      <div className="text-center mb-14">
        <span
          className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
          style={{ background: 'rgba(255,98,0,0.08)', color: '#FF6200', border: '1px solid rgba(255,98,0,0.25)' }}
        >
          Convocatoria
        </span>
        <h2 className="text-3xl sm:text-4xl font-black section-underline" style={{ color: '#0A2A43' }}>
          Ejes Temáticos
        </h2>
        <p className="mt-6 max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
          El IV Congreso Valladolid 2026 recibe ponencias, trabajos y proyectos de investigación en las siguientes áreas de conocimiento.
        </p>
      </div>

      {/* Grid de ejes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {ejes.map((eje, i) => (
          <EjeCard key={i} eje={eje} index={i} />
        ))}
      </div>

      {/* CTA inferior */}
      <div className="mt-14 text-center">
        <p className="text-sm mb-4" style={{ color: '#9CA3AF' }}>
          ¿Tu investigación no encaja en estos ejes? Contáctanos para más información.
        </p>
        <a
          href="#registro"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-all duration-300 hover:scale-105"
          style={{
            background: '#FF6200',
            boxShadow: '0 6px 24px rgba(255,98,0,0.3)',
          }}
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
        </a>
      </div>
    </div>
  </section>
);

export default EjesTematicos;
