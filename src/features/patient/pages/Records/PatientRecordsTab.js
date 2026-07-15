import React from 'react';

export default function PatientRecordsTab({ lang, t }) {
  const records = [
    {
      id: 1,
      date: 'OCT 24, 2023',
      initials: 'SK',
      doctor: 'Dr. Sarah Koven',
      dept: lang === 'vi' ? 'Tim mạch' : 'Cardiology',
      reason: lang === 'vi' ? 'Kiểm tra gắng sức tim mạch thường niên' : 'Annual Cardiac Stress Test',
      diagnosis: lang === 'vi' ? 'Nhịp xoang bình thường, thể lực tốt' : 'Normal sinus rhythm, high endurance',
      facility: 'General Hospital West',
      status: 'Completed',
      statusVi: 'Hoàn thành'
    },
    {
      id: 2,
      date: 'SEP 12, 2023',
      initials: 'MA',
      doctor: 'Dr. Mark Aris',
      dept: lang === 'vi' ? 'Y học tổng quát' : 'General Medicine',
      reason: lang === 'vi' ? 'Cúm mùa' : 'Seasonal Influenza (Flu)',
      diagnosis: lang === 'vi' ? 'Kê đơn Oseltamivir, bù nước' : 'Prescribed Oseltamivir, Hydration',
      facility: 'Downtown Health Hub',
      status: 'Completed',
      statusVi: 'Hoàn thành'
    },
    {
      id: 3,
      date: 'AUG 05, 2023',
      initials: 'LL',
      doctor: 'Dr. Linda Lau',
      dept: lang === 'vi' ? 'Da liễu' : 'Dermatology',
      reason: lang === 'vi' ? 'Bùng phát chàm da' : 'Eczema Flare-up',
      diagnosis: lang === 'vi' ? 'Bắt đầu điều trị bằng steroid tại chỗ' : 'Topical steroid therapy initiated',
      facility: 'Skin & Wellness Center',
      status: 'Follow-up',
      statusVi: 'Tái khám'
    },
    {
      id: 4,
      date: 'MAY 15, 2023',
      initials: 'SK',
      doctor: 'Dr. Sarah Koven',
      dept: lang === 'vi' ? 'Tim mạch' : 'Cardiology',
      reason: lang === 'vi' ? 'Kiểm tra mỡ máu định kỳ' : 'Routine Lipid Profile',
      diagnosis: lang === 'vi' ? 'Cholesterol 180mg/dL, LDL 110mg/dL' : 'Cholesterol 180mg/dL, LDL 110mg/dL',
      facility: 'General Hospital West',
      status: 'Completed',
      statusVi: 'Hoàn thành'
    }
  ];

  return (
    <div className="space-y-lg text-left">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
        <div>
          <nav className="flex items-center gap-xs mb-sm">
            <span className="text-on-surface-variant dark:text-slate-400 font-label-md text-label-md uppercase tracking-wider">
              {lang === 'vi' ? 'Cổng Bệnh nhân' : 'Patient Portal'}
            </span>
            <span className="material-symbols-outlined text-on-surface-variant dark:text-slate-500 text-sm">chevron_right</span>
            <span className="text-primary dark:text-primary-fixed-dim font-label-md text-label-md uppercase tracking-wider">
              {lang === 'vi' ? 'Hồ sơ bệnh án' : 'My Medical Records'}
            </span>
          </nav>
          <h1 className="font-headline-xl text-headline-xl text-on-surface dark:text-white mb-xs">
            {lang === 'vi' ? 'Lịch sử bệnh án' : 'Clinical History'}
          </h1>
          <p className="text-on-surface-variant dark:text-slate-400 font-body-lg text-body-lg max-w-2xl">
            {lang === 'vi' 
              ? 'Xem thông tin bảo mật về các lần khám, chẩn đoán và kết quả xét nghiệm. Toàn bộ dữ liệu được mã hóa và chỉ có thể truy cập bởi bạn và nhân viên y tế được ủy quyền.' 
              : 'Secure view of your past consultations, diagnoses, and lab results. All data is encrypted and accessible only to you and authorized clinical staff.'}
          </p>
        </div>
        <div className="flex gap-md">
          <button 
            onClick={() => alert(lang === 'vi' ? 'Mở bộ lọc hồ sơ bệnh án...' : 'Opening records filters...')}
            className="flex items-center gap-sm px-md py-sm border border-outline dark:border-slate-600 text-primary dark:text-primary-fixed-dim font-label-md text-label-md rounded-lg hover:bg-surface-container dark:hover:bg-slate-700 transition-colors"
          >
            <span className="material-symbols-outlined">filter_list</span>
            {lang === 'vi' ? 'Lọc hồ sơ' : 'Filter Records'}
          </button>
          <button 
            onClick={() => alert(lang === 'vi' ? 'Đang xuất toàn bộ hồ sơ bệnh án sang định dạng PDF...' : 'Exporting complete clinical record to PDF...')}
            className="flex items-center gap-sm px-md py-sm bg-primary text-white font-label-md text-label-md rounded-lg hover:opacity-90 shadow-sm transition-all"
          >
            <span className="material-symbols-outlined">download</span>
            {lang === 'vi' ? 'Xuất toàn bộ hồ sơ' : 'Export Complete Record'}
          </button>
        </div>
      </div>

      {/* BENTO GRID OVERVIEW */}
      <div className="grid grid-cols-12 gap-gutter">
        
        {/* Patient Profile Card */}
        <div className="col-span-12 md:col-span-4 bg-white dark:bg-slate-800 border border-outline dark:border-slate-700 rounded-xl p-lg flex flex-col gap-md shadow-sm">
          <div className="flex items-center gap-md">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-container">
              <img 
                className="w-full h-full object-cover" 
                alt="Patient profile portrait" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCggDcj_TPkj0h614S3NjpvSrtCNJ7zVYLE6WSfUTGpK6DbQUXOMInWdj0JBksp3ig2smCXrbDdrPuXGqCysNUUlQ45d5CPycNJsGgX7UJybvfVtBTy2bJXCJMjJgXiVMW9FqFEEUD9wvHqDCNaOioNrrVYQ0OyxbtWkqahtG7ADPtQprD1kQyssaB_giQoZgJpR3I-W2FGhE7OYtETeItIymAACmD3_AOJJJk3CyT35tjuBPZ9JA9p"
              />
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white">Nguyễn Văn A</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400">ID: #PX-99283-A</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-md py-sm border-y border-outline-variant dark:border-slate-700">
            <div>
              <p className="text-on-surface-variant dark:text-slate-400 font-label-md text-label-md uppercase">
                {lang === 'vi' ? 'Nhóm máu' : 'Blood Type'}
              </p>
              <p className="font-headline-md text-headline-md text-primary dark:text-primary-fixed-dim">A Pos+</p>
            </div>
            <div>
              <p className="text-on-surface-variant dark:text-slate-400 font-label-md text-label-md uppercase">
                {lang === 'vi' ? 'Tuổi' : 'Age'}
              </p>
              <p className="font-headline-md text-headline-md text-primary dark:text-primary-fixed-dim">
                {lang === 'vi' ? '42 tuổi' : '42 Years'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-sm text-on-surface-variant dark:text-slate-400">
            <span className="material-symbols-outlined">verified_user</span>
            <span className="font-body-sm text-body-sm">
              {lang === 'vi' ? 'Đã xác minh từ năm 2018' : 'Verified Patient since 2018'}
            </span>
          </div>
        </div>

        {/* Latest Vitals Bento Item */}
        <div className="col-span-12 md:col-span-8 bg-white dark:bg-slate-800 border border-outline dark:border-slate-700 rounded-xl overflow-hidden flex flex-col shadow-sm">
          <div className="px-lg py-md border-b border-outline-variant dark:border-slate-700 flex justify-between items-center bg-surface-container-low dark:bg-slate-900/50">
            <h3 className="font-label-md text-label-md uppercase tracking-wider text-on-surface dark:text-white">
              {lang === 'vi' ? 'Chỉ số sinh tồn gần đây (Tự động ghi nhận)' : 'Recent Vital Signs (Auto-Recorded)'}
            </h3>
            <span className="text-secondary dark:text-teal-400 font-body-sm text-body-sm flex items-center gap-xs">
              <span className="w-2 h-2 rounded-full bg-secondary dark:bg-teal-500"></span> 
              {lang === 'vi' ? 'Đang kết nối' : 'Live Sync'}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-outline-variant dark:divide-slate-700 flex-grow items-center">
            <div className="p-lg flex flex-col justify-center items-center text-center">
              <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim mb-sm">favorite</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400">{lang === 'vi' ? 'Nhịp tim' : 'Heart Rate'}</p>
              <p className="font-headline-lg text-headline-lg text-on-surface dark:text-white">
                72 <span className="text-body-sm text-on-surface-variant dark:text-slate-400">bpm</span>
              </p>
            </div>
            <div className="p-lg flex flex-col justify-center items-center text-center">
              <span className="material-symbols-outlined text-secondary dark:text-teal-400 mb-sm">air</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400">SpO2</p>
              <p className="font-headline-lg text-headline-lg text-on-surface dark:text-white">
                98 <span className="text-body-sm text-on-surface-variant dark:text-slate-400">%</span>
              </p>
            </div>
            <div className="p-lg flex flex-col justify-center items-center text-center">
              <span className="material-symbols-outlined text-tertiary dark:text-amber-500 mb-sm">thermostat</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400">{lang === 'vi' ? 'Nhiệt độ' : 'Temp'}</p>
              <p className="font-headline-lg text-headline-lg text-on-surface dark:text-white">
                98.6 <span className="text-body-sm text-on-surface-variant dark:text-slate-400">°F</span>
              </p>
            </div>
            <div className="p-lg flex flex-col justify-center items-center text-center">
              <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim mb-sm">compress</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400">{lang === 'vi' ? 'Huyết áp' : 'BP'}</p>
              <p className="font-headline-lg text-headline-lg text-on-surface dark:text-white">120/80</p>
            </div>
          </div>
        </div>

      </div>

      {/* CLINICAL RECORDS TABLE */}
      <div className="bg-white dark:bg-slate-800 border border-outline dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
        <div className="px-lg py-lg flex items-center justify-between border-b border-outline-variant dark:border-slate-700 bg-surface-container-low dark:bg-slate-900/50">
          <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white">
            {lang === 'vi' ? 'Lịch sử các lần khám bệnh' : 'Medical Visit History'}
          </h3>
          <div className="flex gap-md">
            <div className="flex items-center gap-xs text-on-surface-variant dark:text-slate-400 font-body-sm text-body-sm">
              <span className="w-3 h-3 rounded-full bg-secondary dark:bg-teal-500"></span>
              {lang === 'vi' ? 'Đã hoàn thành' : 'Completed'}
            </div>
            <div className="flex items-center gap-xs text-on-surface-variant dark:text-slate-400 font-body-sm text-body-sm">
              <span className="w-3 h-3 rounded-full bg-primary-container"></span>
              {lang === 'vi' ? 'Tái khám' : 'Follow-up'}
            </div>
          </div>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse text-body-md">
            <thead className="bg-surface-container-low dark:bg-slate-900 text-on-surface-variant dark:text-slate-400 font-label-md text-label-md uppercase tracking-wider border-b border-outline-variant dark:border-slate-700">
              <tr>
                <th className="px-lg py-md font-semibold">{lang === 'vi' ? 'Ngày khám' : 'Date'}</th>
                <th className="px-lg py-md font-semibold">{lang === 'vi' ? 'Bác sĩ phụ trách' : 'Attending Physician'}</th>
                <th className="px-lg py-md font-semibold">{lang === 'vi' ? 'Lý do / Chẩn đoán' : 'Visit Reason / Diagnosis'}</th>
                <th className="px-lg py-md font-semibold">{lang === 'vi' ? 'Cơ sở khám' : 'Facility'}</th>
                <th className="px-lg py-md font-semibold">{lang === 'vi' ? 'Trạng thái' : 'Status'}</th>
                <th className="px-lg py-md text-right pr-6">{lang === 'vi' ? 'Thao tác' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/60 dark:divide-slate-700 text-on-surface dark:text-slate-200">
              {records.map((rec) => {
                const isFollow = rec.status === 'Follow-up';
                return (
                  <tr key={rec.id} className="hover:bg-surface-container-low dark:hover:bg-slate-900/40 transition-colors group">
                    <td className="px-lg py-md font-data-mono">{rec.date}</td>
                    <td className="px-lg py-md">
                      <div className="flex items-center gap-sm">
                        <div className="w-8 h-8 rounded-full bg-secondary-container dark:bg-teal-950 flex items-center justify-center text-on-secondary-container dark:text-teal-400 font-bold text-xs">
                          {rec.initials}
                        </div>
                        <div>
                          <p className="font-semibold text-on-surface dark:text-white">{rec.doctor}</p>
                          <p className="text-xs text-on-surface-variant dark:text-slate-400">{rec.dept}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-lg py-md">
                      <p className="font-semibold text-on-surface dark:text-white">{rec.reason}</p>
                      <p className="text-xs text-on-surface-variant dark:text-slate-400">{rec.diagnosis}</p>
                    </td>
                    <td className="px-lg py-md text-on-surface-variant dark:text-slate-400">{rec.facility}</td>
                    <td className="px-lg py-md">
                      <span className={`inline-flex items-center px-sm py-[2px] rounded-full text-xs font-semibold ${isFollow
                        ? 'bg-primary-container/20 text-primary dark:text-primary-fixed-dim'
                        : 'bg-secondary-container/20 text-on-secondary-container dark:text-teal-400'
                        }`}>
                        {lang === 'vi' ? rec.statusVi : rec.status}
                      </span>
                    </td>
                    <td className="px-lg py-md text-right pr-6">
                      <div className="flex justify-end gap-sm">
                        <button 
                          onClick={() => alert(lang === 'vi' ? `Xem kết quả xét nghiệm của cuộc hẹn ngày ${rec.date}` : `Viewing lab results for visit date ${rec.date}`)}
                          className="p-2 text-primary dark:text-primary-fixed-dim hover:bg-primary/5 rounded-full" 
                          title={lang === 'vi' ? 'Xem kết quả xét nghiệm' : 'View Lab Results'}
                        >
                          <span className="material-symbols-outlined">biotech</span>
                        </button>
                        <button 
                          onClick={() => alert(lang === 'vi' ? 'Tải đơn thuốc PDF...' : 'Downloading PDF prescription...')}
                          className="p-2 text-on-surface-variant dark:text-slate-300 hover:bg-surface-container-high dark:hover:bg-slate-700 rounded-full" 
                          title={lang === 'vi' ? 'Tải đơn thuốc' : 'Download Prescription'}
                        >
                          <span className="material-symbols-outlined">picture_as_pdf</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-lg py-md bg-surface-container-low dark:bg-slate-900 border-t border-outline-variant dark:border-slate-700 flex items-center justify-between">
          <p className="text-on-surface-variant dark:text-slate-400 font-body-sm text-body-sm">
            {lang === 'vi' ? 'Hiển thị 4 trên 24 hồ sơ' : 'Showing 4 of 24 records'}
          </p>
          <div className="flex gap-sm">
            <button className="px-md py-sm border border-outline dark:border-slate-650 rounded-lg bg-white dark:bg-slate-800 text-on-surface-variant dark:text-slate-300 hover:text-primary dark:hover:text-primary-fixed-dim transition-colors font-label-md text-label-md">
              {lang === 'vi' ? 'Trở lại' : 'Previous'}
            </button>
            <button className="px-md py-sm border border-outline dark:border-slate-650 rounded-lg bg-white dark:bg-slate-800 text-on-surface-variant dark:text-slate-300 hover:text-primary dark:hover:text-primary-fixed-dim transition-colors font-label-md text-label-md">
              {lang === 'vi' ? 'Tiếp' : 'Next'}
            </button>
          </div>
        </div>
      </div>

      {/* PRIVACY FOOTER */}
      <div className="mt-xl p-lg bg-surface-container-low dark:bg-slate-900/60 rounded-xl border border-outline-variant dark:border-slate-700 flex flex-col md:flex-row items-center gap-lg">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary dark:text-primary-fixed-dim shrink-0">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shield_lock</span>
        </div>
        <div className="flex-1">
          <h4 className="font-headline-md text-headline-md text-on-surface dark:text-white">
            {lang === 'vi' ? 'Dữ liệu của bạn được bảo mật tuyệt đối' : 'Your Data is Secure'}
          </h4>
          <p className="text-on-surface-variant dark:text-slate-400 font-body-md text-body-md leading-relaxed">
            {lang === 'vi' 
              ? 'Cổng thông tin này tuân thủ các tiêu chuẩn HIPAA và GDPR quốc tế. Hồ sơ y tế của bạn được mã hóa hoàn toàn trong quá trình truyền tải và lưu trữ. Không có thông tin lâm sàng nào được chia sẻ với bên thứ ba khi không có sự đồng ý rõ ràng của bạn.' 
              : 'This portal complies with international HIPAA and GDPR standards. Your medical records are encrypted at rest and in transit. No clinical information is shared with third parties without your explicit consent.'}
          </p>
        </div>
        <div className="md:ml-auto shrink-0">
          <button 
            onClick={() => alert(lang === 'vi' ? 'Cài đặt bảo mật quyền riêng tư...' : 'Configuring privacy permissions...')}
            className="text-primary dark:text-primary-fixed-dim font-label-md text-label-md underline hover:opacity-80 bg-transparent border-none cursor-pointer"
          >
            {lang === 'vi' ? 'Quản lý quyền riêng tư' : 'Manage Privacy Permissions'}
          </button>
        </div>
      </div>

    </div>
  );
}
