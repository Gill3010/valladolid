import { BookOpen, ExternalLink, Library } from 'lucide-react';

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
        descripcion: 'Investigación y reflexión sobre prácticas educativas y procesos formativos en Latinoamérica.',
        url: 'https://relaticpanama.org/_journals/index.php/dialogoseducativos',
      },
      {
        id: 'icuali',
        titulo: 'ICUALI',
        descripcion: 'Investigación cualitativa aplicada a contextos sociales, educativos y culturales.',
        url: 'https://relaticpanama.org/_journals/index.php/icuali',
      },
      {
        id: 'mundo-sostenible',
        titulo: 'Mundo Sostenible',
        descripcion: 'Desarrollo sostenible, medio ambiente y responsabilidad social desde una mirada interdisciplinaria.',
        url: 'https://relaticpanama.org/_journals/index.php/mundosostenible',
      },
      {
        id: 'educaf5-berit',
        titulo: 'EDUCAF5-BERIT',
        descripcion: 'Educación, formación y transferencia de conocimiento en entornos académicos y profesionales.',
        url: 'https://relaticpanama.org/_journals/index.php/educaf5-berit',
      },
      {
        id: 'scientia-iter',
        titulo: 'Scientia Iter',
        descripcion: 'Trayectorias científicas, innovación y producción de conocimiento en la región.',
        url: 'https://relaticpanama.org/_journals/index.php/scientiaiter',
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
        descripcion: 'Articulación entre educación, ciencia y transformaciones sociales en el contexto latinoamericano.',
        url: 'https://revistas.editorialecuador.org/index.php/educacioncienciaycambiosocial',
      },
      {
        id: 'praxis-transformacion',
        titulo: 'Praxis y Transformación Educativa',
        descripcion: 'Prácticas pedagógicas, innovación educativa y transformación de los sistemas formativos.',
        url: 'https://revistas.editorialecuador.org/index.php/praxisytransformacioneduativa',
      },
    ],
  },
];

const RevistaCard = ({ revista, accent }) => (
  <a
    href={revista.url}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex flex-col rounded-2xl p-5 sm:p-6 transition-all duration-300 h-full"
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
    <div
      className="h-0.5 w-8 rounded-full mb-4 transition-all duration-300 group-hover:w-full"
      style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
      aria-hidden="true"
    />

    <h4 className="text-base sm:text-lg font-bold leading-tight mb-2" style={{ color: '#0A2A43' }}>
      {revista.titulo}
    </h4>

    <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: '#6B7280' }}>
      {revista.descripcion}
    </p>

    <span
      className="inline-flex items-center gap-2 text-sm font-semibold mt-auto transition-opacity duration-200 group-hover:opacity-90"
      style={{ color: accent }}
    >
      Visitar portal
      <ExternalLink size={14} aria-hidden="true" />
    </span>
  </a>
);

const PortalGroup = ({ portal }) => {
  const Icon = portal.icon;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: portal.accentBg,
            border: `1px solid ${portal.accentBorder}`,
          }}
          aria-hidden="true"
        >
          <Icon size={22} style={{ color: portal.accent }} />
        </div>
        <div className="min-w-0">
          <h3 className="text-xl sm:text-2xl font-bold leading-tight" style={{ color: '#0A2A43' }}>
            {portal.titulo}
          </h3>
          <p className="mt-2 text-sm leading-relaxed max-w-2xl" style={{ color: '#6B7280' }}>
            {portal.descripcion}
          </p>
          <span
            className="inline-block mt-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
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
    style={{ background: '#FFFFFF' }}
    aria-labelledby="publicaciones-heading"
  >
    <div
      className="absolute top-16 right-0 w-72 h-72 rounded-full opacity-[0.03] blur-3xl pointer-events-none"
      style={{ background: '#007AFF' }}
      aria-hidden="true"
    />
    <div
      className="absolute bottom-10 left-0 w-72 h-72 rounded-full opacity-[0.03] blur-3xl pointer-events-none"
      style={{ background: '#FF6200' }}
      aria-hidden="true"
    />

    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14">
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
          className="text-3xl sm:text-4xl font-black section-underline"
          style={{ color: '#0A2A43' }}
        >
          Espacios de Publicación
        </h2>
        <p className="mt-6 max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
          Accede a los portales editoriales donde se difundirán los productos científicos del IV Congreso Internacional RELATIC 2026.
        </p>
      </div>

      <div className="flex flex-col gap-14 sm:gap-16">
        {espaciosPublicacion.map((portal) => (
          <PortalGroup key={portal.id} portal={portal} />
        ))}
      </div>
    </div>
  </section>
);

export default Publicaciones;
