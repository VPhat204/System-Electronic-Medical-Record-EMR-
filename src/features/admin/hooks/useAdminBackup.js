import { useState, useEffect } from 'react';
import { initialBackups } from '../components/mockData';

export default function useAdminBackup() {
  const [backupHistory, setBackupHistory] = useState(initialBackups);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);

  const handleStartBackup = () => {
    if (isBackingUp) return;
    setIsBackingUp(true);
    setBackupProgress(0);
  };

  useEffect(() => {
    let interval = null;
    if (isBackingUp) {
      interval = setInterval(() => {
        setBackupProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsBackingUp(false);
            const now = new Date();
            const timeString = now.toISOString().slice(0, 10) + ' ' + now.toTimeString().slice(0, 8);
            const newBackup = {
              id: Date.now(),
              name: `medcore_prod_${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}.tar.gz`,
              time: timeString,
              size: '1.21 TB',
              status: 'Success'
            };
            setBackupHistory(prevHistory => [newBackup, ...prevHistory]);
            return 100;
          }
          return prev + 20;
        });
      }, 500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isBackingUp]);

  return {
    backupHistory,
    setBackupHistory,
    isBackingUp,
    backupProgress,
    handleStartBackup
  };
}
