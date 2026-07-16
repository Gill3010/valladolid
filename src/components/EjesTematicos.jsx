import React from 'react';
import {
  Leaf,
  Cpu,
  Landmark,
  GraduationCap,
  BarChart3,
  MapPin,
  ArrowRight,
} from 'lucide-react';

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
      className="group relative rounded-2xl overflow-hidden flex flex-col cursor-default transition-all duration-300"
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
        {/* Header: número + icono */}
        <div className="flex items-start justify-between">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
            style={{
              background: eje.bg,
              border: `1.5px solid ${eje.border}`,
            }}
          >
            <Icon size={28} style={{ color: eje.color }} />
          </div>
          {/* Número de eje — más visible */}
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
          className="text-sm sm:text-base leading-relaxed flex-1"
          style={{ color: '#374151' }}
        >
          {eje.description}
        </p>

        {/* CTA en hover — más prominente */}
        <div
          className="flex items-center gap-2 text-sm font-semibold mt-auto opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
          style={{ color: eje.color }}
        >
          <span>Enviar ponencia</span>
          <ArrowRight size={14} />
          <div className="h-px flex-1" style={{ background: `${eje.color}40` }} />
        </div>
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

      {/* Grid de ejes — gap más generoso */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {ejes.map((eje, i) => (
          <EjeCard key={i} eje={eje} index={i} />
        ))}
      </div>

      {/* CTA inferior */}
      <div className="mt-16 text-center">
        <p className="text-sm sm:text-base mb-5" style={{ color: '#4B5563' }}>
          ¿Tu investigación no encaja en estos ejes? Contáctanos para más información.
        </p>
        <a
          href="https://eventonexus.com/login"
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
          <ArrowRight size={16} />
        </a>
      </div>
    </div>
  </section>
);

export default EjesTematicos;
