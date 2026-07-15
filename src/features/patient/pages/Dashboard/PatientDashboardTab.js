import React from 'react';

export default function PatientDashboardTab({ lang, t, setActiveTab, onOpenBooking }) {
  return (
    <div className="space-y-lg">
      
      {/* Welcome Message */}
      <section className="mb-xl text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
          <div>
            <h2 className="font-headline-xl text-headline-xl text-primary dark:text-primary-fixed-dim">
              {lang === 'vi' ? 'Chào bạn, Nguyễn Văn A' : 'Hello, Nguyen Van A'}
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-slate-400 mt-sm">
              {lang === 'vi' 
                ? 'Hôm nay bạn cảm thấy thế nào? Hãy kiểm tra các cập nhật sức khỏe mới nhất của mình.' 
                : 'How are you feeling today? Check your latest health updates below.'}
            </p>
          </div>
          <div className="flex items-center gap-sm px-md py-sm bg-primary-fixed text-on-primary-fixed rounded-xl border border-primary/20">
            <span className="material-symbols-outlined">verified_user</span>
            <span className="font-label-md text-label-md">
              {lang === 'vi' ? 'Tài khoản đã xác thực' : 'Verified Account'}
            </span>
          </div>
        </div>
      </section>

      {/* Bento Grid Overview */}
      <div className="grid grid-cols-12 gap-gutter">
        
        {/* Upcoming Appointment (Col-4) */}
        <div className="col-span-12 md:col-span-4 bg-white dark:bg-slate-800 p-lg rounded-xl border border-outline-variant dark:border-slate-700 hover:shadow-sm transition-shadow flex flex-col justify-between text-left">
          <div>
            <div className="flex items-center justify-between mb-md">
              <span className="bg-primary-container text-white dark:text-primary-fixed-dim px-sm py-1 rounded-full text-body-sm font-semibold">
                {lang === 'vi' ? 'Lịch hẹn sắp tới' : 'Upcoming Appointment'}
              </span>
              <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">calendar_today</span>
            </div>
            <p className="font-headline-md text-headline-md text-on-surface dark:text-white">
              {lang === 'vi' ? 'Trong 24h tới' : 'Within 24h'}
            </p>
            <div className="mt-md space-y-xs">
              <p className="font-body-md text-body-md font-bold text-on-surface dark:text-white">
                {lang === 'vi' ? 'Khám Nội Tổng Quát' : 'General Medicine consultation'}
              </p>
              <p className="text-body-md text-on-surface-variant dark:text-slate-400">
                {lang === 'vi' ? 'BS. Lê Minh Tâm' : 'Dr. Le Minh Tam'}
              </p>
              <div className="flex items-center gap-xs text-on-surface-variant dark:text-slate-400 mt-sm">
                <span className="material-symbols-outlined text-[18px]">schedule</span>
                <span className="text-body-sm">
                  {lang === 'vi' ? 'Ngày mai, 08:30 sáng' : 'Tomorrow, 08:30 AM'}
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setActiveTab('Appointments')}
            className="mt-lg w-full py-2 bg-primary text-white dark:bg-slate-700 rounded-lg font-label-md text-label-md hover:opacity-90 transition-colors"
          >
            {lang === 'vi' ? 'Xem chi tiết' : 'View Details'}
          </button>
        </div>

        {/* Latest Lab Results (Col-5) */}
        <div className="col-span-12 md:col-span-5 bg-white dark:bg-slate-800 p-lg rounded-xl border border-outline-variant dark:border-slate-700 flex flex-col text-left">
          <div className="flex items-center justify-between mb-md">
            <span className="font-label-md text-label-md text-on-surface-variant dark:text-slate-400 uppercase tracking-wider">
              {lang === 'vi' ? 'Kết quả xét nghiệm mới nhất' : 'Latest Lab Results'}
            </span>
            <span className="material-symbols-outlined text-secondary dark:text-teal-400">lab_research</span>
          </div>
          <div className="flex-1 space-y-md">
            <div className="flex items-center justify-between p-sm rounded-lg bg-surface-container-low dark:bg-slate-900/60">
              <div>
                <p className="font-body-md text-body-md font-semibold text-on-surface dark:text-white">Glucose ({lang === 'vi' ? 'Lúc đói' : 'Fasting'})</p>
                <p className="text-body-sm text-on-surface-variant dark:text-slate-400">15/10/2023</p>
              </div>
              <div className="text-right">
                <p className="text-headline-md text-headline-md font-bold text-secondary dark:text-teal-400">95 mg/dL</p>
                <span className="text-[10px] bg-secondary-container dark:bg-teal-950 text-on-secondary-container dark:text-teal-400 px-2 py-0.5 rounded-full uppercase font-bold">
                  {lang === 'vi' ? 'Bình thường' : 'Normal'}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between p-sm rounded-lg bg-surface-container-low dark:bg-slate-900/60">
              <div>
                <p className="font-body-md text-body-md font-semibold text-on-surface dark:text-white">Cholesterol Toàn Phần</p>
                <p className="text-body-sm text-on-surface-variant dark:text-slate-400">15/10/2023</p>
              </div>
              <div className="text-right">
                <p className="text-headline-md text-headline-md font-bold text-error">210 mg/dL</p>
                <span className="text-[10px] bg-error-container text-on-error-container px-2 py-0.5 rounded-full uppercase font-bold">
                  {lang === 'vi' ? 'Hơi cao' : 'High'}
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => alert(lang === 'vi' ? 'Hiển thị tất cả kết quả xét nghiệm...' : 'Opening lab results details...')}
            className="text-primary dark:text-primary-fixed-dim font-label-md text-label-md mt-md flex items-center hover:underline bg-transparent border-none outline-none cursor-pointer"
          >
            {lang === 'vi' ? 'Xem tất cả kết quả' : 'View all results'} 
            <span className="material-symbols-outlined ml-1 text-[16px]">arrow_forward</span>
          </button>
        </div>

        {/* Current Prescriptions (Col-3) */}
        <div className="col-span-12 md:col-span-3 bg-white dark:bg-slate-800 p-lg rounded-xl border border-outline-variant dark:border-slate-700 text-left flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-md">
              <span className="font-label-md text-label-md text-on-surface-variant dark:text-slate-400 uppercase tracking-wider">
                {lang === 'vi' ? 'Đơn thuốc hiện tại' : 'Active Prescriptions'}
              </span>
              <span className="material-symbols-outlined text-tertiary dark:text-amber-500">prescriptions</span>
            </div>
            <div className="space-y-md">
              <div className="flex gap-md">
                <div className="w-10 h-10 rounded-lg bg-tertiary-fixed dark:bg-slate-900 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-tertiary dark:text-amber-500">medication</span>
                </div>
                <div>
                  <p className="font-body-md text-body-md font-bold text-on-surface dark:text-white">Amlodipine 5mg</p>
                  <p className="text-body-sm text-on-surface-variant dark:text-slate-400">
                    {lang === 'vi' ? '1 viên sáng sau ăn' : '1 tab morning post-meal'}
                  </p>
                </div>
              </div>
              <div className="flex gap-md">
                <div className="w-10 h-10 rounded-lg bg-tertiary-fixed dark:bg-slate-900 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-tertiary dark:text-amber-500">medication</span>
                </div>
                <div>
                  <p className="font-body-md text-body-md font-bold text-on-surface dark:text-white">Atorvastatin 10mg</p>
                  <p className="text-body-sm text-on-surface-variant dark:text-slate-400">
                    {lang === 'vi' ? '1 viên tối trước ngủ' : '1 tab night pre-bed'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <button 
            onClick={() => alert(lang === 'vi' ? 'Yêu cầu cấp lại đơn thuốc đã gửi.' : 'Prescription renewal request submitted.')}
            className="mt-lg w-full border border-tertiary dark:border-amber-600 text-tertiary dark:text-amber-500 py-2 rounded-lg font-label-md text-label-md hover:bg-tertiary dark:hover:bg-amber-600 hover:text-white transition-colors"
          >
            {lang === 'vi' ? 'Yêu cầu cấp lại' : 'Request Refill'}
          </button>
        </div>

        {/* Recent Medical Visits Timeline (Col-12) */}
        <div className="col-span-12 bg-white dark:bg-slate-800 rounded-xl border border-outline-variant dark:border-slate-700 overflow-hidden text-left shadow-xs">
          <div className="p-lg border-b border-outline-variant dark:border-slate-700 flex items-center justify-between">
            <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white">
              {lang === 'vi' ? 'Lịch sử thăm khám gần đây' : 'Recent Medical Visits'}
            </h3>
            <button 
              onClick={() => alert(lang === 'vi' ? 'Bộ lọc sự vụ...' : 'Filtering visits...')}
              className="text-on-surface-variant dark:text-slate-300 hover:text-primary flex items-center gap-xs"
            >
              <span className="material-symbols-outlined">filter_list</span>
              <span className="text-body-sm">{lang === 'vi' ? 'Lọc theo khoa' : 'Filter Specialty'}</span>
            </button>
          </div>
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse text-body-md">
              <thead className="bg-surface-container-low dark:bg-slate-900 text-on-surface-variant dark:text-slate-400 font-label-md text-label-md uppercase">
                <tr>
                  <th className="px-lg py-md">{lang === 'vi' ? 'Ngày khám' : 'Date'}</th>
                  <th className="px-lg py-md">{lang === 'vi' ? 'Khoa / Dịch vụ' : 'Department / Service'}</th>
                  <th className="px-lg py-md">{lang === 'vi' ? 'Bác sĩ phụ trách' : 'Attending Physician'}</th>
                  <th className="px-lg py-md">{lang === 'vi' ? 'Chẩn đoán' : 'Diagnosis'}</th>
                  <th className="px-lg py-md">{lang === 'vi' ? 'Trạng thái' : 'Status'}</th>
                  <th className="px-lg py-md text-right pr-6">{lang === 'vi' ? 'Hành động' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/60 dark:divide-slate-700 text-on-surface dark:text-slate-200">
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                  <td className="px-lg py-md font-semibold">10/10/2023</td>
                  <td className="px-lg py-md">{lang === 'vi' ? 'Tim mạch' : 'Cardiology'}</td>
                  <td className="px-lg py-md">BS. Trần Đức Anh</td>
                  <td className="px-lg py-md">Tăng huyết áp vô căn (I10)</td>
                  <td className="px-lg py-md">
                    <span className="px-2 py-1 bg-secondary-container dark:bg-teal-950 text-on-secondary-container dark:text-teal-400 text-[11px] rounded font-bold uppercase">
                      {lang === 'vi' ? 'Hoàn thành' : 'Completed'}
                    </span>
                  </td>
                  <td className="px-lg py-md text-right pr-6">
                    <button 
                      onClick={() => alert(lang === 'vi' ? 'Hiển thị chi tiết bệnh án...' : 'Showing visit details...')}
                      className="text-primary dark:text-primary-fixed-dim hover:bg-primary-fixed/20 p-1 rounded transition-colors"
                    >
                      <span className="material-symbols-outlined">visibility</span>
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                  <td className="px-lg py-md font-semibold">15/09/2023</td>
                  <td className="px-lg py-md">{lang === 'vi' ? 'Xét nghiệm máu' : 'Blood Test'}</td>
                  <td className="px-lg py-md">KTV. Nguyễn Thu Hà</td>
                  <td className="px-lg py-md">{lang === 'vi' ? 'Kiểm tra định kỳ' : 'Routine Checkup'}</td>
                  <td className="px-lg py-md">
                    <span className="px-2 py-1 bg-secondary-container dark:bg-teal-950 text-on-secondary-container dark:text-teal-400 text-[11px] rounded font-bold uppercase">
                      {lang === 'vi' ? 'Hoàn thành' : 'Completed'}
                    </span>
                  </td>
                  <td className="px-lg py-md text-right pr-6">
                    <button 
                      onClick={() => alert(lang === 'vi' ? 'Đang tải phiếu kết quả xét nghiệm PDF...' : 'Downloading lab report PDF...')}
                      className="text-primary dark:text-primary-fixed-dim hover:bg-primary-fixed/20 p-1 rounded transition-colors"
                    >
                      <span className="material-symbols-outlined">download</span>
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                  <td className="px-lg py-md font-semibold">02/08/2023</td>
                  <td className="px-lg py-md">{lang === 'vi' ? 'Nha khoa' : 'Dental'}</td>
                  <td className="px-lg py-md">BS. Phạm Gia Bảo</td>
                  <td className="px-lg py-md">{lang === 'vi' ? 'Lấy cao răng' : 'Teeth Cleaning'}</td>
                  <td className="px-lg py-md">
                    <span className="px-2 py-1 bg-secondary-container dark:bg-teal-950 text-on-secondary-container dark:text-teal-400 text-[11px] rounded font-bold uppercase">
                      {lang === 'vi' ? 'Hoàn thành' : 'Completed'}
                    </span>
                  </td>
                  <td className="px-lg py-md text-right pr-6">
                    <button 
                      onClick={() => alert(lang === 'vi' ? 'Hiển thị chi tiết bệnh án...' : 'Showing visit details...')}
                      className="text-primary dark:text-primary-fixed-dim hover:bg-primary-fixed/20 p-1 rounded transition-colors"
                    >
                      <span className="material-symbols-outlined">visibility</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Health Articles Placeholder (Col-12 or Smaller) */}
        <div className="col-span-12 md:col-span-8 bg-surface-container dark:bg-slate-800 rounded-xl p-xl flex flex-col md:flex-row items-center gap-xl relative overflow-hidden text-left shadow-xs">
          <div className="relative z-10 flex-1">
            <h3 className="font-headline-lg text-headline-lg text-primary dark:text-primary-fixed-dim mb-md">
              {lang === 'vi' ? 'Kiến thức Sức khỏe cho Bạn' : 'Health Advice For You'}
            </h3>
            <p className="text-body-lg text-on-surface-variant dark:text-slate-300 mb-lg max-w-lg">
              {lang === 'vi' 
                ? 'Khám phá các bài viết chuyên sâu về lối sống, dinh dưỡng và cách quản lý huyết áp hiệu quả từ đội ngũ chuyên gia của chúng tôi.' 
                : 'Explore research articles regarding diet, hypertension controls, and healthy habits written by clinical leads.'}
            </p>
            <button 
              onClick={() => alert(lang === 'vi' ? 'Mở cổng tin tức sức khỏe...' : 'Opening health blogs portal...')}
              className="bg-primary text-white dark:bg-slate-700 px-lg py-md rounded-lg font-label-md hover:shadow-lg transition-all"
            >
              {lang === 'vi' ? 'Đọc ngay' : 'Read Now'}
            </button>
          </div>
          <div className="w-full md:w-64 h-48 rounded-xl overflow-hidden relative z-10 shrink-0 shadow-xl border-4 border-white dark:border-slate-700">
            <img 
              className="w-full h-full object-cover" 
              alt="Healthy lifestyle food meal layout representation" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqeMT_xqSxh5pRmEYkFI-tvcQEoBr_3a8ztI1mGGID-I31_Xwdz0bNneF5y4uuSpDOB4GSZmZaxOwTHXgTNgh0qcDge7Vz8d-Ut6Zsf4wk6bkdFS0hPwP97-u8Id7-n92V4ep3Citj6jOfFNxhHKKqUBbpjV7YMBRcAGPbP7ENqHNjVTVdIZHwDDNdxmiAUhuTBqsWb7pM_TPfEwid008dTCVLpaxw1KMBGW1Dt4ne096lOr8YgqGV"
            />
          </div>
          {/* Subtle graphic element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-5 rounded-full -mr-20 -mt-20 pointer-events-none"></div>
        </div>

        {/* Mini Vitals Widget (Col-4) */}
        <div className="col-span-12 md:col-span-4 bg-white dark:bg-slate-800 p-lg rounded-xl border border-outline-variant dark:border-slate-700 flex flex-col gap-md text-left shadow-xs">
          <h4 className="font-label-md text-label-md text-on-surface-variant dark:text-slate-400 uppercase">
            {lang === 'vi' ? 'Chỉ số sinh tồn (Lần cuối)' : 'Vitals Indicators (Last)'}
          </h4>
          <div className="grid grid-cols-2 gap-sm">
            <div className="p-md bg-surface-container-low dark:bg-slate-900 rounded-lg">
              <span className="text-body-sm text-on-surface-variant dark:text-slate-400 block">{lang === 'vi' ? 'Huyết áp' : 'Blood Pressure'}</span>
              <span className="text-headline-md font-bold text-primary dark:text-primary-fixed-dim">120/80</span>
              <span className="text-[10px] text-on-surface-variant dark:text-slate-400 block">mmHg</span>
            </div>
            <div className="p-md bg-surface-container-low dark:bg-slate-900 rounded-lg">
              <span className="text-body-sm text-on-surface-variant dark:text-slate-400 block">{lang === 'vi' ? 'Nhịp tim' : 'Heart Rate'}</span>
              <span className="text-headline-md font-bold text-error">72</span>
              <span className="text-[10px] text-on-surface-variant dark:text-slate-400 block">bpm</span>
            </div>
            <div className="p-md bg-surface-container-low dark:bg-slate-900 rounded-lg">
              <span className="text-body-sm text-on-surface-variant dark:text-slate-400 block">{lang === 'vi' ? 'Cân nặng' : 'Weight'}</span>
              <span className="text-headline-md font-bold text-on-surface dark:text-white">68.5</span>
              <span className="text-[10px] text-on-surface-variant dark:text-slate-400 block">kg</span>
            </div>
            <div className="p-md bg-surface-container-low dark:bg-slate-900 rounded-lg">
              <span className="text-body-sm text-on-surface-variant dark:text-slate-400 block">{lang === 'vi' ? 'Nhiệt độ' : 'Temperature'}</span>
              <span className="text-headline-md font-bold text-on-surface dark:text-white">36.6</span>
              <span className="text-[10px] text-on-surface-variant dark:text-slate-400 block">°C</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
