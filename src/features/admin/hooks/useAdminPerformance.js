import { useState } from 'react';
import { initialDbInstances } from '../components/mockData';

export default function useAdminPerformance() {
  const [dbInstances, setDbInstances] = useState(initialDbInstances);
  const [isRefreshingPerf, setIsRefreshingPerf] = useState(false);
  const [globalUptime, setGlobalUptime] = useState(99.98);

  const handleRefreshPerformance = () => {
    if (isRefreshingPerf) return;
    setIsRefreshingPerf(true);
    setTimeout(() => {
      setIsRefreshingPerf(false);
      setGlobalUptime(99.98 + (Math.random() * 0.01 - 0.005));
      setDbInstances(prev => prev.map(db => ({
        ...db,
        ping: `${Math.floor(Math.random() * 10 + 5)}ms`,
        load: Math.floor(Math.random() * 30 + (db.isOverload ? 65 : 10))
      })));
    }, 1200);
  };

  return {
    dbInstances,
    setDbInstances,
    isRefreshingPerf,
    globalUptime,
    handleRefreshPerformance
  };
}
