import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Services from './features/users/pages/serviceUsers/Services';
import Specialists from './features/users/pages/doctorUsers/Specialists';
import Insurance from './components/Insurance';
import ResourceCenter from './features/users/pages/blogUsers/ResourceCenter';
import Footer from './components/Footer';
import BookingModal from './features/appointments/components/BookingModal';
import Login from './features/auth/components/Login';
import Register from './features/auth/components/Register';
import DoctorsPage from './features/users/pages/doctorUsers/DoctorsPage';
import ServicesPage from './features/users/pages/serviceUsers/ServicesPage';
import InsurancePage from './features/users/pages/insureUsers/InsurancePage';
import BlogsPage from './features/users/pages/blogUsers/BlogsPage';
import DoctorDashboard from './features/doctor/components/DoctorDashboard';
import ReceptionistDashboard from './features/receptionist/components/ReceptionistDashboard';
import AdminDashboard from './features/admin/components/AdminDashboard';
import PatientDashboard from './features/patient/components/PatientDashboard';
import PharmacistDashboard from './features/pharmacist/components/PharmacistDashboard';
import NotFound from './features/errors/components/NotFound';
import './App.css';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const [bookingOpen, setBookingOpen] = useState(false);
  const [initialDoctor, setInitialDoctor] = useState('');
  const [initialDepartment, setInitialDepartment] = useState('');

  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [emergencyMenuOpen, setEmergencyMenuOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash;
    const path = window.location.pathname;
    if (hash === '#404' || path.includes('404')) return '404';
    if (hash === '#login') return 'login';
    if (hash === '#register') return 'register';
    if (hash === '#doctors') return 'doctors';
    if (hash === '#services') return 'services';
    if (hash === '#insurance') return 'insurance';
    if (hash === '#blogs') return 'blogs';
    if (hash === '#doctor-dashboard') return 'doctor-dashboard';
    if (hash === '#receptionist-dashboard') return 'receptionist-dashboard';
    if (hash === '#admin-dashboard') return 'admin-dashboard';
    if (hash === '#patient-dashboard') return 'patient-dashboard';
    return 'home';
  });

  const specialistsRef = useRef(null);

  // Sync theme with document class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Sync routing popstate and hashchange listeners
  useEffect(() => {
    const handleRouting = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      if (hash === '#404' || path.includes('404')) {
        setCurrentPage('404');
      } else if (hash === '#login') {
        setCurrentPage('login');
      } else if (hash === '#register') {
        setCurrentPage('register');
      } else if (hash === '#doctors') {
        setCurrentPage('doctors');
      } else if (hash === '#services') {
        setCurrentPage('services');
      } else if (hash === '#insurance') {
        setCurrentPage('insurance');
      } else if (hash === '#blogs') {
        setCurrentPage('blogs');
      } else if (hash === '#doctor-dashboard') {
        setCurrentPage('doctor-dashboard');
      } else if (hash === '#receptionist-dashboard') {
        setCurrentPage('receptionist-dashboard');
      } else if (hash === '#admin-dashboard') {
        setCurrentPage('admin-dashboard');
      } else if (hash === '#patient-dashboard') {
        setCurrentPage('patient-dashboard');
      } else if (hash === '#pharmacist-dashboard') {
        setCurrentPage('pharmacist-dashboard');
      } else {
        setCurrentPage('home');
      }
    };
    window.addEventListener('popstate', handleRouting);
    window.addEventListener('hashchange', handleRouting);
    return () => {
      window.removeEventListener('popstate', handleRouting);
      window.removeEventListener('hashchange', handleRouting);
    };
  }, []);

  // Scroll to section when returning to landing page from other views
  useEffect(() => {
    if (currentPage === 'home') {
      const hash = window.location.hash;
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
    }
  }, [currentPage]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleOpenBooking = (doctor = '', department = '') => {
    setInitialDoctor(doctor);
    setInitialDepartment(department);
    setBookingOpen(true);
  };

  const handleNavigate = (page) => {
    if (page === 'home') {
      window.location.hash = '';
      setCurrentPage('home');
    } else {
      window.location.hash = page;
      setCurrentPage(page);
    }
  };

  const handleFindDoctor = () => {
    if (specialistsRef.current) {
      specialistsRef.current.focusSearch();
    }
  };

  const handleSelectDepartment = (dept) => {
    setSelectedDepartment(dept);
  };

  // Render Auth Pages if routed
  if (currentPage === 'login') {
    return <Login onNavigate={handleNavigate} />;
  }

  if (currentPage === 'register') {
    return <Register onNavigate={handleNavigate} />;
  }

  if (currentPage === 'doctor-dashboard') {
    return <DoctorDashboard onNavigate={handleNavigate} theme={theme} setTheme={setTheme} />;
  }

  if (currentPage === 'receptionist-dashboard') {
    return <ReceptionistDashboard onNavigate={handleNavigate} theme={theme} setTheme={setTheme} />;
  }

  if (currentPage === 'admin-dashboard') {
    return <AdminDashboard onNavigate={handleNavigate} theme={theme} setTheme={setTheme} />;
  }

  if (currentPage === 'patient-dashboard') {
    return <PatientDashboard onNavigate={handleNavigate} theme={theme} setTheme={setTheme} />;
  }

  if (currentPage === 'pharmacist-dashboard') {
    return <PharmacistDashboard onNavigate={handleNavigate} theme={theme} setTheme={setTheme} />;
  }

  // Render 404 Page if routed
  if (currentPage === '404') {
    return <NotFound onNavigateHome={() => handleNavigate('home')} />;
  }

  return (
    <div className="min-h-screen bg-background dark:bg-slate-900 text-on-background dark:text-slate-100 transition-colors duration-200">
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenAuth={handleNavigate}
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />

      {currentPage === 'home' ? (
        <main>
          <Hero
            onOpenBooking={() => handleOpenBooking('', '')}
            onFindDoctor={handleFindDoctor}
          />
          <Stats />
          <Services
            onSelectDepartment={handleSelectDepartment}
          />
          <Specialists
            ref={specialistsRef}
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
            onBookConsultation={handleOpenBooking}
          />
          <Insurance />
          <ResourceCenter />
        </main>
      ) : currentPage === 'services' ? (
        <ServicesPage onNavigate={handleNavigate} onBookConsultation={handleOpenBooking} />
      ) : currentPage === 'insurance' ? (
        <InsurancePage onNavigate={handleNavigate} />
      ) : currentPage === 'blogs' ? (
        <BlogsPage onNavigate={handleNavigate} />
      ) : (
        <DoctorsPage onNavigate={handleNavigate} onBookConsultation={handleOpenBooking} />
      )}

      <Footer />

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialDoctor={initialDoctor}
        initialDepartment={initialDepartment}
      />

      {/* FAB for Emergency */}
      <div className="fixed bottom-xl right-xl z-50 flex flex-col items-end gap-sm">
        {emergencyMenuOpen && (
          <div className="flex flex-col items-end gap-sm animate-fade-in">
            <a
              href="tel:+15550008888"
              className="flex items-center gap-sm rounded-full bg-white dark:bg-slate-800 text-primary dark:text-primary-fixed-dim px-md py-sm shadow-lg border border-outline-variant dark:border-slate-700"
            >
              <span className="material-symbols-outlined">call</span>
              <span className="font-label-md text-label-md">Emergency Call</span>
            </a>
            <a
              href="https://wa.me/15550008888"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-sm rounded-full bg-white dark:bg-slate-800 text-primary dark:text-primary-fixed-dim px-md py-sm shadow-lg border border-outline-variant dark:border-slate-700"
            >
              <span className="material-symbols-outlined">chat</span>
              <span className="font-label-md text-label-md">Trao đổi trực tuyến</span>
            </a>
          </div>
        )}

        <button
          onClick={() => setEmergencyMenuOpen((prev) => !prev)}
          className="w-16 h-16 bg-error rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform group animate-pulse"
          title="Emergency Support"
        >
          <span className="material-symbols-outlined text-[32px]">emergency</span>
        </button>
      </div>
    </div>
  );
}

export default App;



