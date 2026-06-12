import React from 'react';
import { Briefcase, CheckCircle } from 'lucide-react';

const Agreements = () => {
  return (
    <section className="agreements-section">
      <div className="section-header">
        <h2>Convenios y Facilidades</h2>
        <p>En Clínica MG facilitamos tu acceso a tratamientos de primer nivel.</p>
      </div>
      <div className="agreements-cards">
        <div className="agreement-card">
          <Briefcase size={32} className="agreement-icon" />
          <h4>Convenios Corporativos</h4>
          <p>Consulta por nuestros convenios vigentes con empresas e instituciones para beneficios exclusivos.</p>
        </div>
        <div className="agreement-card">
          <CheckCircle size={32} className="agreement-icon" />
          <h4>Múltiples Medios de Pago</h4>
          <p>Aceptamos todas las tarjetas de crédito y débito, transferencias y ofrecemos programas especiales de financiamiento.</p>
        </div>
      </div>
    </section>
  );
};

export default Agreements;
