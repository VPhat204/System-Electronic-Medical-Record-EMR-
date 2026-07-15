import React from 'react';

export default function ReceptionistBillingTab({
  lang,
  t,
  invoices,
  setInvoices,
  billingWaitingCount,
  setBillingWaitingCount,
  billingInsWaitingCount,
  dailyRevAmount,
  billingTabFilter,
  setBillingTabFilter,
  filteredInvoices,
  selectedInvoice,
  setSelectedInvoice,
  discountPercent,
  setDiscountPercent,
  paymentMethod,
  setPaymentMethod,
  calculateBillingTotal,
  handleConfirmInvoicePayment,
  handleApplyDiscount,
  recentTransactions,
  handlePrintVATInvoiceLog,
}) {
  return (
    <>
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-md text-left">
        <div>
          <h3 className="font-headline-xl text-headline-xl text-on-surface dark:text-white">{t.billingTitle}</h3>
          <p className="text-on-surface-variant dark:text-slate-400">{t.billingSubtitle}</p>
        </div>
        <div className="flex gap-sm">
          <button
            onClick={() => alert(lang === 'vi' ? 'Đang khởi tạo tải báo cáo kết toán tài chính...' : 'Preparing accounting financial billing summary...')}
            className="flex items-center gap-xs px-md py-sm border border-outline dark:border-slate-700 text-primary dark:text-primary-fixed-dim font-bold rounded hover:bg-surface-container dark:hover:bg-slate-800 transition-colors active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[20px]">receipt_long</span>
            {t.exportInvoiceBtn}
          </button>
          <button
            onClick={() => {
              const name = prompt(lang === 'vi' ? 'Nhập tên bệnh nhân:' : 'Enter patient name:');
              const amt = prompt(lang === 'vi' ? 'Nhập số tiền hóa đơn mới (VNĐ):' : 'Enter amount ($):');
              if (!name || !amt) return;
              const newBill = {
                id: Date.now(),
                patientName: name,
                mrn: `BN-2023-${Math.floor(1000 + Math.random() * 9000)}`,
                service: lang === 'vi' ? 'Khám lâm sàng nâng cao' : 'Advanced Consultation Workup',
                total: parseInt(amt) || 500000,
                status: 'Chưa trả',
                statusEn: 'Unpaid',
                insurance: 'N/A',
                fees: { exam: parseInt(amt) || 500000, lab: 0 }
              };
              setInvoices([newBill, ...invoices]);
              setBillingWaitingCount(w => w + 1);
              alert(lang === 'vi' ? 'Khởi tạo hóa đơn thu phí mới thành công!' : 'Successfully initialized new pending invoice record!');
            }}
            className="flex items-center gap-xs px-md py-sm bg-primary text-white font-bold rounded hover:bg-primary-container transition-colors shadow-xs active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            {t.newPaymentBtn}
          </button>
        </div>
      </div>

      {/* Dashboard Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg text-left">
        <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-md rounded-xl flex flex-col gap-xs shadow-xs">
          <span className="text-body-sm text-on-surface-variant dark:text-slate-400 font-bold uppercase tracking-wider">{t.pendingInvoiceLabel}</span>
          <div className="flex items-end justify-between">
            <span className="font-headline-lg text-headline-lg text-on-surface dark:text-white">{billingWaitingCount}</span>
            <span className="text-tertiary dark:text-amber-500 text-body-sm font-bold">{lang === 'vi' ? '+3 hôm nay' : '+3 today'}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-md rounded-xl flex flex-col gap-xs shadow-xs">
          <span className="text-body-sm text-on-surface-variant dark:text-slate-400 font-bold uppercase tracking-wider">{t.pendingInsuranceLabel}</span>
          <div className="flex items-end justify-between">
            <span className="font-headline-lg text-headline-lg text-on-surface dark:text-white">{billingInsWaitingCount}</span>
            <span className="text-primary dark:text-primary-fixed-dim text-body-sm font-bold">~15.4M VND</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-md rounded-xl flex flex-col gap-xs shadow-xs">
          <span className="text-body-sm text-on-surface-variant dark:text-slate-400 font-bold uppercase tracking-wider">{t.dailyRevenueLabel}</span>
          <div className="flex items-end justify-between">
            <span className="font-headline-lg text-headline-lg text-on-surface dark:text-white">
              {dailyRevAmount.toLocaleString('vi-VN')}
            </span>
            <span className="text-secondary dark:text-teal-400 text-body-sm font-bold">VND</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-md rounded-xl flex flex-col gap-xs shadow-xs">
          <span className="text-body-sm text-on-surface-variant dark:text-slate-400 font-bold uppercase tracking-wider">{t.completionRateLabel}</span>
          <div className="flex items-end justify-between">
            <span className="font-headline-lg text-headline-lg text-on-surface dark:text-white">94%</span>
            <span className="bg-green-500/10 text-green-500 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">GOOD</span>
          </div>
        </div>
      </div>

      {/* Main table grid and checkout sidebar split */}
      <div className="grid grid-cols-12 gap-lg items-start">

        <section className="col-span-12 lg:col-span-8 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden shadow-xs text-left">
          <div className="px-md py-sm border-b border-outline-variant dark:border-slate-700 bg-surface-container-low dark:bg-slate-900/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md">
            <h4 className="font-headline-md text-headline-md text-on-surface dark:text-white">{t.pendingInvoicesSection}</h4>
            <div className="flex gap-xs bg-surface-container-high dark:bg-slate-700 p-0.5 rounded">
              {['Tất cả', 'Chưa thanh toán', 'Bảo hiểm'].map((filKey) => {
                const isAct = billingTabFilter === filKey;
                const labelMap = lang === 'vi' ? filKey : (
                  filKey === 'Tất cả' ? t.allTab :
                    filKey === 'Chưa thanh toán' ? t.unpaidTab : t.insuranceTab
                );
                return (
                  <span
                    key={filKey}
                    onClick={() => setBillingTabFilter(filKey)}
                    className={`px-sm py-1 rounded text-body-sm cursor-pointer transition-all ${isAct
                      ? 'bg-white dark:bg-slate-700 font-bold text-primary dark:text-white shadow-xs'
                      : 'text-on-surface-variant dark:text-slate-400 hover:text-on-surface'
                      }`}
                  >
                    {labelMap}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low dark:bg-slate-900 border-b border-outline-variant dark:border-slate-700">
                  <th className="px-md py-4 font-bold text-on-surface-variant dark:text-slate-300 text-body-sm uppercase">{t.patientCol}</th>
                  <th className="px-md py-4 font-bold text-on-surface-variant dark:text-slate-300 text-body-sm uppercase">{t.serviceCol}</th>
                  <th className="px-md py-4 font-bold text-on-surface-variant dark:text-slate-300 text-body-sm uppercase">{t.totalCol}</th>
                  <th className="px-md py-4 font-bold text-on-surface-variant dark:text-slate-300 text-body-sm uppercase">{t.statusCol}</th>
                  <th className="px-md py-4 font-bold text-on-surface-variant dark:text-slate-300 text-body-sm uppercase">{t.insuranceCol}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant dark:divide-slate-700/60 text-body-md text-on-surface dark:text-slate-200">
                {filteredInvoices.map((inv, idx) => {
                  const isUnpaid = inv.status === 'Chưa trả';
                  const isBh = inv.status === 'Đang chờ BH';
                  const isOver = inv.status === 'Quá hạn';
                  const isComp = inv.status === 'Hoàn tất';
                  const isSel = selectedInvoice && selectedInvoice.id === inv.id;

                  return (
                    <tr
                      key={inv.id}
                      onClick={() => setSelectedInvoice(inv)}
                      className={`${isSel ? 'bg-primary-fixed/20 dark:bg-slate-700/70 ring-2 ring-primary dark:ring-primary-fixed-dim ring-inset' : (idx % 2 === 1 ? 'bg-slate-50/20 dark:bg-slate-900/10' : 'bg-white dark:bg-slate-800')} hover:bg-surface-container-low dark:hover:bg-slate-700/40 transition-colors group cursor-pointer`}
                    >
                      <td className="px-md py-4">
                        <div className="flex flex-col">
                          <span className="font-bold group-hover:text-primary dark:group-hover:text-primary-fixed-dim transition-colors">{inv.patientName}</span>
                          <span className="text-[11px] text-on-surface-variant dark:text-slate-400">{inv.mrn}</span>
                        </div>
                      </td>
                      <td className="px-md py-4 text-on-surface-variant dark:text-slate-300">{inv.service}</td>
                      <td className="px-md py-4 font-data-mono text-primary dark:text-primary-fixed-dim font-bold">
                        {inv.total.toLocaleString('vi-VN')} ₫
                      </td>
                      <td className="px-md py-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${isComp
                          ? 'bg-secondary-container/20 text-on-secondary-container dark:text-teal-400'
                          : isBh
                            ? 'bg-tertiary-fixed/30 text-tertiary dark:text-amber-500'
                            : 'bg-error-container text-on-error-container'
                          }`}>
                          {lang === 'vi' ? inv.status : (
                            isComp ? t.completedStatus :
                              isBh ? t.pendingBhStatus :
                                isOver ? t.overdueStatus : t.unpaidStatus
                          )}
                        </span>
                      </td>
                      <td className="px-md py-4 font-medium text-on-surface-variant dark:text-slate-300">
                        {inv.insurance === 'N/A' || inv.insurance === 'Cá nhân' ? (
                          <span className="italic opacity-60">
                            {inv.insurance === 'Cá nhân' ? t.individualText : 'N/A'}
                          </span>
                        ) : (
                          <span className="flex items-center gap-xs text-body-sm text-secondary dark:text-teal-400">
                            <span className="material-symbols-outlined text-[16px]">verified</span>
                            {inv.insurance}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-md bg-surface-container-low dark:bg-slate-900 border-t border-outline-variant dark:border-slate-700 flex justify-between items-center text-body-sm text-on-surface-variant dark:text-slate-400">
            <span>
              {t.showingInvoicesText.replace('{count}', filteredInvoices.length.toString()).replace('{total}', invoices.length.toString())}
            </span>
            <div className="flex gap-sm">
              <button className="p-1 hover:bg-surface-container-high dark:hover:bg-slate-800 rounded transition-colors active:scale-95 disabled:opacity-30" disabled>
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <button className="p-1 hover:bg-surface-container-high dark:hover:bg-slate-800 rounded transition-colors active:scale-95">
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        </section>

        <aside className="col-span-12 lg:col-span-4 space-y-lg text-left">
          <section className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg shadow-xs flex flex-col">
            <div className="flex items-center justify-between mb-lg border-b border-outline-variant/30 dark:border-slate-700/50 pb-3">
              <h4 className="font-headline-md text-headline-md text-on-surface dark:text-white">{t.processPaymentHeader}</h4>
              <span className="material-symbols-outlined text-outline dark:text-slate-400">credit_card</span>
            </div>

            {selectedInvoice ? (
              <div className="space-y-md">
                <div className="p-md bg-primary/5 dark:bg-slate-900/60 border border-primary/20 dark:border-slate-700 rounded-lg">
                  <div className="flex justify-between items-start mb-sm">
                    <div>
                      <p className="text-body-sm text-on-surface-variant dark:text-slate-400">{t.selectedInvoiceLabel}</p>
                      <p className="font-bold text-on-surface dark:text-white">{selectedInvoice.mrn} ({selectedInvoice.patientName})</p>
                    </div>
                    <button
                      onClick={() => setSelectedInvoice(null)}
                      className="text-primary dark:text-primary-fixed-dim hover:underline text-body-sm font-bold"
                    >
                      {t.changeBtn}
                    </button>
                  </div>

                  <div className="flex justify-between py-xs border-t border-primary/10 mt-sm text-body-sm">
                    <span className="text-on-surface-variant dark:text-slate-400">{t.examFeeText}</span>
                    <span className="font-data-mono dark:text-white">{(selectedInvoice.fees?.exam || 0).toLocaleString('vi-VN')} ₫</span>
                  </div>
                  <div className="flex justify-between py-xs text-body-sm">
                    <span className="text-on-surface-variant dark:text-slate-400">{t.labFeeText}</span>
                    <span className="font-data-mono dark:text-white">{(selectedInvoice.fees?.lab || 0).toLocaleString('vi-VN')} ₫</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-sm">
                  <div className="flex flex-col gap-xs">
                    <label className="text-label-md text-on-surface-variant dark:text-slate-300 uppercase">{t.discountLabel}</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={discountPercent}
                        onChange={(e) => setDiscountPercent(e.target.value)}
                        className="w-full border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded px-sm py-xs focus:ring-1 focus:ring-primary outline-none dark:text-white text-body-md"
                      />
                      <span className="material-symbols-outlined absolute right-xs top-1/2 -translate-y-1/2 text-outline dark:text-slate-400 text-[16px]">percent</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-xs">
                    <label className="text-label-md text-on-surface-variant dark:text-slate-300 uppercase">{t.methodLabel}</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded px-sm py-xs focus:ring-1 focus:ring-primary outline-none dark:text-white text-body-md"
                    >
                      <option value="Tiền mặt">{t.cashOption}</option>
                      <option value="Chuyển khoản">{t.transferOption}</option>
                      <option value="Thẻ (POS)">{t.cardOption}</option>
                    </select>
                  </div>
                </div>

                <div className="pt-md border-t border-outline-variant dark:border-slate-700">
                  <div className="flex justify-between items-center mb-md">
                    <span className="font-bold text-body-lg dark:text-white">{t.totalLabel}</span>
                    <span className="font-headline-md text-headline-md text-primary dark:text-primary-fixed-dim">
                      {calculateBillingTotal().toLocaleString('vi-VN')} ₫
                    </span>
                  </div>

                  <div className="space-y-sm">
                    <button
                      onClick={handleConfirmInvoicePayment}
                      className="w-full py-md bg-primary hover:bg-primary-container text-white font-bold rounded-lg transition-all active:scale-[0.98] shadow-xs flex justify-center items-center gap-sm"
                    >
                      <span className="material-symbols-outlined">check_circle</span>
                      {t.confirmPaymentBtn}
                    </button>
                    <button
                      type="button"
                      onClick={handleApplyDiscount}
                      className="w-full py-sm border border-outline dark:border-slate-700 text-on-surface-variant dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 font-bold rounded-lg transition-all active:scale-[0.98] flex justify-center items-center gap-sm"
                    >
                      <span className="material-symbols-outlined text-[20px]">sell</span>
                      {t.applyDiscountBtn}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-on-surface-variant dark:text-slate-400">
                <span className="material-symbols-outlined text-[48px] block mb-2 opacity-35">
                  input_indicator
                </span>
                {lang === 'vi' ? 'Vui lòng chọn một hóa đơn từ bảng danh sách bên trái để tiến hành kết toán thu phí.' : 'Select an invoice from the table on the left to begin payment processing.'}
              </div>
            )}
          </section>

          <section className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-md shadow-xs">
            <h4 className="font-label-md text-on-surface-variant dark:text-slate-300 uppercase mb-md tracking-wider">
              {t.recentHistoryHeader}
            </h4>
            <div className="space-y-md">
              {recentTransactions.map(log => {
                return (
                  <div key={log.id} className="flex items-center gap-md">
                    {log.isPrint ? (
                      <div
                        onClick={() => handlePrintVATInvoiceLog(log.id)}
                        className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-outline dark:text-slate-300 cursor-pointer hover:bg-slate-200"
                      >
                        <span className="material-symbols-outlined text-[18px]">print</span>
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-secondary-container/20 text-on-secondary-container dark:text-teal-400 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[18px]">done</span>
                      </div>
                    )}
                    <div className="flex-1 text-left">
                      <p className="text-body-sm font-bold text-on-surface dark:text-white">{log.title}</p>
                      <p className="text-[11px] text-on-surface-variant dark:text-slate-400">{log.subtitle}</p>
                    </div>
                    {log.isPrint ? (
                      <span className="material-symbols-outlined text-outline dark:text-slate-400 text-[16px] cursor-pointer" onClick={() => handlePrintVATInvoiceLog(log.id)}>print</span>
                    ) : (
                      <span className="font-data-mono text-body-sm text-secondary dark:text-teal-400 font-bold">{log.badge}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}
