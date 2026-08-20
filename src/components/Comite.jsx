import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Crown,
  LayoutDashboard,
  GraduationCap,
  Wallet,
  Handshake,
  Award,
  Package,
  FileText,
  CalendarDays,
  UserCheck,
  Building2,
  Newspaper,
  MonitorPlay,
  Megaphone,
  Bus,
  Pause,
  Play,
} from 'lucide-react';

// Grosor uniforme para todos los íconos de área (Lucide).
const ICON_STROKE = 1.75;

import imgFranchiska from '../assets/comite/Franchiska.jpeg';
import imgFrancisco from '../assets/comite/Francisco.jpeg';
import imgKelis from '../assets/comite/Kelis.jpeg';
import imgMonica from '../assets/comite/Monica.jpeg';
import imgKeyla from '../assets/comite/Keyla.jpg';
import imgEmely from '../assets/comite/Emely.png';
import imgIsabel from '../assets/comite/Isabel.png';
import imgLivia from '../assets/comite/Livia.jpeg';
import imgTania from '../assets/comite/Tania.jpeg';
import imgIsrael from '../assets/comite/Is.jpeg';
import imgCoulette from '../assets/editors/Coulette.jpeg';
import imgZenaida from '../assets/comite/Zenaida.jpeg';
import imgVicente from '../assets/comite/Vicente.jpeg';
import logoItsva from '../assets/logos/logo-itsva.jpeg';
import imgAntonio from '../assets/comite/Antonio.jpg';
import imgFabiola from '../assets/comite/Fabiola.jpeg';
import imgAymara from '../assets/comite/Aymara.png';

