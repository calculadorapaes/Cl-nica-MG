import React, { useState } from 'react';
import { bookingService } from '../services/bookingService';
import './BookingSystem.css';
import { Calendar as CalendarIcon, Clock, User, Mail, Phone, ShieldCheck, RefreshCcw } from 'lucide-react';

const BookingSystem = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', consent: false });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [existingBookings, setExistingBookings] = useState([]);
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());

  // Load bookings to check availability
  const loadBookings = () => {
    setExistingBookings(bookingService.getAllBookings());
  };

  React.useEffect(() => {
    loadBookings();

    const handleStorageChange = (e) => {
      if (e.key === 'clinica_mg_bookings') {
        loadBookings();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [isSubmitted]);

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay(); // 0 is Sunday

  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Limit until the end of 2028
  const maxDate = new Date(2028, 11, 31);

  const prevMonth = () => {
    setCurrentMonthDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const nextMonth = () => {
    setCurrentMonthDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const availableTimes = ['09:00', '10:00', '11:30', '15:00', '16:30'];

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  // Get booked times for the selected date (excluding cancelled ones)
  const getBookedTimesForSelectedDate = () => {
    if (!selectedDate) return [];
    const dateStr = selectedDate.toDateString();
    return existingBookings
      .filter(b => new Date(b.date).toDateString() === dateStr && b.status !== 'Cancelada')
      .map(b => b.time);
  };

  const bookedTimes = getBookedTimesForSelectedDate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.consent) {
      alert("Debes aceptar la política de privacidad para agendar.");
      return;
    }
    // Real save to our LocalStorage mock database
    bookingService.addBooking({ date: selectedDate, time: selectedTime, ...formData });

    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="booking-success">
        <div className="success-circle">
          <ShieldCheck size={72} className="success-icon" />
        </div>
        <h3>¡Tu cita ha sido confirmada con éxito!</h3>
        <p>Hemos registrado tu reserva. Pronto nos pondremos en contacto contigo para confirmar los detalles.</p>
        <button className="btn-book-again" onClick={() => setIsSubmitted(false)}>
          <RefreshCcw size={18} /> Agendar otra cita
        </button>
      </div>
    );
  }

  return (
    <div className="booking-container">
      <div className="calendar-section">
        <div className="calendar-header-controls">
          <h3 className="section-title"><CalendarIcon className="title-icon" /> Selecciona tu día</h3>
          <div className="month-navigation">
            <button type="button" onClick={prevMonth} disabled={currentMonthDate <= new Date(today.getFullYear(), today.getMonth(), 1)}>&lt;</button>
            <span>{currentMonthDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}</span>
            <button type="button" onClick={nextMonth} disabled={currentMonthDate >= new Date(maxDate.getFullYear(), maxDate.getMonth(), 1)}>&gt;</button>
          </div>
        </div>

        <div className="full-calendar">
          <div className="calendar-weekdays">
            <span>Dom</span><span>Lun</span><span>Mar</span><span>Mié</span><span>Jue</span><span>Vie</span><span>Sáb</span>
          </div>
          <div className="calendar-days-grid">
            {/* Empty padding for the start of the month */}
            {Array.from({ length: firstDay }).map((_, idx) => (
              <div key={`empty-${idx}`} className="calendar-day empty"></div>
            ))}
            
            {/* Actual days of the month */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const dayNum = idx + 1;
              const dateOfCell = new Date(year, month, dayNum);
              const isPast = dateOfCell < today;
              const isWeekend = dateOfCell.getDay() === 0; // Sundays disabled usually, let's just disable past
              const isSelected = selectedDate?.toDateString() === dateOfCell.toDateString();
              
              return (
                <button
                  key={dayNum}
                  type="button"
                  className={`calendar-day ${isSelected ? 'selected' : ''}`}
                  disabled={isPast || isWeekend}
                  onClick={() => handleDateSelect(dateOfCell)}
                >
                  {dayNum}
                </button>
              );
            })}
          </div>
        </div>

        {selectedDate && (
          <div className="times-section">
            <h3 className="section-title"><Clock className="title-icon" /> Horas disponibles</h3>
            <div className="times-grid">
              {availableTimes.map((time, idx) => {
                const isBooked = bookedTimes.includes(time);
                return (
                  <button
                    key={idx}
                    className={`time-card ${selectedTime === time ? 'selected' : ''}`}
                    onClick={() => handleTimeSelect(time)}
                    disabled={isBooked}
                    title={isBooked ? "Hora ya reservada" : "Seleccionar esta hora"}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="form-section">
        <h3 className="section-title"><User className="title-icon" /> Tus datos</h3>
        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre Completo</label>
            <div className="input-wrapper">
              <User className="input-icon" size={18} />
              <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="Juan Pérez" />
            </div>
          </div>
          
          <div className="form-group">
            <label>Correo Electrónico</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="juan@ejemplo.com" />
            </div>
          </div>

          <div className="form-group">
            <label>Teléfono</label>
            <div className="input-wrapper">
              <Phone className="input-icon" size={18} />
              <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="+56 9 1234 5678" />
            </div>
          </div>

          <div className="form-group consent-group">
            <label className="checkbox-label">
              <input type="checkbox" name="consent" required checked={formData.consent} onChange={handleInputChange} />
              <span className="checkmark"></span>
              Acepto la política de privacidad y el tratamiento de mis datos personales según normativas vigentes.
            </label>
          </div>

          <button 
            type="submit" 
            className="btn-submit" 
            disabled={!selectedDate || !selectedTime || !formData.consent || !formData.name || !formData.email}
          >
            Confirmar Cita
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingSystem;
