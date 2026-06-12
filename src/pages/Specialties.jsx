import React from 'react';
import { Activity, CheckCircle } from 'lucide-react';

const Specialties = () => {
  return (
    <section className="specialties-section">
      <div className="specialties-content">
        <div className="section-header left-aligned">
           <h2>Nuestras Especialidades</h2>
           <p>Abordamos cada caso clínico de manera integral con especialistas dedicados.</p>
        </div>
        <div className="specialties-grid">
          <div className="specialty-item">
            <Activity className="specialty-icon" size={32} />
            <h4>Periodoncia</h4>
            <p>Diagnóstico y tratamiento avanzado de las enfermedades de las encías para mantener la base de tus dientes firme y sana.</p>
          </div>
          <div className="specialty-item">
            <CheckCircle className="specialty-icon" size={32} />
            <h4>Implantes Dentales</h4>
            <p>Rehabilitación oral segura mediante implantes de titanio para recuperar la función masticatoria y la confianza al sonreír.</p>
          </div>
          <div className="specialty-item">
            <Activity className="specialty-icon" size={32} />
            <h4>Tecnología CEREC & Odontología Digital</h4>
            <p>Planificación de alta precisión y diseño de prótesis por computadora, permitiendo tratamientos más rápidos y menos invasivos.</p>
          </div>
          <div className="specialty-item">
            <CheckCircle className="specialty-icon" size={32} />
            <h4>Diseño de Sonrisa</h4>
            <p>Análisis facial y dental para lograr una sonrisa simétrica, blanca y armónica utilizando materiales estéticos de primer nivel.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Specialties;