// Comité Organizador jerárquico por área (orden fijo, no alfabético).
// "institucion" = universidad/afiliación real (cuando se conoce). "red" = a qué
// organización pertenece (ITSVA o RELATIC) — son dos datos distintos, no deben
// combinarse. Grupos sin integrantes asignados se muestran igual, marcados
// como "Por asignar". Cadena vacía en "institucion" = pendiente de confirmar.
const comiteOrganizadorGrupos = [
  {
    categoria: 'Directores y Rectores',
    integrantes: [
      { nombre: 'Mtro. Héctor Daniel Aguilar Rivero', institucion: 'Instituto Tecnológico Superior Campus Valladolid, México', red: 'ITSVA' },
      { nombre: 'Dr. Vicente A. Moreno', institucion: 'Universidad Nuestra Señora del Carmen, Panamá', red: 'RELATIC', image: imgVicente, orcid: '0009-0007-7922-7548' },
      { nombre: 'Dr. Manuel Villero P.', institucion: 'University of Technology and Education, EEUU', red: 'RELATIC', orcid: '0000-0003-0347-2129' },
    ],
  },
  {
    categoria: 'Coordinación General',
    integrantes: [
      { nombre: 'Dr. Jesús Antonio Santos Tejero', institucion: 'Instituto Tecnológico Superior Campus Valladolid, México', red: 'ITSVA', image: imgAntonio, orcid: '0000-0002-9482-8225' },
      { nombre: 'Dr. Francisco Farnum Castro', institucion: 'Universidad de Panamá, Panamá', red: 'RELATIC', image: imgFrancisco, orcid: '0000-0002-5879-2296' },
    ],
  },
  {
    categoria: 'Académico',
    integrantes: [
      { nombre: 'Magister Franchiska Kamani Ávila', institucion: 'Universidad de Panamá, Panamá', red: 'RELATIC', image: imgFranchiska, orcid: '0009-0005-6793-6158' },
      { nombre: 'Lic. Kelis Paola Montes Manjarrés', institucion: 'University of Technology and Education, EEUU', red: 'RELATIC', image: imgKelis, orcid: '0009-0004-4495-8402' },
    ],
  },
  {
    categoria: 'Finanzas',
    integrantes: [
      { nombre: 'C.P. Lizet', institucion: 'Instituto Tecnológico Superior Campus Valladolid, México', red: 'ITSVA' },
      { nombre: 'Lic. Tania Kennedy', institucion: 'Universidad de Panamá, Panamá', red: 'RELATIC', image: imgTania, orcid: '0009-0009-8858-0954' },
    ],
  },
  {
    categoria: 'Vinculación',
    integrantes: [
      { nombre: 'Ing. Diego Ulises May Romero', institucion: 'Instituto Tecnológico Superior Campus Valladolid, México', red: 'ITSVA' },
    ],
  },
  {
    categoria: 'Científico',
    integrantes: [
      { nombre: 'ITESCAM', institucion: 'Instituto Tecnológico Superior Campus Valladolid, México', red: 'ITSVA' },
      { nombre: 'Dra. Isabel Menacho Vargas', institucion: 'UNMSM la Decana de América', red: 'RELATIC', image: imgIsabel, orcid: '0000-0001-6246-4618' },
      { nombre: 'Dr. Jesús Antonio Santos Tejero', institucion: 'Instituto Tecnológico Superior Campus Valladolid, México', red: 'ITSVA', image: imgAntonio, orcid: '0000-0002-9482-8225' },
      { nombre: 'Dra. Fabiola Colmenero Fonseca', institucion: 'Universitat Politècnica de València', red: 'RELATIC', image: imgFabiola, orcid: '0000-0003-1901-2725' },
    ],
  },
  {
    categoria: 'Logística',
    integrantes: [],
  },
  {
    categoria: 'Secretaría',
    integrantes: [
      { nombre: 'M. Sc. Zenaida Fossatti', institucion: 'Universidad de Panamá, Panamá', red: 'RELATIC', image: imgZenaida, orcid: '0009-0008-6717-3930' },
    ],
  },
  {
    categoria: 'Programa',
    integrantes: [
      { nombre: 'Dra. Naivi Raquel Aguilar Mena', institucion: 'Instituto Tecnológico Superior Campus Valladolid, México', red: 'ITSVA' },
      { nombre: 'Dra. Keyla Urbina', institucion: 'Universidad Latina, Panamá', red: 'RELATIC', image: imgKeyla, orcid: '0000-0003-3594-7010' },
    ],
  },
  {
    categoria: 'Protocolo',
    integrantes: [
      { nombre: 'Lic. Kelis Paola Montes Manjarrés', institucion: 'University of Technology and Education, EEUU', red: 'RELATIC', image: imgKelis, orcid: '0009-0004-4495-8402' },
      { nombre: 'M.Sc. Emely Saa', institucion: 'Universidad de Panamá, Panamá', red: 'RELATIC', image: imgEmely, orcid: '0009-0003-1066-2366' },
    ],
  },
  {
    categoria: 'Infraestructura y Servicios',
    integrantes: [
      { nombre: 'Laura Cortez', institucion: 'Instituto Tecnológico Superior Campus Valladolid, México', red: 'ITSVA' },
      { nombre: 'Rosana Cauich', institucion: 'Instituto Tecnológico Superior Campus Valladolid, México', red: 'ITSVA' },
    ],
  },
  {
    categoria: 'Editorial',
    integrantes: [
      { nombre: 'Dra. Livia Esthela Diaz González', institucion: 'University of Technology and Education, EEUU', red: 'RELATIC', image: imgLivia, orcid: '0000-0002-2045-4443' },
      { nombre: 'Dra. Mónica Contreras', institucion: 'Universidad de Panamá, Panamá', red: 'RELATIC', image: imgMonica, orcid: '0000-0003-0972-6951' },
      { nombre: 'Dra. Coulette C. Andrews T.', institucion: 'Universidad de Panamá, Panamá', red: 'RELATIC', image: imgCoulette, orcid: '0000-0002-7708-4594' },
      { nombre: 'Dra. Keyla Urbina', institucion: 'Universidad Latina, Panamá', red: 'RELATIC', image: imgKeyla, orcid: '0000-0003-3594-7010' },
      { nombre: 'Dra. Aymara Pacheco', institucion: 'Universidad de Santander', red: 'RELATIC', image: imgAymara, orcid: '0000-0003-2859-7817' },
      { nombre: 'M. Sc. Zenaida Fossatti', institucion: 'Universidad de Panamá, Panamá', red: 'RELATIC', image: imgZenaida, orcid: '0009-0008-6717-3930' },
    ],
  },
  {
    categoria: 'Técnico Transmisiones',
    integrantes: [
      { nombre: 'Ing. Oscar Vázquez', institucion: 'Instituto Tecnológico Superior Campus Valladolid, México', red: 'ITSVA' },
      { nombre: 'Lic. Dionisio Cano', institucion: 'Instituto Tecnológico Superior Campus Valladolid, México', red: 'ITSVA' },
      { nombre: 'Lic. Emilio', institucion: 'Instituto Tecnológico Superior Campus Valladolid, México', red: 'ITSVA' },
      { nombre: 'Lic. Fernando', institucion: 'Instituto Tecnológico Superior Campus Valladolid, México', red: 'ITSVA' },
      { nombre: 'Ing. Israel Samuels', institucion: 'Universidad de Panamá, Panamá', red: 'RELATIC', image: imgIsrael, orcid: '0009-0007-1212-718X' },
    ],
  },
  {
    categoria: 'Difusión y Constancias',
    integrantes: [
      { nombre: 'Mtro. Manuel Mena', institucion: 'Instituto Tecnológico Superior Campus Valladolid, México', red: 'ITSVA' },
    ],
  },
  {
    categoria: 'Transporte y Hospedaje',
    integrantes: [
      { nombre: 'M.Sc. Emely Saa', institucion: 'Universidad de Panamá, Panamá', red: 'RELATIC', image: imgEmely, orcid: '0009-0003-1066-2366' },
    ],
  },
];

