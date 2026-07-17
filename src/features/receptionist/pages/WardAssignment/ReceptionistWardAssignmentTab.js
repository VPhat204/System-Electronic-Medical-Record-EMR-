import React, { useState } from 'react';

// ─── Initial Data ─────────────────────────────────────────────────────────────

const initialWards = [
  {
    id: 'W-4A',
    name: 'Khoa Nội Tim mạch',
    nameEn: 'Cardiology Ward',
    floor: 'Tầng 4',
    floorEn: 'Floor 4',
    totalBeds: 20,
    rooms: [
      { roomCode: '4A-01', type: 'double', beds: [
        { bed: '4A-01A', status: 'occupied', patient: 'Margaret Thatcher', admittedAt: '10/07/2026', diagnosis: 'Atrial Fibrillation' },
        { bed: '4A-01B', status: 'available', patient: null, admittedAt: null, diagnosis: null },
      ]},
      { roomCode: '4A-02', type: 'double', beds: [
        { bed: '4A-02A', status: 'occupied', patient: 'Arthur Morgan', admittedAt: '12/07/2026', diagnosis: 'Hypertension Stage II' },
        { bed: '4A-02B', status: 'cleaning', patient: null, admittedAt: null, diagnosis: null },
      ]},
      { roomCode: '4A-03', type: 'private', beds: [
        { bed: '4A-03', status: 'available', patient: null, admittedAt: null, diagnosis: null },
      ]},
      { roomCode: '4A-04', type: 'double', beds: [
        { bed: '4A-04A', status: 'occupied', patient: 'Nguyễn Thị Hoa', admittedAt: '14/07/2026', diagnosis: 'Chest Pain Eval' },
        { bed: '4A-04B', status: 'available', patient: null, admittedAt: null, diagnosis: null },
      ]},
    ],
  },
  {
    id: 'W-3N',
    name: 'Khoa Thần Kinh',
    nameEn: 'Neurology Ward',
    floor: 'Tầng 3',
    floorEn: 'Floor 3',
    totalBeds: 16,
    rooms: [
      { roomCode: '3N-01', type: 'double', beds: [
        { bed: '3N-01A', status: 'occupied', patient: 'Elena Rodriguez', admittedAt: '05/07/2026', diagnosis: 'TIA Evaluation' },
        { bed: '3N-01B', status: 'available', patient: null, admittedAt: null, diagnosis: null },
      ]},
      { roomCode: '3N-02', type: 'icu', beds: [
        { bed: '3N-ICU-01', status: 'occupied', patient: 'Trần Văn Dũng', admittedAt: '15/07/2026', diagnosis: 'Status Epilepticus' },
        { bed: '3N-ICU-02', status: 'available', patient: null, admittedAt: null, diagnosis: null },
      ]},
      { roomCode: '3N-03', type: 'private', beds: [
        { bed: '3N-03', status: 'reserved', patient: null, admittedAt: null, diagnosis: null },
      ]},
    ],
  },
  {
    id: 'W-5O',
    name: 'Khoa Ung bướu',
    nameEn: 'Oncology Ward',
    floor: 'Tầng 5',
    floorEn: 'Floor 5',
    totalBeds: 12,
    rooms: [
      { roomCode: '5O-01', type: 'double', beds: [
        { bed: '5O-01A', status: 'occupied', patient: 'James Wilson', admittedAt: '08/07/2026', diagnosis: 'Chemotherapy Cycle 3' },
        { bed: '5O-01B', status: 'available', patient: null, admittedAt: null, diagnosis: null },
      ]},
      { roomCode: '5O-02', type: 'private', beds: [
        { bed: '5O-02', status: 'cleaning', patient: null, admittedAt: null, diagnosis: null },
      ]},
    ],
  },
];

