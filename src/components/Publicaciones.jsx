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
} from 'lucide-react';

/**
 * Espacios de publicación de productos científicos del congreso.
 * Estructura data-driven: agregar un portal o una revista solo requiere
 * extender `espaciosPublicacion` — el JSX no cambia.
 */
const espaciosPublicacion = [
  {
    id: 'relatic-panama',
    titulo: 'Revistas RELATIC Panamá',
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
      },
      {
        id: 'icuali',
        titulo: 'ICUALI',
        tagline: 'Profundiza en la realidad social desde la investigación cualitativa',
        descripcion: 'Investigación cualitativa aplicada a contextos sociales, educativos y culturales.',
        url: 'https://relaticpanama.org/_journals/index.php/icuali',
        icon: Users,
      },
      {
        id: 'mundo-sostenible',
        titulo: 'Mundo Sostenible',
        tagline: 'Conecta tu investigación con los desafíos ambientales y sociales',
        descripcion: 'Desarrollo sostenible, medio ambiente y responsabilidad social desde una mirada interdisciplinaria.',
        url: 'https://relaticpanama.org/_journals/index.php/mundosostenible',
        icon: Globe2,
      },
      {
        id: 'educaf5-berit',
        titulo: 'EDUCAF5-BERIT',
        tagline: 'Impulsa la innovación en formación y transferencia de conocimiento',
        descripcion: 'Educación, formación y transferencia de conocimiento en entornos académicos y profesionales.',
        url: 'https://relaticpanama.org/_journals/index.php/educaf5-berit',
        icon: Lightbulb,
      },
      {
        id: 'scientia-iter',
        titulo: 'Scientia Iter',
        tagline: 'Traza nuevas rutas para la ciencia y la innovación regional',
        descripcion: 'Trayectorias científicas, innovación y producción de conocimiento en la región.',
        url: 'https://relaticpanama.org/_journals/index.php/scientiaiter',
        icon: Compass,
      },
    ],
  },
  {
    id: 'ecuador',
    titulo: 'Revistas de Ecuador',
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
      },
      {
        id: 'praxis-transformacion',
        titulo: 'Praxis y Transformación Educativa',
        tagline: 'Reinventa las prácticas pedagógicas con evidencia científica',
        descripcion: 'Prácticas pedagógicas, innovación educativa y transformación de los sistemas formativos.',
        url: 'https://revistas.editorialecuador.org/index.php/praxisytransformacioneduativa',
        icon: FlaskConical,
      },
    ],
  },
];

// Total de revistas para las estadísticas
const totalRevistas = espaciosPublicacion.reduce((sum, p) => sum + p.revistas.length, 0);

const RevistaCard = ({ revista, accent }) => {
  const Icon = revista.icon;
  return (
    <a
      href={revista.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-2xl transition-all duration-300 h-full overflow-hidden"
      style={{
        background: '#FFFFFF',
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accent;
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.09)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#E5E7EB';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)';
      }}
      aria-label={`Abrir ${revista.titulo} en una nueva pestaña`}
    >
      {/* Barra de color top */}
      <div
        className="h-1 w-full transition-all duration-300"
        style={{ background: `linear-gradient(90deg, ${accent}, ${accent}60)` }}
        aria-hidden="true"
      />

      <div className="p-5 sm:p-6 flex flex-col flex-1">
        {/* Icono y badge de acceso abierto */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{
              background: `${accent}10`,
              border: `1px solid ${accent}25`,
            }}
          >
            <Icon size={20} style={{ color: accent }} />
          </div>
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

        {/* Título */}
        <h4 className="text-base sm:text-lg font-bold leading-tight mb-2" style={{ color: '#0A2A43' }}>
          {revista.titulo}
        </h4>

        {/* Tagline diferenciador */}
        <p
          className="text-sm font-medium leading-snug mb-3"
          style={{ color: accent }}
        >
          {revista.tagline}
        </p>

        {/* Descripción */}
        <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: '#4B5563' }}>
          {revista.descripcion}
        </p>

        {/* CTA */}
        <span
          className="inline-flex items-center gap-2 text-sm font-semibold mt-auto transition-all duration-200 group-hover:gap-3"
          style={{ color: accent }}
        >
          Visitar portal
          <ExternalLink size={14} aria-hidden="true" />
        </span>
      </div>
    </a>
  );
};

const PortalGroup = ({ portal }) => {
  const Icon = portal.icon;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-8">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: portal.accentBg,
            border: `1px solid ${portal.accentBorder}`,
          }}
          aria-hidden="true"
        >
          <Icon size={26} style={{ color: portal.accent }} />
        </div>
        <div className="min-w-0">
          <h3 className="text-xl sm:text-2xl font-bold leading-tight" style={{ color: '#0A2A43' }}>
            {portal.titulo}
          </h3>
          <p className="mt-2 text-sm sm:text-base leading-relaxed max-w-2xl" style={{ color: '#4B5563' }}>
            {portal.descripcion}
          </p>
          <span
            className="inline-block mt-3 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{
              background: portal.accentBg,
              color: portal.accent,
              border: `1px solid ${portal.accentBorder}`,
            }}
          >
            {portal.revistas.length} {portal.revistas.length === 1 ? 'revista' : 'revistas'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {portal.revistas.map((revista) => (
          <RevistaCard key={revista.id} revista={revista} accent={portal.accent} />
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
      {/* Encabezado mejorado */}
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

      {/* Estadísticas rápidas */}
      <div
        className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-14 py-5 px-6 rounded-2xl mx-auto max-w-2xl"
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

      {/* Portales */}
      <div className="flex flex-col gap-16 sm:gap-20">
        {espaciosPublicacion.map((portal) => (
          <PortalGroup key={portal.id} portal={portal} />
        ))}
      </div>
    </div>
  </section>
);

export default Publicaciones;
