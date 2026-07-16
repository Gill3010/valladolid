import React, { useState } from 'react';
import { Clock, Mic, Coffee, BookOpen, Award, Users, ChevronRight } from 'lucide-react';

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
  keynote: { bg: 'rgba(0,122,255,0.06)', border: '#007AFF', dot: '#007AFF', label: 'Conferencia' },
  workshop: { bg: 'rgba(244,168,0,0.07)', border: '#F4A800', dot: '#F4A800', label: 'Taller' },
  panel: { bg: 'rgba(44,0,85,0.05)', border: '#9B59B6', dot: '#9B59B6', label: 'Panel' },
  presentation: { bg: 'rgba(0,2,233,0.06)', border: '#0002E9', dot: '#0002E9', label: 'Ponencia' },
  break: { bg: '#F8F9FA', border: '#E5E7EB', dot: '#9CA3AF', label: 'Receso' },
  registration: { bg: '#F8F9FA', border: '#E5E7EB', dot: '#9CA3AF', label: 'Registro' },
  ceremony: { bg: 'rgba(255,98,0,0.06)', border: '#FF6200', dot: '#FF6200', label: 'Ceremonia' },
  social: { bg: 'rgba(244,168,0,0.07)', border: '#F4A800', dot: '#F4A800', label: 'Social' },
};

// Etiquetas textuales para los tabs con fecha completa
const dayLabels = {
  '7 Oct': { short: '7 Oct', full: 'Miércoles 7', date: 'Octubre 2026' },
  '8 Oct': { short: '8 Oct', full: 'Jueves 8', date: 'Octubre 2026' },
  '9 Oct': { short: '9 Oct', full: 'Viernes 9', date: 'Octubre 2026' },
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
        <div className="text-center mb-14">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
            style={{ background: 'rgba(244,168,0,0.1)', color: '#F4A800', border: '1px solid rgba(244,168,0,0.3)' }}
          >
            Programa Académico
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black section-underline"
            style={{ color: '#0A2A43' }}
          >
            Cronograma de Actividades
          </h2>
          <p className="mt-6 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: '#4B5563' }}>
            Tres días de conferencias magistrales, talleres, ponencias y experiencias culturales en Valladolid, Yucatán.
          </p>
        </div>

        {/* Tabs de días — rediseñados con más presencia */}
        <div
          className="flex rounded-2xl p-1.5 mb-12 gap-1.5"
          style={{ background: '#F8F9FA', border: '1px solid #E5E7EB' }}
        >
          {days.map((day) => {
            const label = dayLabels[day];
            const isActive = activeDay === day;
            return (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className="flex-1 py-3.5 sm:py-4 px-3 sm:px-5 rounded-xl font-bold transition-all duration-300"
                style={
                  isActive
                    ? {
                      background: '#FF6200',
                      color: 'white',
                      boxShadow: '0 4px 14px rgba(255,98,0,0.3)',
                    }
                    : { color: '#4B5563' }
                }
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = '#0A2A43';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = '#4B5563';
                }}
              >
                <span className="block text-sm sm:text-base font-bold">{label.full}</span>
                <span
                  className="block text-[10px] sm:text-xs mt-0.5 font-medium"
                  style={{ opacity: isActive ? 0.85 : 0.6 }}
                >
                  {label.date}
                </span>
              </button>
            );
          })}
        </div>

        {/* Contador de actividades del día */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1" style={{ background: '#E5E7EB' }} />
          <span className="text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full"
            style={{ background: '#F8F9FA', border: '1px solid #E5E7EB', color: '#4B5563' }}
          >
            {schedule[activeDay].length} actividades programadas
          </span>
          <div className="h-px flex-1" style={{ background: '#E5E7EB' }} />
        </div>

        {/* Timeline del día activo */}
        <div className="relative">
          {/* Línea vertical del timeline */}
          <div
            className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5"
            style={{ background: 'linear-gradient(180deg, #FF6200, #F4A800 50%, #E5E7EB)' }}
          />

          <div className="space-y-4">
            {schedule[activeDay].map((item, index) => {
              const Icon = item.icon;
              const style = typeStyles[item.type] || typeStyles.break;
              return (
                <div
                  key={index}
                  className="relative flex items-start gap-4 sm:gap-6 pl-14 sm:pl-20 group"
                >
                  {/* Dot del timeline */}
                  <div
                    className="absolute left-3.5 sm:left-5.5 top-5 w-6 h-6 rounded-full flex items-center justify-center z-10 transition-transform duration-200 group-hover:scale-110"
                    style={{
                      background: style.dot,
                      boxShadow: `0 0 10px ${style.dot}50`,
                    }}
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-white opacity-80" />
                  </div>

                  {/* Card */}
                  <div
                    className="flex-1 p-5 sm:p-6 rounded-xl transition-all duration-300 group-hover:shadow-md"
                    style={{
                      background: style.bg,
                      border: `1px solid ${style.border}30`,
                      borderLeft: `3px solid ${style.border}`,
                    }}
                  >
                    {/* Fila superior: hora + badge de tipo */}
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      {/* Hora */}
                      <div
                        className="flex-shrink-0 flex items-center gap-2 px-3.5 py-1.5 rounded-lg"
                        style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}
                      >
                        <Clock size={14} style={{ color: style.dot }} />
                        <span
                          className="text-sm font-bold tabular-nums"
                          style={{ color: style.dot }}
                        >
                          {item.time}
                        </span>
                      </div>
                      {/* Badge de tipo */}
                      <span
                        className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                        style={{
                          background: `${style.dot}12`,
                          color: style.dot,
                          border: `1px solid ${style.dot}25`,
                        }}
                      >
                        {style.label}
                      </span>
                    </div>

                    {/* Contenido principal */}
                    <div className="flex items-start gap-3">
                      <Icon
                        size={18}
                        className="mt-0.5 shrink-0"
                        style={{ color: style.dot }}
                      />
                      <div className="min-w-0 flex-1">
                        <h4
                          className="font-bold text-sm sm:text-base leading-snug mb-1"
                          style={{ color: '#0A2A43' }}
                        >
                          {item.title}
                        </h4>
                        {item.speaker && (
                          <p
                            className="text-xs sm:text-sm leading-relaxed flex items-center gap-1.5"
                            style={{ color: '#4B5563' }}
                          >
                            <ChevronRight size={12} style={{ color: style.dot, opacity: 0.6, flexShrink: 0 }} />
                            {item.speaker}
                          </p>
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
        <div className="mt-12 flex flex-wrap gap-3 justify-center">
          {[
            { label: 'Conferencia magistral', color: '#007AFF' },
            { label: 'Taller', color: '#F4A800' },
            { label: 'Panel / Mesa', color: '#9B59B6' },
            { label: 'Ponencia', color: '#0002E9' },
            { label: 'Ceremonia', color: '#FF6200' },
          ].map((l) => (
            <span
              key={l.label}
              className="flex items-center gap-2 text-xs sm:text-sm px-3.5 py-2 rounded-full font-medium"
              style={{ background: '#F8F9FA', border: '1px solid #E5E7EB', color: '#1F2937' }}
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
              {l.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cronograma;