// Miembros del comité con fotos placeholder de picsum esta parte comentada jamás puede eliminarse
const comiteData = {
  /*
  'Comité Honorífico': [
    {
      name: 'Dr. Roberto Alvarado Cruz',
      institution: 'Instituto Tecnológico Superior de Valladolid',
      role: 'Rector — Presidente Honorario',
      seed: 'person-rector-valladolid',
    },
    {
      name: 'Dra. Carmen Solís Herrera',
      institution: 'Red Académica Valladolid Internacional',
      role: 'Presidenta General Valladolid',
      seed: 'person-presidenta',
    },
    {
      name: 'Dr. Fernando Castillo Montes',
      institution: 'Universidad Autónoma de Yucatán',
      role: 'Representante UADY',
      seed: 'person-uady',
    },
  ],
  'Comité Científico': [
    {
      name: 'Dra. Laura Gutiérrez Vidal',
      institution: 'Universidad Nacional Autónoma de México',
      role: 'Coordinadora Científica',
      seed: 'person-laura',
    },
    {
      name: 'Dr. Miguel Ángel Chan Dzul',
      institution: 'Universidad Autónoma de Yucatán',
      role: 'Evaluador de Ponencias',
      seed: 'person-miguel',
    },
    {
      name: 'M.Sc. Fernanda Leal Góngora',
      institution: 'CINVESTAV Unidad Mérida',
      role: 'Coordinadora de Talleres',
      seed: 'person-fernanda',
    },
    {
      name: 'Dr. Pablo Moreno Espinoza',
      institution: 'Tec de Monterrey Campus Mérida',
      role: 'Revisor Científico Internacional',
      seed: 'person-pablo',
    },
  ],
  */
  'Comité Organizador': comiteOrganizadorGrupos,
};