const pendingAdmissions = [
  { id: 'ADM-2026-0099', patient: 'Lê Thị Phương', patientId: 'BN-00301', age: 62, gender: 'F', diagnosis: 'Unstable Angina', priority: 'urgent', requestedBy: 'BS. Trần Văn Minh', requestedAt: '15/07/2026 14:20', ward: 'W-4A', assignedBed: null },
  { id: 'ADM-2026-0098', patient: 'Nguyễn Văn Tú', patientId: 'BN-00299', age: 45, gender: 'M', diagnosis: 'Post-Op Recovery (Appendectomy)', priority: 'normal', requestedBy: 'BS. Phạm Thị Lan', requestedAt: '15/07/2026 13:05', ward: null, assignedBed: null },
  { id: 'ADM-2026-0097', patient: 'Hoàng Thị Bảo', patientId: 'BN-00288', age: 33, gender: 'F', diagnosis: 'Severe Migraine — Monitoring', priority: 'normal', requestedBy: 'BS. Nguyễn Hữu Nghĩa', requestedAt: '15/07/2026 11:40', ward: 'W-3N', assignedBed: null },
];

const statusConfig = {
  available: { vi: 'Trống', en: 'Available', dot: 'bg-green-500', badge: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-300 dark:border-green-600' },
  occupied: { vi: 'Đang dùng', en: 'Occupied', dot: 'bg-slate-400', badge: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-600' },
  cleaning: { vi: 'Đang dọn', en: 'Cleaning', dot: 'bg-amber-400 animate-pulse', badge: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-600' },
  reserved: { vi: 'Đã đặt', en: 'Reserved', dot: 'bg-blue-400', badge: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-600' },
};

const roomTypeConfig = {
  double: { vi: 'Phòng đôi', en: 'Double Room', icon: 'groups', color: 'text-slate-500 dark:text-slate-400' },
  private: { vi: 'Phòng riêng', en: 'Private Room', icon: 'person', color: 'text-primary dark:text-primary-fixed-dim' },
  icu: { vi: 'ICU / Hồi sức', en: 'ICU', icon: 'emergency', color: 'text-error' },
};

export default function ReceptionistWardAssignmentTab({ lang, t }) {
  const [wards, setWards] = useState(initialWards);
  const [admissions, setAdmissions] = useState(pendingAdmissions);
  const [selectedWardId, setSelectedWardId] = useState('W-4A');
  const [assigningAdmId, setAssigningAdmId] = useState(null);
  const [pickedBed, setPickedBed] = useState(null);
  const [view, setView] = useState('split'); // 'split' | 'map' | 'list'
  const [searchBed, setSearchBed] = useState('');
  const [assignedFlash, setAssignedFlash] = useState(null);

  const selectedWard = wards.find(w => w.id === selectedWardId);
  const assigningAdm = admissions.find(a => a.id === assigningAdmId);

  const allBeds = wards.flatMap(w => w.rooms.flatMap(r => r.beds.map(b => ({ ...b, ward: w.id, wardName: lang === 'vi' ? w.name : w.nameEn, room: r.roomCode, type: r.type }))));
  const availableBeds = allBeds.filter(b => b.status === 'available');

  const countByStatus = (wardId, status) => {
    const ward = wards.find(w => w.id === wardId);
    if (!ward) return 0;
    return ward.rooms.flatMap(r => r.beds).filter(b => b.status === status).length;
  };

  const handleConfirmAssign = () => {
    if (!assigningAdmId || !pickedBed) return;
    const bed = allBeds.find(b => b.bed === pickedBed);
    // Update ward bed status
    setWards(prev => prev.map(w => ({
      ...w,
      rooms: w.rooms.map(r => ({
        ...r,
        beds: r.beds.map(b => b.bed === pickedBed
          ? { ...b, status: 'occupied', patient: assigningAdm.patient, admittedAt: new Date().toLocaleDateString('vi-VN'), diagnosis: assigningAdm.diagnosis }
          : b
        ),
      })),
    })));
    // Update admission record
    setAdmissions(prev => prev.map(a => a.id === assigningAdmId
      ? { ...a, assignedBed: pickedBed, ward: bed?.ward || a.ward }
      : a
    ));
    setAssignedFlash(assigningAdmId);
    setTimeout(() => setAssignedFlash(null), 3000);
    setAssigningAdmId(null);
    setPickedBed(null);
  };

  const filteredBeds = availableBeds.filter(b =>
    b.bed.toLowerCase().includes(searchBed.toLowerCase()) ||
    b.wardName.toLowerCase().includes(searchBed.toLowerCase()) ||
    b.room.toLowerCase().includes(searchBed.toLowerCase())
  );

  const pendingCount = admissions.filter(a => !a.assignedBed).length;
  const totalAvailable = availableBeds.length;
  const totalOccupied = allBeds.filter(b => b.status === 'occupied').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface dark:text-white flex items-center gap-2">
            {lang === 'vi' ? 'Phân Công Phòng Bệnh' : 'Ward Assignment'}
            {pendingCount > 0 && (
              <span className="text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full font-bold animate-pulse">
                {pendingCount} {lang === 'vi' ? 'chờ' : 'pending'}
              </span>
            )}
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 mt-1">
            {lang === 'vi' ? 'Phân công giường bệnh cho bệnh nhân nhập viện và theo dõi tình trạng sử dụng phòng' : 'Assign beds to admitted patients and monitor ward occupancy'}
          </p>
        </div>
        <div className="flex gap-2">
          {['split', 'map', 'list'].map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={'px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ' + (view === v ? 'bg-primary text-white border-primary' : 'border-outline-variant dark:border-slate-700 text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800')}
            >
              <span className="material-symbols-outlined text-[14px] mr-1 align-middle">{v === 'split' ? 'splitscreen' : v === 'map' ? 'grid_view' : 'list'}</span>
              {v === 'split' ? (lang === 'vi' ? 'Phân tách' : 'Split') : v === 'map' ? (lang === 'vi' ? 'Sơ đồ' : 'Map') : (lang === 'vi' ? 'Danh sách' : 'List')}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl p-4 text-center">
          <p className="text-3xl font-black text-green-600 dark:text-green-400">{totalAvailable}</p>
          <p className="text-xs font-semibold text-on-surface-variant dark:text-slate-400 uppercase tracking-wide mt-1">{lang === 'vi' ? 'Giường trống' : 'Available Beds'}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl p-4 text-center">
          <p className="text-3xl font-black text-slate-600 dark:text-slate-300">{totalOccupied}</p>
          <p className="text-xs font-semibold text-on-surface-variant dark:text-slate-400 uppercase tracking-wide mt-1">{lang === 'vi' ? 'Đang sử dụng' : 'Occupied'}</p>
        </div>
        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-4 text-center">
          <p className="text-3xl font-black text-amber-600 dark:text-amber-400">{pendingCount}</p>
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wide mt-1">{lang === 'vi' ? 'Chờ phân công' : 'Pending Assignment'}</p>
        </div>
      </div>

      {/* ─── SPLIT VIEW (Default) ─────────────────────────────────── */}
      {view === 'split' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* LEFT: Pending Admissions */}
          <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl overflow-hidden">
            <div className="border-b border-outline-variant dark:border-slate-800 p-4 flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface dark:text-white">
                {lang === 'vi' ? 'Bệnh nhân Nhập viện Chờ phân phòng' : 'Pending Admission Requests'}
              </h3>
              <span className="text-xs bg-surface-container-low dark:bg-slate-800 text-on-surface-variant dark:text-slate-400 px-2 py-0.5 rounded-full">{admissions.length}</span>
            </div>

            <div className="divide-y divide-outline-variant dark:divide-slate-800">
              {admissions.map(adm => {
                const isAssigning = assigningAdmId === adm.id;
                const isAssigned = !!adm.assignedBed;
                const justAssigned = assignedFlash === adm.id;
                return (
                  <div
                    key={adm.id}
                    className={'p-4 transition-all ' + (justAssigned ? 'bg-green-50 dark:bg-green-900/10' : isAssigning ? 'bg-primary/5 dark:bg-primary/10 border-l-2 border-primary' : '')}
                  >
                    {/* Admission Card Header */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-3">
                        <div className={'w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ' + (adm.priority === 'urgent' ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary')}>
                          {adm.patient.split(' ').map(w => w[0]).slice(-2).join('')}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <p className="font-semibold text-sm text-on-surface dark:text-white">{adm.patient}</p>
                            {adm.priority === 'urgent' && (
                              <span className="text-[9px] bg-error/10 text-error border border-error/30 px-1.5 py-0.5 rounded-full font-bold">
                                {lang === 'vi' ? 'ƯU TIÊN' : 'URGENT'}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-on-surface-variant dark:text-slate-400">{adm.patientId} · {adm.age}{lang === 'vi' ? ' tuổi' : ' yo'} · {adm.gender}</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-[10px] text-on-surface-variant dark:text-slate-500">{adm.id}</p>
                        {isAssigned ? (
                          <span className="text-xs text-green-700 dark:text-green-400 font-bold flex items-center gap-0.5 justify-end mt-0.5">
                            <span className="material-symbols-outlined text-[12px]">check_circle</span>
                            {adm.assignedBed}
                          </span>
                        ) : (
                          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
                            {lang === 'vi' ? 'Chưa phân' : 'Unassigned'}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Diagnosis & Doctor */}
                    <div className="pl-12">
                      <p className="text-xs text-on-surface dark:text-slate-200 mb-0.5">
                        <span className="font-semibold">{lang === 'vi' ? 'Chẩn đoán: ' : 'Diagnosis: '}</span>{adm.diagnosis}
                      </p>
                      <p className="text-[10px] text-on-surface-variant dark:text-slate-400">
                        {lang === 'vi' ? 'Chỉ định: ' : 'By: '}{adm.requestedBy} · {adm.requestedAt}
                      </p>

                      {/* Action Buttons */}
                      {!isAssigned && (
                        <div className="flex gap-2 mt-2">
                          {isAssigning ? (
                            <button
                              onClick={() => { setAssigningAdmId(null); setPickedBed(null); }}
                              className="text-xs px-3 py-1 border border-outline-variant dark:border-slate-700 rounded-lg text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800 transition-colors"
                            >
                              {lang === 'vi' ? 'Hủy chọn' : 'Cancel'}
                            </button>
                          ) : (
                            <button
                              onClick={() => setAssigningAdmId(adm.id)}
                              className="text-xs px-3 py-1 bg-primary text-white rounded-lg hover:bg-primary-container transition-colors font-semibold"
                            >
                              <span className="material-symbols-outlined text-[12px] mr-0.5 align-middle">hotel</span>
                              {lang === 'vi' ? 'Phân công giường' : 'Assign Bed'}
                            </button>
                          )}
                        </div>
                      )}

                      {justAssigned && (
                        <p className="mt-2 text-xs text-green-700 dark:text-green-400 font-semibold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">check_circle</span>
                          {lang === 'vi' ? `Đã phân công thành công: ${adm.assignedBed}` : `Successfully assigned: ${adm.assignedBed}`}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Bed Picker or Ward Map */}
          <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl overflow-hidden">
            {assigningAdmId ? (
              // Bed Picker mode
              <>
                <div className="border-b border-outline-variant dark:border-slate-800 p-4">
                  <p className="text-xs text-on-surface-variant dark:text-slate-400 mb-0.5">
                    {lang === 'vi' ? 'Chọn giường cho' : 'Selecting bed for'}
                  </p>
                  <h3 className="font-semibold text-sm text-on-surface dark:text-white">{assigningAdm?.patient}</h3>
                  <p className="text-[10px] text-on-surface-variant dark:text-slate-400">{assigningAdm?.diagnosis}</p>
                </div>

                <div className="p-4 border-b border-outline-variant dark:border-slate-800">
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant dark:text-slate-400">search</span>
                    <input
                      type="text"
                      value={searchBed}
                      onChange={e => setSearchBed(e.target.value)}
                      placeholder={lang === 'vi' ? 'Tìm giường theo mã hoặc khoa...' : 'Search bed by code or ward...'}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-surface-container-low dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-primary text-on-surface dark:text-white"
                    />
                  </div>
                </div>

                <div className="p-4 space-y-2 max-h-[460px] overflow-y-auto">
                  {filteredBeds.length === 0 && (
                    <div className="text-center py-8">
                      <span className="material-symbols-outlined text-[40px] text-outline dark:text-slate-600 block mb-2">hotel_off</span>
                      <p className="text-sm text-on-surface-variant dark:text-slate-400">{lang === 'vi' ? 'Không tìm thấy giường trống phù hợp.' : 'No available beds found.'}</p>
                    </div>
                  )}
                  {filteredBeds.map(bed => {
                    const rtc = roomTypeConfig[bed.type];
                    const isSelected = pickedBed === bed.bed;
                    return (
                      <button
                        key={bed.bed}
                        onClick={() => setPickedBed(bed.bed)}
                        className={'w-full text-left p-3 border rounded-lg transition-all ' + (isSelected ? 'border-primary bg-primary/5 dark:bg-primary/10 ring-1 ring-primary/30' : 'border-outline-variant dark:border-slate-700 hover:bg-surface-container-low dark:hover:bg-slate-800')}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={'w-8 h-8 rounded-lg flex items-center justify-center ' + (isSelected ? 'bg-primary/10' : 'bg-surface-container-low dark:bg-slate-800')}>
                              <span className={'material-symbols-outlined text-[16px] ' + rtc.color}>{rtc.icon}</span>
                            </div>
                            <div>
                              <p className="font-bold text-sm text-on-surface dark:text-white">{bed.bed}</p>
                              <p className="text-[10px] text-on-surface-variant dark:text-slate-400">{bed.wardName} · {lang === 'vi' ? rtc.vi : rtc.en}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={'text-[10px] px-2 py-0.5 rounded-full border font-semibold ' + statusConfig.available.badge}>
                              {lang === 'vi' ? statusConfig.available.vi : statusConfig.available.en}
                            </span>
                            {isSelected && <span className="material-symbols-outlined text-primary text-[18px]">radio_button_checked</span>}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Confirm Bar */}
                <div className="border-t border-outline-variant dark:border-slate-800 p-4 flex items-center justify-between gap-3">
                  <div>
                    {pickedBed ? (
                      <p className="text-sm font-semibold text-on-surface dark:text-white">
                        {lang === 'vi' ? 'Đã chọn: ' : 'Selected: '}
                        <span className="text-primary dark:text-primary-fixed-dim">{pickedBed}</span>
                      </p>
                    ) : (
                      <p className="text-xs text-on-surface-variant dark:text-slate-400">{lang === 'vi' ? 'Chưa chọn giường nào' : 'No bed selected'}</p>
                    )}
                  </div>
                  <button
                    onClick={handleConfirmAssign}
                    disabled={!pickedBed}
                    className={'px-5 py-2 text-sm font-bold rounded-lg transition-all ' + (pickedBed ? 'bg-primary text-white hover:bg-primary-container active:scale-95' : 'bg-surface-container-high dark:bg-slate-800 text-on-surface-variant dark:text-slate-500 cursor-not-allowed')}
                  >
                    <span className="material-symbols-outlined text-[14px] mr-1 align-middle">check_circle</span>
                    {lang === 'vi' ? 'Xác nhận phân công' : 'Confirm Assignment'}
                  </button>
                </div>
              </>
            ) : (
              // Default: Ward Overview
              <>
                <div className="border-b border-outline-variant dark:border-slate-800 p-4">
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface dark:text-white mb-3">
                    {lang === 'vi' ? 'Tổng quan tình trạng khoa' : 'Ward Occupancy Overview'}
                  </h3>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {wards.map(w => (
                      <button
                        key={w.id}
                        onClick={() => setSelectedWardId(w.id)}
                        className={'px-3 py-1.5 text-xs font-semibold rounded-lg border whitespace-nowrap transition-colors ' + (selectedWardId === w.id ? 'bg-primary text-white border-primary' : 'border-outline-variant dark:border-slate-700 text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800')}
                      >
                        {lang === 'vi' ? w.name : w.nameEn}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedWard && (
                  <>
                    {/* Ward Stats */}
                    <div className="grid grid-cols-3 gap-3 p-4 border-b border-outline-variant dark:border-slate-800">
                      {[
                        { label: lang === 'vi' ? 'Trống' : 'Available', count: countByStatus(selectedWardId, 'available'), color: 'text-green-600 dark:text-green-400' },
                        { label: lang === 'vi' ? 'Đang dùng' : 'Occupied', count: countByStatus(selectedWardId, 'occupied'), color: 'text-slate-500 dark:text-slate-400' },
                        { label: lang === 'vi' ? 'Đang dọn' : 'Cleaning', count: countByStatus(selectedWardId, 'cleaning'), color: 'text-amber-500' },
                      ].map(stat => (
                        <div key={stat.label} className="text-center bg-surface-container-low dark:bg-slate-800 rounded-lg p-2">
                          <p className={'text-xl font-black ' + stat.color}>{stat.count}</p>
                          <p className="text-[10px] text-on-surface-variant dark:text-slate-400 font-semibold">{stat.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Room-Bed Grid */}
                    <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
                      {selectedWard.rooms.map(room => {
                        const rtc = roomTypeConfig[room.type];
                        return (
                          <div key={room.roomCode} className="border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden">
                            <div className="flex items-center justify-between px-3 py-2 bg-surface-container-low dark:bg-slate-800">
                              <div className="flex items-center gap-2">
                                <span className={'material-symbols-outlined text-[16px] ' + rtc.color}>{rtc.icon}</span>
                                <span className="font-semibold text-xs text-on-surface dark:text-white">{room.roomCode}</span>
                                <span className="text-[10px] text-on-surface-variant dark:text-slate-400">{lang === 'vi' ? rtc.vi : rtc.en}</span>
                              </div>
                            </div>
                            <div className="divide-y divide-outline-variant dark:divide-slate-800">
                              {room.beds.map(bed => {
                                const sc = statusConfig[bed.status];
                                return (
                                  <div key={bed.bed} className="flex items-center justify-between px-3 py-2.5">
                                    <div className="flex items-center gap-3">
                                      <div className={'w-2 h-2 rounded-full flex-shrink-0 ' + sc.dot}></div>
                                      <div>
                                        <p className="text-xs font-bold text-on-surface dark:text-white">{bed.bed}</p>
                                        {bed.patient ? (
                                          <p className="text-[10px] text-on-surface-variant dark:text-slate-400">{bed.patient} · {bed.admittedAt}</p>
                                        ) : (
                                          <p className="text-[10px] text-on-surface-variant dark:text-slate-500 italic">{lang === 'vi' ? sc.vi : sc.en}</p>
                                        )}
                                      </div>
                                    </div>
                                    <span className={'text-[10px] px-2 py-0.5 rounded-full border font-semibold flex-shrink-0 ' + sc.badge}>
                                      {lang === 'vi' ? sc.vi : sc.en}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* ─── MAP VIEW ────────────────────────────────────────────── */}
      {view === 'map' && (
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            {wards.map(w => (
              <button
                key={w.id}
                onClick={() => setSelectedWardId(w.id)}
                className={'px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ' + (selectedWardId === w.id ? 'bg-primary text-white border-primary' : 'border-outline-variant dark:border-slate-700 text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800')}
              >
                {lang === 'vi' ? w.name : w.nameEn}
              </button>
            ))}
          </div>
          {selectedWard && (
            <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl p-5">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface dark:text-white mb-1">
                {lang === 'vi' ? selectedWard.name : selectedWard.nameEn}
              </h3>
              <p className="text-xs text-on-surface-variant dark:text-slate-400 mb-4">
                {lang === 'vi' ? selectedWard.floor : selectedWard.floorEn}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {selectedWard.rooms.flatMap(room =>
                  room.beds.map(bed => {
                    const sc = statusConfig[bed.status];
                    const rtc = roomTypeConfig[room.type];
                    return (
                      <div
                        key={bed.bed}
                        className={'rounded-xl border p-3 transition-all ' + (bed.status === 'available' ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/10 hover:scale-105 cursor-pointer' : bed.status === 'cleaning' ? 'border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/10' : bed.status === 'reserved' ? 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/10' : 'border-slate-200 dark:border-slate-700 bg-surface-container-low dark:bg-slate-800')}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-xs text-on-surface dark:text-white">{bed.bed}</span>
                          <span className={'material-symbols-outlined text-[14px] ' + rtc.color}>{rtc.icon}</span>
                        </div>
                        <div className={'w-2 h-2 rounded-full mb-2 ' + sc.dot}></div>
                        {bed.patient ? (
                          <p className="text-[10px] text-on-surface dark:text-slate-300 font-semibold leading-tight">{bed.patient}</p>
                        ) : (
                          <p className={'text-[10px] font-semibold ' + (bed.status === 'available' ? 'text-green-700 dark:text-green-400' : 'text-on-surface-variant dark:text-slate-400')}>
                            {lang === 'vi' ? sc.vi : sc.en}
                          </p>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Legend */}
              <div className="flex gap-4 flex-wrap mt-4 pt-4 border-t border-outline-variant dark:border-slate-800">
                {Object.entries(statusConfig).map(([key, cfg]) => (
                  <div key={key} className="flex items-center gap-1.5">
                    <div className={'w-2.5 h-2.5 rounded-full flex-shrink-0 ' + cfg.dot}></div>
                    <span className="text-[11px] text-on-surface-variant dark:text-slate-400">{lang === 'vi' ? cfg.vi : cfg.en}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── LIST VIEW ───────────────────────────────────────────── */}
      {view === 'list' && (
        <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface-container-low dark:bg-slate-800 border-b border-outline-variant dark:border-slate-700">
                <tr>
                  {[
                    lang === 'vi' ? 'Mã giường' : 'Bed Code',
                    lang === 'vi' ? 'Phòng' : 'Room',
                    lang === 'vi' ? 'Loại' : 'Type',
                    lang === 'vi' ? 'Khoa' : 'Ward',
                    lang === 'vi' ? 'Bệnh nhân' : 'Patient',
                    lang === 'vi' ? 'Ngày nhập' : 'Admitted',
                    lang === 'vi' ? 'Trạng thái' : 'Status',
                  ].map(h => (
                    <th key={h} className="px-4 py-3 text-xs font-semibold text-on-surface-variant dark:text-slate-400 text-left whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant dark:divide-slate-800">
                {allBeds.map(bed => {
                  const sc = statusConfig[bed.status];
                  const ward = wards.find(w => w.id === bed.ward);
                  const room = ward?.rooms.find(r => r.beds.some(b => b.bed === bed.bed));
                  const rtc = roomTypeConfig[room?.type || 'double'];
                  return (
                    <tr key={bed.bed} className="hover:bg-surface-container-low dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-4 py-3 font-bold text-on-surface dark:text-white">{bed.bed}</td>
                      <td className="px-4 py-3 text-on-surface-variant dark:text-slate-400">{bed.room}</td>
                      <td className="px-4 py-3">
                        <span className={'flex items-center gap-1 ' + rtc.color}>
                          <span className="material-symbols-outlined text-[14px]">{rtc.icon}</span>
                          <span className="text-xs">{lang === 'vi' ? rtc.vi : rtc.en}</span>
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-on-surface-variant dark:text-slate-400 whitespace-nowrap">{bed.wardName}</td>
                      <td className="px-4 py-3 text-xs text-on-surface dark:text-slate-200">{bed.patient || '—'}</td>
                      <td className="px-4 py-3 text-xs text-on-surface-variant dark:text-slate-400">{bed.admittedAt || '—'}</td>
                      <td className="px-4 py-3">
                        <span className={'text-[10px] px-2 py-0.5 rounded-full border font-bold flex items-center gap-1 w-fit ' + sc.badge}>
                          <span className={'w-1.5 h-1.5 rounded-full ' + sc.dot}></span>
                          {lang === 'vi' ? sc.vi : sc.en}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
