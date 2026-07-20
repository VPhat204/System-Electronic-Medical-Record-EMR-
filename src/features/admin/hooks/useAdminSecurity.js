import { useState, useEffect } from 'react';

export default function useAdminSecurity() {
  const [pwMinLen, setPwMinLen] = useState(12);
  const [pwCaps, setPwCaps] = useState(true);
  const [pwSpecial, setPwSpecial] = useState(true);
  const [pwNum, setPwNum] = useState(true);
  const [pwNoUser, setPwNoUser] = useState(false);
  const [pwExpiry, setPwExpiry] = useState('90');
  const [ipList, setIpList] = useState([
    { id: 1, ip: '192.168.1.*', label: 'MẠNG NỘI BỘ' },
    { id: 2, ip: '10.0.4.22', label: 'SERVER TRUNG TÂM' },
    { id: 3, ip: '203.113.10.5', label: 'VPN BÁC SĨ' }
  ]);
  const [showAddIp, setShowAddIp] = useState(false);
  const [newIpVal, setNewIpVal] = useState('');
  const [newIpLabel, setNewIpLabel] = useState('');
  const [threatPulse, setThreatPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setThreatPulse(p => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  return {
    pwMinLen,
    setPwMinLen,
    pwCaps,
    setPwCaps,
    pwSpecial,
    setPwSpecial,
    pwNum,
    setPwNum,
    pwNoUser,
    setPwNoUser,
    pwExpiry,
    setPwExpiry,
    ipList,
    setIpList,
    showAddIp,
    setShowAddIp,
    newIpVal,
    setNewIpVal,
    newIpLabel,
    setNewIpLabel,
    threatPulse
  };
}
