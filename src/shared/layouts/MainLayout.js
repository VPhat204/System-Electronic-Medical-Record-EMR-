import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BookingModal from '../../features/appointments/components/BookingModal';

export default function MainLayout({ theme, toggleTheme }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [bookingOpen, setBookingOpen] = useState(false);
  const [initialDoctor, setInitialDoctor] = useState('');
  const [initialDepartment, setInitialDepartment] = useState('');

  const getPageFromPath = (path) => {
    if (path === '/') return 'home';
    return path.substring(1);
  };

  const currentPage = getPageFromPath(location.pathname);

  const handleNavigate = (page, shouldLogout = false) => {
    if (page === 'home') {
      navigate('/');
    } else {
      navigate(`/${page}`);
    }
  };

  const handleOpenBooking = (doctor = '', department = '') => {
    setInitialDoctor(doctor);
    setInitialDepartment(department);
    setBookingOpen(true);
  };

  // Scroll to hash sections on navigation
  useEffect(() => {
    const hash = location.hash || window.location.hash;
    if (hash && hash !== '#') {
      const id = hash.replace('#', '');
      const targetId = id === 'blogs' ? 'resource-center' : id;
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen bg-background dark:bg-slate-900 text-on-background dark:text-slate-100 transition-colors duration-200">
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenAuth={handleNavigate}
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />

      <Outlet context={{ openBooking: handleOpenBooking }} />

      <Footer />

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialDoctor={initialDoctor}
        initialDepartment={initialDepartment}
      />
    </div>
  );
}
