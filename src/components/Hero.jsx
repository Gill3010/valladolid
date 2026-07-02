import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Mail, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ──────────────────────────────────────────────
// Carga dinámica de fotografías de editores
// Ruta: /src/assets/editors/
// Vite import.meta.glob carga las fotos que existan sin romper
// la compilación cuando los archivos aún no se han agregado.
// ──────────────────────────────────────────────
const editorImages = import.meta.glob(
  '../assets/editors/*.{webp,jpg,jpeg,png}',
  { eager: true, import: 'default' }
);

const getEditorPhoto = (filename) => {
  const key = `../assets/editors/${filename}`;
  return editorImages[key] || null;
};

// ──────────────────────────────────────────────
// Paleta de acentos (identidad del proyecto)
// ──────────────────────────────────────────────
const accentColors = ['#007AFF', '#F4A800', '#FF6200'];

// ──────────────────────────────────────────────
// Datos de los 15 editores
// ──────────────────────────────────────────────
const editorsData = [
  {
    id: 1,
    name: 'Israel Armando Samuels Gill',
    title: 'Licenciado en Ingeniería Informática',
    role: 'Editor Técnico',
    affiliation: 'Universidad de Panamá. Panamá',
    bio: 'Desarrollador con sólida experiencia en aplicaciones móviles y web. Especialista en la implementación y gestión de sistemas editoriales como OJS, OMP, OHS y DSpace, fundamentales para la administración, difusión y visibilidad de revistas y libros científicos en plataformas digitales.',
    orcid: '0009-0007-1212-718X',
    email: 'desarrolloyoperaciones@relaticpanama.org',
    photoSlug: 'Is.jpeg',
  },
  {
    id: 2,
    name: 'Mónica Nuzhat Contreras Ochoa',
    title: 'Doctora',
    role: 'Editora Académica - RELATIC PANAMÁ',
    affiliation: 'Universidad de Panamá. Panamá',
    bio: 'Profesora Titular de Zoología de Vertebrados de la Universidad de Panamá. Coordinadora del Postgrado en Gestión y Edición de Revistas Científicas y del Grupo Pro Acceso Abierto Sostenible. Editora de la Revista Societas, árbitro y autora de artículos y libros científicos.',
    orcid: '0000-0003-0972-6951',
    email: 'academico@relaticpanama.org',
    photoSlug: 'Monica.jpeg',
  },
  {
    id: 3,
    name: 'Olga Reyes Samboy De Mejía',
    title: 'Doctora',
    role: 'Editora Temática - en Ciencias Sociales',
    affiliation: 'Ministerio de Educación de la República Dominicana (MINERD). República Dominicana',
    bio: 'Profesora titular y consultora internacional en evaluación de programas, lidera redes de colaboración académica entre universidades panameñas y latinoamericanas, además de desempeñarse como editora académica con amplia experiencia en indexación y visibilidad de revistas científicas.',
    orcid: '0000-0003-2898-063X',
    email: 'olga.samboy@minerd.gob.do',
    photoSlug: 'Olga.png',
  },
  {
    id: 4,
    name: 'Augusto Paolo Bernal Parraga',
    title: 'Doctor',
    role: 'Editor Temático - en Ciencias de la Educación',
    affiliation: 'Universidad de las Fuerzas Armadas ESPE. Ecuador',
    bio: 'Profesor titular y consultor internacional en evaluación de programas, lidera redes de colaboración académica entre universidades panameñas y latinoamericanas, además de desempeñarse como editor académico con amplia experiencia en indexación y visibilidad de revistas científicas.',
    orcid: '0000-0003-0289-8427',
    email: 'abernal2009@gmail.com',
    photoSlug: 'Augusto.jpeg',
  },
  {
    id: 5,
    name: 'Kelis Paola Montes Manjarres',
    title: 'Licenciada',
    role: 'Editora Temática',
    affiliation: 'Universidad de Córdoba. Colombia',
    bio: 'Licenciada en Educación Física, Recreación y Deportes con amplia experiencia en formación integral y dirección de actividades deportivas. Se desempeña como docente y coordinadora en diversas instituciones educativas, con enfoque en desarrollo curricular y didácticas contemporáneas.',
    orcid: '0009-0004-4495-8402',
    email: 'kelis_montes@hotmail.com',
    photoSlug: 'Kelis.jpg',
  },
  {
    id: 6,
    name: 'Karel Llopiz Guerra',
    title: 'Doctor',
    role: 'Editor Académico - en Ciencias Pedagógicas',
    affiliation: 'Universidad Central "Marta Abreu" de las Villas. Cuba',
    bio: 'Doctor en Ciencias Pedagógicas y Profesor Titular en la Universidad Central Marta Abreu de las Villas. Especialista en Psicopedagogía e Inclusión Educativa, con amplia experiencia en la formación docente de pregrado y posgrado, enfocado en educación especial y desarrollo curricular.',
    orcid: '0000-0002-1500-8000',
    email: 'kllopiz@uclv.cu',
    photoSlug: 'Karel.jpeg',
  },
  {
    id: 7,
    name: 'Kenialiss Solenzal Hernández',
    title: 'Magister',
    role: 'Editora Académica - en Ciencias de la Educación',
    affiliation: 'Universidad de Sancti Spíritus "José Martí Pérez". Cuba',
    bio: 'Profesora asistente en la Universidad de Sancti Spíritus José Martí Pérez. Licenciada en Educación con especialidad en Español-Literatura y Master en Nuevas Tecnologías para la Educación, con experiencia en bibliotecología y gestión de información académica.',
    orcid: '0000-0002-1500-8000',
    email: 'margenes@uniss.edu.cu',
    photoSlug: 'kenialiss.jpeg',
  },
  {
    id: 8,
    name: 'Lidia Esther Estrada Jiménez',
    title: 'Doctora',
    role: 'Editora Temática - en Ciencias de la Educación',
    affiliation: 'Universidad de Sancti Spíritus "José Martí Pérez". Cuba',
    bio: 'Directora del CRAI y del sello editorial Raúl Ferrer en la UNISS. Dirige la revista Pedagogía y Sociedad. Miembro del Consejo Científico, árbitro internacional y editora de Márgenes, con amplia experiencia en gestión editorial, formación doctoral e investigación.',
    orcid: '0000-0002-5175-6049',
    email: 'lestrada@uniss.edu.cu',
    photoSlug: 'Lidia.jpeg',
  },
  {
    id: 9,
    name: 'Lydia Rosa Ríos Rodríguez',
    title: 'Doctora',
    role: 'Editora Temática - en Ciencias de la Educación',
    affiliation: 'Universidad de Sancti Spíritus "José Martí Pérez". Cuba',
    bio: 'Profesora Titular de la Universidad de Sancti Spíritus José Martí Pérez. Doctora en Ciencias Técnicas y Máster en Computación Aplicada. Presidenta de la Comisión de Grados Científicos, miembro del Consejo Científico y experta de la Junta de Acreditación Nacional.',
    orcid: '0000-0001-5176-931X',
    email: 'lidia@uniss.edu.cu',
    photoSlug: 'lydia.jpg',
  },
  {
    id: 10,
    name: 'Natia Acosta García',
    title: 'Magister',
    role: 'Editora Académica - en Educación bilingüe',
    affiliation: 'Universidad de Panamá. Panamá',
    bio: 'Doctoranda en Lingüística Inglesa por la Universidad de Panamá. Magíster en Lingüística Inglesa con énfasis en Didáctica por la Universidad Nacional. Profesora de inglés en el Colegio Juan Antonio Henríquez y en la UDELAS. Amplia experiencia en enseñanza del inglés como segunda lengua en diversos niveles educativos.',
    orcid: '0009-0000-1312-1694',
    email: 'natiaacosta26@gmail.com',
    photoSlug: 'Natia.jpeg',
  },
  {
    id: 11,
    name: 'Constancia Shellon',
    title: 'Magister',
    role: 'Editora Académica - en Educación bilingüe',
    affiliation: 'Universidad de Panamá. Panamá',
    bio: 'Doctoranda en Lingüística Inglesa por la Universidad de Panamá. Magíster en TESOL por la Universidad Latina. Licenciada en Inglés con especialización en Lingüística por UNIEPA. Posgrado en Docencia Universitaria. Amplia experiencia en enseñanza del inglés a nivel secundario y universitario.',
    orcid: '0000-0003-4033-2459',
    email: 'constancia.Shellon@up.ac.pa',
    photoSlug: 'constancia.jpg',
  },
  {
    id: 12,
    name: 'Juan Carlos Lázaro Guillermo',
    title: 'Magister',
    role: 'Editor Académico - en Ciencias y Tecnologías',
    affiliation: 'Universidad Nacional Intercultural de la Amazonia. Perú',
    bio: 'Doctorando en cambio climático y desarrollo sostenible. Magister en Educación y Maestrando en IA. Licenciado en Ciencias de la Computación.',
    orcid: '0000-0002-4785-9344',
    email: 'jlazarog@unia.edu.pe',
    photoSlug: 'Lazaro.jpeg',
  },
  {
    id: 13,
    name: 'Ana Victoria Rivera',
    title: 'Licenciada en Administración de Negocios y Gerencia en Recursos Humanos',
    role: 'Editora Académica - en Gestión Editorial',
    affiliation: 'Universidad de Panamá. Panamá',
    bio: 'Especialista en Gestión y Edición de Revistas Científicas, con formación en Administración y Recursos Humanos. Enfocada en la calidad y visibilidad de publicaciones digitales. Cursa Maestría en Docencia Superior para fortalecer la difusión del conocimiento académico.',
    orcid: '0009-0008-5712-3630',
    email: 'publicaciones@relaticpanama.org',
    photoSlug: 'Anita.jpeg',
  },
  {
    id: 14,
    name: 'Yamile F. Arrieta Rodríguez',
    title: 'Magister',
    role: 'Editora Académica - en Gestión Editorial',
    affiliation: 'Centro Universitario de los Lagos UDG. Lagos de Moreno, Jalisco. México',
    bio: 'Docente y responsable de los Programas de Tutorías y Asesorías del Centro Universitario de los Lagos UDG. Licenciada en Filología y Máster en Gestión Cultural Comunitaria. Amplia formación en innovación docente, tutoría institucional y diseño instruccional para el aprendizaje activo.',
    orcid: '0000-0002-7311-3976',
    email: '@relaticpanama.org',
    photoSlug: 'Yamile.png',
  },
  {
    id: 15,
    name: 'Coulette C. Andrews T.',
    title: 'Doctoranda (PhD candidate)',
    role: 'Editora Académica - en Microbiología e Investigación Biomédica',
    affiliation: 'Universidad de Panamá. Panamá',
    bio: 'Microbióloga e investigadora biomédica con Maestría en Ciencias de la Universidad de Boston. Más de tres años de experiencia en cultivo celular, biología molecular y laboratorios BSL-1 y BSL-2. Profesional bilingüe con formación en bioinformática y compromiso con la innovación clínica.',
    orcid: '0000-0002-7708-4594',
    email: 'coulette.andrews@up.ac.pa',
    photoSlug: 'Coulette.jpeg',
  },
];

