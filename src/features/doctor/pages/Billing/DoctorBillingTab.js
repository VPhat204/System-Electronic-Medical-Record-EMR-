import React, { useState } from 'react';

const billingData = [
  {
    id: 'BILL-2026-0044',
    patient: 'Margaret Thatcher',
    patientId: 'MC-88334',
    admissionId: 'ADM-0092',
    period: '10/07/2026 — 15/07/2026',
    status: 'pending',
    totalAmount: 18750000,
    insuranceCovered: 13125000,
    patientDue: 5625000,
    items: [
      { category: 'Phòng bệnh (Phòng đặc biệt)', qty: 5, unitPrice: 1200000, total: 6000000 },
      { category: 'Khám bác sĩ chuyên khoa', qty: 6, unitPrice: 500000, total: 3000000 },
      { category: 'Thuốc — Amlodipine, Aspirin', qty: 1, unitPrice: 2100000, total: 2100000 },
      { category: 'Xét nghiệm CBC + Sinh hóa', qty: 2, unitPrice: 750000, total: 1500000 },
      { category: 'MRI não có cản quang', qty: 1, unitPrice: 4500000, total: 4500000 },
      { category: 'Theo dõi Holter 24h', qty: 1, unitPrice: 1650000, total: 1650000 },
    ],
  },
  {
    id: 'BILL-2026-0038',
    patient: 'Arthur Morgan',
    patientId: 'MC-40192',
    admissionId: null,
    period: '24/10/2026 — 24/10/2026',
    status: 'paid',
    totalAmount: 2350000,
    insuranceCovered: 1645000,
    patientDue: 705000,
    items: [
      { category: 'Khám chuyên khoa Tim mạch', qty: 1, unitPrice: 500000, total: 500000 },
      { category: 'Xét nghiệm Lipid Profile', qty: 1, unitPrice: 350000, total: 350000 },
      { category: 'Thuốc — Lisinopril', qty: 1, unitPrice: 1500000, total: 1500000 },
    ],
  },
  {
    id: 'BILL-2026-0031',
    patient: 'Elena Rodriguez',
    patientId: 'MC-99210',
    admissionId: 'ADM-0085',
    period: '05/07/2026 — 13/07/2026',
    status: 'paid',
    totalAmount: 12400000,
    insuranceCovered: 8680000,
    patientDue: 3720000,
    items: [
      { category: 'Phòng bệnh (Phòng thường)', qty: 8, unitPrice: 700000, total: 5600000 },
      { category: 'Khám bác sĩ Thần kinh học', qty: 5, unitPrice: 500000, total: 2500000 },
      { category: 'Chọc dò tủy sống (LP)', qty: 1, unitPrice: 2300000, total: 2300000 },
      { category: 'Thuốc điều trị', qty: 1, unitPrice: 2000000, total: 2000000 },
    ],
  },
];

