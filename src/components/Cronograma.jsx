import React, { useState } from 'react';
import { Clock, Mic, Coffee, BookOpen, Award, Users } from 'lucide-react';

// Datos del cronograma por día
const schedule = {
  '7 Oct': [
    { time: '08:00', title: 'Conferencia Magistral de Apertura: Inteligencia Artificial y planeación docente: Riesgos y Desafíos', speaker: 'Dr. Antonio Jesús Santos — ITSVA', icon: Mic, type: 'keynote' },
    { time: '09:00', title: 'Registro y Ceremonia de Inauguración', speaker: 'Dr. Carlos Méndez Ríos — Rector ITSVA', icon: Award, type: 'ceremony' },
    { time: '10:00', title: 'Panel: Redes Académicas en América Latina', speaker: 'Dr. Jorge Ramírez & Dra. Sofía Pérez', icon: Users, type: 'panel' },
    { time: '11:00', title: 'Receso / Café', speaker: '', icon: Coffee, type: 'break' },
    { time: '11:30', title: 'Conferencia Magistral: Investigación cualitativa en clave de inteligencia artificial: retos éticos, epistemológicos y pedagógicos en educación latinoamericana', speaker: 'Dr. Carlos Viltre — Centro Latinoamericano de Estudios en Epistemología Pedagógica', icon: Mic, type: 'keynote' },
    { time: '12:30', title: 'Comida / Networking', speaker: '', icon: Coffee, type: 'break' },
    { time: '13:30', title: 'Taller: Metodologías de Investigación Sostenible', speaker: 'M.C. Ana Torres — IPN', icon: BookOpen, type: 'workshop' },
    { time: '14:30', title: 'Presentación de Ponencias — Mesa 1: Medio Ambiente', speaker: 'Moderador: Dr. Luis Aguilar', icon: Mic, type: 'presentation' },
    { time: '16:00', title: 'Conferencia Magistral de Cierre: La internacionalización en la Educación Superior como un factor generador de competencias educativas en los postgrados', speaker: 'Dr. Manuel Villero — University of Technology and Education', icon: Mic, type: 'keynote' },
    { time: '17:00', title: 'Recepción de bienvenida y cóctel cultural', speaker: 'Sede: Centro Cultural Valladolid', icon: Award, type: 'social' },
  ],
  '8 Oct': [
    { time: '08:00', title: 'Conferencia Magistral de Apertura: Dilema Latinoamericano: Problemas socioeconómicos de la explotación de la minería a cielo abierto', speaker: 'Dr. Luis Barria — Universidad de Panamá', icon: Mic, type: 'keynote' },
    { time: '09:00', title: 'Taller: Inteligencia Artificial aplicada a la Educación', speaker: 'M.Sc. Fernanda Leal — CINVESTAV', icon: BookOpen, type: 'workshop' },
    { time: '10:30', title: 'Receso / Café', speaker: '', icon: Coffee, type: 'break' },
    { time: '11:00', title: 'Conferencia Magistral: Dimensiones semánticas de la transformación digital: un enfoque integrado para la gestión de recursos y la sostenibilidad organizacional', speaker: 'Dr. Javier Cárcel-Carrasco — Universitat Politècnica de València', icon: Mic, type: 'keynote' },
    { time: '12:00', title: 'Mesa Redonda: Ciencia de Datos y Desarrollo Regional', speaker: 'Panelistas internacionales', icon: Users, type: 'panel' },
    { time: '13:00', title: 'Comida', speaker: '', icon: Coffee, type: 'break' },
    { time: '14:00', title: 'Presentación de Ponencias — Mesa 2: Tecnología e Innovación', speaker: 'Moderador: Dra. Rebeca Solís', icon: Mic, type: 'presentation' },
    { time: '15:00', title: 'Presentación de Ponencias — Mesa 3: Educación Superior', speaker: 'Moderador: Dr. Héctor Vega', icon: Mic, type: 'presentation' },
    { time: '16:00', title: 'Conferencia Magistral de Cierre y Mesa de Debate: Estabilización de tecnología energética en sistemas de producción artesanal a partir de la producción cerámica rural en México', speaker: 'Dra. Faby Colmenero — Universidad Europea de Madrid', icon: Mic, type: 'keynote' },
    { time: '17:00', title: 'Visita cultural: Zona Arqueológica Ek Balam', speaker: 'Guía oficial certificada', icon: Award, type: 'social' },
  ],
  '9 Oct': [
    { time: '08:00', title: 'Conferencia Magistral de Apertura: Cinco décadas de industria maquiladora en el Norte de México desde una mirada femenina', speaker: 'Dra. Cirila Quintero Ramirez — El Colegio de la Frontera Norte', icon: Mic, type: 'keynote' },
    { time: '09:00', title: 'Taller: Publicación Científica Internacional', speaker: 'Dra. Valeria Núñez — CONACYT', icon: BookOpen, type: 'workshop' },
    { time: '10:30', title: 'Receso / Café', speaker: '', icon: Coffee, type: 'break' },
    { time: '11:00', title: 'Conferencia Magistral: Enfoques metodológicos para la sostenibilidad, la innovación y la gestión empresarial en América Latina', speaker: 'Dra. Gladys Montalico — Universidad Nacional de Moquegua', icon: Mic, type: 'keynote' },
    { time: '12:00', title: 'Foro de Estudiantes: Proyectos de Investigación', speaker: 'Coordinador: M.C. Rodrigo Dzib', icon: Users, type: 'panel' },
    { time: '13:00', title: 'Comida de clausura', speaker: '', icon: Coffee, type: 'break' },
    { time: '14:00', title: 'Entrega de Reconocimientos y Diplomas', speaker: 'Comité Científico Valladolid 2026', icon: Award, type: 'ceremony' },
    { time: '15:00', title: 'Declaración de Valladolid — Compromisos Valladolid', speaker: 'Todos los participantes', icon: BookOpen, type: 'ceremony' },
    { time: '16:00', title: 'Conferencia Magistral de Cierre: Interpretar el mundo en tiempos de crisis: aportes de la investigación cualitativa a la filosofía de la educación y la vida cotidiana', speaker: 'Dra. Flor Alba Aguilar — Universidad Politécnica Saleciana', icon: Mic, type: 'keynote' },
    { time: '17:00', title: 'Clausura Oficial y Brindis de despedida', speaker: 'Rector ITSVA & Presidencia Valladolid', icon: Award, type: 'ceremony' },
  ],
};

