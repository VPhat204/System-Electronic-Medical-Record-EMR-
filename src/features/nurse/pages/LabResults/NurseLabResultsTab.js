import React, { useState } from 'react';

const labData = [
  {
    id: 'LAB-7821',
    patient: 'Nguyễn Văn An',
    patientId: 'BN-00214',
    room: 'P.302 - Giường 3',
    testName: 'Công thức máu toàn phần (CBC)',
    orderedBy: 'BS. Trần Văn Minh',
    orderedAt: '15/07/2026 06:30',
    resultAt: '15/07/2026 08:10',
    status: 'critical',
    results: [
      { param: 'Hemoglobin (Hgb)', value: '7.2', unit: 'g/dL', ref: '12–17', flag: 'L' },
      { param: 'Hematocrit (Hct)', value: '21.8', unit: '%', ref: '36–50', flag: 'L' },
      { param: 'Bạch cầu (WBC)', value: '14.2', unit: '×10³/µL', ref: '4.5–11.0', flag: 'H' },
      { param: 'Tiểu cầu (PLT)', value: '88', unit: '×10³/µL', ref: '150–400', flag: 'L' },
    ],
    isReviewed: false,
  },
  {
    id: 'LAB-7820',
    patient: 'Lê Thị Mai',
    patientId: 'BN-00198',
    room: 'P.301 - Giường 1',
    testName: 'Sinh hóa máu (BMP)',
    orderedBy: 'BS. Phạm Thị Lan',
    orderedAt: '15/07/2026 07:00',
    resultAt: '15/07/2026 09:05',
    status: 'abnormal',
    results: [
      { param: 'Glucose', value: '198', unit: 'mg/dL', ref: '70–110', flag: 'H' },
      { param: 'BUN', value: '22', unit: 'mg/dL', ref: '7–20', flag: 'H' },
      { param: 'Creatinine', value: '1.1', unit: 'mg/dL', ref: '0.6–1.2', flag: '' },
      { param: 'Natri (Na+)', value: '138', unit: 'mEq/L', ref: '136–145', flag: '' },
    ],
    isReviewed: true,
  },
  {
    id: 'LAB-7819',
    patient: 'Trần Văn Hùng',
    patientId: 'BN-00177',
    room: 'P.305 - Giường 2',
    testName: 'Tổng phân tích nước tiểu (UA)',
    orderedBy: 'BS. Nguyễn Hữu Nghĩa',
    orderedAt: '14/07/2026 22:00',
    resultAt: '15/07/2026 06:50',
    status: 'normal',
    results: [
      { param: 'Màu sắc', value: 'Vàng nhạt', unit: '', ref: 'Vàng nhạt', flag: '' },
      { param: 'Protein', value: 'Âm tính', unit: '', ref: 'Âm tính', flag: '' },
      { param: 'Glucose (nước tiểu)', value: 'Âm tính', unit: '', ref: 'Âm tính', flag: '' },
    ],
    isReviewed: true,
  },
  {
    id: 'LAB-7818',
    patient: 'Hoàng Thị Bình',
    patientId: 'BN-00155',
    room: 'P.302 - Giường 1',
    testName: 'Điện giải đồ',
    orderedBy: 'BS. Lê Thị Thu',
    orderedAt: '15/07/2026 08:00',
    resultAt: null,
    status: 'pending',
    results: [],
    isReviewed: false,
  },
];

