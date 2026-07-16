import { useState, Fragment } from 'react';
import {
  ChevronDown,
  Crown,
  Target,
  BookOpen,
  Wallet,
  Link2,
  FlaskConical,
  Package,
  FileText,
  CalendarDays,
  Shield,
  Building,
  PenTool,
  Radio,
  Megaphone,
  Bus,
} from 'lucide-react';

import imgFranchiska from '../assets/comite/Franchiska.jpeg';
import imgAntonio from '../assets/comite/Antonio.jpg';
import imgFrancisco from '../assets/comite/Francisco.jpeg';
import imgKelis from '../assets/comite/Kelis.jpeg';
import imgMonica from '../assets/comite/Monica.jpeg';
import imgKeyla from '../assets/comite/Keyla.jpg';
import imgEmely from '../assets/comite/Emely.png';
import imgIsabel from '../assets/comite/Isabel.png';
import imgNaivi from '../assets/comite/Naivi.png';
import imgLivia from '../assets/comite/Livia.jpeg';
import imgTania from '../assets/comite/Tania.jpeg';
import imgIsrael from '../assets/comite/Is.jpeg';
import imgCoulette from '../assets/editors/Coulette.jpeg';
import imgZenaida from '../assets/comite/Zenaida.jpeg';
import imgVicente from '../assets/comite/Vicente.jpeg';

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
      { nombre: 'Dr. Vicente A. Moreno', institucion: 'Universidad Nuestra Señora del Carmen', red: 'RELATIC', image: imgVicente, orcid: '0009-0007-7922-7548' },
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
    categoria: 'Gestión Académica',
    integrantes: [
      { nombre: 'Mtra. María Marena López García', institucion: 'Instituto Tecnológico Superior Campus Valladolid, México', red: 'ITSVA' },
      { nombre: 'Magister Franchiska Kamani Ávila', institucion: 'Universidad de Panamá, Panamá', red: 'RELATIC', image: imgFranchiska, orcid: '0009-0005-6793-6158' },
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
      { nombre: 'Dra. Aymara', institucion: '', red: 'RELATIC' },
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
      { nombre: 'Dra. Naivi Raquel Aguilar Mena', institucion: 'Instituto Tecnológico Superior Campus Valladolid, México', red: 'ITSVA', image: imgNaivi },
      { nombre: 'Dra. Keyla Urbina', institucion: 'Universidad Latina, Panamá', red: 'RELATIC', image: imgKeyla, orcid: '0000-0003-3594-7010' },
    ],
  },
  {
    categoria: 'Protocolo',
    integrantes: [
      { nombre: 'Mtra. Lucia Martínez', institucion: 'Instituto Tecnológico Superior Campus Valladolid, México', red: 'ITSVA' },
      { nombre: 'Lic. Gema Gabriela', institucion: 'Instituto Tecnológico Superior Campus Valladolid, México', red: 'ITSVA' },
      { nombre: 'Lic. Kelis Paola Montes Manjarrés', institucion: 'University of Technology and Education, EEUU', red: 'RELATIC', image: imgKelis, orcid: '0009-0004-4495-8402' },
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
      { nombre: 'Dr. Jesús Antonio Santos Tejero', institucion: 'Instituto Tecnológico Superior Campus Valladolid, México', red: 'ITSVA', image: imgAntonio, orcid: '0000-0002-9482-8225' },
      { nombre: 'Dra. Cindy Vianely Cetina Aguilar', institucion: 'Instituto Tecnológico Superior Campus Valladolid, México', red: 'ITSVA' },
      { nombre: 'Lic. Zazil Monserrat May Poot', institucion: 'Instituto Tecnológico Superior Campus Valladolid, México', red: 'ITSVA' },
      { nombre: 'Dra. Livia Esthela Diaz González', institucion: 'University of Technology and Education, EEUU', red: 'RELATIC', image: imgLivia, orcid: '0000-0002-2045-4443' },
      { nombre: 'Dra. Mónica Contreras', institucion: 'Universidad de Panamá, Panamá', red: 'RELATIC', image: imgMonica, orcid: '0000-0003-0972-6951' },
      { nombre: 'Coulette C. Andrews T.', institucion: 'Universidad de Panamá, Panamá', red: 'RELATIC', image: imgCoulette, orcid: '0000-0002-7708-4594' },
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

const categories = Object.keys(comiteData);

// Color de badge por categoría
const categoryColor = {
  'Comité Honorífico': { bg: 'rgba(244,168,0,0.1)', border: '#F4A800', text: '#F4A800' },
  'Comité Científico': { bg: 'rgba(0,122,255,0.08)', border: '#007AFF', text: '#007AFF' },
  'Comité Organizador': { bg: 'rgba(255,98,0,0.08)', border: '#FF6200', text: '#FF6200' },
};

// Color de badge por red/afiliación institucional (ITSVA vs RELATIC).
// "red" indica a qué organización pertenece la persona; "institucion" es su
// universidad/afiliación real cuando se conoce — son datos independientes.
const redColor = {
  ITSVA: { bg: 'rgba(255,98,0,0.08)', border: '#FF6200', text: '#FF6200' },
  RELATIC: { bg: 'rgba(0,122,255,0.08)', border: '#007AFF', text: '#007AFF' },
};

// ─── Sistema de colores e iconos por categoría del comité ───
// Cada grupo tiene un color, un icono y un fondo semitransparente único para
// diferenciarlo visualmente de los demás de manera inmediata.
const categoriaVisual = {
  'Directores y Rectores': { icon: Crown, color: '#FF6200', bg: 'rgba(255,98,0,0.06)' },
  'Coordinación General': { icon: Target, color: '#007AFF', bg: 'rgba(0,122,255,0.06)' },
  'Gestión Académica': { icon: BookOpen, color: '#F4A800', bg: 'rgba(244,168,0,0.06)' },
  'Finanzas': { icon: Wallet, color: '#22c55e', bg: 'rgba(34,197,94,0.06)' },
  'Vinculación': { icon: Link2, color: '#9B59B6', bg: 'rgba(155,89,182,0.06)' },
  'Científico': { icon: FlaskConical, color: '#0002E9', bg: 'rgba(0,2,233,0.06)' },
  'Logística': { icon: Package, color: '#F4A800', bg: 'rgba(244,168,0,0.06)' },
  'Secretaría': { icon: FileText, color: '#007AFF', bg: 'rgba(0,122,255,0.06)' },
  'Programa': { icon: CalendarDays, color: '#FF6200', bg: 'rgba(255,98,0,0.06)' },
  'Protocolo': { icon: Shield, color: '#2C0055', bg: 'rgba(44,0,85,0.06)' },
  'Infraestructura y Servicios': { icon: Building, color: '#22c55e', bg: 'rgba(34,197,94,0.06)' },
  'Editorial': { icon: PenTool, color: '#0002E9', bg: 'rgba(0,2,233,0.06)' },
  'Técnico Transmisiones': { icon: Radio, color: '#9B59B6', bg: 'rgba(155,89,182,0.06)' },
  'Difusión y Constancias': { icon: Megaphone, color: '#FF6200', bg: 'rgba(255,98,0,0.06)' },
  'Transporte y Hospedaje': { icon: Bus, color: '#F4A800', bg: 'rgba(244,168,0,0.06)' },
};

const isGroupedCommittee = (data) =>
  Array.isArray(data) && data.length > 0 && Array.isArray(data[0]?.integrantes);

const getMemberCount = (data) =>
  isGroupedCommittee(data)
    ? data.reduce((total, group) => total + group.integrantes.length, 0)
    : data.length;

const getIntegrantePhoto = (persona) =>
  persona.image || `https://picsum.photos/seed/${encodeURIComponent(persona.nombre)}/200/200`;

const MemberCard = ({ member, category }) => {
  const colors = categoryColor[category];
  return (
    <div
      className="rounded-2xl p-6 flex flex-col items-center text-center group transition-all duration-300 cursor-default"
      style={{
        background: '#FFFFFF',
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.09)`;
        e.currentTarget.style.borderTopColor = colors.border;
        e.currentTarget.style.borderTopWidth = '3px';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 6px rgba(0,0,0,0.05)';
        e.currentTarget.style.borderTopColor = '#E5E7EB';
        e.currentTarget.style.borderTopWidth = '1px';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Foto circular */}
      <div className="relative mb-5">
        <div
          className="w-24 h-24 rounded-full overflow-hidden"
          style={{ border: `3px solid ${colors.border}`, boxShadow: `0 0 16px ${colors.border}30` }}
        >
          <img
            src={member.image || `https://picsum.photos/seed/${member.seed}/200/200`}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ objectPosition: '50% 18%' }}
          />
        </div>
      </div>

      {/* Nombre */}
      <h3 className="font-bold text-base leading-tight mb-1" style={{ color: '#0A2A43' }}>{member.name}</h3>

      {/* Institución */}
      <p className="text-xs mb-3 leading-snug" style={{ color: '#4B5563' }}>{member.institution}</p>

      {/* ORCID */}
      {member.orcid ? (
        <a
          href={`https://orcid.org/${member.orcid}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium mb-3 transition-opacity hover:opacity-80"
          style={{ color: '#A6CE39' }}
          aria-label={`Perfil ORCID de ${member.name}`}
        >
          <svg width="12" height="12" viewBox="0 0 256 256" fill="none" aria-hidden="true">
            <path d="M128 256C198.7 256 256 198.7 256 128C256 57.3 198.7 0 128 0C57.3 0 0 57.3 0 128C0 198.7 57.3 256 128 256Z" fill="#A6CE39" />
            <path d="M86.3 186.2H70.9V79.1H86.3V186.2Z" fill="#FFF" />
            <path d="M108.9 79.1H155.3C178.2 79.1 193.3 93.2 193.3 113.6C193.3 134.3 177.8 148.3 155 148.3H124.3V186.2H108.9V79.1ZM124.3 134.3H153.2C168.9 134.3 177.8 125.8 177.8 113.6C177.8 101.1 168.9 93.1 153.2 93.1H124.3V134.3Z" fill="#FFF" />
            <path d="M78.6 65.2C83.8 65.2 88.1 60.9 88.1 55.7C88.1 50.5 83.8 46.2 78.6 46.2C73.4 46.2 69.1 50.5 69.1 55.7C69.1 60.9 73.4 65.2 78.6 65.2Z" fill="#FFF" />
          </svg>
          {member.orcid}
        </a>
      ) : null}

      {/* Rol */}
      <span
        className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
        style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}40` }}
      >
        {member.role}
      </span>
    </div>
  );
};

// Tabla jerárquica rediseñada: cada grupo se diferencia visualmente con icono,
// color de acento, borde lateral, y numeración secuencial. Las filas de integrantes
// conservan la foto, el nombre y el badge de red (ITSVA / RELATIC).
const GroupedCommitteeTable = ({ groups }) => {
  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid #E5E7EB' }}>
      <table className="w-full text-left border-collapse" aria-label="Comité Organizador por área">
        <thead>
          <tr style={{ background: '#F8F9FA' }}>
            <th
              scope="col"
              className="px-4 sm:px-5 py-3 text-xs font-bold uppercase tracking-wide"
              style={{ color: '#4B5563', borderBottom: '1px solid #E5E7EB' }}
            >
              Integrante
            </th>
            <th
              scope="col"
              className="px-4 sm:px-5 py-3 text-xs font-bold uppercase tracking-wide"
              style={{ color: '#4B5563', borderBottom: '1px solid #E5E7EB' }}
            >
              Institución / Afiliación
            </th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group, groupIndex) => {
            const visual = categoriaVisual[group.categoria] || {
              icon: FileText,
              color: '#6B7280',
              bg: 'rgba(107,114,128,0.06)',
            };
            const Icon = visual.icon;

            return (
              <Fragment key={group.categoria}>
                {/* Encabezado de área con icono, color y número */}
                <tr>
                  <th
                    scope="colgroup"
                    colSpan={2}
                    className="px-4 sm:px-5 py-3 text-left"
                    style={{
                      background: visual.bg,
                      borderTop: '1px solid #E5E7EB',
                      borderBottom: '1px solid #E5E7EB',
                      borderLeft: `4px solid ${visual.color}`,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {/* Número secuencial */}
                      <span
                        className="text-xs font-black leading-none select-none"
                        style={{ color: visual.color, opacity: 0.45, minWidth: '22px' }}
                      >
                        {String(groupIndex + 1).padStart(2, '0')}
                      </span>
                      {/* Icono */}
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          background: `${visual.color}15`,
                          border: `1px solid ${visual.color}30`,
                        }}
                      >
                        <Icon size={16} style={{ color: visual.color }} />
                      </div>
                      {/* Nombre de categoría + badge de conteo */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className="text-sm font-bold"
                          style={{ color: '#0A2A43' }}
                        >
                          {group.categoria}
                        </span>
                        {group.integrantes.length > 0 && (
                          <span
                            className="text-xs font-semibold px-2 py-0.5 rounded-full"
                            style={{
                              background: `${visual.color}12`,
                              color: visual.color,
                              border: `1px solid ${visual.color}30`,
                            }}
                          >
                            {group.integrantes.length}{' '}
                            {group.integrantes.length === 1 ? 'integrante' : 'integrantes'}
                          </span>
                        )}
                      </div>
                    </div>
                  </th>
                </tr>

                {group.integrantes.length === 0 ? (
                  <tr>
                    <td
                      colSpan={2}
                      className="px-4 sm:px-5 py-3 text-sm italic"
                      style={{
                        color: '#6B7280',
                        borderBottom: '1px solid #E5E7EB',
                        borderLeft: `4px solid ${visual.color}20`,
                      }}
                    >
                      Por asignar
                    </td>
                  </tr>
                ) : (
                  group.integrantes.map((persona, i) => {
                    const red = redColor[persona.red];
                    return (
                      <tr
                        key={`${group.categoria}-${i}`}
                        className="transition-colors duration-150"
                        style={{
                          background: 'transparent',
                          borderLeft: `4px solid ${visual.color}20`,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#F8F9FA';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        <td
                          className="px-4 sm:px-5 py-4 sm:py-5 text-sm align-middle"
                          style={{ borderBottom: '1px solid #E5E7EB' }}
                        >
                          <div className="flex items-center gap-4 sm:gap-5">
                            <div
                              className="w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden shrink-0"
                              style={{
                                border: `3px solid ${visual.color}`,
                                boxShadow: `0 0 16px ${visual.color}30`,
                              }}
                            >
                              <img
                                src={getIntegrantePhoto(persona)}
                                alt={persona.nombre}
                                className="w-full h-full object-cover"
                                style={{ objectPosition: '50% 18%' }}
                              />
                            </div>
                            <div className="min-w-0">
                              <p
                                className="font-semibold text-sm sm:text-base leading-tight"
                                style={{ color: '#0A2A43' }}
                              >
                                {persona.nombre}
                              </p>
                              {persona.orcid && (
                                <a
                                  href={`https://orcid.org/${persona.orcid}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium transition-opacity hover:opacity-80"
                                  style={{ color: '#A6CE39' }}
                                  aria-label={`Perfil ORCID de ${persona.nombre}`}
                                >
                                  <svg
                                    width="11"
                                    height="11"
                                    viewBox="0 0 256 256"
                                    fill="none"
                                    aria-hidden="true"
                                  >
                                    <path
                                      d="M128 256C198.7 256 256 198.7 256 128C256 57.3 198.7 0 128 0C57.3 0 0 57.3 0 128C0 198.7 57.3 256 128 256Z"
                                      fill="#A6CE39"
                                    />
                                    <path
                                      d="M86.3 186.2H70.9V79.1H86.3V186.2Z"
                                      fill="#FFF"
                                    />
                                    <path
                                      d="M108.9 79.1H155.3C178.2 79.1 193.3 93.2 193.3 113.6C193.3 134.3 177.8 148.3 155 148.3H124.3V186.2H108.9V79.1ZM124.3 134.3H153.2C168.9 134.3 177.8 125.8 177.8 113.6C177.8 101.1 168.9 93.1 153.2 93.1H124.3V134.3Z"
                                      fill="#FFF"
                                    />
                                    <path
                                      d="M78.6 65.2C83.8 65.2 88.1 60.9 88.1 55.7C88.1 50.5 83.8 46.2 78.6 46.2C73.4 46.2 69.1 50.5 69.1 55.7C69.1 60.9 73.4 65.2 78.6 65.2Z"
                                      fill="#FFF"
                                    />
                                  </svg>
                                  ORCID
                                </a>
                              )}
                            </div>
                          </div>
                        </td>
                        <td
                          className="px-4 sm:px-5 py-4 sm:py-5 text-sm align-middle"
                          style={{ borderBottom: '1px solid #E5E7EB' }}
                        >
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              style={{
                                color: persona.institucion ? '#1F2937' : '#6B7280',
                                fontStyle: persona.institucion ? 'normal' : 'italic',
                              }}
                            >
                              {persona.institucion || 'Por confirmar'}
                            </span>
                            {red && (
                              <span
                                className="text-xs font-bold px-2.5 py-0.5 rounded-full shrink-0"
                                style={{
                                  background: red.bg,
                                  color: red.text,
                                  border: `1px solid ${red.border}40`,
                                }}
                              >
                                {persona.red}
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// Componente Comite con acordeones por categoría
const Comite = () => {
  const [openCategory, setOpenCategory] = useState(categories[0]);

  const toggle = (cat) => {
    setOpenCategory(openCategory === cat ? null : cat);
  };

  return (
    <section
      id="comite"
      className="py-20 sm:py-28 relative overflow-hidden"
      style={{ background: '#F8F9FA' }}
    >
      {/* Decoración sutil */}
      <div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-[0.03] blur-3xl pointer-events-none"
        style={{ background: '#F4A800' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-14">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
            style={{ background: 'rgba(0,122,255,0.08)', color: '#007AFF', border: '1px solid rgba(0,122,255,0.25)' }}
          >
            Organización
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black section-underline" style={{ color: '#0A2A43' }}>
            Comité Organizador
          </h2>
          <p className="mt-6 text-base sm:text-lg leading-relaxed max-w-xl mx-auto" style={{ color: '#4B5563' }}>
            Académicos e investigadores de instituciones líderes comprometidos con la excelencia del IV Congreso RELATIC 2026.
          </p>
        </div>

        {/* Acordeón por categoría */}
        <div className="space-y-4">
          {categories.map((cat) => {
            const isOpen = openCategory === cat;
            const colors = categoryColor[cat];
            return (
              <div
                key={cat}
                className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  border: `1px solid ${isOpen ? colors.border + '50' : '#E5E7EB'}`,
                  background: '#FFFFFF',
                  boxShadow: isOpen ? '0 4px 16px rgba(0,0,0,0.06)' : '0 1px 4px rgba(0,0,0,0.04)',
                }}
              >
                {/* Header del acordeón */}
                <button
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left transition-colors duration-200"
                  style={{ background: isOpen ? `${colors.bg}` : 'transparent' }}
                  onClick={() => toggle(cat)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ background: colors.border }}
                    />
                    <h3 className="text-lg sm:text-xl font-bold" style={{ color: '#0A2A43' }}>{cat}</h3>
                    <span
                      className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                      style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}40` }}
                    >
                      {getMemberCount(comiteData[cat])} miembros
                    </span>
                  </div>
                  <ChevronDown
                    size={20}
                    style={{
                      color: '#4B5563',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </button>

                {/* Tabla jerárquica por área (o grid de tarjetas para categorías planas) */}
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6">
                    {isGroupedCommittee(comiteData[cat]) ? (
                      <GroupedCommitteeTable groups={comiteData[cat]} />
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {comiteData[cat].map((member, i) => (
                          <MemberCard key={i} member={member} category={cat} />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Comite;
