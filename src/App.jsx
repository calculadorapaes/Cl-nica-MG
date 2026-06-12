import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Specialties from './pages/Specialties';
import Agreements from './pages/Agreements';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="nosotros" element={<About />} />
          <Route path="especialidades" element={<Specialties />} />
          <Route path="convenios" element={<Agreements />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
