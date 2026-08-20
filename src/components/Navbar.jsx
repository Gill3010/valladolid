import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import logoValladolid from '../assets/logos/logo-valladolid.png';
import logoItsva from '../assets/logos/logo-itsva.jpeg';
import logoUnesca from '../assets/logos/logo-unesca.png';
import logoSantander from '../assets/logos/logo-santander.png';

const SECTION_IDS = ['cronograma', 'comite', 'ejes', 'costos', 'publicaciones', 'plantillas'];

function getActiveSectionHref() {
  const probeY = Math.max(120, Math.round(window.innerHeight * 0.28));
  const scrollBottom = window.scrollY + window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;

  // Pie de página / final del documento → última sección del menú
  if (scrollBottom >= docHeight - 120) {
    return '#plantillas';
  }

  // Sección que contiene el punto de referencia (bajo el navbar)
  for (let i = SECTION_IDS.length - 1; i >= 0; i -= 1) {
    const id = SECTION_IDS[i];
    const el = document.getElementById(id);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    if (rect.top <= probeY && rect.bottom > probeY) {
      return `#${id}`;
    }
  }

  // Fallback: última sección cuyo inicio ya pasó el probe
  let fallback = '';
  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= probeY) {
      fallback = `#${id}`;
    }
  }
  return fallback;
}

