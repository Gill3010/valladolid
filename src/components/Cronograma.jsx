import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Clock, Mic, Coffee, BookOpen, Award, Users } from 'lucide-react';

// Datos del cronograma por día
const schedule = {
  '7 Oct': [
    { time: '08:00', title: 'Registro y Ceremonia de Inauguración', speaker: 'Dr. Carlos Méndez Ríos — Rector ITSVA', icon: Award, type: 'ceremony' },
    { time: '09:00', title: 'Conferencia Magistral de Apertura: Inteligencia Artificial y planeación docente: Riesgos y Desafíos', speaker: 'Dr. Antonio Jesús Santos — ITSVA', icon: Mic, type: 'keynote' },
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

const dayLabels = {
  '7 Oct': { short: '7 Oct', full: 'Miércoles 7', date: 'Octubre 2026' },
  '8 Oct': { short: '8 Oct', full: 'Jueves 8', date: 'Octubre 2026' },
  '9 Oct': { short: '9 Oct', full: 'Viernes 9', date: 'Octubre 2026' },
};

const legendItems = [
  { label: 'Conferencia magistral', color: '#007AFF' },
  { label: 'Taller', color: '#F4A800' },
  { label: 'Panel / Mesa', color: '#9B59B6' },
  { label: 'Ponencia', color: '#0002E9' },
  { label: 'Ceremonia', color: '#FF6200' },
];

const days = Object.keys(schedule);

const timeToMinutes = (time) => {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
};

// Agrupa en mañana / tarde para escanear sin alargar el scroll.
const groupByBlock = (items) => {
  const morning = [];
  const afternoon = [];
  for (const item of items) {
    if (timeToMinutes(item.time) < 13 * 60) morning.push(item);
    else afternoon.push(item);
  }
  return [
    { id: 'manana', label: 'Mañana', items: morning },
    { id: 'tarde', label: 'Tarde', items: afternoon },
  ].filter((block) => block.items.length > 0);
};

const BreakRow = ({ item }) => {
  const Icon = item.icon;
  return (
    <div
      className="flex items-center gap-3 px-3 sm:px-4 py-2 rounded-xl"
      style={{ background: '#F8F9FA', border: '1px dashed #E5E7EB' }}
    >
      <span
        className="text-xs font-bold tabular-nums shrink-0"
        style={{ color: '#9CA3AF', minWidth: '2.75rem' }}
      >
        {item.time}
      </span>
      <Icon size={14} style={{ color: '#9CA3AF' }} aria-hidden="true" />
      <p className="text-xs sm:text-sm font-medium" style={{ color: '#6B7280' }}>
        {item.title}
      </p>
    </div>
  );
};

const ActivityRow = ({ item, index }) => {
  const Icon = item.icon;
  const style = typeStyles[item.type] || typeStyles.break;

  if (item.type === 'break') {
    return <BreakRow item={item} />;
  }

  return (
    <article
      className="group relative flex gap-3 sm:gap-4 rounded-xl px-3 sm:px-4 py-3 transition-all duration-200"
      style={{
        background: '#FFFFFF',
        border: '1px solid #E5E7EB',
        borderLeft: `3px solid ${style.border}`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = style.bg;
        e.currentTarget.style.borderColor = `${style.border}45`;
        e.currentTarget.style.boxShadow = `0 6px 16px ${style.dot}14`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = '#FFFFFF';
        e.currentTarget.style.borderColor = '#E5E7EB';
        e.currentTarget.style.borderLeftColor = style.border;
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.03)';
      }}
    >
      {/* Hora */}
      <div className="shrink-0 flex flex-col items-center pt-0.5" style={{ minWidth: '3.25rem' }}>
        <span
          className="text-sm font-black tabular-nums leading-none"
          style={{ color: style.dot }}
        >
          {item.time}
        </span>
        <Clock size={11} className="mt-1.5 opacity-50" style={{ color: style.dot }} aria-hidden="true" />
      </div>

      {/* Contenido */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span
            className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{
              background: `${style.dot}12`,
              color: style.dot,
              border: `1px solid ${style.dot}25`,
            }}
          >
            <Icon size={10} aria-hidden="true" />
            {style.label}
          </span>
          <span className="text-[10px] font-semibold tabular-nums" style={{ color: '#D1D5DB' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <h4
          className="font-bold text-sm sm:text-[15px] leading-snug"
          style={{ color: '#0A2A43' }}
        >
          {item.title}
        </h4>
        {item.speaker ? (
          <p className="mt-1 text-xs sm:text-[13px] leading-snug" style={{ color: '#4B5563' }}>
            {item.speaker}
          </p>
        ) : null}
      </div>
    </article>
  );
};

const DayAgenda = ({ dayKey }) => {
  const items = schedule[dayKey];
  const blocks = groupByBlock(items);
  let runningIndex = 0;

  return (
    <motion.div
      key={dayKey}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className="space-y-6"
    >
      {blocks.map((block) => (
        <div key={block.id}>
          <div className="flex items-center gap-3 mb-3">
            <span
              className="text-[11px] font-bold uppercase tracking-[0.16em]"
              style={{ color: '#FF6200' }}
            >
              {block.label}
            </span>
            <div className="h-px flex-1" style={{ background: '#E5E7EB' }} />
            <span className="text-[11px] font-semibold" style={{ color: '#9CA3AF' }}>
              {block.items.length} {block.items.length === 1 ? 'actividad' : 'actividades'}
            </span>
          </div>
          <div className="space-y-2">
            {block.items.map((item) => {
              const idx = runningIndex;
              runningIndex += 1;
              return <ActivityRow key={`${dayKey}-${item.time}-${item.title}`} item={item} index={idx} />;
            })}
          </div>
        </div>
      ))}
    </motion.div>
  );
};

const Cronograma = () => {
  const [activeDay, setActiveDay] = useState(days[0]);
  const activeLabel = dayLabels[activeDay];

  return (
    <section
      id="cronograma"
      className="py-20 sm:py-28 relative overflow-hidden"
      style={{ background: '#FFFFFF' }}
    >
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.03] blur-3xl pointer-events-none"
        style={{ background: '#007AFF' }}
      />
      <div
        className="absolute bottom-10 left-0 w-72 h-72 rounded-full opacity-[0.03] blur-3xl pointer-events-none"
        style={{ background: '#F4A800' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
            style={{
              background: 'rgba(244,168,0,0.1)',
              color: '#F4A800',
              border: '1px solid rgba(244,168,0,0.3)',
            }}
          >
            Programa Académico
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black section-underline"
            style={{ color: '#0A2A43' }}
          >
            Cronograma de Actividades
          </h2>
          <p
            className="mt-6 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: '#4B5563' }}
          >
            Tres días de conferencias magistrales, talleres, ponencias y experiencias culturales en
            Valladolid, Yucatán.
          </p>
        </div>

        {/* Tabs de días */}
        <div
          className="flex rounded-2xl p-1.5 mb-6 gap-1.5"
          style={{ background: '#F8F9FA', border: '1px solid #E5E7EB' }}
          role="tablist"
          aria-label="Días del programa"
        >
          {days.map((day) => {
            const label = dayLabels[day];
            const isActive = activeDay === day;
            return (
              <button
                key={day}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveDay(day)}
                className="flex-1 py-3 sm:py-3.5 px-2 sm:px-4 rounded-xl font-bold transition-all duration-300"
                style={
                  isActive
                    ? {
                        background: '#FF6200',
                        color: 'white',
                        boxShadow: '0 4px 14px rgba(255,98,0,0.3)',
                      }
                    : { color: '#4B5563' }
                }
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

        {/* Escenario del día — compacto, coherente con Comité */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: `
              radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,98,0,0.06) 0%, transparent 55%),
              linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%)
            `,
            border: '1px solid rgba(255,98,0,0.18)',
            boxShadow: '0 16px 48px rgba(10,42,67,0.06)',
          }}
        >
          <div
            className="flex items-center justify-between gap-3 px-4 sm:px-6 py-4"
            style={{ borderBottom: '1px solid #E5E7EB' }}
          >
            <div className="min-w-0">
              <p
                className="text-[11px] font-bold uppercase tracking-[0.16em]"
                style={{ color: '#FF6200' }}
              >
                Agenda del día
              </p>
              <h3
                className="text-lg sm:text-xl font-black truncate"
                style={{ color: '#0A2A43' }}
              >
                {activeLabel.full} · {activeLabel.date}
              </h3>
            </div>
            <span
              className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(255,98,0,0.08)',
                color: '#FF6200',
                border: '1px solid rgba(255,98,0,0.25)',
              }}
            >
              {schedule[activeDay].length} actividades
            </span>
          </div>

          <div className="px-3 sm:px-5 lg:px-6 py-5 sm:py-6" role="tabpanel" aria-label={activeLabel.full}>
            <AnimatePresence mode="wait" initial={false}>
              <DayAgenda dayKey={activeDay} />
            </AnimatePresence>
          </div>
        </div>

        {/* Leyenda compacta */}
        <div className="mt-8 flex flex-wrap gap-2 justify-center">
          {legendItems.map((l) => (
            <span
              key={l.label}
              className="flex items-center gap-1.5 text-[11px] sm:text-xs px-2.5 py-1.5 rounded-full font-medium"
              style={{ background: '#F8F9FA', border: '1px solid #E5E7EB', color: '#374151' }}
            >
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: l.color }} />
              {l.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cronograma;