const redColor = {
  ITSVA: { bg: 'rgba(255,98,0,0.12)', border: '#FF6200', text: '#FF6200', label: 'ITSVA' },
  RELATIC: { bg: 'rgba(0,122,255,0.12)', border: '#007AFF', text: '#007AFF', label: 'RELATIC Panamá' },
};

const categoriaVisual = {
  'Directores y Rectores': { icon: Crown, color: '#FF6200', bg: 'rgba(255,98,0,0.08)' },
  'Coordinación General': { icon: LayoutDashboard, color: '#007AFF', bg: 'rgba(0,122,255,0.08)' },
  Académico: { icon: GraduationCap, color: '#F4A800', bg: 'rgba(244,168,0,0.08)' },
  Finanzas: { icon: Wallet, color: '#22c55e', bg: 'rgba(34,197,94,0.08)' },
  Vinculación: { icon: Handshake, color: '#9B59B6', bg: 'rgba(155,89,182,0.08)' },
  Científico: { icon: Award, color: '#0002E9', bg: 'rgba(0,2,233,0.08)' },
  Logística: { icon: Package, color: '#F4A800', bg: 'rgba(244,168,0,0.08)' },
  Secretaría: { icon: FileText, color: '#007AFF', bg: 'rgba(0,122,255,0.08)' },
  Programa: { icon: CalendarDays, color: '#FF6200', bg: 'rgba(255,98,0,0.08)' },
  Protocolo: { icon: UserCheck, color: '#2C0055', bg: 'rgba(44,0,85,0.08)' },
  'Infraestructura y Servicios': { icon: Building2, color: '#22c55e', bg: 'rgba(34,197,94,0.08)' },
  Editorial: { icon: Newspaper, color: '#0002E9', bg: 'rgba(0,2,233,0.08)' },
  'Técnico Transmisiones': { icon: MonitorPlay, color: '#9B59B6', bg: 'rgba(155,89,182,0.08)' },
  'Difusión y Constancias': { icon: Megaphone, color: '#FF6200', bg: 'rgba(255,98,0,0.08)' },
  'Transporte y Hospedaje': { icon: Bus, color: '#F4A800', bg: 'rgba(244,168,0,0.08)' },
};

const FALLBACK_VISUAL = { icon: FileText, color: '#6B7280', bg: 'rgba(107,114,128,0.08)' };
const AUTOPLAY_MS = 6500;

const ITSVA_DISPLAY_NAME = 'Representante de ITSVA';

const isItsvaMember = (persona) => persona.red === 'ITSVA' && !persona.image;

const getIntegranteDisplayName = (persona) =>
  isItsvaMember(persona) ? ITSVA_DISPLAY_NAME : persona.nombre;

const getIntegrantePhoto = (persona) => {
  if (isItsvaMember(persona)) return logoItsva;
  return persona.image || `https://picsum.photos/seed/${encodeURIComponent(persona.nombre)}/320/320`;
};

const comiteGrupos = comiteData['Comité Organizador'];

const totalMiembros = comiteGrupos.reduce((n, g) => n + g.integrantes.length, 0);

const OrcidIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" fill="none" aria-hidden="true">
    <path
      d="M128 256C198.7 256 256 198.7 256 128C256 57.3 198.7 0 128 0C57.3 0 0 57.3 0 128C0 198.7 57.3 256 128 256Z"
      fill="#A6CE39"
    />
    <path d="M86.3 186.2H70.9V79.1H86.3V186.2Z" fill="#FFF" />
    <path
      d="M108.9 79.1H155.3C178.2 79.1 193.3 93.2 193.3 113.6C193.3 134.3 177.8 148.3 155 148.3H124.3V186.2H108.9V79.1ZM124.3 134.3H153.2C168.9 134.3 177.8 125.8 177.8 113.6C177.8 101.1 168.9 93.1 153.2 93.1H124.3V134.3Z"
      fill="#FFF"
    />
    <path
      d="M78.6 65.2C83.8 65.2 88.1 60.9 88.1 55.7C88.1 50.5 83.8 46.2 78.6 46.2C73.4 46.2 69.1 50.5 69.1 55.7C69.1 60.9 73.4 65.2 78.6 65.2Z"
      fill="#FFF"
    />
  </svg>
);

