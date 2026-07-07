import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import logoValladolid from '../assets/logos/logo-valladolid.png';
import logoItsva from '../assets/logos/logo-itsva.jpeg';
import logoUnesca from '../assets/logos/logo-unesca.png';
import logoSantander from '../assets/logos/logo-santander.png';

// Navbar con drawer móvil que abre desde la DERECHA
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  const navLinks = [
    { label: 'Cronograma', href: '#cronograma' },
    { label: 'Comité', href: '#comite' },
    { label: 'Ejes Temáticos', href: '#ejes' },
    { label: 'Costos', href: '#costos' },
    { label: 'Regístrate', href: 'https://eventonexus.com/login', isHighlighted: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const sections = ['cronograma', 'comite', 'ejes', 'costos', 'registro'];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveLink(`#${id}`);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const handleLinkClick = (href) => {
    setActiveLink(href);
    setDrawerOpen(false);
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logos — lado izquierdo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="#" className="flex items-center gap-1.5 sm:gap-2 md:gap-3 group">
              <img
                src={logoValladolid}
                alt="Logo Valladolid"
                className="h-6 sm:h-8 md:h-10 lg:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="h-5 sm:h-6 md:h-8 w-px" style={{ background: '#E5E7EB' }} />
              <img
                src={logoItsva}
                alt="Logo ITSVA"
                className="h-6 sm:h-8 md:h-10 lg:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="h-5 sm:h-6 md:h-8 w-px" style={{ background: '#E5E7EB' }} />
              <img
                src={logoUnesca}
                alt="Logo Unesca"
                className="h-6 sm:h-8 md:h-10 lg:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="h-5 sm:h-6 md:h-8 w-px" style={{ background: '#E5E7EB' }} />
              <img
                src={logoSantander}
                alt="Logo Santander"
                className="h-6 sm:h-8 md:h-10 lg:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </a>
            <div className="hidden md:block ml-1 lg:ml-2">
              <p className="text-[10px] lg:text-xs leading-tight" style={{ color: '#6B7280' }}>IV Congreso</p>
              <p className="text-xs lg:text-sm font-bold leading-tight" style={{ color: '#0A2A43' }}>RELATIC 2026</p>
            </div>
          </div>

          {/* Links desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                style={
                  link.isHighlighted
                    ? {
                      marginLeft: '8px',
                      padding: '10px 20px',
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
                  if (!link.isHighlighted && activeLink !== link.href) {
                    e.currentTarget.style.color = '#FF6200';
                    e.currentTarget.style.background = 'rgba(255,98,0,0.06)';
                  } else if (link.isHighlighted) {
                    e.currentTarget.style.background = '#0002E9';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,2,233,0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!link.isHighlighted && activeLink !== link.href) {
                    e.currentTarget.style.color = '#0A2A43';
                    e.currentTarget.style.background = 'transparent';
                  } else if (link.isHighlighted) {
                    e.currentTarget.style.background = '#FF6200';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(255,98,0,0.3)';
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
