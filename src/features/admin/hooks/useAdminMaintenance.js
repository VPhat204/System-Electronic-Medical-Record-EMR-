import { useState } from 'react';

export default function useAdminMaintenance() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [showHealthModal, setShowHealthModal] = useState(false);
  const [healthScanDone, setHealthScanDone] = useState(false);

  const runHealthCheck = () => {
    setShowHealthModal(true);
    setHealthScanDone(false);
    setTimeout(() => setHealthScanDone(true), 2500);
  };

  return {
    maintenanceMode,
    setMaintenanceMode,
    showHealthModal,
    setShowHealthModal,
    healthScanDone,
    runHealthCheck
  };
}
