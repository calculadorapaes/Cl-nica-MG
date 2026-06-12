import React from 'react';
import { Award, Users, ShieldCheck } from 'lucide-react';

const About = () => {
  return (
    <section className="about-section">
      <div className="section-header">
        <h2>Conoce a tu Especialista</h2>
        <p>Compromiso absoluto con la excelencia clínica y la salud integral de nuestros pacientes.</p>
      </div>

      <div className="doctor-profile-container">
        <div className="doctor-photo">
          <img 
            src="/images/doctor-admin.jpg" 
            alt="Dr. Matías González Guíñez" 
          />
        </div>
        <div className="doctor-bio">
          <h2>Dr. Matías González Guíñez</h2>
          <h4>Cirujano Dentista • Mg. en Gestión Estratégica en Salud</h4>
          <p>
            Como director clínico y especialista a cargo, mi filosofía de trabajo se basa en devolver la confianza y calidad de vida a mis pacientes mediante diagnósticos precisos y tratamientos de vanguardia.
          </p>
          <p>
            Con dedicación exclusiva en <strong>Odontología Digital, Periodoncia e Implantología</strong>, garantizamos resultados estéticos y funcionales predecibles, utilizando la mejor tecnología disponible para que tu visita sea cómoda y segura.
          </p>
        </div>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <Award className="about-icon" size={40} />
          <h3>Nuestra Misión</h3>
          <p>Proveer atención odontológica especializada con los más altos estándares éticos, científicos y tecnológicos, mejorando la calidad de vida de nuestros pacientes.</p>
        </div>
        <div className="about-card">
          <Users className="about-icon" size={40} />
          <h3>Atención Personalizada</h3>
          <p>Trato directo, humano y empático. Evaluamos cada caso clínico de forma individual para ofrecer la solución más adecuada a tus necesidades.</p>
        </div>
        <div className="about-card">
          <ShieldCheck className="about-icon" size={40} />
          <h3>Infraestructura</h3>
          <p>Instalaciones modernas equipadas con tecnología de odontología digital, diseñadas para ofrecer procedimientos precisos, seguros y confortables.</p>
        </div>
      </div>
    </section>
  );
};

export default About;