// Navbar con drawer móvil que abre desde la DERECHA
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const spyLockRef = useRef(null);

  const navLinks = [
    { label: 'Cronograma', href: '#cronograma' },
    { label: 'Comité', href: '#comite' },
    { label: 'Ejes Temáticos', href: '#ejes' },
    { label: 'Costos', href: '#costos' },
    { label: 'Publicaciones', href: '#publicaciones' },
    { label: 'Plantillas', href: '#plantillas' },
    { label: 'Regístrate', href: 'https://eventonexus.com/login', isHighlighted: true, external: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Evita que el scroll suave al hacer clic revierta el ítem activo
      if (spyLockRef.current) return;

      const current = getActiveSectionHref();
      if (current) setActiveLink(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const handleLinkClick = (href) => {
    setActiveLink(href);
    setDrawerOpen(false);

    if (href.startsWith('#')) {
      spyLockRef.current = href;
      window.setTimeout(() => {
        if (spyLockRef.current === href) spyLockRef.current = null;
        const current = getActiveSectionHref();
        if (current) setActiveLink(current);
      }, 900);
    }
  };

  return (
    <>
      {/* Barra de navegación principal */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-2' : 'py-3'
          }`}
        style={{
          background: isScrolled ? '#FFFFFF' : 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: isScrolled ? '1px solid #E5E7EB' : '1px solid transparent',
          boxShadow: isScrolled ? '0 1px 12px rgba(0,0,0,0.06)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 xl:px-8 flex items-center justify-between gap-3">
          {/* Logos — lado izquierdo */}
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <a href="#" className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 xl:gap-3 group">
              <img
                src={logoValladolid}
                alt="Logo Valladolid"
                className="h-6 sm:h-8 md:h-10 lg:h-10 xl:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="h-5 sm:h-6 md:h-8 w-px" style={{ background: '#E5E7EB' }} />
              <img
                src={logoItsva}
                alt="Logo ITSVA"
                className="h-6 sm:h-8 md:h-10 lg:h-10 xl:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="h-5 sm:h-6 md:h-8 w-px" style={{ background: '#E5E7EB' }} />
              <img
                src={logoUnesca}
                alt="Logo Unesca"
                className="h-6 sm:h-8 md:h-10 lg:h-10 xl:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="h-5 sm:h-6 md:h-8 w-px" style={{ background: '#E5E7EB' }} />
              <img
                src={logoSantander}
                alt="Logo Santander"
                className="h-6 sm:h-8 md:h-10 lg:h-10 xl:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </a>
            <div className="hidden xl:block ml-1 xl:ml-2">
              <p className="text-[11px] xl:text-xs leading-tight" style={{ color: '#4B5563' }}>IV Congreso</p>
              <p className="text-xs xl:text-sm font-bold leading-tight" style={{ color: '#0A2A43' }}>RELATIC 2026</p>
            </div>
          </div>

          {/* Links desktop — una sola línea, espaciado compacto en lg y más aire en xl */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1 shrink-0">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="whitespace-nowrap px-2.5 xl:px-3.5 py-2 rounded-lg text-[13px] xl:text-sm font-medium transition-all duration-300"
                style={
                  link.isHighlighted
                    ? {
                      marginLeft: '6px',
                      padding: '9px 16px',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      borderRadius: '9999px',
                      background: '#FF6200',
                      boxShadow: '0 4px 14px rgba(255,98,0,0.3)',
                    }
                    : activeLink === link.href
                      ? { color: '#FF6200', background: 'rgba(255,98,0,0.06)', borderRadius: '8px' }
                      : { color: '#0A2A43' }
                }
                onMouseEnter={(e) => {
                  if (link.isHighlighted) {
                    e.currentTarget.style.background = '#0002E9';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,2,233,0.3)';
                    return;
                  }
                  // Hover también en el ítem activo (p. ej. Plantillas al final de la página)
                  e.currentTarget.style.color = '#FF6200';
                  e.currentTarget.style.background = 'rgba(255,98,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  if (link.isHighlighted) {
                    e.currentTarget.style.background = '#FF6200';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(255,98,0,0.3)';
                    return;
                  }
                  if (activeLink === link.href) {
                    e.currentTarget.style.color = '#FF6200';
                    e.currentTarget.style.background = 'rgba(255,98,0,0.06)';
                  } else {
                    e.currentTarget.style.color = '#0A2A43';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Botón hamburguesa — lado DERECHO (siempre) */}
          <button
            id="mobile-menu-btn"
            className="lg:hidden p-2 rounded-lg transition-colors"
            style={{ background: '#F8F9FA', border: '1px solid #E5E7EB' }}
            onClick={() => setDrawerOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu size={22} style={{ color: '#0A2A43' }} />
          </button>
        </div>
      </nav>

      {/* Overlay oscuro */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* ─── DRAWER — abre desde la DERECHA ─── */}
      <div
        className={`fixed top-0 right-0 h-full z-50 w-72 flex flex-col transition-transform duration-300 ease-in-out ${drawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        style={{ background: '#0A2A43' }}
      >
        {/* Header del drawer */}
        <div
          className="flex items-center justify-between p-4"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
        >
          <div className="flex items-center gap-2">
            <img src={logoValladolid} alt="Valladolid" className="h-9 w-auto" />
            <div className="h-6 w-px" style={{ background: 'rgba(255,255,255,0.2)' }} />
            <img src={logoItsva} alt="ITSVA" className="h-9 w-auto" />
          </div>
          {/* Botón cerrar (X) — blanco y visible */}
          <button
            className="p-2 rounded-lg transition-colors"
            style={{ background: 'rgba(255,255,255,0.1)' }}
            onClick={() => setDrawerOpen(false)}
            aria-label="Cerrar menú"
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
          >
            <X size={20} color="#FFFFFF" />
          </button>
        </div>

        {/* Info del congreso */}
        <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>IV Congreso Internacional</p>
          <p className="text-lg font-bold" style={{ color: '#FFFFFF' }}>RELATIC 2026</p>
          <p className="text-xs mt-1" style={{ color: '#F4A800' }}>
            Valladolid, Yucatán, México
          </p>
        </div>

        {/* Links de navegación */}
        <nav className="flex flex-col p-4 gap-1 flex-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => handleLinkClick(link.href)}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="flex items-center justify-between px-4 py-3.5 rounded-xl font-medium transition-all duration-200"
              style={
                link.isHighlighted
                  ? {
                    marginTop: '16px',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    background: '#FF6200',
                  }
                  : activeLink === link.href
                    ? { color: '#F4A800', backgroundColor: 'rgba(244,168,0,0.1)' }
                    : { color: 'rgba(255,255,255,0.85)' }
              }
              onMouseEnter={(e) => {
                if (!link.isHighlighted && activeLink !== link.href) {
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)';
                }
              }}
              onMouseLeave={(e) => {
                if (!link.isHighlighted && activeLink !== link.href) {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span>{link.label}</span>
              <ChevronRight size={16} style={{ color: 'rgba(255,255,255,0.4)' }} />
            </a>
          ))}
        </nav>

        {/* Footer del drawer */}
        <div
          className="px-5 py-4 text-center"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>7–9 Octubre 2026</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