const statusConfig = {
  pending: { viLabel: 'Chờ thanh toán', enLabel: 'Pending', color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-600' },
  paid: { viLabel: 'Đã thanh toán', enLabel: 'Paid', color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-300 dark:border-green-600' },
  overdue: { viLabel: 'Quá hạn', enLabel: 'Overdue', color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-300 dark:border-red-600' },
};

function formatVND(amount) {
  return amount.toLocaleString('vi-VN') + ' ₫';
}

export default function DoctorBillingTab({ lang, t, patients = [] }) {
  const [selectedId, setSelectedId] = useState('BILL-2026-0044');
  const [filterStatus, setFilterStatus] = useState('all');

  const selected = billingData.find(b => b.id === selectedId);
  const filtered = filterStatus === 'all' ? billingData : billingData.filter(b => b.status === filterStatus);

  const totalPending = billingData.filter(b => b.status === 'pending').reduce((s, b) => s + b.totalAmount, 0);
  const totalPaid = billingData.filter(b => b.status === 'paid').reduce((s, b) => s + b.totalAmount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface dark:text-white">
          {lang === 'vi' ? 'Tóm Tắt Chi Phí Điều Trị' : 'Treatment Billing Summary'}
        </h2>
        <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 mt-1">
          {lang === 'vi' ? 'Xem tóm tắt chi phí điều trị của bệnh nhân (chỉ đọc — quản lý bởi lễ tân)' : 'View treatment cost summaries for patients (read-only — managed by reception)'}
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>receipt_long</span>
            <p className="text-xs font-semibold text-on-surface-variant dark:text-slate-400 uppercase tracking-wide">
              {lang === 'vi' ? 'Tổng hóa đơn' : 'Total Bills'}
            </p>
          </div>
          <p className="text-2xl font-black text-on-surface dark:text-white">{billingData.length}</p>
          <p className="text-xs text-on-surface-variant dark:text-slate-500 mt-1">{lang === 'vi' ? 'Bệnh nhân trong tháng' : 'Patients this month'}</p>
        </div>
        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-amber-600 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>pending</span>
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
              {lang === 'vi' ? 'Chờ thanh toán' : 'Pending'}
            </p>
          </div>
          <p className="text-xl font-black text-amber-800 dark:text-amber-300">{formatVND(totalPending)}</p>
          <p className="text-xs text-amber-600 dark:text-amber-500 mt-1">{billingData.filter(b => b.status === 'pending').length} {lang === 'vi' ? 'hóa đơn' : 'bills'}</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-green-600 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            <p className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-wide">
              {lang === 'vi' ? 'Đã thanh toán' : 'Paid'}
            </p>
          </div>
          <p className="text-xl font-black text-green-800 dark:text-green-300">{formatVND(totalPaid)}</p>
          <p className="text-xs text-green-600 dark:text-green-500 mt-1">{billingData.filter(b => b.status === 'paid').length} {lang === 'vi' ? 'hóa đơn' : 'bills'}</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {[
          { key: 'all', vi: 'Tất cả', en: 'All' },
          { key: 'pending', vi: 'Chờ thanh toán', en: 'Pending' },
          { key: 'paid', vi: 'Đã thanh toán', en: 'Paid' },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilterStatus(f.key)}
            className={'px-4 py-1.5 text-xs font-semibold rounded-full transition-colors ' + (filterStatus === f.key ? 'bg-primary text-white' : 'text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800 border border-outline-variant dark:border-slate-700')}
          >
            {lang === 'vi' ? f.vi : f.en}
          </button>
        ))}
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Bill List */}
        <div className="lg:col-span-2 space-y-3">
          {filtered.map(bill => {
            const cfg = statusConfig[bill.status] || statusConfig.pending;
            return (
              <button
                key={bill.id}
                onClick={() => setSelectedId(bill.id)}
                className={'w-full text-left p-4 bg-white dark:bg-slate-900 border rounded-xl transition-all ' + (selectedId === bill.id ? 'border-primary ring-1 ring-primary/20 dark:border-primary' : 'border-outline-variant dark:border-slate-800 hover:bg-surface-container-low dark:hover:bg-slate-800')}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="font-semibold text-sm text-on-surface dark:text-white">{bill.patient}</p>
                    <p className="text-[10px] text-on-surface-variant dark:text-slate-500">{bill.patientId}</p>
                  </div>
                  <span className={'text-[10px] px-2 py-0.5 rounded-full border font-bold flex-shrink-0 ' + cfg.color}>
                    {lang === 'vi' ? cfg.viLabel : cfg.enLabel}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant dark:text-slate-400 mb-2">{bill.period}</p>
                <div className="flex items-center justify-between">
                  <p className="font-bold text-sm text-on-surface dark:text-white">{formatVND(bill.totalAmount)}</p>
                  <p className="text-[10px] text-on-surface-variant dark:text-slate-500">{bill.id}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Bill Detail */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl overflow-hidden">
          {selected ? (
            <>
              {/* Bill Header */}
              <div className="p-5 border-b border-outline-variant dark:border-slate-800">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="text-xs text-on-surface-variant dark:text-slate-400 mb-1">{selected.id}{selected.admissionId ? ` · ${selected.admissionId}` : ''}</p>
                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface dark:text-white">{selected.patient}</h3>
                    <p className="text-xs text-on-surface-variant dark:text-slate-400 mt-0.5">{selected.patientId} · {selected.period}</p>
                  </div>
                  <span className={'text-[11px] px-3 py-1 rounded-full border font-bold ' + (statusConfig[selected.status] || statusConfig.pending).color}>
                    {lang === 'vi' ? (statusConfig[selected.status] || statusConfig.pending).viLabel : (statusConfig[selected.status] || statusConfig.pending).enLabel}
                  </span>
                </div>

                {/* Cost Breakdown */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-surface-container-low dark:bg-slate-800 rounded-lg p-3 text-center">
                    <p className="text-[10px] text-on-surface-variant dark:text-slate-400 font-semibold uppercase tracking-wide mb-1">{lang === 'vi' ? 'Tổng chi phí' : 'Total Cost'}</p>
                    <p className="font-black text-sm text-on-surface dark:text-white">{formatVND(selected.totalAmount)}</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg p-3 text-center">
                    <p className="text-[10px] text-green-700 dark:text-green-400 font-semibold uppercase tracking-wide mb-1">{lang === 'vi' ? 'Bảo hiểm chi trả' : 'Insurance'}</p>
                    <p className="font-black text-sm text-green-800 dark:text-green-300">{formatVND(selected.insuranceCovered)}</p>
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-lg p-3 text-center">
                    <p className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold uppercase tracking-wide mb-1">{lang === 'vi' ? 'Bệnh nhân trả' : 'Patient Pays'}</p>
                    <p className="font-black text-sm text-amber-800 dark:text-amber-300">{formatVND(selected.patientDue)}</p>
                  </div>
                </div>
              </div>

              {/* Line Items */}
              <div className="p-5">
                <p className="text-xs font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-wide mb-3">
                  {lang === 'vi' ? 'Chi tiết hạng mục' : 'Line Items'}
                </p>
                <div className="space-y-2">
                  {selected.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-4 py-2 border-b border-outline-variant/50 dark:border-slate-800 last:border-0">
                      <div className="flex-grow min-w-0">
                        <p className="text-sm text-on-surface dark:text-white truncate">{item.category}</p>
                        <p className="text-[11px] text-on-surface-variant dark:text-slate-400">
                          {item.qty} × {formatVND(item.unitPrice)}
                        </p>
                      </div>
                      <p className="font-bold text-sm text-on-surface dark:text-white flex-shrink-0">{formatVND(item.total)}</p>
                    </div>
                  ))}
                </div>
                {/* Total Row */}
                <div className="flex items-center justify-between pt-3 mt-1 border-t-2 border-outline-variant dark:border-slate-700">
                  <p className="font-bold text-sm text-on-surface dark:text-white">{lang === 'vi' ? 'Tổng cộng' : 'Total'}</p>
                  <p className="font-black text-lg text-primary dark:text-primary-fixed-dim">{formatVND(selected.totalAmount)}</p>
                </div>
              </div>

              {/* Doctor Notice */}
              <div className="mx-5 mb-5 bg-surface-container-low dark:bg-slate-800 rounded-lg p-3 flex items-start gap-2">
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant dark:text-slate-400 mt-0.5">info</span>
                <p className="text-[11px] text-on-surface-variant dark:text-slate-400">
                  {lang === 'vi' ? 'Bác sĩ chỉ có quyền xem. Mọi chỉnh sửa hóa đơn thực hiện qua bộ phận Lễ tân.' : 'Doctors have read-only access. All billing adjustments are handled by the Reception team.'}
                </p>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center p-8">
              <span className="material-symbols-outlined text-[48px] text-outline dark:text-slate-600 mb-3">receipt_long</span>
              <p className="text-sm text-on-surface-variant dark:text-slate-400">
                {lang === 'vi' ? 'Chọn hóa đơn để xem chi tiết' : 'Select a bill to view details'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