// ──────────────────────────────────────────────
// Utilidades
// ──────────────────────────────────────────────
const getInitials = (name) => {
  const parts = name.split(' ').filter(Boolean);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const getAccent = (index) => accentColors[index % accentColors.length];

// ──────────────────────────────────────────────
// Variantes de animación (framer-motion)
// ──────────────────────────────────────────────
const slideVariants = {
  enter: (dir) => ({
    opacity: 0,
    x: dir === 'next' ? 80 : -80,
    scale: 0.97,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir) => ({
    opacity: 0,
    x: dir === 'next' ? -80 : 80,
    scale: 0.97,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerChild = {
  hidden: { opacity: 0, y: 18 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ──────────────────────────────────────────────
// Componente Hero — Editorial Canvas Layout
// ──────────────────────────────────────────────
const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState('next');
  const dotsRef = useRef(null);
  const timerRef = useRef(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection('next');
      setCurrent((prev) => (prev + 1) % editorsData.length);
    }, 7000);
  }, []);

  const goToSlide = useCallback(
    (index, dir = 'next') => {
      setDirection(dir);
      setCurrent(index);
      resetTimer();
    },
    [resetTimer]
  );

  const nextSlide = useCallback(() => {
    goToSlide((current + 1) % editorsData.length, 'next');
  }, [current, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((current - 1 + editorsData.length) % editorsData.length, 'prev');
  }, [current, goToSlide]);

  // Auto-avance
  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  // Scroll dots
  useEffect(() => {
    if (dotsRef.current?.children[current]) {
      const container = dotsRef.current;
      const activeDot = container.children[current];
      const scrollPos = activeDot.offsetLeft - (container.clientWidth / 2) + (activeDot.clientWidth / 2);
      container.scrollTo({ left: scrollPos, behavior: 'smooth' });
    }
  }, [current]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      else if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [nextSlide, prevSlide]);

  const editor = editorsData[current];
  const accent = getAccent(current);
  const photoSrc = getEditorPhoto(editor.photoSlug);

  return (
    <section
      className="relative overflow-hidden flex flex-col min-h-[100dvh] lg:min-h-0 lg:h-[clamp(580px,72vh,820px)]"
      aria-label="Comité Editorial Internacional"
      style={{
        background: '#0A2A43',
      }}
    >
      {/* ═══ Fondo atmosférico ═══ */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 transition-all duration-1000"
          style={{
            background: `
              radial-gradient(ellipse 70% 50% at 65% 50%, ${accent}12 0%, transparent 70%),
              radial-gradient(ellipse 40% 70% at 15% 80%, #F4A80008 0%, transparent 60%),
              linear-gradient(160deg, #0A2A43 0%, #060F1A 50%, #0A2A43 100%)
            `,
          }}
        />
        {/* Textura de ruido */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '200px',
          }}
        />
        {/* Línea diagonal decorativa */}
        <div
          className="absolute inset-0 opacity-[0.03] transition-all duration-1000"
          style={{
            background: `linear-gradient(${148 + current * 2}deg, transparent 42%, ${accent} 42.3%, ${accent} 42.6%, transparent 42.9%)`,
          }}
        />
      </div>

      {/* ═══ Layout editorial — canvas split ═══ */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row w-full">

        {/* ──────────────────────────────────
             FOTOGRAFÍA — protagonista absoluta
             Se extiende más allá de su columna
             con degradados orgánicos multicapa
             ────────────────────────────────── */}
        <div className="relative lg:w-[42%] h-[35vh] min-h-[320px] lg:min-h-0 lg:h-full flex-shrink-0 overflow-visible">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={editor.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 lg:-right-24 overflow-hidden"
            >
              {photoSrc ? (
                <img
                  src={photoSrc}
                  alt={`Fotografía de ${editor.name}`}
                  className="w-full h-full object-cover object-top"
                  style={{ objectPosition: '50% 15%' }}
                  loading="lazy"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ background: `linear-gradient(160deg, ${accent}30 0%, #0A2A43 100%)` }}
                  role="img"
                  aria-label={`Iniciales de ${editor.name}`}
                >
                  <span
                    className="font-black select-none"
                    style={{
                      fontSize: 'clamp(5rem, 12vw, 11rem)',
                      color: `${accent}20`,
                      letterSpacing: '-0.04em',
                    }}
                  >
                    {getInitials(editor.name)}
                  </span>
                </div>
              )}

              {/* Máscara de fusión — múltiples capas para blending orgánico */}
              {/* Capa 1: degradado horizontal principal (foto → panel) */}
              <div
                className="absolute inset-0 hidden lg:block"
                style={{
                  background: `linear-gradient(to right, transparent 25%, transparent 45%, #0A2A43cc 70%, #0A2A43 90%)`,
                }}
              />
              {/* Capa 2: degradado inferior suave */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, #0A2A43 0%, #0A2A43aa 8%, transparent 35%)',
                }}
              />
              {/* Capa 3: viñeta superior tenue */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to bottom, #0A2A43aa 0%, transparent 20%)',
                }}
              />
              {/* Capa 4: solo mobile — degradado inferior más fuerte */}
              <div
                className="absolute inset-0 lg:hidden"
                style={{
                  background: 'linear-gradient(to bottom, transparent 40%, #0A2A43 92%)',
                }}
              />
              {/* Capa 5: velo de color de acento sutil */}
              <div
                className="absolute inset-0 transition-all duration-1000"
                style={{
                  background: `radial-gradient(ellipse 60% 80% at 30% 60%, ${accent}08 0%, transparent 70%)`,
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Número editorial — outline tipográfico */}
          <div className="absolute bottom-4 left-5 lg:bottom-8 lg:left-8 z-10 select-none pointer-events-none">
            <span
              className="font-black leading-none"
              style={{
                fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                color: 'transparent',
                WebkitTextStroke: `1px ${accent}35`,
                letterSpacing: '-0.04em',
              }}
            >
              {String(current + 1).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* ──────────────────────────────────
             INFORMACIÓN — jerarquía tipográfica
             con respiración generosa entre bloques
             ────────────────────────────────── */}
        <div className="relative flex-1 flex items-center px-6 sm:px-10 lg:pl-8 lg:pr-16 pt-8 pb-32 lg:py-0">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={editor.id + '-info'}
              custom={direction}
              initial={{ opacity: 0, y: 24 }}
              animate={{
                opacity: 1, y: 0,
                transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 },
              }}
              exit={{ opacity: 0, y: -16, transition: { duration: 0.3 } }}
              className="w-full max-w-lg"
            >
              {/* ── Sección ── */}
              <motion.div custom={0} variants={staggerChild} initial="hidden" animate="visible"
                className="flex items-center gap-3 mb-8"
              >
                <div className="h-px w-8" style={{ background: `${accent}80` }} />
                <span
                  className="text-sm font-bold uppercase tracking-[0.15em]"
                  style={{ color: `${accent}CC` }}
                >
                  Comité Editorial Internacional
                </span>
              </motion.div>

              {/* ── Rol ── */}
              <motion.div custom={1} variants={staggerChild} initial="hidden" animate="visible"
                className="mb-6"
              >
                <span
                  className="inline-block px-3.5 py-1.5 text-sm font-bold uppercase tracking-[0.1em]"
                  style={{
                    background: `${accent}15`,
                    color: accent,
                    borderLeft: `2px solid ${accent}`,
                  }}
                >
                  {editor.role}
                </span>
              </motion.div>

              {/* ── Nombre ── */}
              <motion.h1 custom={2} variants={staggerChild} initial="hidden" animate="visible"
                className="font-black leading-[1] mb-5"
                style={{
                  color: '#FFFFFF',
                  fontSize: 'clamp(1.6rem, 3.2vw, 2.6rem)',
                  letterSpacing: '-0.025em',
                }}
              >
                {editor.name}
              </motion.h1>

              {/* ── Título académico ── */}
              <motion.p custom={3} variants={staggerChild} initial="hidden" animate="visible"
                className="text-[14px] sm:text-[15px] font-medium tracking-wide mb-3"
                style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}
              >
                {editor.title}
              </motion.p>

              {/* ── Afiliación ── */}
              <motion.div custom={4} variants={staggerChild} initial="hidden" animate="visible"
                className="flex items-start gap-2.5 mb-7"
              >
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[6px]"
                  style={{ background: accent, boxShadow: `0 0 10px ${accent}80` }}
                />
                <p className="text-[14px] font-medium leading-relaxed" style={{ color: 'rgba(255,255,255,0.95)' }}>
                  {editor.affiliation}
                </p>
              </motion.div>

              {/* ── Biografía (estilo editorial destacado) ── */}
              <motion.div custom={5} variants={staggerChild} initial="hidden" animate="visible"
                className="mb-8 relative pl-5 sm:pl-6"
              >
                {/* Acento visual izquierdo para enmarcar la bio */}
                <div 
                  className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full" 
                  style={{ background: `linear-gradient(to bottom, ${accent}dd, ${accent}30)` }} 
                  aria-hidden="true"
                />
                <p 
                  className="text-[15px] sm:text-[16px] leading-[1.75] font-light"
                  style={{ color: 'rgba(255,255,255,0.85)' }}
                >
                  {editor.bio}
                </p>
              </motion.div>

              {/* ── ORCID & Email ── */}
              <motion.div custom={6} variants={staggerChild} initial="hidden" animate="visible"
                className="flex flex-wrap items-center gap-3"
              >
                <a
                  href={`https://orcid.org/${editor.orcid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-[12px] font-bold tracking-wide transition-all duration-300 hover:scale-[1.03] hover:brightness-110"
                  style={{
                    background: accent,
                    color: '#FFFFFF',
                    clipPath: 'polygon(0 0, 100% 0, 97% 100%, 0% 100%)',
                  }}
                  aria-label={`Perfil ORCID de ${editor.name}`}
                >
                  <svg width="14" height="14" viewBox="0 0 256 256" fill="none" aria-hidden="true">
                    <path d="M128 256C198.7 256 256 198.7 256 128C256 57.3 198.7 0 128 0C57.3 0 0 57.3 0 128C0 198.7 57.3 256 128 256Z" fill="#A6CE39" />
                    <path d="M86.3 186.2H70.9V79.1H86.3V186.2Z" fill="#FFF" />
                    <path d="M108.9 79.1H155.3C178.2 79.1 193.3 93.2 193.3 113.6C193.3 134.3 177.8 148.3 155 148.3H124.3V186.2H108.9V79.1ZM124.3 134.3H153.2C168.9 134.3 177.8 125.8 177.8 113.6C177.8 101.1 168.9 93.1 153.2 93.1H124.3V134.3Z" fill="#FFF" />
                    <path d="M78.6 65.2C83.8 65.2 88.1 60.9 88.1 55.7C88.1 50.5 83.8 46.2 78.6 46.2C73.4 46.2 69.1 50.5 69.1 55.7C69.1 60.9 73.4 65.2 78.6 65.2Z" fill="#FFF" />
                  </svg>
                  {editor.orcid}
                  <ExternalLink size={12} className="opacity-60" />
                </a>
                <a
                  href={`mailto:${editor.email}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-[12px] font-bold tracking-wide transition-all duration-300 hover:scale-[1.03]"
                  style={{
                    color: 'rgba(255,255,255,0.9)',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    clipPath: 'polygon(0 0, 100% 0, 97% 100%, 0% 100%)',
                  }}
                  aria-label={`Correo electrónico de ${editor.name}`}
                >
                  <Mail size={14} style={{ color: accent }} />
                  <span className="truncate max-w-[180px]">{editor.email}</span>
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ═══ Controles ═══ */}

      {/* Flechas */}
      <button
        onClick={prevSlide}
        className="absolute left-3 lg:left-auto lg:right-24 bottom-5 lg:bottom-6 z-30 w-10 h-10 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          clipPath: 'polygon(6% 0, 100% 0, 94% 100%, 0% 100%)',
        }}
        aria-label="Editor anterior"
      >
        <ChevronLeft size={16} style={{ color: 'rgba(255,255,255,0.6)' }} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 lg:right-10 bottom-5 lg:bottom-6 z-30 w-10 h-10 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
        style={{
          background: `${accent}25`,
          border: `1px solid ${accent}40`,
          clipPath: 'polygon(6% 0, 100% 0, 94% 100%, 0% 100%)',
        }}
        aria-label="Editor siguiente"
      >
        <ChevronRight size={16} style={{ color: '#FFFFFF' }} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 lg:bottom-6 left-1/2 -translate-x-1/2 lg:left-[42%] lg:translate-x-0 z-30 max-w-[65vw] lg:max-w-[30vw]">
        <div
          ref={dotsRef}
          className="flex items-center gap-1 overflow-x-auto px-1"
          style={{ scrollbarWidth: 'none' }}
          role="tablist"
          aria-label="Navegación del carrusel de editores"
        >
          {editorsData.map((e, i) => (
            <button
              key={e.id}
              onClick={() => goToSlide(i, i > current ? 'next' : 'prev')}
              className="flex-shrink-0 transition-all duration-400 py-2"
              role="tab"
              aria-selected={i === current}
              aria-label={`Ir al editor ${i + 1}: ${e.name}`}
            >
              <div
                className="transition-all duration-400"
                style={{
                  width: i === current ? '28px' : '5px',
                  height: '2px',
                  background: i === current ? accent : 'rgba(255,255,255,0.15)',
                  boxShadow: i === current ? `0 0 8px ${accent}50` : 'none',
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Contador vertical */}
      <div className="absolute top-1/2 -translate-y-1/2 right-5 z-20 hidden lg:flex flex-col items-center">
        <span
          className="text-[9px] font-bold uppercase tracking-[0.25em]"
          style={{ color: 'rgba(255,255,255,0.2)', writingMode: 'vertical-lr' }}
        >
          {String(current + 1).padStart(2, '0')} — {String(editorsData.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
};

export default Hero;
