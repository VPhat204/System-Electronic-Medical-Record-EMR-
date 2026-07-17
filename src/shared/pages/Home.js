import React, { useState, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import Hero from '../../components/Hero';
import Stats from '../../components/Stats';
import Services from '../../features/users/pages/serviceUsers/Services';
import Specialists from '../../features/users/pages/doctorUsers/Specialists';
import Insurance from '../../components/Insurance';
import ResourceCenter from '../../features/users/pages/blogUsers/ResourceCenter';

export default function Home() {
  const { openBooking } = useOutletContext();
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const specialistsRef = useRef(null);

  const handleFindDoctor = () => {
    if (specialistsRef.current) {
      specialistsRef.current.focusSearch();
    }
  };

  const handleSelectDepartment = (dept) => {
    setSelectedDepartment(dept);
  };

  return (
    <main>
      <Hero
        onOpenBooking={() => openBooking('', '')}
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
        onBookConsultation={openBooking}
      />
      <Insurance />
      <ResourceCenter />
    </main>
  );
}
