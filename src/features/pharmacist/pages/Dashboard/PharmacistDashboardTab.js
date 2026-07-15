import React, { useState } from 'react';

export default function PharmacistDashboardTab({ lang, t }) {
  const [queue, setQueue] = useState([
    {
      id: '#BN-4421',
      name: 'Nguyễn Văn Khải',
      med: 'Metformin 500mg',
      dose: lang === 'vi' ? 'Uống sau ăn, 2 lần/ngày' : 'Post-meals, twice daily',
      doctor: 'BS. Trần Mạnh Hùng',
      status: 'PREPARING',
      statusText: 'Đang chuẩn bị'
    },
    {
      id: '#BN-8832',
      name: 'Lê Thị Mai',
      med: 'Lisinopril 10mg',
      dose: lang === 'vi' ? '1 viên vào buổi sáng' : '1 tablet in the morning',
      doctor: 'BS. Julian Reed',
      status: 'PENDING',
      statusText: 'Chờ xử lý'
    },
    {
      id: '#BN-1029',
      name: 'Phạm Minh Đức',
      med: 'Atorvastatin 20mg',
      dose: lang === 'vi' ? '1 viên trước khi ngủ' : '1 tablet before sleep',
      doctor: 'BS. Hoàng Diệu',
      status: 'READY',
      statusText: 'Sẵn sàng'
    }
  ]);

  const [inventory, setInventory] = useState([
    {
      name: 'Amoxicillin 500mg',
      category: lang === 'vi' ? 'KHÁNG SINH' : 'ANTIBIOTIC',
      form: lang === 'vi' ? 'Viên nang' : 'Capsules',
      batch: '#AMX202',
      stock: 42,
      critical: true
    },
    {
      name: 'Amlodipine 5mg',
      category: lang === 'vi' ? 'HUYẾT ÁP' : 'HYPERTENSION',
      form: lang === 'vi' ? 'Viên nén' : 'Tablets',
      batch: '#AML881',
      stock: 1250,
      critical: false
    },
    {
      name: 'Paracetamol 500mg',
      category: lang === 'vi' ? 'GIẢM ĐAU' : 'ANALGESIC',
      form: lang === 'vi' ? 'Viên nén' : 'Tablets',
      batch: '#PRC330',
      stock: 5400,
      critical: false
    },
    {
      name: 'Gliclazide 80mg',
      category: lang === 'vi' ? 'TIỂU ĐƯỜNG' : 'DIABETES',
      form: lang === 'vi' ? 'Viên nén' : 'Tablets',
      batch: '#GLC552',
      stock: 210,
      critical: false
    }
  ]);

  const handleQueueAction = (index) => {
    setQueue(prev => {
      const copy = [...prev];
      const currentStatus = copy[index].status;
      if (currentStatus === 'PENDING') {
        copy[index].status = 'PREPARING';
        copy[index].statusText = lang === 'vi' ? 'Đang chuẩn bị' : 'Preparing';
      } else if (currentStatus === 'PREPARING') {
        copy[index].status = 'READY';
        copy[index].statusText = lang === 'vi' ? 'Sẵn sàng' : 'Ready';
      } else if (currentStatus === 'READY') {
        copy[index].status = 'DELIVERED';
        copy[index].statusText = lang === 'vi' ? 'Đã giao' : 'Delivered';
      }
      return copy;
    });
  };

  const handleRestock = (index) => {
    setInventory(prev => {
      const copy = [...prev];
      copy[index].stock += 500;
      copy[index].critical = false;
      return copy;
    });
    alert(lang === 'vi' ? 'Đã ghi nhận yêu cầu nhập kho thêm 500 đơn vị!' : 'Restock request for 500 units successfully registered!');
  };

  return (
    <div className="space-y-lg text-left">

      {/* Upper Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-md mb-8">
        <div>
          <h2 className="font-headline-xl text-headline-xl text-on-surface dark:text-white">{t.title}</h2>
          <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400">{t.subTitle}</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => alert('Xuất file báo cáo dược phẩm...')}
            className="flex items-center gap-2 px-4 py-2 border border-outline dark:border-slate-700 text-on-surface dark:text-slate-200 font-label-md text-label-md rounded hover:bg-surface-container-high dark:hover:bg-slate-800 bg-transparent transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">file_download</span>
            {t.exportReport}
          </button>
          <button 
            onClick={() => alert('Khởi động quy trình kiểm kê kho y tế...')}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-label-md text-label-md rounded shadow-sm hover:opacity-90 transition-opacity border-none cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">inventory_2</span>
            {t.stockCount}
          </button>
        </div>
      </div>

      {/* 1. STATISTICS OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-outline-variant dark:border-slate-700 flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 bg-primary-container/10 dark:bg-primary-container/20 rounded flex items-center justify-center text-primary dark:text-primary-fixed-dim">
            <span className="material-symbols-outlined text-[32px]">prescriptions</span>
          </div>
          <div>
            <p className="font-label-md text-label-md text-on-surface-variant dark:text-slate-400 uppercase tracking-wider">{t.totalPrescriptions}</p>
            <p className="font-headline-lg text-headline-lg text-on-surface dark:text-white font-bold">142</p>
            <p className="text-[12px] text-secondary dark:text-teal-400 font-medium">+12% {t.vsYesterday}</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-outline-variant dark:border-slate-700 flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 bg-tertiary-fixed/30 dark:bg-amber-900/30 rounded flex items-center justify-center text-tertiary dark:text-amber-400">
            <span className="material-symbols-outlined text-[32px]">hourglass_empty</span>
          </div>
          <div>
            <p className="font-label-md text-label-md text-on-surface-variant dark:text-slate-400 uppercase tracking-wider">{t.pendingVerification}</p>
            <p className="font-headline-lg text-headline-lg text-on-surface dark:text-white font-bold">28</p>
            <p className="text-[12px] text-tertiary dark:text-amber-400 font-medium">{t.avgWait}: 14p</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-outline-variant dark:border-slate-700 flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 bg-error-container/50 dark:bg-red-950/40 rounded flex items-center justify-center text-error dark:text-red-400">
            <span className="material-symbols-outlined text-[32px]">warning</span>
          </div>
          <div>
            <p className="font-label-md text-label-md text-on-surface-variant dark:text-slate-400 uppercase tracking-wider">{t.inventoryWarning}</p>
            <p className="font-headline-lg text-headline-lg text-error dark:text-red-400 font-bold">09</p>
            <p className="text-[12px] text-error dark:text-red-400 font-medium">{t.reorderRequired}</p>
          </div>
        </div>
      </div>

      {/* 2. ALERTS & PRESCRIPTION QUEUE */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-gutter mb-8">
        
        {/* Left: System Alerts */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="font-label-md text-label-md text-on-surface-variant dark:text-slate-400 uppercase mb-2 tracking-wider">
            {t.systemAlerts}
          </h3>
          <div className="p-4 bg-red-50 dark:bg-red-950/20 border-l-4 border-error rounded-r-lg">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-error text-[18px]">emergency</span>
              <span className="font-label-md text-label-md text-error dark:text-red-400 font-bold">
                {t.outOfStock}: Insulin Aspart
              </span>
            </div>
            <p className="text-[12px] text-on-error-container dark:text-slate-300">
              {lang === 'vi' ? 'Còn lại 2 lọ. 15 đơn đang chờ thuốc này.' : '2 vials left. 15 prescriptions pending.'}
            </p>
          </div>
          
          <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border-l-4 border-tertiary rounded-r-lg">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-tertiary text-[18px]">history</span>
              <span className="font-label-md text-label-md text-tertiary dark:text-amber-400 font-bold">
                {t.nearingExpiry}: Amoxicillin
              </span>
            </div>
            <p className="text-[12px] text-on-tertiary-fixed-variant dark:text-slate-400">
              {lang === 'vi' ? 'Lô #AX992 sẽ hết hạn sau 5 ngày.' : 'Batch #AX992 expires in 5 days.'}
            </p>
          </div>
        </div>

        {/* Right: Active Queue Table */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-lg border border-outline-variant dark:border-slate-700 overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-outline-variant dark:border-slate-700 flex justify-between items-center bg-surface-container-low dark:bg-slate-900/50">
            <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold">{t.prescriptionQueue}</h3>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-surface-container-high dark:bg-slate-700 rounded-full text-[12px] font-semibold text-on-surface-variant dark:text-slate-300">
                {t.all} (28)
              </span>
            </div>
          </div>
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse text-body-md">
              <thead>
                <tr className="bg-surface-container-low dark:bg-slate-900 text-on-surface-variant dark:text-slate-400 font-label-md text-label-md border-b border-outline-variant dark:border-slate-700">
                  <th className="px-6 py-3">{t.patient}</th>
                  <th className="px-6 py-3">{t.medicationDose}</th>
                  <th className="px-6 py-3">{t.prescribedBy}</th>
                  <th className="px-6 py-3">{t.status}</th>
                  <th className="px-6 py-3 text-right pr-6">{t.action}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/60 dark:divide-slate-700 text-on-surface dark:text-slate-200">
                {queue.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-label-md text-label-md text-on-surface dark:text-white font-semibold">{item.name}</p>
                      <p className="text-[11px] text-on-surface-variant dark:text-slate-400">{item.id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-label-md text-label-md text-on-surface dark:text-white font-semibold">{item.med}</p>
                      <p className="text-[11px] text-on-surface-variant dark:text-slate-400">{item.dose}</p>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant dark:text-slate-400">{item.doctor}</td>
                    <td className="px-6 py-4">
                      {item.status === 'PREPARING' && (
                        <span className="px-2 py-1 bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 text-[11px] font-bold rounded uppercase tracking-wider">
                          {item.statusText}
                        </span>
                      )}
                      {item.status === 'PENDING' && (
                        <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700/60 text-slate-800 dark:text-slate-300 text-[11px] font-bold rounded uppercase tracking-wider">
                          {item.statusText}
                        </span>
                      )}
                      {item.status === 'READY' && (
                        <span className="px-2 py-1 bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-400 text-[11px] font-bold rounded uppercase tracking-wider">
                          {item.statusText}
                        </span>
                      )}
                      {item.status === 'DELIVERED' && (
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-950/60 text-green-800 dark:text-green-400 text-[11px] font-bold rounded uppercase tracking-wider">
                          {item.statusText}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right pr-6">
                      {item.status !== 'DELIVERED' && (
                        <button 
                          onClick={() => handleQueueAction(index)}
                          className="text-primary dark:text-primary-fixed-dim hover:underline font-label-md text-label-md bg-transparent border-none cursor-pointer"
                        >
                          {item.status === 'PENDING' && t.prepare}
                          {item.status === 'PREPARING' && t.complete}
                          {item.status === 'READY' && (lang === 'vi' ? 'Đã giao' : 'Hand Out')}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 border-t border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900/40 flex justify-center">
            <button className="text-primary dark:text-primary-fixed-dim font-label-md text-label-md hover:opacity-75 flex items-center gap-1 bg-transparent border-none cursor-pointer">
              {t.viewAllPrescriptions}
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. INVENTORY MANAGEMENT SECTION */}
      <section className="bg-white dark:bg-slate-800 rounded-lg border border-outline-variant dark:border-slate-700 overflow-hidden shadow-sm">
        <div className="px-6 py-5 border-b border-outline-variant dark:border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface-container-low dark:bg-slate-900/30">
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold">{t.inventoryManagement}</h3>
            <p className="text-body-sm text-on-surface-variant dark:text-slate-400">{t.lastUpdated}</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none md:w-64">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-slate-400 text-[20px]">filter_list</span>
              <input 
                className="w-full bg-surface dark:bg-slate-900 border border-outline-variant dark:border-slate-700 text-on-surface dark:text-white rounded-lg pl-10 pr-4 py-2 text-body-md outline-none focus:border-primary" 
                placeholder={t.filterByMedication}
                type="text"
              />
            </div>
            <button 
              onClick={() => alert(lang === 'vi' ? 'Thêm mặt hàng thuốc mới vào kho...' : 'Adding new medication to inventory...')}
              className="px-4 py-2 bg-primary/10 dark:bg-primary-fixed-dim/20 text-primary dark:text-primary-fixed-dim font-label-md text-label-md rounded border border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer"
            >
              {t.addNew}
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-outline-variant dark:divide-slate-700">
          {inventory.map((med, index) => (
            <div key={index} className="p-6 group hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <span className="px-2 py-0.5 bg-teal-50 dark:bg-teal-950/60 text-secondary dark:text-teal-400 text-[10px] font-bold rounded">
                  {med.category}
                </span>
                <button className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed-dim transition-colors bg-transparent border-none cursor-pointer">
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
              </div>
              <h4 className="font-label-md text-label-md text-on-surface dark:text-white mb-1 font-bold">{med.name}</h4>
              <p className="text-body-sm text-on-surface-variant dark:text-slate-400 mb-4">{med.form} | Lô: {med.batch}</p>
              
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[11px] text-on-surface-variant dark:text-slate-400 uppercase font-medium">
                    {lang === 'vi' ? 'Tồn kho' : 'In stock'}
                  </p>
                  <p className={`font-bold ${med.critical || med.stock < 100 ? 'text-error dark:text-red-400' : 'text-on-surface dark:text-white'}`}>
                    {med.stock.toLocaleString()} {lang === 'vi' ? 'đơn vị' : 'units'}
                  </p>
                </div>
                <button 
                  onClick={() => handleRestock(index)}
                  className={`px-3 py-1 text-[11px] font-bold rounded transition-colors border-none cursor-pointer active:scale-95 ${
                    med.critical || med.stock < 100 
                      ? 'bg-primary text-white hover:bg-primary-container' 
                      : 'border border-outline dark:border-slate-700 text-on-surface dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 bg-transparent'
                  }`}
                >
                  {med.critical || med.stock < 100 ? t.restock : t.details}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-surface-container-low dark:bg-slate-900/50 p-4 flex justify-between items-center px-6 border-t border-outline-variant dark:border-slate-700">
          <span className="text-body-sm text-on-surface-variant dark:text-slate-400">{t.showingCount}</span>
          <div className="flex items-center gap-4">
            <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded disabled:opacity-30 dark:text-slate-400 bg-transparent border-none cursor-pointer" disabled>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <span className="text-body-sm font-bold text-primary dark:text-primary-fixed-dim">1 / 214</span>
            <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded dark:text-slate-400 bg-transparent border-none cursor-pointer">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
