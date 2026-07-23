import React, { useState, useEffect, useCallback } from 'react';
import prescriptionService from '../../../../shared/services/prescriptionService';

const statusConfig = {
  PENDING_DISPENSE: { viLabel: 'Chờ duyệt', enLabel: 'Pending', color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700' },
  DISPENSED: { viLabel: 'Đã cấp phát', enLabel: 'Dispensed', color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700' },
  CANCELLED: { viLabel: 'Đã hủy', enLabel: 'Cancelled', color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700' },
};

const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

export default function PharmacistPendingRxTab({ lang, t, token }) {
  const [prescriptions, setPrescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('PENDING_DISPENSE');
  const [expandedId, setExpandedId] = useState(null);
  const [actionSuccess, setActionSuccess] = useState('');
  const [actionError, setActionError] = useState('');

  const activeToken = token || localStorage.getItem('token');

  const fetchPrescriptions = useCallback(async () => {
    if (!activeToken) return;
    setIsLoading(true);
    setActionError('');
    try {
      const data = await prescriptionService.getPendingPrescriptions(activeToken, filterStatus === 'ALL' ? '' : filterStatus);
      setPrescriptions(Array.isArray(data) ? data : []);
      if (data && data.length > 0 && !expandedId) {
        setExpandedId(data[0].id);
      }
    } catch (err) {
      console.error('Fetch pending prescriptions error:', err);
      setActionError(err.message || (lang === 'vi' ? 'Không thể tải danh sách đơn thuốc.' : 'Failed to fetch prescriptions.'));
    } finally {
      setIsLoading(false);
    }
  }, [activeToken, filterStatus, lang]);

  useEffect(() => {
    fetchPrescriptions();
  }, [fetchPrescriptions]);

  const handleDispense = async (rxId) => {
    if (!activeToken) return;
    setActionError('');
    setActionSuccess('');
    try {
      await prescriptionService.dispensePrescription(activeToken, rxId);
      setActionSuccess(lang === 'vi' ? `Đã xác nhận phát đơn thuốc #${rxId} và tự động trừ số lượng tồn kho!` : `Prescription #${rxId} dispensed & stock deducted successfully!`);
      setTimeout(() => setActionSuccess(''), 4000);
      fetchPrescriptions();
    } catch (err) {
      console.error('Dispense error:', err);
      setActionError(err.message || (lang === 'vi' ? 'Lỗi khi duyệt phát thuốc.' : 'Failed to dispense prescription.'));
    }
  };

  const pendingCount = prescriptions.filter(p => p.status === 'PENDING_DISPENSE').length;
  const dispensedCount = prescriptions.filter(p => p.status === 'DISPENSED').length;

  return (
    <div className="space-y-6 text-left">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface dark:text-white">
            {lang === 'vi' ? 'Đơn Thuốc Chờ Duyệt & Cấp Phát' : 'Pending Prescriptions'}
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 mt-1">
            {lang === 'vi' ? 'Xem xét, duyệt và cấp phát đơn thuốc điện tử từ bác sĩ thời gian thực' : 'Review, approve and dispense electronic prescriptions from doctors'}
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg px-4 py-2 text-center">
            <p className="text-2xl font-black text-amber-700 dark:text-amber-300">{pendingCount}</p>
            <p className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wide">{lang === 'vi' ? 'Chờ phát' : 'Pending'}</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg px-4 py-2 text-center">
            <p className="text-2xl font-black text-green-700 dark:text-green-300">{dispensedCount}</p>
            <p className="text-[10px] text-green-600 dark:text-green-400 font-semibold uppercase tracking-wide">{lang === 'vi' ? 'Đã phát' : 'Dispensed'}</p>
          </div>
        </div>
      </div>

      {/* SUCCESS / ERROR ALERTS */}
      {actionSuccess && (
        <div className="bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 text-green-800 dark:text-green-200 rounded-xl p-4 flex items-center gap-2 text-sm font-semibold">
          <span className="material-symbols-outlined">check_circle</span>
          {actionSuccess}
        </div>
      )}
      {actionError && (
        <div className="bg-error-container/20 border border-error/30 text-error rounded-xl p-4 flex items-center gap-2 text-sm">
          <span className="material-symbols-outlined">warning</span>
          {actionError}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-outline-variant dark:border-slate-800 pb-1">
        {[
          { key: 'PENDING_DISPENSE', viLabel: 'Chờ cấp phát', enLabel: 'Pending Dispense' },
          { key: 'DISPENSED', viLabel: 'Đã cấp phát', enLabel: 'Dispensed' },
          { key: 'ALL', viLabel: 'Tất cả đơn', enLabel: 'All Prescriptions' },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilterStatus(f.key)}
            className={'px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors ' + (filterStatus === f.key ? 'bg-primary text-white shadow-xs' : 'text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800')}
          >
            {lang === 'vi' ? f.viLabel : f.enLabel}
          </button>
        ))}
      </div>

      {/* Prescription Cards List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-16 text-primary">
            <span className="material-symbols-outlined animate-spin text-[36px] mr-2">sync</span>
            <span className="text-sm font-semibold">{lang === 'vi' ? 'Đang tải đơn thuốc...' : 'Loading prescriptions...'}</span>
          </div>
        ) : prescriptions.length === 0 ? (
          <div className="py-16 text-center text-on-surface-variant dark:text-slate-400 bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl">
            <span className="material-symbols-outlined text-[48px] text-slate-300 dark:text-slate-600 mb-2">prescriptions</span>
            <p className="text-sm font-semibold">{lang === 'vi' ? 'Không có đơn thuốc nào trong danh mục này.' : 'No prescriptions in this queue.'}</p>
          </div>
        ) : (
          prescriptions.map(rx => {
            const cfg = statusConfig[rx.status] || statusConfig.PENDING_DISPENSE;
            const isExpanded = expandedId === rx.id;
            const isPending = rx.status === 'PENDING_DISPENSE';

            return (
              <div
                key={rx.id}
                className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl overflow-hidden shadow-xs transition-all"
              >
                {/* Card Header */}
                <div
                  className="p-4 cursor-pointer flex items-center justify-between gap-4 hover:bg-surface-container-low/40 dark:hover:bg-slate-800/40"
                  onClick={() => setExpandedId(isExpanded ? null : rx.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-fixed-dim flex items-center justify-center font-bold text-sm">
                      #{rx.id}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-on-surface dark:text-white">
                          {rx.patient?.fullName || (lang === 'vi' ? 'Bệnh nhân' : 'Patient')}
                        </h4>
                        <span className={'text-[10px] px-2 py-0.5 rounded-full font-bold border ' + cfg.color}>
                          {lang === 'vi' ? cfg.viLabel : cfg.enLabel}
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant dark:text-slate-400 mt-0.5">
                        {lang === 'vi' ? 'BS chỉ định:' : 'By:'} {rx.doctor?.fullName || 'BS. Phòng khám'} · {formatDate(rx.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {rx.totalAmount > 0 && (
                      <span className="text-sm font-bold text-primary dark:text-primary-fixed-dim hidden sm:inline">
                        {Number(rx.totalAmount).toLocaleString('vi-VN')} VNĐ
                      </span>
                    )}
                    <span className="material-symbols-outlined text-slate-400">
                      {isExpanded ? 'expand_less' : 'expand_more'}
                    </span>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="p-4 border-t border-outline-variant dark:border-slate-800 bg-surface-container-lowest dark:bg-slate-800/30 space-y-4 text-xs">
                    {/* Prescription Items Table */}
                    <div>
                      <h5 className="font-bold text-on-surface dark:text-white mb-2 uppercase text-[10px] tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-primary">medication</span>
                        {lang === 'vi' ? 'Danh Mục Thuốc Kê Đơn' : 'Prescription Items'}
                      </h5>
                      <div className="border border-outline-variant dark:border-slate-700 rounded-lg overflow-hidden">
                        <table className="w-full text-left border-collapse">
                          <thead className="bg-surface-container-low dark:bg-slate-800 font-bold text-[10px] uppercase text-on-surface-variant dark:text-slate-400 border-b border-outline-variant dark:border-slate-700">
                            <tr>
                              <th className="p-2.5">Tên Thuốc</th>
                              <th className="p-2.5 text-center">Số Lượng</th>
                              <th className="p-2.5">Liều Dùng & Hướng Dẫn</th>
                              <th className="p-2.5 text-right">Đơn Giá</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-outline-variant/60 dark:divide-slate-800">
                            {rx.items && rx.items.map((item, idx) => (
                              <tr key={idx}>
                                <td className="p-2.5 font-bold text-on-surface dark:text-white">
                                  {item.medicineName} <span className="font-normal text-slate-400 text-[10px]">({item.unit})</span>
                                </td>
                                <td className="p-2.5 text-center font-bold text-primary dark:text-primary-fixed-dim">{item.quantity}</td>
                                <td className="p-2.5 text-on-surface-variant dark:text-slate-300">
                                  <p className="font-medium">{item.dosage || 'Theo chỉ định'}</p>
                                  <p className="text-[10px] text-slate-400">{item.instructions || ''}</p>
                                </td>
                                <td className="p-2.5 text-right font-medium">
                                  {Number(item.price || 0).toLocaleString('vi-VN')} đ
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between pt-2 border-t border-outline-variant dark:border-slate-700">
                      <div className="text-on-surface-variant dark:text-slate-400 text-[11px]">
                        <span>Tổng tiền đơn thuốc: </span>
                        <span className="font-bold text-sm text-on-surface dark:text-white ml-1">
                          {Number(rx.totalAmount || 0).toLocaleString('vi-VN')} VNĐ
                        </span>
                      </div>

                      {isPending ? (
                        <button
                          onClick={() => handleDispense(rx.id)}
                          className="flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-xs shadow-xs transition-all active:scale-95"
                        >
                          <span className="material-symbols-outlined text-[16px]">task_alt</span>
                          {lang === 'vi' ? 'Xác Nhận Phát Thuốc' : 'Dispense Prescription'}
                        </button>
                      ) : (
                        <span className="text-xs text-green-600 dark:text-green-400 font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">check_circle</span>
                          {lang === 'vi' ? `Đã phát thuốc (${formatDate(rx.dispensedAt)})` : 'Dispensed'}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