const typeStyles = {
  keynote: { bg: 'rgba(0,122,255,0.06)', border: '#007AFF', dot: '#007AFF' },
  workshop: { bg: 'rgba(244,168,0,0.07)', border: '#F4A800', dot: '#F4A800' },
  panel: { bg: 'rgba(44,0,85,0.05)', border: '#9B59B6', dot: '#9B59B6' },
  presentation: { bg: 'rgba(0,2,233,0.06)', border: '#0002E9', dot: '#0002E9' },
  break: { bg: '#F8F9FA', border: '#E5E7EB', dot: '#9CA3AF' },
  registration: { bg: '#F8F9FA', border: '#E5E7EB', dot: '#9CA3AF' },
  ceremony: { bg: 'rgba(255,98,0,0.06)', border: '#FF6200', dot: '#FF6200' },
  social: { bg: 'rgba(244,168,0,0.07)', border: '#F4A800', dot: '#F4A800' },
};

const days = Object.keys(schedule);

// Componente Cronograma con tabs por día
const Cronograma = () => {
  const [activeDay, setActiveDay] = useState(days[0]);

  return (
    <section
      id="cronograma"
      className="py-20 sm:py-28 relative overflow-hidden"
      style={{ background: '#FFFFFF' }}
    >
      {/* Decoración sutil */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.03] blur-3xl pointer-events-none"
        style={{ background: '#007AFF' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <span
            className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
            style={{ background: 'rgba(244,168,0,0.1)', color: '#F4A800', border: '1px solid rgba(244,168,0,0.3)' }}
          >
            Programa Académico
          </span>
          <h2 className="text-3xl sm:text-4xl font-black section-underline" style={{ color: '#0A2A43' }}>
            Cronograma de Actividades
          </h2>
          <p className="mt-6 max-w-xl mx-auto" style={{ color: '#6B7280' }}>
            Tres días de conferencias magistrales, talleres, ponencias y experiencias culturales en Valladolid, Yucatán.
          </p>
        </div>

        {/* Tabs de días */}
        <div
          className="flex rounded-2xl p-1.5 mb-10 gap-1"
          style={{ background: '#F8F9FA', border: '1px solid #E5E7EB' }}
        >
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className="flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300"
              style={
                activeDay === day
                  ? {
                    background: '#FF6200',
                    color: 'white',
                    boxShadow: '0 3px 10px rgba(255,98,0,0.3)',
                  }
                  : { color: '#6B7280' }
              }
              onMouseEnter={(e) => {
                if (activeDay !== day) e.currentTarget.style.color = '#374151';
              }}
              onMouseLeave={(e) => {
                if (activeDay !== day) e.currentTarget.style.color = '#6B7280';
              }}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Timeline del día activo */}
        <div className="relative">
          {/* Línea vertical del timeline */}
          <div
            className="absolute left-5 sm:left-8 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(180deg, #FF6200, #F4A800, transparent)' }}
          />

          <div className="space-y-3">
            {schedule[activeDay].map((item, index) => {
              const Icon = item.icon;
              const style = typeStyles[item.type] || typeStyles.break;
              return (
                <div
                  key={index}
                  className="relative flex items-start gap-4 sm:gap-6 pl-12 sm:pl-16 card-hover"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Dot del timeline */}
                  <div
                    className="absolute left-2.5 sm:left-5 top-4 w-5 h-5 rounded-full flex items-center justify-center z-10"
                    style={{
                      background: style.dot,
                      boxShadow: `0 0 8px ${style.dot}60`,
                    }}
                  >
                    <div className="w-2 h-2 rounded-full bg-white opacity-80" />
                  </div>

                  {/* Card */}
                  <div
                    className="flex-1 p-4 rounded-xl transition-all duration-300"
                    style={{
                      background: style.bg,
                      border: `1px solid ${style.border}40`,
                    }}
                  >
                    <div className="flex items-start gap-3">
                      {/* Hora */}
                      <div
                        className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-lg"
                        style={{ background: '#F8F9FA', border: '1px solid #E5E7EB' }}
                      >
                        <Clock size={12} style={{ color: '#F4A800' }} />
                        <span className="text-xs font-bold tabular-nums" style={{ color: '#F4A800' }}>
                          {item.time}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon size={14} style={{ color: style.dot, flexShrink: 0 }} />
                          <p className="font-bold text-sm leading-snug" style={{ color: '#0A2A43' }}>{item.title}</p>
                        </div>
                        {item.speaker && (
                          <p className="text-xs pl-5" style={{ color: '#6B7280' }}>{item.speaker}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leyenda */}
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          {[
            { label: 'Conferencia magistral', color: '#007AFF' },
            { label: 'Taller', color: '#F4A800' },
            { label: 'Panel / Mesa', color: '#9B59B6' },
            { label: 'Ponencia', color: '#0002E9' },
            { label: 'Ceremonia', color: '#FF6200' },
          ].map((l) => (
            <span
              key={l.label}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
              style={{ background: '#F8F9FA', border: '1px solid #E5E7EB', color: '#374151' }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: l.color }} />
              {l.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cronograma;
