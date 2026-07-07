import React from 'react';
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
import Footer from './components/Footer';



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
