import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

import imgFranchiska from '../assets/comite/Franchiska.jpeg';
import imgAntonio from '../assets/comite/Antonio.jpg';
import imgFabiola from '../assets/comite/Fabiola.jpeg';
import imgFrancisco from '../assets/comite/Francisco.jpeg';
import imgKelis from '../assets/comite/Kelis.jpeg';
import imgHenry from '../assets/comite/Henry.jpg';
import imgVannesa from '../assets/comite/vannesa.jpeg';
import imgAugusto from '../assets/comite/Augusto.jpeg';
import imgMonica from '../assets/comite/Monica.jpeg';
import imgKeyla from '../assets/comite/Keyla.jpg';
import imgEmely from '../assets/comite/Emely.png';
import imgIsabel from '../assets/comite/Isabel.png';

// Miembros del comité con fotos placeholder de picsum
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
  'Comité Organizador': [
    {
      name: 'Magister Franchiska Kamani Ávila',
      institution: 'Universidad de Panamá, Panamá',
      role: 'Miembro',
      image: imgFranchiska,
    },
    {
      name: 'Dr. Jesús Antonio Santos Tejero',
      institution: 'ITSVA, México',
      role: 'Miembro',
      image: imgAntonio,
    },
    {
      name: 'Dra. Fabiola Colmenero Fonseca',
      institution: 'ITSVA, México',
      role: 'Miembro',
      image: imgFabiola,
    },
    {
      name: 'Dr. Francisco Farnum Castro',
      institution: 'Universidad de Panamá, Panamá',
      role: 'Miembro',
      image: imgFrancisco,
    },
    {
      name: 'Lic. Kelis Paola Montes Manjarrés',
      institution: 'University of Technology and Education, Miami',
      role: 'Miembro',
      image: imgKelis,
    },
    {
      name: 'Dr. Henrry Ricardo Cabrera',
      institution: 'Universidad de Cienfuegos, Cuba',
      role: 'Miembro',
      image: imgHenry,
    },
    {
      name: 'Lic. Vanessa Rubith Lazo Valles',
      institution: 'Universidad César Vallejo, Perú',
      role: 'Miembro',
      image: imgVannesa,
    },
    {
      name: 'René Ileana Velázquez Pompeyo',
      institution: '',
      role: 'Miembro',
      seed: 'person-rene',
    },
    {
      name: 'Dra. Livia Estela',
      institution: 'Universidad de Panamá',
      role: 'Miembro',
      seed: 'person-livia',
    },
    {
      name: 'Dra. Isabel Menacho Vargas',
      institution: 'UNMSM la Decana de América',
      role: 'Miembro',
      image: imgIsabel,
    },
    {
      name: 'Dra. Mónica Contreras',
      institution: 'Universidad de Panamá',
      role: 'Miembro',
      image: imgMonica,
    },
    {
      name: 'Dr. Augusto Bernal',
      institution: 'Universidad de las Fuerzas Armadas, Ecuador',
      role: 'Miembro',
      image: imgAugusto,
    },
    {
      name: 'Dra. Tania Kennedy',
      institution: 'Universidad de Panamá',
      role: 'Miembro',
      seed: 'person-tania',
    },
    {
      name: 'Dra. Keyla Urbina',
      institution: 'Universidad Latina',
      role: 'Miembro',
      image: imgKeyla,
    },
    {
      name: 'Dra. Melisa',
      institution: 'Universidad de Panamá',
      role: 'Miembro',
      seed: 'person-melisa',
    },
    {
      name: 'Dra. Cindy Vianelly',
      institution: 'ITSVA, México',
      role: 'Miembro',
      seed: 'person-cindy',
    },
    {
      name: 'Dra. Laura Socorro',
      institution: 'ITSVA, México',
      role: 'Miembro',
      seed: 'person-laura',
    },
    {
      name: 'Dra. Neivy Raquel Aguilar Mena',
      institution: 'ITSVA, México',
      role: 'Miembro',
      seed: 'person-naivi',
    },
    {
      name: 'Emely Saa',
      institution: 'Universidad de Panamá, Panamá',
      role: 'Miembro',
      image: imgEmely,
    },
    {
      name: 'María de los Angeles Ruiz González',
      institution: '',
      role: 'Miembro',
      seed: 'person-maria',
    },
  ],
};

const categories = Object.keys(comiteData);

// Color de badge por categoría
const categoryColor = {
  'Comité Honorífico': { bg: 'rgba(244,168,0,0.1)', border: '#F4A800', text: '#F4A800' },
  'Comité Científico': { bg: 'rgba(0,122,255,0.08)', border: '#007AFF', text: '#007AFF' },
  'Comité Organizador': { bg: 'rgba(255,98,0,0.08)', border: '#FF6200', text: '#FF6200' },
};

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
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </div>

      {/* Nombre */}
      <h3 className="font-bold text-base leading-tight mb-1" style={{ color: '#0A2A43' }}>{member.name}</h3>

      {/* Institución */}
      <p className="text-xs mb-3 leading-snug" style={{ color: '#6B7280' }}>{member.institution}</p>

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
        <div className="text-center mb-12">
          <span
            className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
            style={{ background: 'rgba(0,122,255,0.08)', color: '#007AFF', border: '1px solid rgba(0,122,255,0.25)' }}
          >
            Organización
          </span>
          <h2 className="text-3xl sm:text-4xl font-black section-underline" style={{ color: '#0A2A43' }}>
            Comité Organizador
          </h2>
          <p className="mt-6 max-w-xl mx-auto" style={{ color: '#6B7280' }}>
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
                    <h3 className="text-lg font-bold" style={{ color: '#0A2A43' }}>{cat}</h3>
                    <span
                      className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                      style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}40` }}
                    >
                      {comiteData[cat].length} miembros
                    </span>
                  </div>
                  <ChevronDown
                    size={20}
                    style={{
                      color: '#6B7280',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </button>

                {/* Grid de tarjetas */}
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {comiteData[cat].map((member, i) => (
                      <MemberCard key={i} member={member} category={cat} />
                    ))}
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
