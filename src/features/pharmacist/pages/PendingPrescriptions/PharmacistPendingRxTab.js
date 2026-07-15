import React, { useState } from 'react';

const initialPrescriptions = [
  {
    id: 'PRSC-2026-0088',
    patient: 'Nguyễn Thị Hoa',
    patientId: 'BN-00214',
    doctor: 'BS. Trần Văn Minh',
    prescribedAt: '15/07/2026 08:30',
    diagnosis: 'Viêm phế quản cấp',
    medications: [
      { name: 'Amoxicillin', dosage: '500mg', frequency: '3 lần/ngày', duration: '7 ngày', route: 'Uống' },
      { name: 'Dextromethorphan', dosage: '15mg', frequency: '3 lần/ngày', duration: '5 ngày', route: 'Uống' },
    ],
    status: 'pending',
    priority: 'normal',
    allergies: [],
  },
  {
    id: 'PRSC-2026-0087',
    patient: 'Lê Văn Cường',
    patientId: 'BN-00198',
    doctor: 'BS. Phạm Thị Lan',
    prescribedAt: '15/07/2026 09:10',
    diagnosis: 'Tăng huyết áp giai đoạn II',
    medications: [
      { name: 'Amlodipine', dosage: '10mg', frequency: '1 lần/ngày', duration: '30 ngày', route: 'Uống' },
      { name: 'Losartan', dosage: '50mg', frequency: '1 lần/ngày', duration: '30 ngày', route: 'Uống' },
    ],
    status: 'pending',
    priority: 'urgent',
    allergies: ['Penicillin'],
  },
  {
    id: 'PRSC-2026-0086',
    patient: 'Trần Thị Bình',
    patientId: 'BN-00177',
    doctor: 'BS. Nguyễn Hữu Nghĩa',
    prescribedAt: '15/07/2026 07:45',
    diagnosis: 'Đái tháo đường type 2',
    medications: [
      { name: 'Metformin', dosage: '1000mg', frequency: '2 lần/ngày', duration: '30 ngày', route: 'Uống' },
    ],
    status: 'preparing',
    priority: 'normal',
    allergies: [],
  },
  {
    id: 'PRSC-2026-0085',
    patient: 'Hoàng Văn Nam',
    patientId: 'BN-00155',
    doctor: 'BS. Lê Thị Thu',
    prescribedAt: '14/07/2026 16:20',
    diagnosis: 'Đau sau phẫu thuật',
    medications: [
      { name: 'Tramadol', dosage: '50mg', frequency: 'Khi đau (tối đa 4 lần/ngày)', duration: '3 ngày', route: 'Uống' },
      { name: 'Paracetamol', dosage: '1000mg', frequency: '3 lần/ngày', duration: '5 ngày', route: 'Uống' },
    ],
    status: 'dispensed',
    priority: 'normal',
    allergies: [],
  },
];

