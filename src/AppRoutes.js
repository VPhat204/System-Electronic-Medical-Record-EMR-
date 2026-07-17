import React, { useContext } from 'react';
import { Routes, Route, Navigate, useNavigate, useOutletContext } from 'react-router-dom';

import { AuthContext } from './features/auth/context/AuthContext';
import { ThemeContext } from './shared/context/ThemeContext';
import { LanguageContext } from './shared/context/LanguageContext';

import Login from './features/auth/components/Login';
import Register from './features/auth/components/Register';
import ForgotPassword from './features/auth/components/ForgotPassword';
import DoctorsPage from './features/users/pages/doctorUsers/DoctorsPage';
import ServicesPage from './features/users/pages/serviceUsers/ServicesPage';
import InsurancePage from './features/users/pages/insureUsers/InsurancePage';
import BlogsPage from './features/users/pages/blogUsers/BlogsPage';
import DoctorDashboard from './features/doctor/components/DoctorDashboard';
import ReceptionistDashboard from './features/receptionist/components/ReceptionistDashboard';
import AdminDashboard from './features/admin/components/AdminDashboard';
import PatientDashboard from './features/patient/components/PatientDashboard';
import PharmacistDashboard from './features/pharmacist/components/PharmacistDashboard';
import NurseDashboard from './features/nurse/components/NurseDashboard';
import NotFound from './features/errors/components/NotFound';

import MainLayout from './shared/layouts/MainLayout';
import Home from './shared/pages/Home';
import ProtectedRoute from './shared/routes/ProtectedRoute';
import PublicOnlyRoute from './shared/routes/PublicOnlyRoute';

// Wrappers to map Outlet Context to page props without editing page codebases
const ServicesPageWrapper = ({ onNavigate }) => {
  const { openBooking } = useOutletContext();
  return <ServicesPage onNavigate={onNavigate} onBookConsultation={openBooking} />;
};

const DoctorsPageWrapper = ({ onNavigate }) => {
  const { openBooking } = useOutletContext();
  return <DoctorsPage onNavigate={onNavigate} onBookConsultation={openBooking} />;
};

export default function AppRoutes() {
  const { loading, logout } = useContext(AuthContext);
  const { theme, setTheme, toggleTheme } = useContext(ThemeContext);
  const { lang, setLang } = useContext(LanguageContext);
  const navigate = useNavigate();

  const handleNavigate = (page, shouldLogout = false) => {
    if (shouldLogout) {
      logout();
    }
    if (page === 'home') {
      navigate('/');
    } else {
      navigate(`/${page}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-slate-900 text-primary">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <Routes>
      {/* Public pages wrapped in MainLayout */}
      <Route element={<MainLayout theme={theme} toggleTheme={toggleTheme} />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPageWrapper onNavigate={handleNavigate} />} />
        <Route path="/insurance" element={<InsurancePage onNavigate={handleNavigate} />} />
        <Route path="/blogs" element={<BlogsPage onNavigate={handleNavigate} />} />
        <Route path="/doctors" element={<DoctorsPageWrapper onNavigate={handleNavigate} />} />
      </Route>

      {/* Guest-only auth pages */}
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<Login onNavigate={handleNavigate} />} />
        <Route path="/register" element={<Register onNavigate={handleNavigate} />} />
        <Route path="/forgot-password" element={<ForgotPassword onNavigate={handleNavigate} />} />
      </Route>

      {/* Dashboard protected routes */}
      <Route element={<ProtectedRoute allowedRole="patient" />}>
        <Route path="/patient-dashboard" element={<PatientDashboard onNavigate={handleNavigate} theme={theme} setTheme={setTheme} lang={lang} setLang={setLang} />} />
      </Route>
      <Route element={<ProtectedRoute allowedRole="doctor" />}>
        <Route path="/doctor-dashboard" element={<DoctorDashboard onNavigate={handleNavigate} theme={theme} setTheme={setTheme} lang={lang} setLang={setLang} />} />
      </Route>
      <Route element={<ProtectedRoute allowedRole="receptionist" />}>
        <Route path="/receptionist-dashboard" element={<ReceptionistDashboard onNavigate={handleNavigate} theme={theme} setTheme={setTheme} lang={lang} setLang={setLang} />} />
      </Route>
      <Route element={<ProtectedRoute allowedRole="admin" />}>
        <Route path="/admin-dashboard" element={<AdminDashboard onNavigate={handleNavigate} theme={theme} setTheme={setTheme} lang={lang} setLang={setLang} />} />
      </Route>
      <Route element={<ProtectedRoute allowedRole="pharmacist" />}>
        <Route path="/pharmacist-dashboard" element={<PharmacistDashboard onNavigate={handleNavigate} theme={theme} setTheme={setTheme} lang={lang} setLang={setLang} />} />
      </Route>
      <Route element={<ProtectedRoute allowedRole="nurse" />}>
        <Route path="/nurse-dashboard" element={<NurseDashboard onNavigate={handleNavigate} theme={theme} setTheme={setTheme} lang={lang} setLang={setLang} />} />
      </Route>

      {/* Fallback route */}
      <Route path="/404" element={<NotFound onNavigateHome={() => navigate('/')} />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