// Tamaño de foto según cuántas personas hay en el área (1 = enorme, 6 = aún legible).
const photoSizeForCount = (count) => {
  if (count <= 1) return 'w-44 h-44 sm:w-52 sm:h-52 lg:w-56 lg:h-56';
  if (count === 2) return 'w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48';
  if (count === 3) return 'w-32 h-32 sm:w-40 sm:h-40 lg:w-44 lg:h-44';
  // 4, 5 y 6: mismo tamaño (máx. 3 por fila → fotos consistentes)
  return 'w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40';
};

// Máximo 3 integrantes por fila. Así Editorial (6) = 3+3 y Técnico (5) = 3+2
// centrados, sin estirar a 5 en una sola fila.
const memberItemWidthClass = (count) => {
  if (count <= 1) return 'w-full max-w-sm';
  if (count === 2) return 'w-full sm:w-[calc(50%-1.25rem)] max-w-xs';
  if (count === 4) return 'w-[calc(50%-1.25rem)] max-w-xs'; // 2 × 2
  // 3, 5, 6+: hasta 3 por fila; la última fila queda centrada con justify-center
  return 'w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.75rem)] max-w-xs';
};

const PersonPortrait = ({ persona, cargoColor, photoClass, delay = 0 }) => {
  const red = persona.red ? redColor[persona.red] : null;
  const displayName = getIntegranteDisplayName(persona);
  const isItsva = isItsvaMember(persona);

  return (
    <motion.article
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, delay, ease: 'easeOut' }}
      className="flex flex-col items-center text-center"
    >
      <div
        className={`${photoClass} rounded-full overflow-hidden shrink-0 mb-4`}
        style={{
          border: `4px solid ${cargoColor}`,
          boxShadow: `0 12px 40px ${cargoColor}40, 0 0 0 8px ${cargoColor}18`,
          background: isItsva ? '#FFFFFF' : '#F3F4F6',
        }}
      >
        <img
          src={getIntegrantePhoto(persona)}
          alt={isItsva ? 'Logo ITSVA' : displayName}
          className={`w-full h-full ${isItsva ? 'object-contain p-4' : 'object-cover'}`}
          style={isItsva ? undefined : { objectPosition: '50% 18%' }}
          draggable={false}
          loading="lazy"
        />
      </div>

      <h3
        className="font-bold text-base sm:text-lg leading-snug mb-1.5 px-1"
        style={{ color: '#0A2A43' }}
      >
        {displayName}
      </h3>

      <p
        className="text-xs sm:text-sm leading-snug mb-3 px-2 max-w-xs"
        style={{
          color: persona.institucion ? '#4B5563' : '#9CA3AF',
          fontStyle: persona.institucion ? 'normal' : 'italic',
        }}
      >
        {persona.institucion || 'Por confirmar'}
      </p>

      <div className="flex items-center justify-center gap-2 flex-wrap">
        {red && (
          <span
            className="text-[11px] font-bold px-2.5 py-1 rounded-full"
            style={{
              background: red.bg,
              color: red.text,
              border: `1px solid ${red.border}45`,
            }}
          >
            {red.label || persona.red}
          </span>
        )}
        {!isItsva && persona.orcid && (
          <a
            href={`https://orcid.org/${persona.orcid}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-semibold transition-opacity hover:opacity-80 relative z-10"
            style={{ color: '#A6CE39' }}
            aria-label={`Perfil ORCID de ${displayName}`}
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <OrcidIcon />
            ORCID
          </a>
        )}
      </div>
    </motion.article>
  );
};

const EmptyAreaCard = ({ visual }) => {
  const Icon = visual.icon;
  return (
    <div
      className="mx-auto max-w-md rounded-3xl px-8 py-14 text-center"
      style={{
        background: visual.bg,
        border: `1px dashed ${visual.color}50`,
      }}
    >
      <div
        className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-5"
        style={{
          background: '#FFFFFF',
          border: `3px solid ${visual.color}`,
          boxShadow: `0 8px 28px ${visual.color}30`,
        }}
      >
        <Icon size={36} strokeWidth={ICON_STROKE} style={{ color: visual.color, opacity: 0.65 }} />
      </div>
      <p className="text-lg font-bold italic mb-1" style={{ color: '#6B7280' }}>
        Por asignar
      </p>
      <p className="text-sm" style={{ color: '#9CA3AF' }}>
        Área pendiente de asignación
      </p>
    </div>
  );
};

// Escenario 3D: un slide = un área completa con TODAS sus personas visibles.
const AreaStage = ({ group, direction, reduceMotion = false }) => {
  const visual = categoriaVisual[group.categoria] || FALLBACK_VISUAL;
  const Icon = visual.icon;
  const count = group.integrantes.length;
  const photoClass = photoSizeForCount(count || 1);
  const enterX = direction >= 0 ? 72 : -72;
  const exitX = direction >= 0 ? -72 : 72;

  return (
    <motion.div
      initial={
        reduceMotion
          ? { opacity: 0 }
          : { opacity: 0, x: enterX, rotateY: direction >= 0 ? 22 : -22, scale: 0.96 }
      }
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0, rotateY: 0, scale: 1 }}
      exit={
        reduceMotion
          ? { opacity: 0 }
          : { opacity: 0, x: exitX, rotateY: direction >= 0 ? -22 : 22, scale: 0.96 }
      }
      transition={{ duration: reduceMotion ? 0.2 : 0.42, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
      style={{ transformStyle: reduceMotion ? undefined : 'preserve-3d' }}
    >
      {/* Cabecera del área / cargo */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8 px-1">
        <div className="flex items-center gap-3.5 min-w-0">
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0"
            style={{
              background: visual.bg,
              border: `1px solid ${visual.color}40`,
              boxShadow: `0 8px 24px ${visual.color}22`,
            }}
          >
            <Icon size={24} strokeWidth={ICON_STROKE} style={{ color: visual.color }} aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p
              className="text-[11px] font-bold uppercase tracking-[0.18em] mb-1"
              style={{ color: visual.color }}
            >
              Área del comité
            </p>
            <h3
              className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight truncate"
              style={{ color: '#0A2A43' }}
            >
              {group.categoria}
            </h3>
          </div>
        </div>
        <span
          className="self-start sm:self-auto text-sm font-bold px-3.5 py-1.5 rounded-full"
          style={{
            background: visual.bg,
            color: visual.color,
            border: `1px solid ${visual.color}35`,
          }}
        >
          {count === 0
            ? 'Sin asignar'
            : `${count} ${count === 1 ? 'integrante' : 'integrantes'}`}
        </span>
      </div>

      {/* Personas del área — todas visibles */}
      {count === 0 ? (
        <EmptyAreaCard visual={visual} />
      ) : (
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-10 sm:gap-x-10 sm:gap-y-12 max-w-5xl mx-auto">
          {group.integrantes.map((persona, i) => (
            <div key={`${group.categoria}-${i}`} className={memberItemWidthClass(count)}>
              <PersonPortrait
                persona={persona}
                cargoColor={visual.color}
                photoClass={photoClass}
                delay={0.08 + i * 0.06}
              />
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

const AreaCarousel3D = ({ groups }) => {
  const total = groups.length;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const pointerStartX = useRef(null);
  const dragDelta = useRef(0);
  const resumeTimer = useRef(null);
  const chipRefs = useRef([]);
  const chipScroller = useRef(null);

  const group = groups[index];
  const visual = categoriaVisual[group.categoria] || FALLBACK_VISUAL;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);


  const goTo = (nextIndex, dir) => {
    const wrapped = ((nextIndex % total) + total) % total;
    setDirection(dir ?? (wrapped > index || (index === total - 1 && wrapped === 0) ? 1 : -1));
    setIndex(wrapped);
  };

  const next = () => goTo(index + 1, 1);
  const prev = () => goTo(index - 1, -1);

  const pauseTemporarily = () => {
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), AUTOPLAY_MS * 1.5);
  };

  useEffect(() => {
    if (paused || reduceMotion) return undefined;
    const id = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % total);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, reduceMotion, total]);

  // Solo desplaza el contenedor horizontal de chips — nunca la página
  // (scrollIntoView provocaba saltos de scroll al autoplay).
  useEffect(() => {
    const chip = chipRefs.current[index];
    const scroller = chipScroller.current;
    if (!chip || !scroller) return;

    const target =
      chip.offsetLeft - scroller.clientWidth / 2 + chip.offsetWidth / 2;
    scroller.scrollTo({
      left: Math.max(0, target),
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  }, [index, reduceMotion]);

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
    // No capturar el pointer sobre ORCID u otros enlaces
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
    if (Math.abs(delta) > 60) {
      pauseTemporarily();
      if (delta < 0) next();
      else prev();
    }
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
      {/* Chips de áreas — acceso directo, no ocultan el escenario */}
      <div
        ref={chipScroller}
        className="flex gap-2 overflow-x-auto pb-4 mb-2 scroll-smooth"
        style={{ scrollbarWidth: 'none' }}
        role="tablist"
        aria-label="Áreas del Comité Organizador"
      >
        {groups.map((g, i) => {
          const gVisual = categoriaVisual[g.categoria] || FALLBACK_VISUAL;
          const GIcon = gVisual.icon;
          const active = i === index;
          return (
            <button
              key={g.categoria}
              ref={(el) => {
                chipRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => {
                pauseTemporarily();
                goTo(i, i > index ? 1 : -1);
              }}
              className="shrink-0 inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all duration-200"
              style={{
                background: active ? gVisual.color : '#FFFFFF',
                color: active ? '#FFFFFF' : '#374151',
                border: `1px solid ${active ? gVisual.color : '#E5E7EB'}`,
                boxShadow: active ? `0 6px 18px ${gVisual.color}40` : 'none',
              }}
            >
              <GIcon size={14} strokeWidth={ICON_STROKE} aria-hidden="true" />
              {g.categoria}
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                style={{
                  background: active ? 'rgba(255,255,255,0.22)' : `${gVisual.color}14`,
                  color: active ? '#FFFFFF' : gVisual.color,
                }}
              >
                {g.integrantes.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Controles */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <p className="text-sm font-semibold tabular-nums" style={{ color: '#6B7280' }}>
          <span style={{ color: visual.color }}>{String(index + 1).padStart(2, '0')}</span>
          <span className="mx-1.5">/</span>
          {String(total).padStart(2, '0')} áreas
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? 'Reanudar carrusel' : 'Pausar carrusel'}
            className="w-11 h-11 rounded-full flex items-center justify-center transition-transform hover:scale-105"
            style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', color: '#0A2A43' }}
          >
            {paused || reduceMotion ? <Play size={16} /> : <Pause size={16} />}
          </button>
          <button
            type="button"
            onClick={() => {
              pauseTemporarily();
              prev();
            }}
            aria-label="Área anterior"
            className="w-11 h-11 rounded-full flex items-center justify-center transition-transform hover:scale-105"
            style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', color: '#0A2A43' }}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => {
              pauseTemporarily();
              next();
            }}
            aria-label="Área siguiente"
            className="w-11 h-11 rounded-full flex items-center justify-center transition-transform hover:scale-105"
            style={{
              background: visual.color,
              border: `1px solid ${visual.color}`,
              color: '#FFFFFF',
              boxShadow: `0 8px 20px ${visual.color}45`,
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Escenario 3D full */}
      <div
        className="relative rounded-[1.75rem]"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 0%, ${visual.color}14 0%, transparent 55%),
            linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%)
          `,
          border: `1px solid ${visual.color}28`,
          boxShadow: `0 20px 60px rgba(10,42,67,0.08), inset 0 1px 0 rgba(255,255,255,0.8)`,
          minHeight: '420px',
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        role="region"
        aria-roledescription="carrusel"
        aria-label={`Área ${group.categoria}`}
        aria-live="polite"
      >
        <div
          className="px-5 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-12"
          style={{
            perspective: reduceMotion ? undefined : '1200px',
            transformStyle: 'preserve-3d',
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <AreaStage
              key={group.categoria}
              group={group}
              direction={direction}
              reduceMotion={reduceMotion}
            />
          </AnimatePresence>
        </div>
      </div>

      {/* Progreso autoplay */}
      {!reduceMotion && (
        <div className="mt-5 h-1 rounded-full overflow-hidden" style={{ background: '#E5E7EB' }} aria-hidden="true">
          <div
            key={`${index}-${paused}`}
            className="h-full rounded-full"
            style={{
              width: paused ? '100%' : '0%',
              background: visual.color,
              opacity: paused ? 0.3 : 1,
              animation: paused ? 'none' : `comiteAreaProgress ${AUTOPLAY_MS}ms linear forwards`,
            }}
          />
        </div>
      )}

      {/* Dots por área */}
      <div
        className="mt-4 flex items-center justify-center gap-1.5 flex-wrap"
        role="tablist"
        aria-label="Ir a área"
      >
        {groups.map((g, i) => {
          const gVisual = categoriaVisual[g.categoria] || FALLBACK_VISUAL;
          const active = i === index;
          return (
            <button
              key={g.categoria}
              type="button"
              role="tab"
              aria-selected={active}
              aria-label={`Ir a ${g.categoria}`}
              onClick={() => {
                pauseTemporarily();
                goTo(i, i > index ? 1 : -1);
              }}
              className="rounded-full transition-all duration-300"
              style={{
                width: active ? 22 : 8,
                height: 8,
                background: active ? gVisual.color : '#D1D5DB',
              }}
            />
          );
        })}
      </div>

      <style>{`
        @keyframes comiteAreaProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

const Comite = () => {
  return (
    <section
      id="comite"
      className="py-20 sm:py-28 relative overflow-hidden"
      style={{ background: '#F8F9FA', overflowAnchor: 'none' }}
    >
      <div
        className="absolute -top-24 right-0 w-[28rem] h-[28rem] rounded-full opacity-[0.04] blur-3xl pointer-events-none"
        style={{ background: '#007AFF' }}
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-[0.04] blur-3xl pointer-events-none"
        style={{ background: '#F4A800' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
            style={{
              background: 'rgba(0,122,255,0.08)',
              color: '#007AFF',
              border: '1px solid rgba(0,122,255,0.25)',
            }}
          >
            Organización
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black section-underline"
            style={{ color: '#0A2A43' }}
          >
            Comité Organizador
          </h2>
          <p
            className="mt-6 text-base sm:text-lg leading-relaxed max-w-xl mx-auto"
            style={{ color: '#4B5563' }}
          >
            Académicos e investigadores de instituciones líderes comprometidos con la excelencia
            del IV Congreso RELATIC 2026.
          </p>
          <p className="mt-3 text-sm font-semibold" style={{ color: '#9CA3AF' }}>
            {totalMiembros} integrantes · {comiteGrupos.length} áreas
          </p>
        </div>

        <AreaCarousel3D groups={comiteGrupos} />
      </div>
    </section>
  );

};

export default Comite;
