import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Calendar, Home, User, Activity, CalendarPlus } from 'lucide-react';
import WhatsAppWidget from '../components/WhatsAppWidget';
import '../styles/Corporate.css';

const MainLayout = () => {
  return (
    <div className="landing-container">
      {/* Global Header */}
      <header className="header">
        <Link to="/" className="header-logo" style={{ textDecoration: 'none' }}>
          <h1>Clínica MG</h1>
          <span className="logo-subtitle">Odontología Especializada</span>
        </Link>
        <nav className="header-nav">
          <Link to="/nosotros">Nosotros</Link>
          <Link to="/especialidades">Especialidades</Link>
          <Link to="/convenios">Convenios</Link>
          <a href="#contact">Contacto</a>
          <Link to="/" className="btn-primary pulse-button" onClick={() => {
            setTimeout(() => {
              const el = document.getElementById('booking-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}>
            <Calendar size={18} style={{ marginRight: '8px', marginBottom: '-4px' }} /> Agenda tu hora
          </Link>
        </nav>
      </header>

      {/* Page Content */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/* Global Contact Section */}
      <section id="contact" className="contact-section">
        <div className="contact-content">
          <div className="contact-info">
            <h2>Estamos para cuidarte siempre.</h2>
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📞</div>
                <div>
                  <strong>Centro de Atención Institucional</strong>
                  <p>(41) 2858805</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📍</div>
                <div>
                  <strong>Sede Principal</strong>
                  <p>Ohiggins 77 Of. 2107-2108, Concepción, Chile 4030000</p>
                </div>
              </div>
            </div>
          </div>
          <div className="contact-map">
             <iframe 
                src="https://www.google.com/maps?q=O'higgins+77,+Concepción,+Chile&output=embed" 
                width="100%" 
                height="400" 
                style={{ border: 0, borderRadius: '24px' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de Ubicación Clínica MG"
             ></iframe>
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h2>Clínica MG</h2>
            <p>Odontología Institucional</p>
          </div>
          <div className="footer-links">
             <p>Emprendedor(a) | Todos los derechos reservados &copy; 2026</p>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-bottom-nav">
        <Link to="/" className="mobile-nav-item">
          <Home size={20} />
          <span>Inicio</span>
        </Link>
        <Link to="/nosotros" className="mobile-nav-item">
          <User size={20} />
          <span>Nosotros</span>
        </Link>
        <Link to="/especialidades" className="mobile-nav-item">
          <Activity size={20} />
          <span>Servicios</span>
        </Link>
        <Link to="/" className="mobile-nav-item primary" onClick={() => {
            setTimeout(() => {
              const el = document.getElementById('booking-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}>
          <CalendarPlus size={20} />
          <span>Agendar</span>
        </Link>
      </nav>

      <WhatsAppWidget />
    </div>
  );
};

export default MainLayout;
