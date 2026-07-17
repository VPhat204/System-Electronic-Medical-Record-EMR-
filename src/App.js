import React from 'react';
import { ThemeProvider } from './shared/context/ThemeContext';
import { LanguageProvider } from './shared/context/LanguageContext';
import AppRoutes from './AppRoutes';

import './App.css';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppRoutes />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
