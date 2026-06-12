import React from 'react';
import BookingSystem from '../components/BookingSystem';
import { CheckCircle, ChevronDown, Calendar } from 'lucide-react';

const Home = () => {
  const scrollToBooking = () => {
    document.getElementById('booking-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h2>Cuidamos tu sonrisa</h2>
            <h1 className="hero-title">Excelencia y Tecnología para tu Salud Dental</h1>
            <p className="hero-description">
              Somos una institución médica dedicada a brindarte tratamientos odontológicos integrales de vanguardia, con un equipo de especialistas de primer nivel.
            </p>
            <div className="hero-features">
              <span className="feature-item"><CheckCircle size={20} /> Odontología Digital</span>
              <span className="feature-item"><CheckCircle size={20} /> Periodoncia Avanzada</span>
              <span className="feature-item"><CheckCircle size={20} /> Implantes de Alta Precisión</span>
            </div>
            <button className="btn-primary-large pulse-button" onClick={scrollToBooking}>
              <Calendar size={22} style={{ marginRight: '8px', marginBottom: '-4px' }} /> 
              Agenda tu hora 
              <ChevronDown size={22} style={{ marginLeft: '8px', marginBottom: '-4px' }}/>
            </button>
          </div>
          <div className="hero-image-placeholder">
            <div className="image-overlay"></div>
            <img src="/images/doctor-admin.jpg" alt="Dr. MG - Especialista de Clínica Odontológica MG" style={{ objectPosition: 'center top' }} />
          </div>
        </div>
      </section>

      {/* Booking Section on Home Page */}
      <section id="booking-section" className="booking-section">
        <div className="section-header">
          <h2>Reserva tu hora de evaluación 👇</h2>
          <p>Ingresa a nuestro sistema y agenda tu cita con nuestros especialistas.</p>
        </div>
        <BookingSystem />
      </section>
    </>
  );
};

export default Home;