const statusConfig = {
  pending: { viLabel: 'Chờ duyệt', enLabel: 'Pending', color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700' },
  preparing: { viLabel: 'Đang chuẩn bị', enLabel: 'Preparing', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700' },
  dispensed: { viLabel: 'Đã cấp phát', enLabel: 'Dispensed', color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700' },
  cancelled: { viLabel: 'Đã hủy', enLabel: 'Cancelled', color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700' },
};

export default function PharmacistPendingRxTab({ lang, t }) {
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions);
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedId, setExpandedId] = useState('PRSC-2026-0087');

  const filtered = filterStatus === 'all' ? prescriptions : prescriptions.filter(p => p.status === filterStatus);

  const handleApprove = (id) => {
    setPrescriptions(prev => prev.map(p => p.id === id ? { ...p, status: 'preparing' } : p));
  };

  const handleDispense = (id) => {
    setPrescriptions(prev => prev.map(p => p.id === id ? { ...p, status: 'dispensed' } : p));
  };

  const handleCancel = (id) => {
    setPrescriptions(prev => prev.map(p => p.id === id ? { ...p, status: 'cancelled' } : p));
  };

  const pendingCount = prescriptions.filter(p => p.status === 'pending').length;
  const preparingCount = prescriptions.filter(p => p.status === 'preparing').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface dark:text-white">
            {lang === 'vi' ? 'Đơn Thuốc Chờ Duyệt' : 'Pending Prescriptions'}
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 mt-1">
            {lang === 'vi' ? 'Xem xét, duyệt và cấp phát đơn thuốc điện tử từ bác sĩ' : 'Review, approve and dispense electronic prescriptions from doctors'}
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg px-4 py-2 text-center">
            <p className="text-2xl font-black text-amber-700 dark:text-amber-300">{pendingCount}</p>
            <p className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wide">{lang === 'vi' ? 'Chờ duyệt' : 'Pending'}</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg px-4 py-2 text-center">
            <p className="text-2xl font-black text-blue-700 dark:text-blue-300">{preparingCount}</p>
            <p className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wide">{lang === 'vi' ? 'Đang pha chế' : 'Preparing'}</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-outline-variant dark:border-slate-800 pb-1">
        {[
          { key: 'all', viLabel: 'Tất cả', enLabel: 'All' },
          { key: 'pending', viLabel: 'Chờ duyệt', enLabel: 'Pending' },
          { key: 'preparing', viLabel: 'Đang pha chế', enLabel: 'Preparing' },
          { key: 'dispensed', viLabel: 'Đã cấp phát', enLabel: 'Dispensed' },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilterStatus(f.key)}
            className={'px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors ' + (filterStatus === f.key ? 'bg-primary text-white' : 'text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800')}
          >
            {lang === 'vi' ? f.viLabel : f.enLabel}
          </button>
        ))}
      </div>

      {/* Prescription Cards */}
      <div className="space-y-4">
        {filtered.map(rx => {
          const cfg = statusConfig[rx.status] || statusConfig.pending;
          const isExpanded = expandedId === rx.id;
          return (
            <div
              key={rx.id}
              className={'bg-white dark:bg-slate-900 border rounded-xl overflow-hidden transition-all ' + (rx.priority === 'urgent' ? 'border-error/40 dark:border-red-700/40 shadow-md' : 'border-outline-variant dark:border-slate-800')}
            >
              {/* Card Header */}
              <div
                className="p-4 cursor-pointer flex items-center justify-between gap-4"
                onClick={() => setExpandedId(isExpanded ? null : rx.id)}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className={'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm ' + (rx.priority === 'urgent' ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary')}>
                    {rx.patient.split(' ').map(w => w[0]).slice(-2).join('')}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-sm text-on-surface dark:text-white">{rx.patient}</p>
                      <span className="text-[10px] text-on-surface-variant dark:text-slate-500">{rx.patientId}</span>
                      {rx.priority === 'urgent' && (
                        <span className="text-[9px] bg-error/10 text-error border border-error/30 px-1.5 py-0.5 rounded-full font-bold uppercase">
                          {lang === 'vi' ? 'Ưu tiên' : 'Urgent'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-on-surface-variant dark:text-slate-400">{rx.doctor} · {rx.diagnosis}</p>
                    <p className="text-[10px] text-on-surface-variant dark:text-slate-500 mt-0.5">{rx.id} · {rx.prescribedAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={'text-[11px] px-3 py-1 rounded-full border font-semibold ' + cfg.color}>
                    {lang === 'vi' ? cfg.viLabel : cfg.enLabel}
                  </span>
                  <span className={'material-symbols-outlined text-[20px] text-on-surface-variant dark:text-slate-400 transition-transform ' + (isExpanded ? 'rotate-180' : '')}>expand_more</span>
                </div>
              </div>

              {/* Expanded Detail */}
              {isExpanded && (
                <div className="border-t border-outline-variant dark:border-slate-800 p-4 space-y-4 bg-surface-container-lowest dark:bg-slate-800/50">
                  {rx.allergies.length > 0 && (
                    <div className="flex items-center gap-2 bg-error/10 border border-error/30 rounded-lg px-3 py-2">
                      <span className="material-symbols-outlined text-error text-[18px]">warning</span>
                      <p className="text-xs font-bold text-error">
                        {lang === 'vi' ? 'Dị ứng đã ghi nhận: ' : 'Recorded Allergies: '}
                        {rx.allergies.join(', ')}
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-wide mb-2">
                      {lang === 'vi' ? 'Danh sách thuốc' : 'Medication List'} ({rx.medications.length})
                    </p>
                    <div className="space-y-2">
                      {rx.medications.map((med, idx) => (
                        <div key={idx} className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg p-3 flex items-center gap-3">
                          <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>medication</span>
                          <div className="flex-grow">
                            <p className="font-semibold text-sm text-on-surface dark:text-white">{med.name} <span className="font-normal text-primary">{med.dosage}</span></p>
                            <p className="text-xs text-on-surface-variant dark:text-slate-400">{med.frequency} · {med.duration} · {lang === 'vi' ? 'Đường dùng: ' : 'Route: '}{med.route}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 justify-end pt-1">
                    {rx.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleCancel(rx.id)}
                          className="px-3 py-1.5 text-xs border border-error/50 text-error hover:bg-error/10 rounded-lg transition-colors font-semibold"
                        >
                          {lang === 'vi' ? 'Từ chối' : 'Reject'}
                        </button>
                        <button
                          onClick={() => handleApprove(rx.id)}
                          className="px-4 py-1.5 text-xs bg-primary text-white hover:bg-primary-container rounded-lg transition-colors font-semibold"
                        >
                          {lang === 'vi' ? 'Duyệt & Pha chế' : 'Approve & Prepare'}
                        </button>
                      </>
                    )}
                    {rx.status === 'preparing' && (
                      <button
                        onClick={() => handleDispense(rx.id)}
                        className="px-4 py-1.5 text-xs bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors font-semibold"
                      >
                        {lang === 'vi' ? '✓ Xác nhận đã cấp phát' : '✓ Mark as Dispensed'}
                      </button>
                    )}
                    {rx.status === 'dispensed' && (
                      <span className="px-3 py-1.5 text-xs text-green-700 dark:text-green-400 font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span>
                        {lang === 'vi' ? 'Đã hoàn tất' : 'Completed'}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl p-12 text-center">
            <span className="material-symbols-outlined text-[48px] text-outline dark:text-slate-600 mb-3 block">inbox</span>
            <p className="text-on-surface-variant dark:text-slate-400 text-sm">{lang === 'vi' ? 'Không có đơn thuốc nào.' : 'No prescriptions found.'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
