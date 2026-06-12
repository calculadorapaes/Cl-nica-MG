import React, { useState, useEffect } from 'react';
import { bookingService } from '../services/bookingService';
import { Calendar as CalendarIcon, Clock, CheckCircle, XCircle, Trash2, LogIn, FilterX, MessageCircle, PhoneCall, Undo2, LogOut } from 'lucide-react';
import '../styles/Corporate.css';
import '../styles/Admin.css';
import '../styles/AdminModal.css';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [allBookings, setAllBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState(null);
  
  // Calendar State
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());
  const [selectedFilterDate, setSelectedFilterDate] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      loadBookings();
    }

    const handleStorageChange = (e) => {
      // The 'storage' event fires when localStorage changes in another tab
      if (e.key === 'clinica_mg_bookings' && isAuthenticated) {
        loadBookings();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isAuthenticated]);

  const loadBookings = () => {
    const data = bookingService.getAllBookings().reverse();
    setAllBookings(data);
    applyFilter(data, selectedFilterDate);
  };

  const applyFilter = (data, dateFilter) => {
    if (!dateFilter) {
      setFilteredBookings(data);
    } else {
      const filterStr = dateFilter.toDateString();
      setFilteredBookings(data.filter(b => new Date(b.date).toDateString() === filterStr));
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'demo2026') {
      setIsAuthenticated(true);
    } else {
      alert('Contraseña incorrecta. (Pista: demo2026)');
    }
  };

  const handleStatusChange = (id, status) => {
    bookingService.updateBookingStatus(id, status);
    loadBookings();
  };

  const handleDeleteClick = (id) => {
    setDeleteConfirmationId(id);
  };

  const executeDelete = () => {
    if (deleteConfirmationId) {
      bookingService.deleteBooking(deleteConfirmationId);
      loadBookings();
      setDeleteConfirmationId(null);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmationId(null);
  };

  // --- Admin Calendar Logic ---
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => setCurrentMonthDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonthDate(new Date(year, month + 1, 1));

  const handleDayClick = (date) => {
    if (selectedFilterDate && selectedFilterDate.toDateString() === date.toDateString()) {
      // Toggle off
      setSelectedFilterDate(null);
      applyFilter(allBookings, null);
    } else {
      // Select date
      setSelectedFilterDate(date);
      applyFilter(allBookings, date);
    }
  };

  const clearFilter = () => {
    setSelectedFilterDate(null);
    applyFilter(allBookings, null);
  };

  // Check which days have active bookings to show an indicator
  const getDatesWithBookings = () => {
    const activeBookings = allBookings.filter(b => b.status === 'Pendiente' || b.status === 'Confirmada' || b.status === 'Atendida');
    return activeBookings.map(b => new Date(b.date).toDateString());
  };
  const datesWithBookingsStr = getDatesWithBookings();


  if (!isAuthenticated) {
    return (
      <div className="admin-login-container">
        <div className="admin-login-box">
          <div className="admin-login-avatar">
            <img src="/images/doctor-admin.jpg" alt="Dr. MG" />
          </div>
          <h2>Acceso Médico</h2>
          <p>Bienvenido Dr. Ingresa tu contraseña para acceder al panel de gestión.</p>
          <form onSubmit={handleLogin} className="admin-login-form">
            <input 
              type="password" 
              placeholder="Contraseña de acceso" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn-primary">Ingresar</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      {/* Custom Confirmation Modal */}
      {deleteConfirmationId && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content">
            <div className="modal-icon-wrapper">
              <Trash2 size={32} />
            </div>
            <h3>Eliminar Registro</h3>
            <p>¿Estás seguro que deseas eliminar esta cita permanentemente? Esta acción no se puede deshacer.</p>
            <div className="admin-modal-actions">
              <button className="btn-secondary" onClick={cancelDelete}>Cancelar</button>
              <button className="btn-danger" onClick={executeDelete}>Sí, Eliminar</button>
            </div>
          </div>
        </div>
      )}

      <header className="admin-header">
        <div>
          <h2>Panel de Administración Médico</h2>
          <p>Gestión de Citas y Reservas</p>
        </div>
        <button onClick={() => setIsAuthenticated(false)} className="btn-logout">
          <LogOut size={18} /> Cerrar Sesión
        </button>
      </header>

      <div className="admin-content">
        
        {/* --- Left Column: Calendar & Stats --- */}
        <div className="admin-sidebar">
          <div className="admin-calendar-widget" style={{ marginBottom: 0 }}>
            <div className="admin-calendar-header">
              <h3>Calendario de Citas</h3>
              <div className="month-nav-admin">
                <button onClick={prevMonth}>&lt;</button>
                <span>{currentMonthDate.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}</span>
                <button onClick={nextMonth}>&gt;</button>
              </div>
            </div>
            
            <div className="admin-calendar-grid">
              {Array.from({ length: firstDay }).map((_, idx) => (
                <div key={`empty-${idx}`} className="admin-cal-day empty"></div>
              ))}
              
              {Array.from({ length: daysInMonth }).map((_, idx) => {
                const dayNum = idx + 1;
                const dateOfCell = new Date(year, month, dayNum);
                const dateStr = dateOfCell.toDateString();
                
                const isSelected = selectedFilterDate?.toDateString() === dateStr;
                const hasBookings = datesWithBookingsStr.includes(dateStr);
                
                return (
                  <div 
                    key={dayNum} 
                    className={`admin-cal-day ${isSelected ? 'selected' : ''} ${hasBookings ? 'has-booking' : ''}`}
                    onClick={() => handleDayClick(dateOfCell)}
                  >
                    <span className="day-number">{dayNum}</span>
                    {hasBookings && <div className="booking-indicator"></div>}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="admin-stats">
            <div className="stat-card">
              <h3>{allBookings.length}</h3>
              <p>Total Histórico</p>
            </div>
            <div className="stat-card">
              <h3>{allBookings.filter(b => b.status === 'Pendiente').length}</h3>
              <p>Pendientes por Confirmar</p>
            </div>
          </div>
        </div>

        {/* --- Right Column: Main Agenda View --- */}
        <div className="admin-main-view">
          <div className="admin-table-container" style={{ marginTop: 0 }}>
            <div className="table-header-controls">
              <h3>{selectedFilterDate ? `Agenda diaria: ${selectedFilterDate.toLocaleDateString()}` : 'Listado General de Pacientes'}</h3>
              {selectedFilterDate && (
                <button onClick={clearFilter} className="btn-clear-filter">
                  <FilterX size={16} /> Ver Todo
                </button>
              )}
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Horario</th>
                  <th>Paciente y Contacto</th>
                  <th>Estado</th>
                  <th>Acciones Rápidas</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="empty-state">No hay citas para mostrar en esta fecha.</td>
                  </tr>
                ) : (
                  filteredBookings.map(booking => {
                    const dateObj = new Date(booking.date);
                    // Format phone for wa.me link by stripping spaces/pluses
                    const cleanPhone = booking.phone.replace(/[^0-9]/g, '');
                    
                    return (
                      <tr key={booking.id}>
                        <td>
                          <div className="cell-date">
                            <span>{dateObj.toLocaleDateString()}</span>
                            <span className="patient-time-big">{booking.time}</span>
                          </div>
                        </td>
                        <td>
                          <strong className="patient-name-big">{booking.name}</strong>
                          <div className="cell-contact" style={{ marginTop: '8px' }}>
                            <span>{booking.email}</span>
                            <span>{booking.phone}</span>
                            <a 
                              href={`https://wa.me/${cleanPhone}?text=Hola%20${encodeURIComponent(booking.name)},%20te%20escribimos%20de%20Clínica%20MG%20para%20confirmar%20tu%20cita%20del%20día%20${dateObj.toLocaleDateString()}%20a%20las%20${booking.time}.`}
                              target="_blank" 
                              rel="noreferrer"
                              className="whatsapp-link"
                            >
                              <MessageCircle size={14} /> Contactar por WhatsApp
                            </a>
                          </div>
                        </td>
                        <td>
                          <span className={`status-badge status-${booking.status.toLowerCase()}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              className="btn-action-text confirm" 
                              onClick={() => handleStatusChange(booking.id, 'Confirmada')}
                              disabled={booking.status === 'Confirmada'}
                              style={{ opacity: booking.status === 'Confirmada' ? 0.4 : 1 }}
                            >
                              <PhoneCall size={16} /> {booking.status === 'Confirmada' ? 'Confirmada' : 'Confirmar Cita'}
                            </button>
                            
                            <button 
                              className="btn-action-text check" 
                              onClick={() => handleStatusChange(booking.id, 'Atendida')}
                              disabled={booking.status === 'Atendida'}
                              style={{ opacity: booking.status === 'Atendida' ? 0.4 : 1 }}
                            >
                              <CheckCircle size={16} /> {booking.status === 'Atendida' ? 'Asistió' : 'Marcar Asistió'}
                            </button>

                            <button 
                              className="btn-action-text cancel" 
                              onClick={() => handleStatusChange(booking.id, 'Cancelada')}
                              disabled={booking.status === 'Cancelada'}
                              style={{ opacity: booking.status === 'Cancelada' ? 0.4 : 1 }}
                            >
                              <XCircle size={16} /> {booking.status === 'Cancelada' ? 'Cancelada' : 'Cancelar Cita'}
                            </button>

                            {booking.status !== 'Pendiente' && (
                              <button 
                                className="btn-action-text reset" 
                                onClick={() => handleStatusChange(booking.id, 'Pendiente')}
                              >
                                <Undo2 size={16} /> Revertir a Pendiente
                              </button>
                            )}

                            <button 
                              className="btn-action-text delete" 
                              onClick={() => handleDeleteClick(booking.id)}
                            >
                              <Trash2 size={16} /> Eliminar Registro
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