const statusConfig = {
  critical: { viLabel: 'NGUY KỊCH', enLabel: 'CRITICAL', color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700', dot: 'bg-red-500 animate-pulse' },
  abnormal: { viLabel: 'BẤT THƯỜNG', enLabel: 'ABNORMAL', color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700', dot: 'bg-amber-500' },
  normal: { viLabel: 'BÌNH THƯỜNG', enLabel: 'NORMAL', color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700', dot: 'bg-green-500' },
  pending: { viLabel: 'CHỜ KẾT QUẢ', enLabel: 'PENDING', color: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-600', dot: 'bg-slate-400' },
};

const flagStyle = {
  'H': 'text-red-600 dark:text-red-400 font-bold',
  'L': 'text-blue-600 dark:text-blue-400 font-bold',
  '': 'text-on-surface-variant dark:text-slate-400',
};

export default function NurseLabResultsTab({ lang, t }) {
  const [labs, setLabs] = useState(labData);
  const [selectedId, setSelectedId] = useState('LAB-7821');
  const [filterStatus, setFilterStatus] = useState('all');

  const selected = labs.find(l => l.id === selectedId);
  const filtered = filterStatus === 'all' ? labs : labs.filter(l => l.status === filterStatus);

  const handleMarkReviewed = (id) => {
    setLabs(prev => prev.map(l => l.id === id ? { ...l, isReviewed: true } : l));
  };

  const criticalCount = labs.filter(l => l.status === 'critical' && !l.isReviewed).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface dark:text-white flex items-center gap-2">
            {lang === 'vi' ? 'Kết Quả Xét Nghiệm' : 'Lab Results'}
            {criticalCount > 0 && (
              <span className="text-[11px] bg-error text-white px-2 py-0.5 rounded-full font-bold animate-pulse">
                {criticalCount} {lang === 'vi' ? 'NGUY KỊCH' : 'CRITICAL'}
              </span>
            )}
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 mt-1">
            {lang === 'vi' ? 'Xem xét kết quả xét nghiệm của bệnh nhân trong ca trực để hỗ trợ theo dõi lâm sàng' : 'Review patient lab results during your shift to support clinical monitoring'}
          </p>
        </div>
        <button
          onClick={() => alert(lang === 'vi' ? 'Làm mới danh sách kết quả...' : 'Refreshing lab results...')}
          className="flex items-center gap-2 px-4 py-2 text-sm border border-outline-variant dark:border-slate-700 rounded-lg text-on-surface-variant dark:text-slate-300 hover:bg-surface-container-high dark:hover:bg-slate-800 transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">refresh</span>
          {lang === 'vi' ? 'Làm mới' : 'Refresh'}
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { status: 'critical', count: labs.filter(l => l.status === 'critical').length },
          { status: 'abnormal', count: labs.filter(l => l.status === 'abnormal').length },
          { status: 'normal', count: labs.filter(l => l.status === 'normal').length },
          { status: 'pending', count: labs.filter(l => l.status === 'pending').length },
        ].map(stat => {
          const cfg = statusConfig[stat.status];
          return (
            <button
              key={stat.status}
              onClick={() => setFilterStatus(stat.status)}
              className={'p-3 rounded-xl border text-center transition-all ' + cfg.color + (filterStatus === stat.status ? ' ring-2 ring-primary' : '')}
            >
              <p className="text-2xl font-black">{stat.count}</p>
              <p className="text-[10px] font-bold uppercase tracking-wide mt-0.5">{lang === 'vi' ? statusConfig[stat.status].viLabel : statusConfig[stat.status].enLabel}</p>
            </button>
          );
        })}
      </div>

      {/* All filter */}
      <button
        onClick={() => setFilterStatus('all')}
        className={'text-xs font-semibold px-3 py-1 rounded-full transition-colors ' + (filterStatus === 'all' ? 'bg-primary text-white' : 'text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800')}
      >
        {lang === 'vi' ? `Tất cả (${labs.length})` : `All (${labs.length})`}
      </button>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* List */}
        <div className="lg:col-span-2 space-y-2">
          {filtered.map(lab => {
            const cfg = statusConfig[lab.status];
            return (
              <button
                key={lab.id}
                onClick={() => setSelectedId(lab.id)}
                className={'w-full text-left p-4 bg-white dark:bg-slate-900 border rounded-xl transition-all ' + (selectedId === lab.id ? 'border-primary dark:border-primary ring-1 ring-primary/20' : 'border-outline-variant dark:border-slate-800 hover:bg-surface-container-low dark:hover:bg-slate-800')}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <div className={'w-2 h-2 rounded-full flex-shrink-0 ' + cfg.dot}></div>
                    <p className="font-semibold text-sm text-on-surface dark:text-white leading-tight">{lab.patient}</p>
                  </div>
                  {!lab.isReviewed && lab.status !== 'pending' && (
                    <span className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-bold uppercase flex-shrink-0">New</span>
                  )}
                </div>
                <p className="text-xs text-on-surface-variant dark:text-slate-400 pl-4 mb-1">{lab.testName}</p>
                <div className="pl-4 flex items-center justify-between">
                  <span className={'text-[10px] px-2 py-0.5 rounded-full border font-bold ' + cfg.color}>
                    {lang === 'vi' ? cfg.viLabel : cfg.enLabel}
                  </span>
                  <span className="text-[10px] text-on-surface-variant dark:text-slate-500">{lab.room}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail View */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl overflow-hidden">
          {selected ? (
            <>
              <div className={'p-5 border-b border-outline-variant dark:border-slate-800 ' + (selected.status === 'critical' ? 'bg-red-50 dark:bg-red-900/10' : '')}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={'text-[10px] px-2 py-0.5 rounded-full border font-bold ' + statusConfig[selected.status].color}>
                        {lang === 'vi' ? statusConfig[selected.status].viLabel : statusConfig[selected.status].enLabel}
                      </span>
                      {selected.isReviewed && (
                        <span className="text-[10px] text-green-700 dark:text-green-400 font-semibold flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[12px]">check_circle</span>
                          {lang === 'vi' ? 'Đã xem xét' : 'Reviewed'}
                        </span>
                      )}
                    </div>
                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface dark:text-white">{selected.testName}</h3>
                    <p className="text-xs text-on-surface-variant dark:text-slate-400 mt-0.5">
                      {selected.patient} ({selected.patientId}) · {selected.room}
                    </p>
                    <p className="text-xs text-on-surface-variant dark:text-slate-500 mt-1">
                      {lang === 'vi' ? 'Chỉ định: ' : 'Ordered by: '}{selected.orderedBy} · {selected.orderedAt}
                    </p>
                  </div>
                  {!selected.isReviewed && selected.status !== 'pending' && (
                    <button
                      onClick={() => handleMarkReviewed(selected.id)}
                      className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs bg-primary text-white rounded-lg hover:bg-primary-container transition-colors font-semibold"
                    >
                      <span className="material-symbols-outlined text-[14px]">visibility</span>
                      {lang === 'vi' ? 'Đánh dấu đã xem' : 'Mark Reviewed'}
                    </button>
                  )}
                </div>
              </div>

              <div className="p-5">
                {selected.status === 'pending' ? (
                  <div className="text-center py-10">
                    <span className="material-symbols-outlined text-[48px] text-outline dark:text-slate-600 mb-3 block animate-pulse">hourglass_top</span>
                    <p className="text-sm text-on-surface-variant dark:text-slate-400">
                      {lang === 'vi' ? 'Kết quả đang được xử lý tại phòng xét nghiệm...' : 'Results are being processed at the laboratory...'}
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-xs font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-wide mb-3">
                      {lang === 'vi' ? 'Kết quả chi tiết' : 'Detailed Results'}
                      {selected.resultAt && (
                        <span className="font-normal normal-case ml-2 tracking-normal">· {lang === 'vi' ? 'Trả KQ: ' : 'Resulted: '}{selected.resultAt}</span>
                      )}
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-outline-variant dark:border-slate-700 text-xs text-on-surface-variant dark:text-slate-400 text-left">
                            <th className="pb-2 pr-4 font-semibold">{lang === 'vi' ? 'Thông số' : 'Parameter'}</th>
                            <th className="pb-2 pr-4 font-semibold">{lang === 'vi' ? 'Kết quả' : 'Result'}</th>
                            <th className="pb-2 pr-4 font-semibold">{lang === 'vi' ? 'Đơn vị' : 'Unit'}</th>
                            <th className="pb-2 font-semibold">{lang === 'vi' ? 'Tham chiếu' : 'Reference'}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant dark:divide-slate-800">
                          {selected.results.map((res, i) => (
                            <tr key={i}>
                              <td className="py-2.5 pr-4 text-on-surface dark:text-slate-200 text-xs">{res.param}</td>
                              <td className={'py-2.5 pr-4 text-sm font-bold ' + (flagStyle[res.flag] || flagStyle[''])}>
                                {res.value}
                                {res.flag && <span className="ml-1 text-[10px]">{res.flag}</span>}
                              </td>
                              <td className="py-2.5 pr-4 text-xs text-on-surface-variant dark:text-slate-400">{res.unit}</td>
                              <td className="py-2.5 text-xs text-on-surface-variant dark:text-slate-400">{res.ref}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {selected.status === 'critical' && (
                      <div className="mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-3 flex items-start gap-2">
                        <span className="material-symbols-outlined text-error text-[18px] mt-0.5">emergency</span>
                        <div>
                          <p className="text-xs font-bold text-error">{lang === 'vi' ? 'Giá trị nguy kịch — Báo cáo ngay cho bác sĩ phụ trách' : 'Critical Values — Notify attending physician immediately'}</p>
                          <p className="text-[10px] text-red-600 dark:text-red-400 mt-0.5">{lang === 'vi' ? 'Theo quy trình báo cáo kết quả nguy kịch của bệnh viện (Mã QT-XN-05)' : 'Per hospital critical value reporting protocol (Code QT-XN-05)'}</p>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center p-8">
              <span className="material-symbols-outlined text-[48px] text-outline dark:text-slate-600 mb-3">biotech</span>
              <p className="text-sm text-on-surface-variant dark:text-slate-400">
                {lang === 'vi' ? 'Chọn kết quả xét nghiệm để xem chi tiết' : 'Select a lab result to view details'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
