import React, { useState } from 'react';

export default function PharmacistLabResultsTab({ lang, t }) {
  const [labTests, setLabTests] = useState([
    {
      id: '#EMR-22910',
      name: 'Phạm Nhật Nam',
      ageGender: lang === 'vi' ? '58 tuổi, Nam' : '58y M',
      initials: 'PN',
      test: 'Creatinine (Serum)',
      drug: 'Tenofovir',
      value: '2.84 mg/dL',
      reference: '0.7 - 1.3',
      status: 'CRITICAL',
      statusClass: 'bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-400',
      critical: true
    },
    {
      id: '#EMR-31044',
      name: 'Trần Linh Lan',
      ageGender: lang === 'vi' ? '42 tuổi, Nữ' : '42y F',
      initials: 'TL',
      test: 'ALT (SGPT)',
      drug: 'Atorvastatin',
      value: '84 U/L',
      reference: '7 - 56',
      status: 'ABNORMAL',
      statusClass: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400',
      critical: false
    },
    {
      id: '#EMR-12055',
      name: 'Lê Minh Hiếu',
      ageGender: lang === 'vi' ? '29 tuổi, Nam' : '29y M',
      initials: 'MH',
      test: 'WBC Count',
      drug: 'Clozapine',
      value: '6.4 x10³/µL',
      reference: '4.5 - 11.0',
      status: 'NORMAL',
      statusClass: 'bg-green-100 dark:bg-green-950/60 text-green-800 dark:text-green-400',
      critical: false
    },
    {
      id: '#EMR-99238',
      name: 'Bùi Thanh Tùng',
      ageGender: lang === 'vi' ? '65 tuổi, Nam' : '65y M',
      initials: 'BT',
      test: 'INR (PT)',
      drug: 'Warfarin',
      value: '4.2',
      reference: '2.0 - 3.0',
      status: 'CRITICAL',
      statusClass: 'bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-400',
      critical: true
    }
  ]);

  const [activeTestIndex, setActiveTestIndex] = useState(0);
  const activeTest = labTests[activeTestIndex];

  // Mock clearance calculator state
  const [calcWeight, setCalcWeight] = useState('70');
  const [calcAge, setCalcAge] = useState('58');
  const [calcGender, setCalcGender] = useState('male');
  const [calcResult, setCalcResult] = useState(null);

  const calculateCrCl = () => {
    // Cockcroft-Gault equation estimate
    // CrCl = ((140 - Age) * Weight) / (72 * SerumCreatinine) [* 0.85 if female]
    const scr = parseFloat(activeTest.value);
    if (isNaN(scr)) {
      alert(lang === 'vi' ? 'Giá trị Creatinine không hợp lệ để tính toán!' : 'Invalid Serum Creatinine value!');
      return;
    }
    const weightVal = parseFloat(calcWeight);
    const ageVal = parseFloat(calcAge);
    if (isNaN(weightVal) || isNaN(ageVal)) {
      alert(lang === 'vi' ? 'Vui lòng nhập cân nặng và tuổi hợp lệ!' : 'Please enter valid weight and age!');
      return;
    }

    let crcl = ((140 - ageVal) * weightVal) / (72 * scr);
    if (calcGender === 'female') {
      crcl = crcl * 0.85;
    }
    setCalcResult(crcl.toFixed(1));
  };

  return (
    <div className="space-y-lg text-left">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-md mb-8">
        <div>
          <h2 className="font-headline-xl text-headline-xl text-on-surface dark:text-white tracking-tight">
            {lang === 'vi' ? 'Duyệt Kết Quả Xét Nghiệm' : 'Lab Results Review'}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 mt-1">
            {lang === 'vi' 
              ? 'Xác thực chức năng thận và huyết học của bệnh nhân trước khi cấp phát thuốc.' 
              : 'Verifying patient kidney function & hematology before prescription clearance.'}
          </p>
        </div>
        <div className="flex gap-sm">
          <button 
            onClick={() => alert(lang === 'vi' ? 'Hiển thị tất cả bệnh nhân...' : 'Showing all patients...')}
            className="px-md py-sm border border-outline dark:border-slate-700 text-on-surface-variant dark:text-slate-200 rounded flex items-center gap-sm font-label-md text-label-md hover:bg-slate-100 dark:hover:bg-slate-800 bg-transparent transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
            {lang === 'vi' ? 'Tất cả bệnh nhân' : 'All Patients'}
          </button>
          <button 
            onClick={() => alert(lang === 'vi' ? 'Lịch sử duyệt kết quả xét nghiệm...' : 'Opening review history...')}
            className="px-md py-sm bg-surface-container-highest dark:bg-slate-700 text-on-surface dark:text-white rounded flex items-center gap-sm font-label-md text-label-md hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors border-none cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">history</span>
            {lang === 'vi' ? 'Lịch sử duyệt' : 'Review History'}
          </button>
        </div>
      </div>

      {/* Bento Grid Summary */}
      <div className="grid grid-cols-12 gap-lg items-start">
        
        {/* Main Lab Results Table Card (col-span-9) */}
        <div className="col-span-12 lg:col-span-9 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden flex flex-col shadow-sm">
          <div className="px-lg py-md border-b border-outline-variant dark:border-slate-700 flex justify-between items-center bg-white dark:bg-slate-900/50">
            <h3 className="font-headline-md text-headline-md text-primary dark:text-primary-fixed-dim font-bold">
              {lang === 'vi' ? 'Danh Sách Chờ Xác Minh Xét Nghiệm' : 'Pending Laboratory Verification'}
            </h3>
            <div className="flex gap-sm">
              <span className="flex items-center gap-base px-sm py-1 bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-400 rounded-full text-[12px] font-bold">
                <span className="w-2 h-2 rounded-full bg-red-600"></span>
                {lang === 'vi' ? '4 Chỉ số nguy kịch' : '4 Critical'}
              </span>
            </div>
          </div>
          
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse text-body-md">
              <thead>
                <tr className="bg-surface-container-low dark:bg-slate-900 text-on-surface-variant dark:text-slate-400 font-label-md text-label-md border-b border-outline-variant dark:border-slate-700 uppercase">
                  <th className="px-lg py-md">{lang === 'vi' ? 'Bệnh nhân' : 'Patient & ID'}</th>
                  <th className="px-lg py-md">{lang === 'vi' ? 'Chỉ số yêu cầu' : 'Test Ordered'}</th>
                  <th className="px-lg py-md">{lang === 'vi' ? 'Giá trị kết quả' : 'Result Value'}</th>
                  <th className="px-lg py-md">{lang === 'vi' ? 'Khoảng tham chiếu' : 'Reference'}</th>
                  <th className="px-lg py-md text-center">{lang === 'vi' ? 'Trạng thái' : 'Status'}</th>
                  <th className="px-lg py-md text-right pr-6">{lang === 'vi' ? 'Xem lịch sử' : 'Action'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/60 dark:divide-slate-700 text-on-surface dark:text-slate-200">
                {labTests.map((tItem, idx) => {
                  const isSelected = activeTestIndex === idx;
                  return (
                    <tr 
                      key={tItem.id}
                      onClick={() => { setActiveTestIndex(idx); setCalcResult(null); }}
                      className={`hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors cursor-pointer ${
                        isSelected ? 'bg-primary/5 dark:bg-slate-900/40 font-semibold' : ''
                      }`}
                    >
                      <td className="px-lg py-md">
                        <div className="flex items-center gap-md">
                          <div className="w-10 h-10 rounded bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-bold text-primary dark:text-primary-fixed-dim">
                            {tItem.initials}
                          </div>
                          <div>
                            <p className="font-label-md text-label-md text-on-surface dark:text-white">{tItem.name}</p>
                            <p className="text-[11px] text-on-surface-variant dark:text-slate-400">{tItem.id} • {tItem.ageGender}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-lg py-md">
                        <p className="font-label-md text-label-md text-on-surface dark:text-white">{tItem.test}</p>
                        <p className="text-[11px] text-primary dark:text-primary-fixed-dim italic">
                          {lang === 'vi' ? `Thuốc: ${tItem.drug}` : `Drug: ${tItem.drug}`}
                        </p>
                      </td>
                      <td className="px-lg py-md">
                        <span className={`font-data-mono font-bold ${tItem.status === 'CRITICAL' ? 'text-red-600 dark:text-red-400' : tItem.status === 'ABNORMAL' ? 'text-amber-600 dark:text-amber-400' : 'text-on-surface dark:text-white'}`}>
                          {tItem.value}
                        </span>
                      </td>
                      <td className="px-lg py-md font-data-mono text-on-surface-variant dark:text-slate-400">{tItem.reference}</td>
                      <td className="px-lg py-md text-center">
                        <span className={`px-sm py-1 rounded-full text-[11px] font-bold uppercase tracking-tight ${tItem.statusClass}`}>
                          {tItem.status}
                        </span>
                      </td>
                      <td className="px-lg py-md text-right pr-6" onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={() => { setActiveTestIndex(idx); alert(lang === 'vi' ? `Mở toàn bộ hồ sơ xét nghiệm của ${tItem.name}...` : `Opening complete lab reports for ${tItem.name}...`); }}
                          className="p-sm text-primary dark:text-primary-fixed-dim hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors bg-transparent border-none cursor-pointer" 
                          title={lang === 'vi' ? 'Xem toàn bộ lịch sử' : 'View Full History'}
                        >
                          <span className="material-symbols-outlined">open_in_new</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar Widgets (col-span-3) */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-lg text-left">
          
          {/* Action Alert Card */}
          <div className="bg-primary/5 dark:bg-primary-container/10 border border-primary/20 dark:border-slate-700 text-on-primary-container dark:text-primary-fixed-dim rounded-xl p-lg shadow-sm">
            <div className="flex items-center gap-sm mb-md text-primary dark:text-primary-fixed-dim">
              <span className="material-symbols-outlined">warning</span>
              <h4 className="font-headline-md text-headline-md font-bold">{lang === 'vi' ? 'Yêu Cầu Xử Lý' : 'Action Required'}</h4>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-300 opacity-90 mb-lg leading-relaxed">
              {lang === 'vi' 
                ? 'Có 3 đơn thuốc đang chờ xử lý được đánh dấu cần điều chỉnh liều dựa trên kết quả thanh thải thận hôm nay.' 
                : 'There are 3 pending prescriptions flagged for dose adjustments based on today\'s renal clearance results.'}
            </p>
            <button 
              onClick={() => alert(lang === 'vi' ? 'Đang mở các đơn thuốc bị cảnh báo...' : 'Opening flagged prescriptions...')}
              className="w-full bg-primary text-white py-sm rounded font-label-md text-label-md hover:opacity-95 transition-all border-none cursor-pointer active:scale-95"
            >
              {lang === 'vi' ? 'Xem cảnh báo' : 'Review Flags'}
            </button>
          </div>

          {/* Test Frequency 24h chart card */}
          <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg shadow-sm">
            <div className="flex justify-between items-start mb-lg">
              <h4 className="font-label-md text-label-md text-on-surface-variant dark:text-slate-400 uppercase tracking-wider">
                {lang === 'vi' ? 'Tần suất xét nghiệm (24h)' : 'Test Frequency (24h)'}
              </h4>
              <span className="material-symbols-outlined text-outline dark:text-slate-500">more_vert</span>
            </div>
            
            <div className="space-y-md">
              <div className="flex items-end justify-between h-32 px-base">
                <div className="w-4 bg-primary/20 dark:bg-slate-700 rounded-t h-[40%]" title="Mon: 4"></div>
                <div className="w-4 bg-primary/40 dark:bg-slate-700 rounded-t h-[60%]" title="Tue: 6"></div>
                <div className="w-4 bg-primary/20 dark:bg-slate-700 rounded-t h-[30%]" title="Wed: 3"></div>
                <div className="w-4 bg-primary dark:bg-teal-500 rounded-t h-[90%]" title="Thu: 9"></div>
                <div className="w-4 bg-primary/60 dark:bg-slate-700 rounded-t h-[70%]" title="Fri: 7"></div>
                <div className="w-4 bg-primary/30 dark:bg-slate-700 rounded-t h-[50%]" title="Sat: 5"></div>
                <div className="w-4 bg-primary/50 dark:bg-slate-700 rounded-t h-[65%]" title="Sun: 6.5"></div>
              </div>
              <div className="flex justify-between text-[10px] text-on-surface-variant dark:text-slate-500 uppercase font-bold px-base">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>

            <div className="mt-xl pt-lg border-t border-outline-variant dark:border-slate-700">
              <div className="flex items-center justify-between mb-sm">
                <span className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400">Creatinine Panel</span>
                <span className="font-label-md text-label-md dark:text-white">12 Results</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-1 rounded-full overflow-hidden">
                <div className="bg-primary dark:bg-teal-500 w-2/3 h-full"></div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Patient Detail Bento Preview & Calculators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg text-left mt-lg">
        
        {/* Box 1: Medical History */}
        <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg flex flex-col gap-md shadow-xs">
          <div className="flex items-center gap-md">
            <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim p-sm bg-primary/5 dark:bg-slate-900 rounded-lg">history_edu</span>
            <h5 className="font-label-md text-label-md text-on-surface dark:text-white font-bold">
              {lang === 'vi' ? 'Lịch Sử Bệnh Án EMR' : 'Patient Medical History'}
            </h5>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400">
            {lang === 'vi' 
              ? 'Truy cập nhanh vào lịch sử chẩn đoán và xu hướng sử dụng thuốc lâu dài để đối soát các chỉ số xét nghiệm bất thường.' 
              : 'Quickly access past diagnoses and long-term medication trends to cross-reference current lab anomalies.'}
          </p>
          <button 
            onClick={() => alert(lang === 'vi' ? `Khởi chạy bệnh án lịch sử cho ${activeTest.name}...` : `Launching EMR history logs for ${activeTest.name}...`)}
            className="mt-auto text-primary dark:text-primary-fixed-dim font-label-md text-label-md flex items-center gap-xs hover:underline bg-transparent border-none cursor-pointer self-start pl-0"
          >
            {lang === 'vi' ? 'Khởi chạy bệnh án EMR' : 'Launch EMR History'}
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>

        {/* Box 2: Clearance Dosing Calculator */}
        <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg flex flex-col gap-md shadow-xs">
          <div className="flex items-center gap-md">
            <span className="material-symbols-outlined text-secondary dark:text-teal-400 p-sm bg-primary/5 dark:bg-slate-900 rounded-lg">medication_liquid</span>
            <h5 className="font-label-md text-label-md text-on-surface dark:text-white font-bold">
              {lang === 'vi' ? 'Công Cụ Tính Độ Thanh Thải' : 'Dosing Calculators'}
            </h5>
          </div>
          
          <div className="space-y-sm bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-outline-variant/30 dark:border-slate-700">
            <p className="font-label-md text-[11px] text-on-surface-variant dark:text-slate-400 uppercase tracking-wider mb-2">
              {lang === 'vi' ? 'ƯỚC TÍNH CLCR (COCKCROFT-GAULT)' : 'CrCl ESTIMATOR (COCKCROFT-GAULT)'}
            </p>
            <div className="grid grid-cols-2 gap-sm">
              <div>
                <label className="text-[10px] text-on-surface-variant dark:text-slate-400 block mb-1">{lang === 'vi' ? 'Cân nặng (kg)' : 'Weight (kg)'}</label>
                <input 
                  type="number" 
                  value={calcWeight} 
                  onChange={(e) => { setCalcWeight(e.target.value); setCalcResult(null); }}
                  className="w-full bg-white dark:bg-slate-950 border border-outline-variant dark:border-slate-750 text-xs py-1 px-2 rounded dark:text-white focus:ring-1 focus:ring-primary outline-none" 
                />
              </div>
              <div>
                <label className="text-[10px] text-on-surface-variant dark:text-slate-400 block mb-1">{lang === 'vi' ? 'Tuổi' : 'Age'}</label>
                <input 
                  type="number" 
                  value={calcAge} 
                  onChange={(e) => { setCalcAge(e.target.value); setCalcResult(null); }}
                  className="w-full bg-white dark:bg-slate-950 border border-outline-variant dark:border-slate-750 text-xs py-1 px-2 rounded dark:text-white focus:ring-1 focus:ring-primary outline-none" 
                />
              </div>
            </div>
            
            <div className="flex gap-4 items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <input 
                  type="radio" 
                  name="calc-gender" 
                  id="calc-gender-m" 
                  checked={calcGender === 'male'} 
                  onChange={() => { setCalcGender('male'); setCalcResult(null); }} 
                  className="text-primary focus:ring-primary" 
                />
                <label htmlFor="calc-gender-m" className="text-xs text-on-surface dark:text-white">{lang === 'vi' ? 'Nam' : 'Male'}</label>

                <input 
                  type="radio" 
                  name="calc-gender" 
                  id="calc-gender-f" 
                  checked={calcGender === 'female'} 
                  onChange={() => { setCalcGender('female'); setCalcResult(null); }} 
                  className="text-primary focus:ring-primary ml-2" 
                />
                <label htmlFor="calc-gender-f" className="text-xs text-on-surface dark:text-white">{lang === 'vi' ? 'Nữ' : 'Female'}</label>
              </div>
              
              <button 
                onClick={calculateCrCl}
                className="bg-primary text-white py-1 px-3 rounded text-[11px] font-bold hover:opacity-95 border-none cursor-pointer active:scale-95"
              >
                {lang === 'vi' ? 'Tính toán' : 'Calculate'}
              </button>
            </div>
            
            {calcResult !== null && (
              <div className="mt-2 pt-2 border-t border-outline-variant/30 dark:border-slate-700 flex justify-between items-center text-xs font-bold text-teal-600 dark:text-teal-400">
                <span>Estimated CrCl:</span>
                <span>{calcResult} mL/min</span>
              </div>
            )}
          </div>

          <button 
            onClick={() => alert(lang === 'vi' ? 'Đang mở máy tính độ thanh thải nâng cao...' : 'Opening advanced clearance calculators...')}
            className="mt-auto text-primary dark:text-primary-fixed-dim font-label-md text-label-md flex items-center gap-xs hover:underline bg-transparent border-none cursor-pointer self-start pl-0"
          >
            {lang === 'vi' ? 'Xem các công thức tính' : 'Calculate Clearance'}
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>

        {/* Box 3: SOP Protocol guidelines */}
        <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-lg flex flex-col gap-md shadow-xs">
          <div className="flex items-center gap-md">
            <span className="material-symbols-outlined text-amber-600 dark:text-amber-400 p-sm bg-primary/5 dark:bg-slate-900 rounded-lg">gavel</span>
            <h5 className="font-label-md text-label-md text-on-surface dark:text-white font-bold">
              {lang === 'vi' ? 'Quy Trình Khoa Dược SOP' : 'Pharmacy Protocol'}
            </h5>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400">
            {lang === 'vi' 
              ? 'Xem lại quy trình chuẩn SOP của bệnh viện đối với việc xử lý kết quả xét nghiệm khẩn cấp và thông báo cho bác sĩ điều trị.' 
              : 'Review hospital-specific standing orders for critical result intervention and physician notification workflows.'}
          </p>
          <button 
            onClick={() => alert(lang === 'vi' ? 'Đang hiển thị quy trình chuẩn SOP khoa dược...' : 'Opening pharmacy standing operating procedures...')}
            className="mt-auto text-primary dark:text-primary-fixed-dim font-label-md text-label-md flex items-center gap-xs hover:underline bg-transparent border-none cursor-pointer self-start pl-0"
          >
            {lang === 'vi' ? 'Xem quy trình chuẩn SOP' : 'View SOPs'}
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>

      </div>

    </div>
  );
}
