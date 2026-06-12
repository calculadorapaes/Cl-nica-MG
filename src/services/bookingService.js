const STORAGE_KEY = 'clinica_mg_bookings';

// Helper to generate a unique ID
const generateId = () => Math.random().toString(36).substr(2, 9);

export const bookingService = {
  // Get all bookings
  getAllBookings: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    let parsedData = data ? JSON.parse(data) : [];

    // Inject realistic fake data for demo purposes if empty
    if (parsedData.length === 0) {
      const today = new Date();
      
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 2);

      parsedData = [
        { id: generateId(), name: 'Camila Valenzuela', email: 'camila.v@gmail.com', phone: '+56987654321', date: today.toISOString(), time: '10:00', status: 'Atendida', createdAt: new Date().toISOString() },
        { id: generateId(), name: 'Andrés Soto', email: 'asoto@hotmail.com', phone: '+56912345678', date: today.toISOString(), time: '15:30', status: 'Confirmada', createdAt: new Date().toISOString() },
        { id: generateId(), name: 'Valeria Muñoz', email: 'vale.munoz@yahoo.com', phone: '+56955554444', date: tomorrow.toISOString(), time: '09:00', status: 'Pendiente', createdAt: new Date().toISOString() },
        { id: generateId(), name: 'Roberto Castillo', email: 'roberto.c@gmail.com', phone: '+56977778888', date: tomorrow.toISOString(), time: '11:00', status: 'Pendiente', createdAt: new Date().toISOString() },
        { id: generateId(), name: 'Daniela Flores', email: 'dflores@gmail.com', phone: '+56999991111', date: nextWeek.toISOString(), time: '16:00', status: 'Pendiente', createdAt: new Date().toISOString() }
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedData));
    }

    return parsedData;
  },

  // Add a new booking
  addBooking: (bookingData) => {
    const bookings = bookingService.getAllBookings();
    const newBooking = {
      id: generateId(),
      ...bookingData,
      status: 'Pendiente', // Pendiente, Confirmada, Atendida, Cancelada
      createdAt: new Date().toISOString()
    };
    bookings.push(newBooking);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    return newBooking;
  },

  // Update booking status
  updateBookingStatus: (id, newStatus) => {
    const bookings = bookingService.getAllBookings();
    const updatedBookings = bookings.map(b => 
      b.id === id ? { ...b, status: newStatus } : b
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBookings));
  },
  
  // Delete booking (optional for admin)
  deleteBooking: (id) => {
    const bookings = bookingService.getAllBookings();
    const filtered = bookings.filter(b => b.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
};
