import React from 'react';

export default function PatientBillingTab({ lang, t }) {
  const invoices = [
    {
      date: '05/10/2023',
      name: lang === 'vi' ? 'Khám Nội Tổng Quát' : 'General Internal Medicine Consultation',
      subtext: lang === 'vi' ? 'Mã BN: #PC-9921 | BS. Trần Thị B' : 'Patient ID: #PC-9921 | Dr. Tran Thi B',
      total: '1,250,000 ₫',
      status: 'pending',
      statusText: lang === 'vi' ? 'Đang chờ xử lý' : 'Pending Verification'
    },
    {
      date: '28/09/2023',
      name: lang === 'vi' ? 'Xét nghiệm máu & Nước tiểu' : 'Blood & Urine Labs Panel',
      subtext: lang === 'vi' ? 'Khoa Xét nghiệm | Mã dịch vụ: LAB-404' : 'Department of Laboratory | Service ID: LAB-404',
      total: '800,000 ₫',
      status: 'paid',
      statusText: lang === 'vi' ? 'Đã chi trả 100%' : '100% Covered'
    },
    {
      date: '15/09/2023',
      name: lang === 'vi' ? 'Chụp MRI Cột sống' : 'MRI Spinal Column Scan',
      subtext: lang === 'vi' ? 'Chẩn đoán hình ảnh | BS. Lê Văn C' : 'Medical Imaging | Dr. Le Van C',
      total: '4,500,000 ₫',
      status: 'self',
      statusText: lang === 'vi' ? 'BN tự túc' : 'Self-Pay'
    }
  ];

  const paymentHistory = [
    {
      id: '#INV-2023-088',
      title: lang === 'vi' ? 'Thanh toán hóa đơn #INV-2023-088' : 'Payment for Invoice #INV-2023-088',
      date: lang === 'vi' ? '20/09/2023 • Thẻ Visa (...4242)' : 'Sep 20, 2023 • Visa Card (...4242)',
      amount: '- 1,120,000 ₫'
    },
    {
      id: '#INV-2023-045',
      title: lang === 'vi' ? 'Thanh toán hóa đơn #INV-2023-045' : 'Payment for Invoice #INV-2023-045',
      date: lang === 'vi' ? '05/08/2023 • Tiền mặt' : 'Aug 05, 2023 • Cash Payment',
      amount: '- 2,300,000 ₫'
    }
  ];

  return (
    <div className="space-y-lg text-left">
      
      {/* HEADER */}
      <header className="flex flex-col sm:flex-row justify-between sm:items-end gap-md">
        <div>
          <h1 className="font-headline-xl text-headline-xl text-primary dark:text-primary-fixed-dim">
            {lang === 'vi' ? 'Thanh toán & Hóa đơn' : 'Billing & Invoices'}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-slate-400">
            {lang === 'vi' ? 'Quản lý các khoản chi phí y tế và bảo hiểm của bạn.' : 'Manage your clinical co-payments, insurance policies, and receipts.'}
          </p>
        </div>
        <button 
          onClick={() => alert(lang === 'vi' ? 'Mở quản lý cổng thanh toán...' : 'Opening payment methods configurations...')}
          className="flex items-center gap-sm text-primary dark:text-primary-fixed-dim font-label-md text-label-md hover:underline bg-transparent border-none cursor-pointer"
        >
          <span className="material-symbols-outlined">credit_card</span>
          {lang === 'vi' ? 'Quản lý phương thức thanh toán' : 'Manage Payment Methods'}
        </button>
      </header>

      {/* Summary Bento Grid */}
      <section className="grid grid-cols-12 gap-gutter">
        
        {/* Outstanding Balance */}
        <div className="col-span-12 md:col-span-4 bg-white dark:bg-slate-800 p-lg rounded-xl border border-outline-variant dark:border-slate-700 flex flex-col justify-between shadow-sm">
          <div>
            <span className="font-label-md text-label-md text-on-surface-variant dark:text-slate-400 uppercase tracking-wider">
              {lang === 'vi' ? 'Tổng dư nợ hiện tại' : 'Outstanding Balance'}
            </span>
            <h2 className="font-headline-xl text-headline-xl text-error mt-sm">2,450,000 ₫</h2>
          </div>
          <div className="mt-md flex items-center gap-sm text-body-sm text-on-surface-variant dark:text-slate-400">
            <span className="material-symbols-outlined text-error">info</span>
            {lang === 'vi' ? 'Hạn thanh toán: 15/10/2023' : 'Due date: Oct 15, 2023'}
          </div>
        </div>

        {/* Recent Payment */}
        <div className="col-span-12 md:col-span-4 bg-white dark:bg-slate-800 p-lg rounded-xl border border-outline-variant dark:border-slate-700 flex flex-col justify-between shadow-sm">
          <div>
            <span className="font-label-md text-label-md text-on-surface-variant dark:text-slate-400 uppercase tracking-wider">
              {lang === 'vi' ? 'Thanh toán gần nhất' : 'Recent Payment'}
            </span>
            <h2 className="font-headline-xl text-headline-xl text-secondary dark:text-teal-400 mt-sm">1,120,000 ₫</h2>
          </div>
          <div className="mt-md flex items-center gap-sm text-body-sm text-on-surface-variant dark:text-slate-400">
            <span className="material-symbols-outlined text-secondary dark:text-teal-400">check_circle</span>
            {lang === 'vi' ? 'Ngày 20/09/2023 qua Visa ****4242' : 'On Sep 20, 2023 via Visa ****4242'}
          </div>
        </div>

        {/* Insurance Coverage */}
        <div className="col-span-12 md:col-span-4 bg-surface-container-low dark:bg-slate-900/60 p-lg rounded-xl border border-outline-variant dark:border-slate-700 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <span className="font-label-md text-label-md text-on-surface-variant dark:text-slate-400 uppercase tracking-wider">
                {lang === 'vi' ? 'Bảo hiểm chi trả (YTD)' : 'Insurance Coverage (YTD)'}
              </span>
              <span className="bg-primary-container text-white px-sm py-[2px] rounded text-[10px] font-bold">PREMIUM</span>
            </div>
            <h2 className="font-headline-xl text-headline-xl text-primary dark:text-primary-fixed-dim mt-sm">15,800,000 ₫</h2>
          </div>
          <div className="mt-md">
            <div className="w-full bg-surface-variant dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-primary dark:bg-primary-fixed-dim h-full" style={{ width: '75%' }}></div>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 mt-sm">
              {lang === 'vi' ? 'Đã sử dụng 75% hạn mức năm' : 'Used 75% of yearly allocation limits'}
            </p>
          </div>
        </div>
      </section>

      {/* Main Invoice Table Container */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-outline-variant dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="px-lg py-md border-b border-outline-variant dark:border-slate-700 flex justify-between items-center bg-surface-container-low dark:bg-slate-900/50">
          <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white">
            {lang === 'vi' ? 'Danh sách hóa đơn chi tiết' : 'Detailed Invoices Statement'}
          </h3>
          <div className="flex gap-sm">
            <button 
              onClick={() => alert('Lọc theo ngày...')}
              className="px-md py-xs border border-outline-variant dark:border-slate-700 rounded-lg text-body-sm hover:bg-surface-container-low dark:hover:bg-slate-700 bg-white dark:bg-slate-800 text-on-surface dark:text-white transition-colors"
            >
              {lang === 'vi' ? 'Lọc theo ngày' : 'Filter Date'}
            </button>
            <button 
              onClick={() => alert('Xuất file Excel...')}
              className="px-md py-xs border border-outline-variant dark:border-slate-700 rounded-lg text-body-sm hover:bg-surface-container-low dark:hover:bg-slate-700 bg-white dark:bg-slate-800 text-on-surface dark:text-white transition-colors"
            >
              {lang === 'vi' ? 'Xuất Excel' : 'Export Sheet'}
            </button>
          </div>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse text-body-md">
            <thead>
              <tr className="bg-surface-container-low dark:bg-slate-900 border-b border-outline-variant dark:border-slate-700 text-on-surface-variant dark:text-slate-400 font-label-md text-label-md uppercase">
                <th className="px-lg py-md">{lang === 'vi' ? 'NGÀY' : 'DATE'}</th>
                <th className="px-lg py-md">{lang === 'vi' ? 'DỊCH VỤ / LẦN KHÁM' : 'SERVICE / EXAM VISIT'}</th>
                <th className="px-lg py-md text-right">{lang === 'vi' ? 'TỔNG TIỀN' : 'SUBTOTAL'}</th>
                <th className="px-lg py-md">{lang === 'vi' ? 'TRẠNG THÁI BẢO HIỂM' : 'INSURANCE STATUS'}</th>
                <th className="px-lg py-md text-right pr-6">{lang === 'vi' ? 'THAO TÁC' : 'ACTIONS'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/60 dark:divide-slate-700 text-on-surface dark:text-slate-200">
              {invoices.map((inv, index) => {
                return (
                  <tr key={index} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                    <td className="px-lg py-md font-data-mono">{inv.date}</td>
                    <td className="px-lg py-md">
                      <p className="font-semibold text-on-surface dark:text-white">{inv.name}</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400">{inv.subtext}</p>
                    </td>
                    <td className="px-lg py-md font-data-mono text-right font-bold text-primary dark:text-primary-fixed-dim">{inv.total}</td>
                    <td className="px-lg py-md">
                      {inv.status === 'pending' && (
                        <span className="inline-flex items-center gap-xs px-sm py-xs rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-400 text-[11px] font-bold uppercase">
                          <span className="material-symbols-outlined text-[14px]">pending</span> {inv.statusText}
                        </span>
                      )}
                      {inv.status === 'paid' && (
                        <span className="inline-flex items-center gap-xs px-sm py-xs rounded bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-400 text-[11px] font-bold uppercase">
                          <span className="material-symbols-outlined text-[14px]">check_circle</span> {inv.statusText}
                        </span>
                      )}
                      {inv.status === 'self' && (
                        <span className="inline-flex items-center gap-xs px-sm py-xs rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-400 text-[11px] font-bold uppercase">
                          <span className="material-symbols-outlined text-[14px]">account_balance_wallet</span> {inv.statusText}
                        </span>
                      )}
                    </td>
                    <td className="px-lg py-md text-right pr-6 space-x-md">
                      {inv.status === 'pending' ? (
                        <>
                          <button 
                            onClick={() => alert('Mở hóa đơn PDF...')}
                            className="text-primary dark:text-primary-fixed-dim hover:underline text-body-sm font-semibold bg-transparent border-none cursor-pointer"
                          >
                            {lang === 'vi' ? 'Xem PDF' : 'View PDF'}
                          </button>
                          <button 
                            onClick={() => alert('Mở cổng thanh toán VNPay...')}
                            className="bg-primary text-white px-md py-xs rounded font-label-md text-label-md hover:opacity-90 transition-all active:scale-95 border-none cursor-pointer"
                          >
                            {lang === 'vi' ? 'Thanh toán ngay' : 'Pay Now'}
                          </button>
                        </>
                      ) : (
                        <button 
                          onClick={() => alert('Mở biên lai thanh toán...')}
                          className="text-primary dark:text-primary-fixed-dim hover:underline text-body-sm font-semibold bg-transparent border-none cursor-pointer"
                        >
                          {lang === 'vi' ? 'Xem biên lai' : 'View Receipt'}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lower Layout: History & Payment Methods */}
      <div className="grid grid-cols-12 gap-lg">
        
        {/* Payment History */}
        <div className="col-span-12 lg:col-span-8 bg-white dark:bg-slate-800 rounded-xl border border-outline-variant dark:border-slate-700 shadow-sm p-lg">
          <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white mb-md">
            {lang === 'vi' ? 'Lịch sử thanh toán' : 'Transaction History'}
          </h3>
          <div className="space-y-sm">
            {paymentHistory.map((hist) => {
              return (
                <div key={hist.id} className="flex items-center justify-between p-md bg-surface-container-low dark:bg-slate-900 rounded-lg border border-outline-variant/30 dark:border-slate-700">
                  <div className="flex items-center gap-md">
                    <div className="w-10 h-10 rounded-full bg-secondary-container dark:bg-teal-950 flex items-center justify-center text-on-secondary-container dark:text-teal-400 shrink-0">
                      <span className="material-symbols-outlined">receipt_long</span>
                    </div>
                    <div>
                      <p className="font-body-md text-body-md font-bold text-on-surface dark:text-white">{hist.title}</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400">{hist.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-data-mono text-body-md font-bold text-secondary dark:text-teal-400">{hist.amount}</p>
                    <button 
                      onClick={() => alert(`Xem chi tiết giao dịch ${hist.id}...`)}
                      className="text-body-sm text-primary dark:text-primary-fixed-dim hover:underline bg-transparent border-none cursor-pointer"
                    >
                      {lang === 'vi' ? 'Chi tiết' : 'Details'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Card Sidebar */}
        <div className="col-span-12 lg:col-span-4 bg-primary dark:bg-slate-950 text-white p-lg rounded-xl shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[220px]">
          <div className="relative z-10 space-y-lg w-full">
            <div className="flex justify-between items-center w-full">
              <span className="material-symbols-outlined text-headline-xl text-white">contactless</span>
              <span className="font-label-md text-label-md opacity-70">
                {lang === 'vi' ? 'PHƯƠNG THỨC MẶC ĐỊNH' : 'DEFAULT PAYMENT METHOD'}
              </span>
            </div>
            <div>
              <p className="font-data-mono text-headline-md tracking-widest text-white">•••• •••• •••• 4242</p>
              <div className="flex justify-between mt-md text-left">
                <div>
                  <p className="text-[10px] uppercase opacity-60">{lang === 'vi' ? 'Chủ thẻ' : 'Cardholder'}</p>
                  <p className="font-body-md text-white font-semibold">NGUYEN VAN A</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase opacity-60">{lang === 'vi' ? 'Hết hạn' : 'Expiry'}</p>
                  <p className="font-body-md text-white font-semibold">09/25</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => alert(lang === 'vi' ? 'Mở biểu mẫu cập nhật thông tin thẻ...' : 'Opening credit card update forms...')}
              className="w-full bg-white text-primary dark:text-slate-900 py-sm rounded-lg font-bold text-body-md hover:bg-opacity-90 active:scale-95 transition-all border-none cursor-pointer"
            >
              {lang === 'vi' ? 'Cập nhật thông tin thẻ' : 'Update Card Details'}
            </button>
          </div>
          {/* Abstract Background Pattern */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-primary-container dark:bg-slate-900 rounded-full opacity-20 pointer-events-none"></div>
        </div>

      </div>

    </div>
  );
}
