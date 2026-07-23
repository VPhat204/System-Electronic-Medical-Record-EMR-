import React, { useState, useEffect, useContext } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BookingModal from '../../features/appointments/components/BookingModal';
import { AuthContext } from '../../features/auth/context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import { ToastContext } from '../context/ToastContext';

export default function MainLayout({ theme, toggleTheme }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useContext(AuthContext);
  const { lang } = useContext(LanguageContext);
  const { warning: toastWarning } = useContext(ToastContext);

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
    if (!user) {
      toastWarning(lang === 'vi' ? 'Vui lòng đăng nhập trước khi thực hiện thao tác này!' : 'Please log in before performing this action!');
      return;
    }
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
