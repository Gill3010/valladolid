import React from 'react';
import { Mail, Phone, MapPin, Share2, MessageCircle, ExternalLink, Play } from 'lucide-react';
import logoValladolid from './assets/logos/logo-valladolid.png';
import logoItsva from './assets/logos/logo-itsva.jpeg';
import logoUnesca from './assets/logos/logo-unesca.png';
import logoSantander from './assets/logos/logo-santander.png';

// ──────────────────────────────────────────────
// Importación de todos los componentes
// ──────────────────────────────────────────────
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import Cronograma from './components/Cronograma';
import Comite from './components/Comite';
import EjesTematicos from './components/EjesTematicos';
import Costos from './components/Costos';

// ──────────────────────────────────────────────
// Footer
// ──────────────────────────────────────────────
const Footer = () => (
  <footer
    className="relative pt-16 pb-8 overflow-hidden"
    style={{ background: 'linear-gradient(180deg, #0A2A43 0%, #060F1A 100%)' }}
  >
    {/* Línea decorativa superior */}
    <div
      className="absolute top-0 left-0 right-0 h-px"
      style={{ background: 'linear-gradient(90deg, transparent, #F4A800, #FF6200, transparent)' }}
    />

    {/* Decoración de fondo */}
    <div
      className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-5 blur-3xl"
      style={{ background: '#007AFF' }}
    />

    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Grid principal del footer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Logos + descripción */}
        <div className="lg:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-3 lg:gap-4 mb-6">
            <div className="flex items-center gap-3">
              <img src={logoValladolid} alt="Logo Valladolid" className="h-10 sm:h-12 w-auto object-contain" />
              <div className="h-8 w-px bg-white/15" />
              <img src={logoItsva} alt="Logo ITSVA" className="h-10 sm:h-12 w-auto object-contain" />
            </div>
            <div className="hidden sm:block h-8 w-px bg-white/15" />
            <div className="flex items-center gap-3">
              <img src={logoUnesca} alt="Logo Unesca" className="h-10 sm:h-12 w-auto object-contain" />
              <div className="h-8 w-px bg-white/15" />
              <img src={logoSantander} alt="Logo Santander" className="h-10 sm:h-12 w-auto object-contain" />
            </div>
          </div>
          <p className="text-sm text-white/50 leading-relaxed max-w-sm mb-5">
            El IV Congreso Internacional de la Red Latinoamericana de Tecnología, Innovación y Ciencia (Valladolid) reúne a académicos, investigadores y estudiantes de toda Latinoamérica.
          </p>
          {/* Redes sociales */}
          <div className="flex gap-3">
            {[
              { icon: Share2, href: '#', label: 'Facebook' },
              { icon: MessageCircle, href: '#', label: 'Twitter' },
              { icon: ExternalLink, href: '#', label: 'LinkedIn' },
              { icon: Play, href: '#', label: 'YouTube' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(244,168,0,0.15)';
                  e.currentTarget.style.borderColor = 'rgba(244,168,0,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                <Icon size={16} style={{ color: 'rgba(255,255,255,0.5)' }} />
              </a>
            ))}
          </div>
        </div>

        {/* Navegación rápida */}
        <div>
          <h4
            className="text-sm font-bold uppercase tracking-widest mb-5"
            style={{ color: '#F4A800' }}
          >
            Navegación
          </h4>
          <ul className="space-y-2.5">
            {[
              { label: 'Cronograma', href: '#cronograma' },
              { label: 'Comité Organizador', href: '#comite' },
              { label: 'Ejes Temáticos', href: '#ejes' },
              { label: 'Costos', href: '#costos' },
              { label: 'Regístrate', href: 'https://eventonexus.com/login' },
            ].map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-sm text-white/50 hover:text-white transition-colors duration-200 flex items-center gap-1.5"
                >
                  <span
                    className="w-1 h-1 rounded-full"
                    style={{ background: '#FF6200' }}
                  />
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h4
            className="text-sm font-bold uppercase tracking-widest mb-5"
            style={{ color: '#F4A800' }}
          >
            Contacto
          </h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin size={15} style={{ color: '#FF6200', flexShrink: 0, marginTop: '2px' }} />
              <span className="text-sm text-white/50 leading-snug">
                Instituto Tecnológico Superior de Valladolid<br />
                Valladolid, Yucatán, México
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={15} style={{ color: '#FF6200', flexShrink: 0 }} />
              <a href="mailto:congreso@valladolid.org" className="text-sm text-white/50 hover:text-white transition-colors">
                congreso@valladolid.org
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={15} style={{ color: '#FF6200', flexShrink: 0 }} />
              <span className="text-sm text-white/50">+52 985 856 0123</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Divisor */}
      <div className="h-px mb-6" style={{ background: 'rgba(255,255,255,0.06)' }} />

      {/* Copyright */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <p className="text-xs text-white/30">
          © {new Date().getFullYear()} — IV Congreso Valladolid 2026 · ITSVA, Valladolid, Yucatán, México
        </p>
        <p className="text-xs text-white/20">
          Todos los derechos reservados · Red Valladolid Internacional
        </p>
      </div>
    </div>
  </footer>
);

// ──────────────────────────────────────────────
// App principal — ensamblaje de todas las secciones
// ──────────────────────────────────────────────
function App() {
  return (
    <div className="min-h-screen">
      {/* Barra de navegación (fixed) */}
      <Navbar />

      {/* Cintillo de cuenta regresiva — debajo del navbar, encima del hero */}
      {/* paddingTop: 72px compensa la altura del navbar fijo */}
      <div style={{ paddingTop: '72px' }}>
        <Countdown />
      </div>

      {/* Contenido principal */}
      <main>
        {/* Sección principal / Slider hero */}
        <Hero />

        {/* Cronograma de actividades */}
        <Cronograma />

        {/* Comité organizador */}
        <Comite />

        {/* Ejes temáticos */}
        <EjesTematicos />

        {/* Costos de inscripción */}
        <Costos />
      </main>

      {/* Pie de página */}
      <Footer />
    </div>
  );
}

export default App;
