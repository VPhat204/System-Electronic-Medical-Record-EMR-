import React, { useState } from 'react';

export default function PharmacistPatientsTab({ lang, t }) {
  const [selectedPatientIndex, setSelectedPatientIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [finalizedIndex, setFinalizedIndex] = useState(null);

  const [patients, setPatients] = useState([
    {
      id: '#RX-88210',
      patId: '2409812',
      name: 'Tran Van A',
      ageGender: lang === 'vi' ? 'Nam, 45 tuổi' : 'Male, 45y',
      doctor: 'Dr. Hoang Le',
      dept: lang === 'vi' ? 'Tim mạch' : 'Cardiology',
      initials: 'TV',
      color: 'bg-primary-fixed text-primary',
      status: 'PENDING',
      statusClass: 'bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-400',
      diagnosis: lang === 'vi' ? 'Tăng huyết áp Giai đoạn II, Tiểu đường Loại 2' : 'Hypertension Stage II, Type 2 Diabetes',
      urgent: true,
      items: [
        { name: 'Metformin 500mg', desc: lang === 'vi' ? '1 viên - BD (Sau ăn sáng & tối)' : '1 tab - BD (After breakfast & dinner)', count: '60 Tabs' },
        { name: 'Amlodipine 5mg', desc: lang === 'vi' ? '1 viên - OD (Buổi sáng)' : '1 tab - OD (Morning)', count: '30 Tabs' },
        { name: 'Atorvastatin 20mg', desc: lang === 'vi' ? '1 viên - Nocté (Trước ngủ)' : '1 tab - Nocté (Before bed)', count: '30 Tabs' }
      ]
    },
    {
      id: '#RX-88215',
      patId: '2409905',
      name: 'Le Thi Hanh',
      ageGender: lang === 'vi' ? 'Nữ, 29 tuổi' : 'Female, 29y',
      doctor: 'Dr. Nguyen Kim',
      dept: lang === 'vi' ? 'Khoa Nội' : 'Internal Medicine',
      initials: 'LH',
      color: 'bg-secondary-container dark:bg-teal-950 text-secondary dark:text-teal-400',
      status: 'PREPARING',
      statusClass: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400',
      diagnosis: lang === 'vi' ? 'Viêm phế quản cấp tính' : 'Acute Bronchitis',
      urgent: false,
      items: [
        { name: 'Amoxicillin 500mg', desc: lang === 'vi' ? '1 viên - TDS (Mỗi 8 tiếng)' : '1 tab - TDS (Every 8 hours)', count: '21 Caps' },
        { name: 'Paracetamol 500mg', desc: lang === 'vi' ? '1 viên - PRN (Khi đau/sốt)' : '1 tab - PRN (Pain/Fever)', count: '10 Tabs' }
      ]
    },
    {
      id: '#RX-88218',
      patId: '2410001',
      name: 'Nguyen Minh',
      ageGender: lang === 'vi' ? 'Nam, 62 tuổi' : 'Male, 62y',
      doctor: 'Dr. Pham Trung',
      dept: lang === 'vi' ? 'Lão khoa' : 'Geriatrics',
      initials: 'NM',
      color: 'bg-surface-variant dark:bg-slate-700 text-on-surface-variant dark:text-slate-200',
      status: 'READY',
      statusClass: 'bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-400',
      diagnosis: lang === 'vi' ? 'Thoái hóa khớp gối, loãng xương' : 'Osteoarthritis of knee, Osteoporosis',
      urgent: false,
      items: [
        { name: 'Glucosamine 1500mg', desc: lang === 'vi' ? '1 viên - OD (Buổi sáng)' : '1 tab - OD (Morning)', count: '30 Tabs' },
        { name: 'Calcium D3', desc: lang === 'vi' ? '1 viên - BD (Sáng & trưa)' : '1 tab - BD (Morning & noon)', count: '60 Tabs' }
      ]
    },
    {
      id: '#RX-88212',
      patId: '2410022',
      name: 'Bui Thanh T',
      ageGender: lang === 'vi' ? 'Nữ, 34 tuổi' : 'Female, 34y',
      doctor: 'Dr. Hoang Le',
      dept: lang === 'vi' ? 'Tim mạch' : 'Cardiology',
      initials: 'BT',
      color: 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
      status: 'DISPENSED',
      statusClass: 'bg-green-100 dark:bg-green-950/60 text-green-800 dark:text-green-400',
      diagnosis: lang === 'vi' ? 'Rối loạn nhịp tim nhẹ' : 'Mild Arrhythmia',
      urgent: false,
      items: [
        { name: 'Metoprolol 25mg', desc: lang === 'vi' ? '1 viên - OD (Buổi sáng)' : '1 tab - OD (Morning)', count: '30 Tabs' }
      ]
    }
  ]);

  const activePatient = patients[selectedPatientIndex];

  const handleDispenseClick = () => {
    setIsModalOpen(true);
  };

  const handleFinalize = () => {
    setIsFinalizing(true);
    setTimeout(() => {
      setPatients(prev => {
        const copy = [...prev];
        copy[selectedPatientIndex].status = 'DISPENSED';
        copy[selectedPatientIndex].statusClass = 'bg-green-100 dark:bg-green-950/60 text-green-800 dark:text-green-400';
        return copy;
      });
      setIsFinalizing(false);
      setIsModalOpen(false);
      setFinalizedIndex(selectedPatientIndex);
    }, 1500);
  };

  return (
    <div className="space-y-lg text-left">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-md mb-lg">
        <div>
          <h2 className="font-headline-xl text-headline-xl text-on-surface dark:text-white mb-xs">
            {lang === 'vi' ? 'Hàng Đợi Cấp Phát Thuốc' : 'Prescription Queue'}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400">
            {lang === 'vi' ? 'Quản lý và cấp phát đơn thuốc bệnh nhân đang chờ hôm nay.' : 'Manage and dispense pending medical orders for today.'}
          </p>
        </div>
        <div className="flex gap-sm">
          <button 
            onClick={() => alert(lang === 'vi' ? 'Bộ lọc nâng cao...' : 'Opening filters...')}
            className="flex items-center gap-xs px-md py-sm bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded font-label-md text-label-md text-on-surface dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            {lang === 'vi' ? 'Bộ lọc' : 'Filters'}
          </button>
          <button 
            onClick={() => alert(lang === 'vi' ? 'Đang cập nhật danh sách đơn...' : 'Refreshing queue...')}
            className="flex items-center gap-xs px-md py-sm bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded font-label-md text-label-md text-on-surface dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">sync</span>
            {lang === 'vi' ? 'Làm mới' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Bento Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter mb-lg">
        <div className="bg-white dark:bg-slate-800 p-md rounded-xl border border-outline-variant dark:border-slate-700 shadow-xs text-left">
          <p className="text-on-surface-variant dark:text-slate-400 font-label-md text-label-md mb-base">
            {lang === 'vi' ? 'Tổng chờ xử lý' : 'Total Pending'}
          </p>
          <div className="flex items-baseline gap-sm">
            <span className="font-headline-lg text-headline-lg text-primary dark:text-primary-fixed-dim font-bold">24</span>
            <span className="text-error font-bold text-xs">↑ 12%</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-md rounded-xl border border-outline-variant dark:border-slate-700 shadow-xs text-left">
          <p className="text-on-surface-variant dark:text-slate-400 font-label-md text-label-md mb-base">
            {lang === 'vi' ? 'Đang soạn thuốc' : 'Preparing'}
          </p>
          <div className="flex items-baseline gap-sm">
            <span className="font-headline-lg text-headline-lg text-secondary dark:text-teal-400 font-bold">08</span>
            <span className="text-on-surface-variant dark:text-slate-500 font-bold text-xs">{lang === 'vi' ? 'Ổn định' : 'Steady'}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-md rounded-xl border border-outline-variant dark:border-slate-700 shadow-xs text-left">
          <p className="text-on-surface-variant dark:text-slate-400 font-label-md text-label-md mb-base">
            {lang === 'vi' ? 'Sẵn sàng phát' : 'Ready for Pickup'}
          </p>
          <div className="flex items-baseline gap-sm">
            <span className="font-headline-lg text-headline-lg text-amber-600 dark:text-amber-400 font-bold">15</span>
            <span className="text-secondary dark:text-teal-400 font-bold text-xs">↓ 5%</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-md rounded-xl border border-outline-variant dark:border-slate-700 shadow-xs text-left">
          <p className="text-on-surface-variant dark:text-slate-400 font-label-md text-label-md mb-base">
            {lang === 'vi' ? 'Đã phát hôm nay' : 'Dispensed Today'}
          </p>
          <div className="flex items-baseline gap-sm">
            <span className="font-headline-lg text-headline-lg text-on-surface dark:text-white font-bold">142</span>
            <span className="text-secondary dark:text-teal-400 font-bold text-xs">↑ 8%</span>
          </div>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-12 gap-lg items-start">
        
        {/* Left: Main Prescription List Table */}
        <div className="col-span-12 lg:col-span-8 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden flex flex-col shadow-sm">
          <div className="p-md border-b border-outline-variant dark:border-slate-700 bg-surface-container-low dark:bg-slate-900/50 flex justify-between items-center">
            <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold">
              {lang === 'vi' ? 'Đơn thuốc chờ cấp phát' : 'Pending Dispensation'}
            </h3>
            <div className="flex bg-surface-container dark:bg-slate-900 rounded-lg p-0.5 border border-outline-variant/30 dark:border-slate-700">
              <button className="px-md py-1 bg-white dark:bg-slate-800 rounded-md shadow-sm font-label-md text-label-md text-primary dark:text-primary-fixed-dim border-none cursor-pointer">
                {lang === 'vi' ? 'Tất cả' : 'All'}
              </button>
              <button 
                onClick={() => alert('Lọc cấp cứu khẩn cấp...')}
                className="px-md py-1 font-label-md text-label-md text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-white bg-transparent border-none cursor-pointer"
              >
                {lang === 'vi' ? 'Khẩn cấp' : 'Urgent'}
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse text-body-md">
              <thead>
                <tr className="bg-surface-container-low dark:bg-slate-900 text-on-surface-variant dark:text-slate-400 font-label-md text-label-md border-b border-outline-variant dark:border-slate-700 uppercase">
                  <th className="px-lg py-md">{lang === 'vi' ? 'Bệnh nhân' : 'Patient Details'}</th>
                  <th className="px-lg py-md">{lang === 'vi' ? 'Mã đơn thuốc' : 'Order ID'}</th>
                  <th className="px-lg py-md">{lang === 'vi' ? 'Người kê đơn' : 'Prescriber'}</th>
                  <th className="px-lg py-md">{lang === 'vi' ? 'Trạng thái' : 'Status'}</th>
                  <th className="px-lg py-md text-right pr-6">{lang === 'vi' ? 'Thao tác' : 'Action'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/60 dark:divide-slate-700 text-on-surface dark:text-slate-200">
                {patients.map((pat, idx) => {
                  const isSelected = selectedPatientIndex === idx;
                  return (
                    <tr 
                      key={pat.id} 
                      onClick={() => setSelectedPatientIndex(idx)}
                      className={`hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors cursor-pointer ${
                        isSelected ? 'bg-primary/5 dark:bg-slate-900/40 font-semibold' : ''
                      }`}
                    >
                      <td className="px-lg py-md">
                        <div className="flex items-center gap-md">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${pat.color}`}>
                            {pat.initials}
                          </div>
                          <div>
                            <p className="font-label-md text-label-md text-on-surface dark:text-white">{pat.name}</p>
                            <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400">
                              ID: {pat.patId} | {pat.ageGender}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-lg py-md font-data-mono">{pat.id}</td>
                      <td className="px-lg py-md">
                        <p className="text-on-surface dark:text-white font-medium">{pat.doctor}</p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400">{pat.dept}</p>
                      </td>
                      <td className="px-lg py-md">
                        <span className={`inline-flex items-center px-2 py-1 rounded font-label-md text-[11px] font-bold uppercase tracking-wider ${pat.statusClass}`}>
                          {pat.status === 'PENDING' && <span className="w-1.5 h-1.5 rounded-full bg-red-600 mr-1.5 animate-pulse"></span>}
                          {pat.status === 'PREPARING' && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>}
                          {pat.status === 'READY' && <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-1.5"></span>}
                          {pat.status === 'DISPENSED' && <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>}
                          {pat.status}
                        </span>
                      </td>
                      <td className="px-lg py-md text-right pr-6" onClick={(e) => e.stopPropagation()}>
                        {pat.status === 'PENDING' && (
                          <button 
                            onClick={() => { setSelectedPatientIndex(idx); handleDispenseClick(); }}
                            className="bg-primary text-white px-md py-1.5 rounded font-label-md text-label-md hover:opacity-95 transition-all border-none cursor-pointer active:scale-95"
                          >
                            {lang === 'vi' ? 'Cấp phát ngay' : 'Dispense Now'}
                          </button>
                        )}
                        {pat.status === 'PREPARING' && (
                          <span className="text-on-surface-variant dark:text-slate-450 font-label-md text-label-md italic">
                            {lang === 'vi' ? 'Đang soạn thuốc...' : 'Processing...'}
                          </span>
                        )}
                        {pat.status === 'READY' && (
                          <button 
                            onClick={() => { setSelectedPatientIndex(idx); handleDispenseClick(); }}
                            className="border border-primary text-primary dark:text-primary-fixed-dim px-md py-1.5 rounded font-label-md text-label-md hover:bg-primary hover:text-white transition-all bg-transparent cursor-pointer active:scale-95"
                          >
                            {lang === 'vi' ? 'Xác thực & Giao' : 'Verify & Release'}
                          </button>
                        )}
                        {pat.status === 'DISPENSED' && (
                          <span className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400">
                            10:45 AM
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Panel: Prescription Details Quick View */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-gutter">
          
          {/* Active selection card */}
          <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg flex flex-col shadow-sm text-left">
            <div className="flex justify-between items-start mb-md">
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold">
                {lang === 'vi' ? 'Đơn thuốc chọn lựa' : 'Active Selection'}
              </h3>
              <button 
                onClick={() => alert('Tùy chọn đơn thuốc...')}
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-on-surface-variant dark:text-slate-400 bg-transparent border-none cursor-pointer"
              >
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>

            {/* Case Info banner */}
            <div className="bg-primary/5 dark:bg-primary-container/10 border border-primary/20 dark:border-slate-700 rounded-lg p-md mb-lg">
              <div className="flex items-center gap-md mb-sm">
                <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">assignment_late</span>
                <p className="font-label-md text-label-md text-primary dark:text-primary-fixed-dim font-bold">
                  {activePatient.urgent ? (lang === 'vi' ? 'ĐƠN KHẨN CẤP' : 'URGENT PRIORITY') : (lang === 'vi' ? 'ĐƠN THƯỜNG' : 'STANDARD PRIORITY')}
                </p>
              </div>
              <h4 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold">
                {activePatient.name}
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 mt-xs">
                {lang === 'vi' ? 'Chẩn đoán' : 'Diagnosis'}: {activePatient.diagnosis}
              </p>
            </div>

            {/* Prescription Items */}
            <div className="space-y-md flex-1">
              <p className="font-label-md text-label-md text-on-surface-variant dark:text-slate-400 border-b border-outline-variant dark:border-slate-700 pb-2 uppercase tracking-wider">
                {lang === 'vi' ? `CHI TIẾT ĐƠN THUỐC (${activePatient.items.length} THÀNH PHẦN)` : `PRESCRIPTION DETAILS (${activePatient.items.length} ITEMS)`}
              </p>
              <div className="divide-y divide-outline-variant/30 dark:divide-slate-700">
                {activePatient.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-start py-3 first:pt-0 last:pb-0">
                    <div>
                      <p className="font-label-md text-label-md text-on-surface dark:text-white font-bold">{item.name}</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 italic mt-xs">{item.desc}</p>
                    </div>
                    <span className="font-data-mono text-data-mono text-primary dark:text-primary-fixed-dim bg-primary/5 dark:bg-slate-900 px-2 py-0.5 rounded border border-primary/10">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stock Availability Footer */}
            <div className="mt-xl pt-lg border-t border-outline-variant dark:border-slate-700">
              <div className="flex justify-between items-center mb-md">
                <span className="text-on-surface-variant dark:text-slate-400 font-body-sm text-body-sm">
                  {lang === 'vi' ? 'Trạng thái kho dược:' : 'Stock Availability:'}
                </span>
                <span className="text-secondary dark:text-teal-400 font-label-md text-label-md flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  {lang === 'vi' ? 'Đủ thuốc trong kho' : 'All in stock'}
                </span>
              </div>
              
              {activePatient.status !== 'DISPENSED' ? (
                <button 
                  onClick={handleDispenseClick}
                  className="w-full py-md bg-primary text-white rounded-lg font-headline-md text-headline-md flex items-center justify-center gap-md hover:shadow-lg hover:brightness-110 transition-all active:scale-95 border-none cursor-pointer"
                >
                  <span className="material-symbols-outlined">medical_services</span>
                  {activePatient.status === 'READY' ? (lang === 'vi' ? 'Xác thực & Giao ngay' : 'Verify & Release Now') : (lang === 'vi' ? 'Cấp phát thuốc ngay' : 'Dispense Now')}
                </button>
              ) : (
                <div className="w-full py-md bg-slate-100 dark:bg-slate-900 text-on-surface-variant dark:text-slate-400 rounded-lg font-label-md text-label-md flex items-center justify-center gap-md border border-outline-variant/30 dark:border-slate-700">
                  <span className="material-symbols-outlined">check_circle</span>
                  {lang === 'vi' ? 'Đơn thuốc đã cấp phát hoàn tất' : 'Prescription Order Finalized'}
                </div>
              )}
            </div>
          </div>

          {/* Interaction Alerts Box */}
          <div className="bg-amber-600 dark:bg-amber-955 text-white p-lg rounded-xl relative overflow-hidden shadow-xs text-left">
            <div className="relative z-10">
              <h4 className="font-headline-md text-headline-md mb-sm flex items-center gap-sm font-bold">
                <span className="material-symbols-outlined">warning</span>
                {lang === 'vi' ? 'Cảnh Báo Tương Tác Thuốc' : 'Interaction Alert'}
              </h4>
              <p className="font-body-sm text-body-sm opacity-90 leading-relaxed">
                {lang === 'vi' 
                  ? 'Bệnh nhân có sử dụng thuốc kháng axit. Hãy chắc chắn uống Atorvastatin ít nhất 2 giờ sau khi uống bất kỳ thuốc nào chứa nhôm hoặc magie.' 
                  : 'Patient is also prescribed Antacids. Ensure Atorvastatin is taken at least 2 hours apart from any aluminum or magnesium-containing medicines.'}
              </p>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
              <span className="material-symbols-outlined" style={{ fontSize: '80px' }}>info</span>
            </div>
          </div>

        </div>

      </div>

      {/* DISPENSING CONFIRMATION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center transition-all duration-300">
          <div className="bg-white dark:bg-slate-800 w-[90%] max-w-[480px] rounded-2xl p-xl shadow-2xl scale-100 transition-transform duration-300 border border-outline-variant dark:border-slate-700">
            <div className="text-center mb-lg">
              <div className="w-16 h-16 bg-primary/10 dark:bg-primary-container/20 rounded-full flex items-center justify-center mx-auto mb-md text-primary dark:text-primary-fixed-dim">
                <span className="material-symbols-outlined text-4xl">check_circle</span>
              </div>
              <h3 className="font-headline-lg text-headline-lg text-on-surface dark:text-white font-bold">
                {lang === 'vi' ? 'Xác Nhận Cấp Phát Thuốc' : 'Confirm Dispensing'}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 mt-sm">
                {lang === 'vi' 
                  ? `Bạn chuẩn bị hoàn tất cấp phát đơn thuốc cho bệnh nhân ${activePatient.name}. Vui lòng xác thực liều lượng kỹ lưỡng.` 
                  : `You are about to finalize the medical order for ${activePatient.name}. Please verify all medication details.`}
              </p>
            </div>
            
            <div className="space-y-sm mb-xl text-left">
              <div className="flex items-center gap-md p-md bg-surface-container dark:bg-slate-900 rounded-lg border border-outline-variant dark:border-slate-700">
                <input 
                  type="checkbox" 
                  defaultChecked 
                  className="w-5 h-5 text-primary dark:text-primary-fixed-dim rounded border-outline-variant dark:border-slate-700 dark:bg-slate-950 focus:ring-primary" 
                />
                <span className="font-label-md text-label-md text-on-surface dark:text-white">
                  {lang === 'vi' ? 'Đã kiểm tra tem nhãn và liều dùng' : 'Verified labels and dosages'}
                </span>
              </div>
              <div className="flex items-center gap-md p-md bg-surface-container dark:bg-slate-900 rounded-lg border border-outline-variant dark:border-slate-700">
                <input 
                  type="checkbox" 
                  defaultChecked 
                  className="w-5 h-5 text-primary dark:text-primary-fixed-dim rounded border-outline-variant dark:border-slate-700 dark:bg-slate-950 focus:ring-primary" 
                />
                <span className="font-label-md text-label-md text-on-surface dark:text-white">
                  {lang === 'vi' ? 'Đã tư vấn sử dụng thuốc cho bệnh nhân' : 'Patient counseling completed'}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-md">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="py-md border border-outline dark:border-slate-700 rounded-lg font-label-md text-label-md text-on-surface dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 bg-transparent cursor-pointer transition-colors"
              >
                {lang === 'vi' ? 'Hủy bỏ' : 'Cancel'}
              </button>
              <button 
                onClick={handleFinalize}
                disabled={isFinalizing}
                className="py-md bg-primary text-white rounded-lg font-label-md text-label-md hover:bg-primary-container transition-colors shadow-lg border-none cursor-pointer flex items-center justify-center gap-sm active:scale-95"
              >
                {isFinalizing && <span className="material-symbols-outlined animate-spin text-sm">sync</span>}
                {lang === 'vi' ? 'Hoàn tất' : 'Finalize Order'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
